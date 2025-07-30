// src/app/journal/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Layout from "@/components/ui/layout";
import { Plus, Edit, Trash2, Calendar, Heart } from "lucide-react";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    apiFetch<Entry[]>("/journals")
      .then((data) => {
        setEntries(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.message === "Unauthorized") {
          router.push("/login");
        } else {
          console.error("Error fetching journals:", err);
          setError("Failed to load journal entries");
          setEntries([]);
          setLoading(false);
        }
      });
  }, [router]);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await apiFetch<void>(`/journals/${id}`, { method: "DELETE" });
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete entry. Please try again.");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your journal entries...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Journal</h1>
              <p className="text-gray-600">
                {entries.length} {entries.length === 1 ? 'entry' : 'entries'} total
              </p>
            </div>
            <Link href="/journal/new">
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>New Entry</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Empty State */}
        {entries.length === 0 && !error ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Start Your Journey</h2>
            <p className="text-gray-600 mb-6">
              No entries yet. Create your first journal entry to begin reflecting on your thoughts and experiences.
            </p>
            <Link href="/journal/new">
              <Button className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Write Your First Entry</span>
              </Button>
            </Link>
          </div>
        ) : (
          /* Journal Entries */
          <div className="space-y-6">
            {entries.map((entry) => (
              <div key={entry.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                {/* Entry Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{entry.title}</h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{entry.mood}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(entry.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <Link href={`/journal/${entry.id}/edit`}>
                      <Button variant="outline" className="flex items-center space-x-1">
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => handleDelete(entry.id, entry.title)}
                      className="text-red-600 hover:text-red-700 hover:border-red-300 flex items-center space-x-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </Button>
                  </div>
                </div>

                {/* Entry Content */}
                <div className="mb-4">
                  <p className="text-gray-700 leading-relaxed line-clamp-3">
                    {entry.content}
                  </p>
                </div>

                {/* AI Reflection */}
                {entry.reflection && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <div className="text-blue-600 text-xs font-semibold uppercase tracking-wide">
                        AI Reflection
                      </div>
                    </div>
                    <p className="text-blue-800 italic mt-1 leading-relaxed">
                      {entry.reflection}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}