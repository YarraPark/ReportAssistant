import { UserProfile } from "@clerk/clerk-react";
import { AppHeader } from "@/components/AppHeader";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function AccountPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/40">
      <AppHeader showTabs={false} />
      <main className="flex justify-center px-6 py-8">
        <div className="w-full max-w-3xl">
          <div className="mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/app")}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to App
            </Button>
          </div>
          <div className="flex items-center gap-2 mb-6 justify-center">
            <Shield className="w-6 h-6 text-teal-600" />
            <h1 className="text-2xl font-semibold text-gray-900">Account Security</h1>
          </div>
          <style>{`
            /* Hide the Account tab in the navbar */
            .cl-navbarButton__account {
              display: none !important;
            }
            /* Hide profile-related sections on the security page */
            .cl-profileSection__profile,
            .cl-profileSection__emailAddresses,
            .cl-profileSection__connectedAccounts,
            .cl-profileSection__activeDevices,
            .cl-profileSection__danger {
              display: none !important;
            }
          `}</style>
          <UserProfile routing="path" path="/account" />
        </div>
      </main>
    </div>
  );
}
