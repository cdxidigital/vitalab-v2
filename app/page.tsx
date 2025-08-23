import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Activity, Brain, Users, TrendingUp } from "lucide-react"

export default async function LandingPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Image src="/vitalab-logo.png" alt="VitaLab" width={300} height={120} className="mx-auto mb-8" />
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Transform Your Life, One Healthy Choice at a Time</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            VitaLab is your AI-powered wellness companion that tracks your holistic health across physical, emotional,
            mental, social, and spiritual dimensions with our revolutionary LifeScore™ system.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                Start Your Journey
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center shadow-lg border-0">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">LifeScore™ System</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                AI-powered wellness metric (0-1000) that tracks your holistic health like a credit score
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg border-0">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">15,000+ Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Comprehensive database of activities, moods, and feelings with calculated wellness impact
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg border-0">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Holistic Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Monitor physical, emotional, mental, social, and spiritual wellness dimensions
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg border-0">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Community & Gamification</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Connect with others, join challenges, and celebrate wellness achievements together
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* LifeScore Demo */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="shadow-xl border-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold mb-2">Your LifeScore™ Journey</CardTitle>
              <CardDescription className="text-green-100">
                See how your daily choices impact your overall wellness score
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex justify-center items-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">750</div>
                  <div className="text-green-100">Your LifeScore</div>
                </div>
                <div className="text-6xl">→</div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">850</div>
                  <div className="text-green-100">Potential Score</div>
                </div>
              </div>
              <p className="text-green-100 mb-6">
                Join thousands of users who have improved their wellness with personalized insights and AI-powered
                recommendations
              </p>
              <Link href="/auth/signup">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
                  Calculate My LifeScore
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Transform Your Wellness?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join VitaLab today and start your personalized wellness journey with our comprehensive onboarding assessment
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 text-xl">
              Get Started Free
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
