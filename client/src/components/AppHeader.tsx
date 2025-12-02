import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { FileText, Target, GraduationCap, FileCheck, Zap, Settings, Info, Shield, LogOut, LayoutDashboard } from "lucide-react";
import { useLocation } from "wouter";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type AssistantType = 'report' | 'learning-plan' | 'lesson-plan' | 'writing-assessment';

interface AppHeaderProps {
  activeAssistant?: AssistantType;
  onAssistantChange?: (assistant: AssistantType) => void;
  showTabs?: boolean;
}

const ASSISTANT_CONFIGS = [
  {
    id: 'report' as AssistantType,
    label: 'Report Assistant',
    icon: FileText,
  },
  {
    id: 'learning-plan' as AssistantType,
    label: 'Learning Plan',
    icon: Target,
  },
  {
    id: 'lesson-plan' as AssistantType,
    label: 'Lesson Plan',
    icon: GraduationCap,
  },
  {
    id: 'writing-assessment' as AssistantType,
    label: 'Assessment',
    icon: FileCheck,
  },
];

interface UserData {
  role: string;
}

export function AppHeader({
  activeAssistant = 'report',
  onAssistantChange = () => {},
  showTabs = true
}: AppHeaderProps) {
  const [, setLocation] = useLocation();
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();

  // Fetch user data to check if admin
  const { data: userData } = useQuery<UserData>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await fetch("/api/auth/me");
      if (!response.ok) return null;
      return response.json();
    },
    enabled: isLoaded && isSignedIn,
  });

  const isAdmin = userData?.role === "admin";

  const handleSignOut = () => {
    signOut(() => setLocation("/"));
  };

  return (
    <header className="bg-teal-600 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        {/* Logo and Settings Row */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <img
              src="/logo-full.svg"
              alt="TeachAssist.ai"
              className="h-12 brightness-0 invert"
            />
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 text-xs font-medium"
            >
              <Zap className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            {/* Settings Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 hover:text-white"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => setLocation("/settings/about")}
                  className="hover:bg-teal-50 hover:text-teal-700 focus:bg-teal-50 focus:text-teal-700 cursor-pointer"
                >
                  <Info className="w-4 h-4 mr-2" />
                  About
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Avatar Menu */}
            {isSignedIn && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full hover:bg-white/20 p-0"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.imageUrl} alt={user.fullName || ""} />
                      <AvatarFallback className="bg-teal-700 text-white text-sm">
                        {user.firstName?.[0] || user.emailAddresses[0]?.emailAddress[0]?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.fullName || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.emailAddresses[0]?.emailAddress}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setLocation("/account")}
                    className="cursor-pointer"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Account Security
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem
                      onClick={() => setLocation("/admin")}
                      className="cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Tab Navigation - Only show if showTabs is true */}
        {showTabs && (
          <div className="flex gap-1 border-b border-teal-500">
            {ASSISTANT_CONFIGS.map((assistant) => {
              const Icon = assistant.icon;
              const isActive = activeAssistant === assistant.id;

              return (
                <button
                  key={assistant.id}
                  onClick={() => onAssistantChange(assistant.id)}
                  className={`
                    flex items-center gap-2 px-4 py-3 font-medium text-sm transition-all whitespace-nowrap border-b-2
                    ${
                      isActive
                        ? "bg-white/10 text-white border-white"
                        : "text-teal-100 hover:text-white hover:bg-white/5 border-transparent"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{assistant.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
