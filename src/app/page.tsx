import Layout from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const quotes = [
  "Growth is built one entry at a time.",
  "Your thoughts matter. Your healing matters.",
  "Consistency beats intensity.",
];
const dailyQuote = quotes[new Date().getDate() % quotes.length];

export default function Home() {
  return (
    <Layout>
      <div className="px-6 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome to MindVault 🧠</h1>
          <p className="text-muted-foreground italic">&quot;{dailyQuote}&quot;</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/journal/new">
            <Button>+ New Journal</Button>
          </Link>
          <Link href="/mood">
            <Button variant="outline">Record Mood</Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>📔 Journal Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">Reflect and grow through writing.</p>
              <Link href="/journal" className="text-blue-600 hover:underline">See All Journals</Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>📊 Mood Tracker</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">Track your emotional patterns.</p>
              <Link href="/mood" className="text-blue-600 hover:underline">View Mood Graph</Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>✨ AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">Weekly reflections & emotional summaries.</p>
              <Link href="/ai-summary" className="text-blue-600 hover:underline">Explore Insights</Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}