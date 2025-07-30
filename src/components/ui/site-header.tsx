// src/components/ui/site-header.tsx
"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowLeft } from "lucide-react";

interface SiteHeaderProps {
  showBackButton?: boolean;
  backTo?: string;
  backLabel?: string;
}

export default function SiteHeader({ 
  showBackButton = false,
  backTo = "/journal", 
  backLabel = "Back to Journal" 
}: SiteHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  // Check if user is authenticated (has token)
  const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem("token");

  return (
    <header className="w-full border-b px-4 py-3 bg-white">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Left: Logo + Back Button */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
            MindVault 🧠
          </Link>
          
          {/* Back Button for specific pages */}
          {showBackButton && (
            <Button
              variant="ghost"
              onClick={() => router.push(backTo)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{backLabel}</span>
            </Button>
          )}
        </div>

        {/* Right: Navigation + Logout */}
        <div className="flex items-center space-x-2">
          {/* Main Navigation - Only show if authenticated */}
          {isAuthenticated && (
            <nav className="hidden md:flex space-x-2">
              <Link href="/journal">
                <Button 
                  variant={pathname === "/journal" || pathname.startsWith("/journal") ? "default" : "ghost"}
                >
                  Journal
                </Button>
              </Link>
              <Link href="/mood">
                <Button 
                  variant={pathname === "/mood" || pathname.startsWith("/mood") ? "default" : "ghost"}
                >
                  Mood
                </Button>
              </Link>
              <Link href="/ai-summary">
                <Button 
                  variant={pathname === "/ai-summary" ? "default" : "ghost"}
                >
                  AI Insights
                </Button>
              </Link>
              <Link href="/profile">
                <Button 
                  variant={pathname === "/profile" ? "default" : "ghost"}
                >
                  Profile
                </Button>
              </Link>
            </nav>
          )}

          {/* Logout Button - Only show if authenticated */}
          {isAuthenticated && (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 hover:border-red-300"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}