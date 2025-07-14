// --- Journal Page ---
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/textarea";
import { Button } from "@/components/ui/button";

export default function JournalPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:8000/journals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add Authorization here if you're using tokens
        },
        body: JSON.stringify({ title, content, mood }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Failed to save entry");
      }

      setSuccess("Entry saved!");
      setTitle("");
      setContent("");
      setMood("");
    } catch (err: unknown) {
  if (err instanceof Error) {
    setError(err.message);
  } else {
    setError("An unexpected error occurred.");
  }
}
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">📝 New Journal Entry</h1>

      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4"
      />
      <Input
        placeholder="Mood (e.g., happy, sad, anxious)"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="mb-4"
      />
      <Textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-4 h-40"
      />

      <Button onClick={handleSubmit} className="w-full" disabled={loading}>
        {loading ? "Saving..." : "Save Entry"}
      </Button>

      {success && <p className="text-green-600 mt-4 text-center">{success}</p>}
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
    </div>
  );
}