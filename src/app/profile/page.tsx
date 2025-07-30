// src/app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/ui/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Calendar, 
  BookOpen, 
  TrendingUp, 
  Heart,
  Award,
  Clock,
  BarChart3,
  Settings
} from "lucide-react";
import { apiFetch } from "@/lib/api";

interface UserProfile {
  id: number;
  email: string;
}

interface JournalStats {
  total_entries: number;
  first_entry?: string;
  latest_entry?: string;
  total_words: number;
  average_words_per_entry: number;
  most_common_mood?: string;
}

interface StreakData {
  current_streak: number;
  longest_streak: number;
}

interface MoodSummary {
  summary: { [key: string]: number };
}

interface SevenDaySummary {
  last_7_days: {
    [date: string]: {
      count: number;
      moods: { [mood: string]: number };
    };
  };
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<JournalStats | null>(null);
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [moodSummary, setMoodSummary] = useState<MoodSummary | null>(null);
  const [sevenDayData, setSevenDayData] = useState<SevenDaySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    loadProfileData();
  }, [router]);

  const loadProfileData = async () => {
    try {
      // Load data individually with error handling for each endpoint
      let statsData = null;
      let streakData = null; 
      let moodData = null;
      let weekData = null;

      try {
        statsData = await apiFetch<JournalStats>("/journals/stats");
      } catch (e) {
        console.log("Stats endpoint failed (probably no entries yet):", e);
      }

      try {
        streakData = await apiFetch<StreakData>("/journals/streak");
      } catch (e) {
        console.log("Streak endpoint failed (probably no entries yet):", e);
      }

      try {
        moodData = await apiFetch<MoodSummary>("/journals/mood-summary");
      } catch (e) {
        console.log("Mood summary endpoint failed (probably no entries yet):", e);
      }

      try {
        weekData = await apiFetch<SevenDaySummary>("/journals/7-day-summary");
      } catch (e) {
        console.log("7-day summary endpoint failed (probably no entries yet):", e);
      }

      // Set data with fallbacks for null values
      setStats(statsData || {
        total_entries: 0,
        total_words: 0,
        average_words_per_entry: 0,
        most_common_mood: undefined
      });
      
      setStreak(streakData || {
        current_streak: 0,
        longest_streak: 0
      });
      
      setMoodSummary(moodData || { summary: {} });
      setSevenDayData(weekData || { last_7_days: {} });

      // Extract user email from JWT token
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Decode JWT to get user email (simple decode, not verification)
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUser({
            id: payload.user_id || 1, // Fallback ID
            email: payload.sub // Email is stored in 'sub' field
          });
        } catch (e) {
          console.error("Error decoding token:", e);
          // Fallback user data if token decode fails
          setUser({
            id: 1,
            email: "user@example.com"
          });
        }
      }

    } catch (error) {
      console.error("Failed to load profile data:", error);
      setError("Failed to load profile data");
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
      uplifted: "🌟",
    };
    return moodMap[mood.toLowerCase()] || "😊";
  };

  const getRecentActivityDays = () => {
    if (!sevenDayData) return [];
    
    return Object.entries(sevenDayData.last_7_days)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, data]) => ({
        date,
        count: data.count,
        primaryMood: Object.keys(data.moods)[0] || "neutral"
      }));
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
                <p className="text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-500">
                  Member since {stats?.first_entry ? new Date(stats.first_entry).toLocaleDateString() : "recently"}
                </p>
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {stats?.total_entries || 0}
              </div>
              <div className="text-sm text-gray-600">Total Entries</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {streak?.current_streak || 0}
              </div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {stats?.total_words || 0}
              </div>
              <div className="text-sm text-gray-600">Words Written</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl">
                {stats?.most_common_mood ? getMoodEmoji(stats.most_common_mood) : "😊"}
              </div>
              <div className="text-sm text-gray-600">Most Common Mood</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Recent Activity (Last 7 Days)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {getRecentActivityDays().map(({ date, count, primaryMood }) => (
                <div key={date} className="text-center">
                  <div className="text-xs text-gray-500 mb-1">
                    {new Date(date).toLocaleDateString(undefined, { weekday: 'short' })}
                  </div>
                  <div 
                    className={`w-full h-12 rounded flex items-center justify-center text-sm font-medium ${
                      count > 0 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {count > 0 ? (
                      <div className="text-center">
                        <div>{getMoodEmoji(primaryMood)}</div>
                        <div className="text-xs">{count}</div>
                      </div>
                    ) : (
                      <div className="text-xs">−</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-600 text-center">
              Hover over days to see your activity and primary mood
            </div>
          </CardContent>
        </Card>

        {/* Mood Distribution */}
        {moodSummary && Object.keys(moodSummary.summary).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <span>Mood Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(moodSummary.summary)
                  .sort(([,a], [,b]) => b - a)
                  .map(([mood, count]) => {
                    const total = Object.values(moodSummary.summary).reduce((a, b) => a + b, 0);
                    const percentage = Math.round((count / total) * 100);
                    return (
                      <div key={mood} className="flex items-center space-x-3">
                        <div className="text-2xl">{getMoodEmoji(mood)}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="capitalize text-sm font-medium">{mood}</span>
                            <span className="text-sm text-gray-600">{count} times ({percentage}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-600" />
              <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-lg border ${
                (stats?.total_entries || 0) >= 1 
                  ? 'bg-yellow-50 border-yellow-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`text-2xl ${
                    (stats?.total_entries || 0) >= 1 ? '' : 'grayscale'
                  }`}>
                    🏆
                  </div>
                  <div>
                    <div className="font-medium">First Entry</div>
                    <div className="text-sm text-gray-600">Write your first journal entry</div>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg border ${
                (streak?.current_streak || 0) >= 3 
                  ? 'bg-yellow-50 border-yellow-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`text-2xl ${
                    (streak?.current_streak || 0) >= 3 ? '' : 'grayscale'
                  }`}>
                    🔥
                  </div>
                  <div>
                    <div className="font-medium">3-Day Streak</div>
                    <div className="text-sm text-gray-600">Write for 3 consecutive days</div>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg border ${
                (stats?.total_entries || 0) >= 10 
                  ? 'bg-yellow-50 border-yellow-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`text-2xl ${
                    (stats?.total_entries || 0) >= 10 ? '' : 'grayscale'
                  }`}>
                    📚
                  </div>
                  <div>
                    <div className="font-medium">Prolific Writer</div>
                    <div className="text-sm text-gray-600">Write 10 journal entries</div>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg border ${
                (stats?.total_words || 0) >= 1000 
                  ? 'bg-yellow-50 border-yellow-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`text-2xl ${
                    (stats?.total_words || 0) >= 1000 ? '' : 'grayscale'
                  }`}>
                    ✍️
                  </div>
                  <div>
                    <div className="font-medium">Wordsmith</div>
                    <div className="text-sm text-gray-600">Write 1,000 words total</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}