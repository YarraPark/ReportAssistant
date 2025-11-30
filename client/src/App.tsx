import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import Home from "@/pages/home";
import AdminPage from "@/pages/admin";
import LandingPage from "@/pages/landing";
import Settings from "@/pages/settings";
import SignInPage from "@/pages/sign-in";
import SignUpPage from "@/pages/sign-up";
import AccountPage from "@/pages/account";
import NotFound from "@/pages/not-found";
import { AdminProtectedRoute } from "@/components/ProtectedRoute";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY environment variable");
}

// Clerk appearance customization - teal/green theme to match TeachAssist
const clerkAppearance = {
  variables: {
    colorPrimary: "#0d9488", // teal-600
    colorText: "#0f172a", // slate-900
    colorTextSecondary: "#64748b", // slate-500
    colorBackground: "#ffffff",
    colorInputBackground: "#ffffff",
    colorInputText: "#0f172a",
    borderRadius: "0.5rem",
  },
  elements: {
    formButtonPrimary: {
      backgroundColor: "#0d9488",
      "&:hover": {
        backgroundColor: "#0f766e", // teal-700
      },
    },
    card: {
      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      borderRadius: "0.75rem",
    },
    headerTitle: {
      color: "#0d9488",
    },
    headerSubtitle: {
      color: "#64748b",
    },
    socialButtonsBlockButton: {
      borderColor: "#e2e8f0",
      "&:hover": {
        backgroundColor: "#f0fdfa", // teal-50
      },
    },
    footerActionLink: {
      color: "#0d9488",
      "&:hover": {
        color: "#0f766e",
      },
    },
  },
};

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/" component={LandingPage} />
      <Route path="/sign-in" component={SignInPage} />
      <Route path="/sign-up" component={SignUpPage} />
      <Route path="/settings/about" component={Settings} />

      {/* Protected routes - require authentication */}
      <Route path="/app">
        <SignedIn>
          <Home />
        </SignedIn>
        <SignedOut>
          <Redirect to="/sign-in" />
        </SignedOut>
      </Route>

      <Route path="/account">
        <SignedIn>
          <AccountPage />
        </SignedIn>
        <SignedOut>
          <Redirect to="/sign-in" />
        </SignedOut>
      </Route>

      <Route path="/account/:rest*">
        <SignedIn>
          <AccountPage />
        </SignedIn>
        <SignedOut>
          <Redirect to="/sign-in" />
        </SignedOut>
      </Route>

      {/* Admin routes - require admin role */}
      <Route path="/admin">
        <SignedIn>
          <AdminProtectedRoute>
            <AdminPage />
          </AdminProtectedRoute>
        </SignedIn>
        <SignedOut>
          <Redirect to="/sign-in" />
        </SignedOut>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={clerkAppearance}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/app"
      afterSignUpUrl="/app"
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default App;
