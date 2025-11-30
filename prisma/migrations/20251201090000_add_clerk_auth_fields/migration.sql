-- Add Clerk authentication and role/subscription fields
ALTER TABLE "User" ADD COLUMN "clerkId" TEXT;
ALTER TABLE "User" ADD COLUMN "role" TEXT NOT NULL DEFAULT 'user';
ALTER TABLE "User" ADD COLUMN "subscriptionStatus" TEXT NOT NULL DEFAULT 'trial';

-- Create unique index for clerkId
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");
