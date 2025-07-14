import { ReactNode } from "react";
import SiteHeader from "@/components/ui/site-header";
import Link from "next/link"; // ✅ Import Link

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      {/* 📎 Journal List Link */}
      <div className="bg-gray-100 px-4 py-2">
        <div className="max-w-4xl mx-auto">
          <Link href="/journal" className="text-blue-600 hover:underline">
            📘 See All Journal Entries
          </Link>
        </div>
      </div>

      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}