import { useEffect, useRef } from "react";
import { useUser } from "@clerk/clerk-react";

/**
 * Hook that syncs Clerk user data with our Prisma database
 * Call this once in the app (e.g., in a layout component) after user signs in
 */
export function useUserSync() {
  const { user, isSignedIn, isLoaded } = useUser();
  const hasSynced = useRef(false);

  useEffect(() => {
    // Only sync once when user is loaded and signed in
    if (!isLoaded || !isSignedIn || !user || hasSynced.current) {
      return;
    }

    const syncUser = async () => {
      try {
        const response = await fetch("/api/auth/sync", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.emailAddresses[0]?.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
          }),
        });

        if (!response.ok) {
          console.error("Failed to sync user:", await response.text());
          return;
        }

        hasSynced.current = true;
        console.log("User synced successfully");
      } catch (error) {
        console.error("Error syncing user:", error);
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, user]);
}
