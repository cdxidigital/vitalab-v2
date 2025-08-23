import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Heart, Activity, Brain, Users, Star, TrendingUp, Award, Target, User, LogOut } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ThemeSwitcher from "@/components/theme-switcher"

async function getLifeScoreHistory(userId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from("lifescore_history")
    .select("lifescore, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })
    .limit(7)

  return (
    data?.map((entry, index) => ({
      day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index] || `Day ${index + 1}`,
      score: Math.round(entry.lifescore / 10), // Convert to 0-100 scale for chart
    })) || []
  )
}

async function getRecentActivities(userId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from("activity_logs")
    .select(`
      id,
      custom_activity_name,
      lifescore_impact,
      logged_at,
      activities_master (
        name,
        category
      )
    `)
    .eq("user_id", userId)
    .order("logged_at", { ascending: false })
    .limit(5)

  return data || []
}

async function getWellnessStats(userId: string) {
  const supabase = await createClient()

  // Get activity counts by category
  const { data: activityStats } = await supabase
    .from("activity_logs")
    .select(`
      activities_master (
        category
      )
    `)
    .eq("user_id", userId)
    .gte("logged_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

  const categoryStats =
    activityStats?.reduce((acc: any, activity: any) => {
      const category = activity.activities_master?.category
      if (category) {
        acc[category] = (acc[category] || 0) + 1
      }
      return acc
    }, {}) || {}

  // Convert to radar chart format
  const wellnessRadarData = [
    { category: "Physical", score: Math.min(100, (categoryStats.physical || 0) * 20) },
    { category: "Mental", score: Math.min(100, (categoryStats.mental || 0) * 20) },
    { category: "Emotional", score: Math.min(100, (categoryStats.emotional || 0) * 20) },
    { category: "Social", score: Math.min(100, (categoryStats.social || 0) * 20) },
    { category: "Spiritual", score: Math.min(100, (categoryStats.spiritual || 0) * 20) },
  ]

  return wellnessRadarData
}

export default async function Dashboard() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile?.onboarding_completed) {
    redirect("/onboarding")
  }

  const currentLifeScore = profile?.lifescore || 500
  const lifeScoreData = await getLifeScoreHistory(user.id)
  const recentActivities = await getRecentActivities(user.id)
  const wellnessRadarData = await getWellnessStats(user.id)

  const scoreChange =
    lifeScoreData.length >= 2
      ? (lifeScoreData[lifeScoreData.length - 1]?.score || 0) - (lifeScoreData[lifeScoreData.length - 2]?.score || 0)
      : 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/vitalab-logo.png" alt="VitaLab" width={40} height={40} className="h-10 w-auto" />
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <ThemeSwitcher currentTheme={profile?.theme_preference || "default"} onThemeChange={() => {}} />
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Star className="w-3 h-3 mr-1" />
                Premium
              </Badge>
              <Link href="/profile">
                <Avatar className="cursor-pointer">
                  <AvatarFallback>
                    {profile?.first_name?.[0]}
                    {profile?.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <form action="/auth/signout" method="post">
                <Button variant="ghost" size="sm">
                  <LogOut className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* LifeScore Hero Section */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl font-bold text-primary">Your LifeScore™</CardTitle>
              <CardDescription>AI-powered wellness metric updated in real-time</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <div className="text-6xl font-bold text-primary mb-2">{currentLifeScore}</div>
                {scoreChange !== 0 && (
                  <div className="absolute -top-2 -right-8">
                    <Badge
                      variant="secondary"
                      className={`${
                        scoreChange > 0
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-red-100 text-red-700 border-red-200"
                      }`}
                    >
                      <TrendingUp className={`w-3 h-3 mr-1 ${scoreChange < 0 ? "rotate-180" : ""}`} />
                      {scoreChange > 0 ? "+" : ""}
                      {Math.round(scoreChange * 10)}
                    </Badge>
                  </div>
                )}
              </div>
              <p className="text-muted-foreground mb-4">
                {currentLifeScore >= 800
                  ? "Excellent wellness trajectory"
                  : currentLifeScore >= 600
                    ? "Good wellness progress"
                    : currentLifeScore >= 400
                      ? "Building wellness foundation"
                      : "Starting your wellness journey"}
              </p>
              <Progress value={currentLifeScore / 10} className="w-full max-w-md mx-auto mb-4" />
              <div className="flex justify-center gap-2 flex-wrap">
                {wellnessRadarData.map((dimension) => (
                  <Badge key={dimension.category} variant="outline">
                    {dimension.category}: {dimension.score}%
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* LifeScore Trend Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                LifeScore Trend
              </CardTitle>
              <CardDescription>Your wellness journey over recent activities</CardDescription>
            </CardHeader>
            <CardContent>
              {lifeScoreData.length > 0 ? (
                <ChartContainer
                  config={{
                    score: {
                      label: "LifeScore",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lifeScoreData}>
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="hsl(var(--primary))"
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Start logging activities to see your LifeScore trend
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/log-activity">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Heart className="w-4 h-4 mr-2" />
                  Log Activity
                </Button>
              </Link>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Brain className="w-4 h-4 mr-2" />
                Mood Check-in
              </Button>
              <Link href="/analytics">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </Link>
              <Link href="/community">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Award className="w-4 h-4 mr-2" />
                  Join Community
                </Button>
              </Link>
              <Link href="/profile">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <User className="w-4 h-4 mr-2" />
                  Manage Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Wellness Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Wellness Radar</CardTitle>
              <CardDescription>Holistic view of your health dimensions</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  score: {
                    label: "Score",
                    color: "hsl(var(--primary))",
                  },
                }}
                className="h-[250px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={wellnessRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar
                      name="Wellness Score"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your latest wellness activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity: any) => (
                  <div key={activity.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {activity.custom_activity_name || activity.activities_master?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.activities_master?.category} • {new Date(activity.logged_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={activity.lifescore_impact > 0 ? "default" : "destructive"}>
                      {activity.lifescore_impact > 0 ? "+" : ""}
                      {activity.lifescore_impact}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No activities logged yet</p>
                  <p className="text-sm">Start your wellness journey by logging your first activity!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
