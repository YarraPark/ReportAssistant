import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";
import { prisma } from "../db";

/**
 * Middleware to require authentication
 * Returns 401 if user is not authenticated
 */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const auth = getAuth(req);

  if (!auth.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
}

/**
 * Middleware to require admin access
 * Returns 401 if not authenticated, 403 if not admin
 */
export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = getAuth(req);

  if (!auth.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: auth.userId },
      select: { role: true },
    });

    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden - Admin access required" });
    }

    next();
  } catch (error) {
    console.error("Error checking admin status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Helper to get the authenticated user from the database
 * Returns null if not authenticated or user not found
 */
export async function getAuthenticatedUser(req: Request) {
  const auth = getAuth(req);

  if (!auth.userId) {
    return null;
  }

  try {
    return await prisma.user.findUnique({
      where: { clerkId: auth.userId },
    });
  } catch (error) {
    console.error("Error fetching authenticated user:", error);
    return null;
  }
}
