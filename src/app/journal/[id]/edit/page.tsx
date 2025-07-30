// src/app/journal/[id]/edit/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/textarea";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/ui/site-header";
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

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <SiteHeader showBackButton={true} />
        <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading entry...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <SiteHeader showBackButton={true} />
        <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </main>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="flex min-h-screen flex-col bg-gray-50">
        <SiteHeader showBackButton={true} />
        <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
          <div className="text-center py-12">
            <p className="text-gray-600">Entry not found.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader 
        showBackButton={true} 
        backTo="/journal"
        backLabel="Back to Journal"
      />
      
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">Edit Journal Entry</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <Input
                placeholder="Enter a title for your entry"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mood
              </label>
              <Input
                placeholder="How are you feeling?"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <Textarea
                placeholder="Write your thoughts..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="h-40"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/journal")}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}