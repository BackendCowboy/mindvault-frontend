"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SiteHeader() {
  return (
    <header className="w-full border-b px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          MindVault 🧠
        </Link>
        <nav className="space-x-4">
          <Link href="/journal">
            <Button variant="ghost">Journal</Button>
          </Link>
          <Link href="/mood">
            <Button variant="ghost">Mood</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}