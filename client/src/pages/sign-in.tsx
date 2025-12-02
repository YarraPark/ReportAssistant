import { SignIn } from "@clerk/clerk-react";
import { useLocation } from "wouter";

export default function SignInPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 flex flex-col">
      {/* Simple header with logo */}
      <header className="p-4">
        <div className="container mx-auto">
          <img
            src="/logo-full.svg"
            alt="TeachAssist.ai"
            className="h-12 cursor-pointer"
            onClick={() => setLocation("/")}
          />
        </div>
      </header>

      {/* Sign in form centered */}
      <div className="flex-1 flex items-center justify-center p-4">
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/app"
          afterSignUpUrl="/app"
        />
      </div>
    </div>
  );
}
