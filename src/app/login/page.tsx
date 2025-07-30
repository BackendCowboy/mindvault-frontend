// src/app/login/page.tsx
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError(null);

    // FastAPI OAuth2PasswordRequestForm wants URL-encoded form:
    const form = new URLSearchParams();
    form.append("username", email);
    form.append("password", password);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: form.toString(),
      }
    );

    if (res.ok) {
      const body = await res.json() as {
        access_token: string;
        token_type: string;
      };
      localStorage.setItem("token", body.access_token);
      // Redirect to dashboard instead of journal
      router.push("/");
    } else {
      const err = await res.json().catch(() => ({}));
      setError(err.detail || "Login failed");
    }
  }

  return (
    <div className="max-w-md mx-auto py-16">
      <h1 className="text-2xl font-bold mb-6">Log in to MindVault</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          Log In
        </Button>
      </form>

      <p className="text-sm text-center mt-4">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}