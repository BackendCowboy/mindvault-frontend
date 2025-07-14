import { ReactNode } from "react";
import SiteHeader from "@/components/ui/site-header";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        {children}
      </main>
      {/* You can add a footer here if needed */}
    </div>
  );
}