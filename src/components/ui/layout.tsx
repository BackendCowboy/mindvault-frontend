import { ReactNode } from "react";
import SiteHeader from "@/components/ui/site-header";
import MobileNavigation from "@/components/ui/mobile-navigation";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
  showMobileNav?: boolean;
}

export default function Layout({ children, showMobileNav = true }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />

      {/* Journal List Link - Hidden on mobile to save space */}
      <div className="bg-gray-100 px-4 py-2 hidden md:block">
        <div className="max-w-4xl mx-auto">
          <Link href="/journal" className="text-blue-600 hover:underline">
            📘 See All Journal Entries
          </Link>
        </div>
      </div>

      {/* Main Content with mobile bottom padding */}
      <main className={`flex-1 p-4 max-w-4xl mx-auto w-full ${
        showMobileNav ? 'pb-20 md:pb-4' : 'pb-4'
      }`}>
        {children}
      </main>

      {/* Mobile Navigation */}
      {showMobileNav && <MobileNavigation />}
    </div>
  );
}