// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import PWAInstaller from "@/components/PWAInstaller";
import { BookOpen, Heart, TrendingUp, Sparkles } from "lucide-react";

const quotes = [
  "Growth is built one entry at a time.",
  "Your thoughts matter. Your healing matters.",
  "Consistency beats intensity.",
  "Every entry is a step toward understanding yourself.",
  "Your mental health journey matters.",
  "Small steps lead to big changes.",
];

interface DashboardStats {
  journalCount: number;
  moodCount: number;
  lastMood?: string;
  streak: number;
}

export default function Home() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    journalCount: 0,
    moodCount: 0,
    streak: 0,
  });
  const [loading, setLoading] = useState(true);

  const dailyQuote = quotes[new Date().getDate() % quotes.length];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Load dashboard stats
    loadDashboardStats();
  }, [router]);

  const loadDashboardStats = async () => {
    try {
      // TODO: Replace with actual API calls
      // Mock data for now
      setStats({
        journalCount: 5,
        moodCount: 12,
        lastMood: "happy",
        streak: 3,
      });
    } catch (error) {
      console.error("Failed to load dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMoodEmoji = (mood: string) => {
    const moodMap: { [key: string]: string } = {
      happy: "😊",
      sad: "😢",
      angry: "😡",
      anxious: "😰",
      tired: "😴",
      excited: "🤗",
      neutral: "😐",
      confused: "🤔",
    };
    return moodMap[mood] || "😊";
  };

  if (loading) {
    return (
      <Layout>
        <div className="px-6 py-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-6 py-8 space-y-6">
        {/* Welcome Header */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">Welcome to MindVault 🧠</h1>
          <p className="text-muted-foreground italic text-lg">&quot;{dailyQuote}&quot;</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.journalCount}</div>
            <div className="text-sm text-blue-700">Journal Entries</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.moodCount}</div>
            <div className="text-sm text-green-700">Moods Tracked</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.streak}</div>
            <div className="text-sm text-purple-700">Day Streak</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <div className="text-2xl">
              {stats.lastMood ? getMoodEmoji(stats.lastMood) : "😊"}
            </div>
            <div className="text-sm text-yellow-700">Latest Mood</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <Link href="/journal/new">
            <Button className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span>New Journal Entry</span>
            </Button>
          </Link>
          <Link href="/mood">
            <Button variant="outline" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Record Mood</span>
            </Button>
          </Link>
        </div>

        {/* Main Feature Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span>📔 Journal Entries</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3 text-gray-600">
                Reflect and grow through writing. You have {stats.journalCount} entries so far.
              </p>
              <Link href="/journal" className="text-blue-600 hover:underline font-medium">
                See All Journals →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span>📊 Mood Tracker</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3 text-gray-600">
                Track your emotional patterns. {stats.moodCount} moods logged.
              </p>
              <Link href="/mood" className="text-blue-600 hover:underline font-medium">
                View Mood Tracker →
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                <span>✨ AI Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-3 text-gray-600">
                Weekly reflections & emotional summaries powered by AI.
              </p>
              <Link href="/ai-summary" className="text-blue-600 hover:underline font-medium">
                Explore Insights →
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>Your Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <div className="text-4xl mb-2">🌱</div>
              <p className="text-gray-600 mb-2">
                Keep up the great work! You&apos;re on a {stats.streak}-day streak.
              </p>
              <p className="text-sm text-gray-500">
                Consistency is key to understanding your mental health patterns.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* PWA Install Prompt */}
      <PWAInstaller />
    </Layout>
  );
}