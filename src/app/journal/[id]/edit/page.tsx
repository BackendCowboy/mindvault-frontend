// src/app/journal/[id]/edit/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/textarea";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";

interface Entry {
  id: number;
  title: string;
  mood: string;
  content: string;
  reflection: string;
  created_at: string;
}

export default function EditJournalEntry() {
  const { id } = useParams();
  const router = useRouter();

  const [entry, setEntry] = useState<Entry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [mood, setMood] = useState("");
  const [content, setContent] = useState("");

  // 1) Load existing entry
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    apiFetch<Entry>(`/journals/${id}`)
      .then((data) => {
        setEntry(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.message === "Unauthorized") {
          router.push("/login");
        } else {
          setError("Failed to load entry.");
          setLoading(false);
        }
      });
  }, [id, router]);

  // 2) Initialize form values once entry is loaded
  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setMood(entry.mood);
      setContent(entry.content);
    }
  }, [entry]);

  // 3) Handle save
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiFetch<void>(`/journals/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, mood, content }),
      });
      router.push("/journal");
    } catch {
      setError("Save failed. Please try again.");
    }
  };

  if (loading) return <p className="p-6">Loading…</p>;
  if (error)   return <p className="p-6 text-red-500">{error}</p>;
  if (!entry) return <p className="p-6">Entry not found.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Journal Entry</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          placeholder="Mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          required
        />
        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="h-40"
        />
        {error && <p className="text-red-500">{error}</p>}

        {/* BUTTON ROW */}
        <div className="flex gap-2">
          <Button type="submit">Save Changes</Button>
          <Link
            href="/journal"
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}