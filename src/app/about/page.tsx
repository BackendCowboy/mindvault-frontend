// src/app/about/page.tsx
"use client";

import Layout from "@/components/ui/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Code, BookOpen, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">About MindVault</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A personal journey of healing through code and self-reflection
          </p>
        </div>

        {/* Main Story Section */}
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Your Photo */}
              <div className="md:col-span-1">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg relative">
                  <Image 
                    src="/IMG_7446.jpeg" 
                    alt="Aliou Cisse in a vineyard at sunset"
                    fill
                    className="object-cover"
                    sizes="192px"
                  />
                </div>
                <div className="text-center mt-4">
                  <h2 className="text-2xl font-bold text-gray-900">Aliou Cisse</h2>
                  <p className="text-gray-600">Creator & Developer</p>
                </div>
              </div>

              {/* Story Content */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Heart className="h-6 w-6 text-red-500 mr-2" />
                    My Healing Journey
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Like many of us, I&apos;ve been on my own healing journey, working through childhood trauma 
                    and discovering myself through therapy. It&apos;s been challenging, transformative, and deeply personal.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    During this process, I found that writing down my feelings and emotions became an incredible 
                    tool for growth. Putting thoughts on paper helped me understand patterns, process difficult 
                    emotions, and track my progress over time.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Code className="h-6 w-6 text-blue-500 mr-2" />
                    Building My Solution
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    As I dove into learning to code, I realized I had the power to build the tool I needed. 
                    MindVault started as my personal project—a way to digitize and enhance the journaling 
                    practice that was helping me heal.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    What began as a simple way to track my own emotions evolved into something I knew could 
                    help others on similar journeys. Every feature in MindVault comes from my own experience 
                    of what actually helps in the healing process.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <BookOpen className="h-8 w-8 text-green-500 mr-3" />
                <h3 className="text-xl font-semibold">Why MindVault?</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                I believe healing happens when we create space to understand ourselves. MindVault provides 
                that space: a private, thoughtful place to explore your emotions, track your growth, and 
                discover patterns in your mental health journey.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Sparkles className="h-8 w-8 text-purple-500 mr-3" />
                <h3 className="text-xl font-semibold">Built with Care</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Every feature, every design choice, and every line of code comes from genuine experience 
                with what helps in healing. This isn&apos;t just an app, it&apos;s a tool I use myself, constantly 
                improving based on real needs.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Whether you&apos;re beginning therapy, working through challenges, or simply want to understand 
              yourself better, MindVault is here to support your growth.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/journal/new">
                <Button className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Write Your First Entry</span>
                </Button>
              </Link>
              <Link href="/mood">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Heart className="h-4 w-4" />
                  <span>Track Your Mood</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Contact/Connect */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Questions, feedback, or just want to connect about the journey?
          </p>
          <p className="text-sm text-gray-500">
            Built with ❤️ by Aliou Cisse • Healing through code and self-reflection
          </p>
        </div>
      </div>
    </Layout>
  );
}