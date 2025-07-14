"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

interface Entry {
  id: number;
  title: string;
  mood: string;
  content: string;
  reflection: string;
  created_at: string;
}

export default function JournalList() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    apiFetch<Entry[]>("/journals")
      .then(setEntries)
      .catch((err) => {
        if (err.message === "Unauthorized") {
          router.push("/login");
        } else {
          console.error("Error fetching journals:", err);
          setEntries([]);
        }
      });
  }, [router]);

  // ← Add this function right here, before the return
  const handleDelete = async (id: number) => {
    try {
      await apiFetch<void>(`/journals/${id}`, { method: "DELETE" });
      // remove from local state
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      // optionally show an error toast here
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Your Journal Entries</h1>
      <Link href="/journal/new">
        <button className="mb-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          + New Entry
        </button>
      </Link>

      {entries.length === 0 ? (
        <p>No entries yet. Start writing!</p>
      ) : (
        entries.map((entry) => (
          <div key={entry.id} className="mb-6 border-b pb-4">
            <h2 className="text-xl font-semibold">{entry.title}</h2>
            <p className="text-sm text-gray-500 mb-2">
              Mood: {entry.mood} |{" "}
              {new Date(entry.created_at).toLocaleDateString()}
            </p>
            <p className="mb-2">{entry.content}</p>
            <div className="bg-gray-100 p-2 rounded mb-2">
              <strong>AI Reflection:</strong>
              <p className="italic">{entry.reflection}</p>
            </div>

            <div className="flex gap-2">
              {/* Edit button */}
              <Link
                href={`/journal/${entry.id}/edit`}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </Link>

              {/* Delete button */}
              <button
                onClick={() => handleDelete(entry.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}