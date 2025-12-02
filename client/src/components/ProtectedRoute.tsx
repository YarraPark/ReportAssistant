import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { Redirect } from "wouter";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

interface UserData {
  id: string;
  email: string;
  name: string;
  role: string;
  subscriptionStatus: string;
  currentTier: string;
  monthlyRequestsUsed: number;
  monthlyRequestsLimit: number;
}

/**
 * AdminProtectedRoute - Only allows users with role === "admin"
 * Redirects non-admins to home page
 */
export function AdminProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoaded } = useUser();

  const { data: userData, isLoading, error } = useQuery<UserData>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await fetch("/api/auth/me");
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      return response.json();
    },
    enabled: isLoaded && !!user,
    retry: false,
  });

  // Still loading Clerk user
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    );
  }

  // Loading user data from our API
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    );
  }

  // User not found in our database or error fetching
  if (error || !userData) {
    return <Redirect to="/app" />;
  }

  // Not an admin - redirect to main app
  if (userData.role !== "admin") {
    return <Redirect to="/app" />;
  }

  return <>{children}</>;
}
