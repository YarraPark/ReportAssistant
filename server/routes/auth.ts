import { Router } from "express";
import { getAuth } from "@clerk/express";
import { prisma } from "../db";

const router = Router();

/**
 * POST /api/auth/sync
 * Syncs Clerk user data with Prisma database
 * Called after successful sign-in/sign-up from the frontend
 */
router.post("/sync", async (req, res) => {
  try {
    const auth = getAuth(req);

    if (!auth.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { email, firstName, lastName } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const name = [firstName, lastName].filter(Boolean).join(" ") || email.split("@")[0];

    // Upsert user - create if not exists, update if exists
    const user = await prisma.user.upsert({
      where: { clerkId: auth.userId },
      update: {
        email,
        name,
        lastActiveAt: new Date(),
      },
      create: {
        clerkId: auth.userId,
        email,
        name,
        role: "user",
        subscriptionStatus: "trial",
        currentTier: "free",
        monthlyRequestsUsed: 0,
        monthlyRequestsLimit: 10,
      },
    });

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      subscriptionStatus: user.subscriptionStatus,
      currentTier: user.currentTier,
      monthlyRequestsUsed: user.monthlyRequestsUsed,
      monthlyRequestsLimit: user.monthlyRequestsLimit,
    });
  } catch (error) {
    console.error("Error syncing user:", error);
    res.status(500).json({ error: "Failed to sync user" });
  }
});

/**
 * GET /api/auth/me
 * Returns current authenticated user's data
 */
router.get("/me", async (req, res) => {
  try {
    const auth = getAuth(req);

    if (!auth.userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: auth.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        subscriptionStatus: true,
        currentTier: true,
        monthlyRequestsUsed: true,
        monthlyRequestsLimit: true,
        createdAt: true,
        lastActiveAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

export default router;
