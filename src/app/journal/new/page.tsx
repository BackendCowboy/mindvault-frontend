"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/textarea";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";

export default function NewJournalEntry() {
  const router = useRouter();
  const [title, setTitle]     = useState("");
  const [mood, setMood]       = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiFetch("/journals", {
      method: "POST",
      body: JSON.stringify({ title, mood, content }),
    });
    router.push("/journal");
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">New Journal Entry</h1>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4"
        />
        <Input
          placeholder="Mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="mb-4"
        />
        <Textarea
          placeholder="Write your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-4"
        />
        <Button type="submit">Save Entry</Button>
      </form>
    </div>
  );
}