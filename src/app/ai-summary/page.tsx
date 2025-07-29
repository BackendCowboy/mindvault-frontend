// src/app/ai-summary/page.tsx
"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/ui/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AISummaryPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // For now, we'll show a placeholder
    // Later you can implement actual AI summary fetching from your backend
    setLoading(false);
  }, []);

  // Future function to generate AI insights
  async function generateInsights() {
    try {
      setLoading(true);
      setError(null);
      // This would call your backend AI endpoint when ready
      // const insights = await apiFetch('/ai/generate-summary');
      
      // For now, just simulate loading
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="px-6 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI Insights ✨</h1>
          <p className="text-muted-foreground">
            Weekly reflections and emotional summaries powered by AI
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>📊 This Week&apos;s Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                AI-powered insights coming soon! This feature will analyze your journal entries 
                and mood patterns to provide personalized reflections.
              </p>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-sm text-muted-foreground">Generating insights...</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🔮</div>
                  <p className="text-lg font-medium mb-2">AI Insights Coming Soon</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Keep journaling to unlock personalized insights
                  </p>
                  <Button onClick={generateInsights} variant="outline">
                    Preview AI Analysis
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🎯 Upcoming Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm">Journal entry creation and storage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-sm">Mood tracking integration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">○</span>
                  <span className="text-sm">Weekly emotional pattern analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">○</span>
                  <span className="text-sm">Personalized growth recommendations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">○</span>
                  <span className="text-sm">Journal entry sentiment tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">○</span>
                  <span className="text-sm">Goal setting and progress insights</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>💡 How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-medium">Write Journal Entries</h4>
                    <p className="text-sm text-muted-foreground">Continue documenting your thoughts and experiences</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-medium">Track Your Moods</h4>
                    <p className="text-sm text-muted-foreground">Record daily emotional states for pattern recognition</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-medium">Get AI Insights</h4>
                    <p className="text-sm text-muted-foreground">Receive personalized analysis and growth recommendations</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}