// src/app/mood/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, TrendingUp, Heart, Zap } from "lucide-react";

interface MoodEntry {
  id: number;
  mood: string;
  intensity: number;
  tags: string[];
  note?: string;
  created_at: string;
}

const MOOD_OPTIONS = [
  { emoji: "😊", label: "Happy", value: "happy", color: "bg-yellow-100 border-yellow-300" },
  { emoji: "😢", label: "Sad", value: "sad", color: "bg-blue-100 border-blue-300" },
  { emoji: "😡", label: "Angry", value: "angry", color: "bg-red-100 border-red-300" },
  { emoji: "😰", label: "Anxious", value: "anxious", color: "bg-orange-100 border-orange-300" },
  { emoji: "😴", label: "Tired", value: "tired", color: "bg-purple-100 border-purple-300" },
  { emoji: "🤗", label: "Excited", value: "excited", color: "bg-green-100 border-green-300" },
  { emoji: "😐", label: "Neutral", value: "neutral", color: "bg-gray-100 border-gray-300" },
  { emoji: "🤔", label: "Confused", value: "confused", color: "bg-indigo-100 border-indigo-300" },
];

const MOOD_TAGS = [
  "Stressed", "Relaxed", "Motivated", "Overwhelmed", "Grateful", "Lonely",
  "Energetic", "Focused", "Distracted", "Peaceful", "Worried", "Confident",
  "Creative", "Bored", "Accomplished", "Frustrated"
];

export default function MoodPage() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [intensity, setIntensity] = useState([5]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [recentMoods, setRecentMoods] = useState<MoodEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    loadRecentMoods();
  }, [router]);

  const loadRecentMoods = async () => {
    // TODO: Replace with actual API call
    // For now, using mock data
    const mockMoods: MoodEntry[] = [
      {
        id: 1,
        mood: "happy",
        intensity: 8,
        tags: ["Energetic", "Motivated"],
        note: "Great start to the week!",
        created_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      },
      {
        id: 2,
        mood: "tired",
        intensity: 6,
        tags: ["Stressed", "Overwhelmed"],
        created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      },
    ];
    setRecentMoods(mockMoods);
  };

  const handleMoodSelect = (moodValue: string) => {
    setSelectedMood(moodValue);
    if (!showForm) setShowForm(true);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (!selectedMood) return;

    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const newMood: MoodEntry = {
        id: Date.now(),
        mood: selectedMood,
        intensity: intensity[0],
        tags: selectedTags,
        note: note || undefined,
        created_at: new Date().toISOString(),
      };

      setRecentMoods(prev => [newMood, ...prev]);
      
      // Reset form
      setSelectedMood("");
      setIntensity([5]);
      setSelectedTags([]);
      setNote("");
      setShowForm(false);

      // Show success message
      alert("Mood logged successfully! 🎉");
    } catch (err) {
      console.error("Failed to save mood:", err);
      alert("Failed to save mood. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getMoodEmoji = (moodValue: string) => {
    return MOOD_OPTIONS.find(m => m.value === moodValue)?.emoji || "😊";
  };

  const getMoodLabel = (moodValue: string) => {
    return MOOD_OPTIONS.find(m => m.value === moodValue)?.label || moodValue;
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">How are you feeling? 💭</h1>
          <p className="text-gray-600">
            Track your mood and discover patterns in your emotional well-being
          </p>
        </div>

        {/* Quick Mood Selection */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Heart className="h-5 w-5 mr-2 text-red-500" />
            Select Your Mood
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {MOOD_OPTIONS.map((mood) => (
              <button
                key={mood.value}
                onClick={() => handleMoodSelect(mood.value)}
                className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                  selectedMood === mood.value 
                    ? `${mood.color} border-current shadow-lg` 
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="text-3xl mb-2">{mood.emoji}</div>
                <div className="font-medium text-sm">{mood.label}</div>
              </button>
            ))}
          </div>
        </Card>

        {/* Detailed Mood Form */}
        {showForm && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-500" />
              Tell us more about your {getMoodLabel(selectedMood)} mood
            </h3>

            {/* Intensity Slider */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">
                Intensity: {intensity[0]}/10
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity[0]}
                  onChange={(e) => setIntensity([parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <style jsx>{`
                  .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #3b82f6;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                  }
                  .slider::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #3b82f6;
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                  }
                `}</style>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Mild</span>
                <span>Intense</span>
              </div>
            </div>

            {/* Mood Tags */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">
                What else describes how you&apos;re feeling? (Optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {MOOD_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Note */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Add a note (Optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <Button 
                onClick={handleSubmit} 
                disabled={loading}
                className="flex-1"
              >
                {loading ? "Saving..." : "Log My Mood 🎉"}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowForm(false)}
                className="px-6"
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Recent Moods */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-500" />
            Recent Moods
          </h2>
          
          {recentMoods.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">🌱</div>
              <p>No mood entries yet. Log your first mood above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentMoods.map((mood) => (
                <div
                  key={mood.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{getMoodEmoji(mood.mood)}</div>
                    <div>
                      <div className="font-medium">
                        {getMoodLabel(mood.mood)} (Intensity: {mood.intensity}/10)
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(mood.created_at).toLocaleDateString()}
                      </div>
                      {mood.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {mood.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full border border-blue-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {mood.note && (
                        <div className="text-sm text-gray-700 mt-1 italic">
                          &quot;{mood.note}&quot;
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Mood Insights Placeholder */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
            Mood Insights
          </h2>
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📊</div>
            <p className="mb-2">Coming soon: Mood trends and insights!</p>
            <p className="text-sm">Track more moods to unlock personalized analytics</p>
          </div>
        </Card>
      </div>
    </Layout>
  );
}