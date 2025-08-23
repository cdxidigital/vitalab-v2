"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ComposedChart,
} from "recharts"
import { TrendingUp, Activity, Brain, Heart, Calendar, BarChart3, PieChartIcon } from "lucide-react"

// Sample data for various charts
const weeklyTrendData = [
  { day: "Mon", physical: 75, mental: 68, social: 45, sleep: 7.2, mood: 6 },
  { day: "Tue", physical: 82, mental: 72, social: 52, sleep: 7.8, mood: 7 },
  { day: "Wed", physical: 78, mental: 65, social: 48, sleep: 6.9, mood: 5 },
  { day: "Thu", physical: 85, mental: 78, social: 65, sleep: 8.1, mood: 8 },
  { day: "Fri", physical: 88, mental: 82, social: 72, sleep: 7.5, mood: 8 },
  { day: "Sat", physical: 92, mental: 85, social: 85, sleep: 8.5, mood: 9 },
  { day: "Sun", physical: 89, mental: 80, social: 78, sleep: 8.2, mood: 8 },
]

const monthlyProgressData = [
  { month: "Jan", lifescore: 72, activities: 45, goals: 8 },
  { month: "Feb", lifescore: 75, activities: 52, goals: 12 },
  { month: "Mar", lifescore: 78, activities: 58, goals: 15 },
  { month: "Apr", lifescore: 82, activities: 65, goals: 18 },
  { month: "May", lifescore: 85, activities: 72, goals: 22 },
  { month: "Jun", lifescore: 88, activities: 78, goals: 25 },
]

const activityDistributionData = [
  { name: "Exercise", value: 35, color: "#4caf50" },
  { name: "Meditation", value: 20, color: "#81c784" },
  { name: "Social", value: 18, color: "#a5d6a7" },
  { name: "Sleep", value: 15, color: "#c8e6c9" },
  { name: "Nutrition", value: 12, color: "#e8f5e9" },
]

const correlationData = [
  { sleep: 6.5, mood: 5, energy: 60, stress: 7 },
  { sleep: 7.0, mood: 6, energy: 70, stress: 6 },
  { sleep: 7.5, mood: 7, energy: 80, stress: 5 },
  { sleep: 8.0, mood: 8, energy: 85, stress: 4 },
  { sleep: 8.5, mood: 9, energy: 90, stress: 3 },
  { sleep: 7.2, mood: 6, energy: 75, stress: 5 },
  { sleep: 6.8, mood: 5, energy: 65, stress: 6 },
  { sleep: 8.2, mood: 8, energy: 88, stress: 3 },
]

const wellnessRadarData = [
  { category: "Physical Fitness", score: 85, fullMark: 100 },
  { category: "Mental Health", score: 78, fullMark: 100 },
  { category: "Emotional Balance", score: 82, fullMark: 100 },
  { category: "Social Connection", score: 75, fullMark: 100 },
  { category: "Spiritual Growth", score: 70, fullMark: 100 },
  { category: "Work-Life Balance", score: 68, fullMark: 100 },
]

const habitStreakData = [
  { habit: "Meditation", streak: 28, target: 30 },
  { habit: "Exercise", streak: 22, target: 25 },
  { habit: "Reading", streak: 15, target: 20 },
  { habit: "Hydration", streak: 35, target: 30 },
  { habit: "Sleep 8h", streak: 18, target: 21 },
]

export function AnalyticsCharts() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="correlations">Correlations</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="radar">Wellness Radar</TabsTrigger>
          <TabsTrigger value="habits">Habit Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Weekly Wellness Trends
                </CardTitle>
                <CardDescription>Track your wellness dimensions over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    physical: { label: "Physical", color: "hsl(var(--chart-1))" },
                    mental: { label: "Mental", color: "hsl(var(--chart-2))" },
                    social: { label: "Social", color: "hsl(var(--chart-3))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Line type="monotone" dataKey="physical" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                      <Line type="monotone" dataKey="mental" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                      <Line type="monotone" dataKey="social" stroke="hsl(var(--chart-3))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Monthly Progress
                </CardTitle>
                <CardDescription>Your LifeScore and activity progress over months</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    lifescore: { label: "LifeScore", color: "hsl(var(--primary))" },
                    activities: { label: "Activities", color: "hsl(var(--chart-2))" },
                    goals: { label: "Goals Met", color: "hsl(var(--chart-3))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={monthlyProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="lifescore"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                        stroke="hsl(var(--primary))"
                      />
                      <Bar yAxisId="right" dataKey="activities" fill="hsl(var(--chart-2))" />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="goals"
                        stroke="hsl(var(--chart-3))"
                        strokeWidth={3}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="correlations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Sleep vs Mood vs Energy Correlation
              </CardTitle>
              <CardDescription>Discover relationships between your wellness metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  mood: { label: "Mood (1-10)", color: "hsl(var(--chart-1))" },
                  energy: { label: "Energy Level", color: "hsl(var(--chart-2))" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={correlationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sleep" name="Sleep Hours" unit="h" />
                    <YAxis dataKey="mood" name="Mood" unit="" />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      formatter={(value, name) => [value, name]}
                      labelFormatter={(value) => `Sleep: ${value}h`}
                    />
                    <Scatter name="Mood vs Sleep" dataKey="mood" fill="hsl(var(--chart-1))" />
                  </ScatterChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 text-primary" />
                  Activity Distribution
                </CardTitle>
                <CardDescription>How you spend your wellness time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    exercise: { label: "Exercise", color: "#4caf50" },
                    meditation: { label: "Meditation", color: "#81c784" },
                    social: { label: "Social", color: "#a5d6a7" },
                    sleep: { label: "Sleep", color: "#c8e6c9" },
                    nutrition: { label: "Nutrition", color: "#e8f5e9" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={activityDistributionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {activityDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Habit Streak Progress
                </CardTitle>
                <CardDescription>Track your consistency across different habits</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    streak: { label: "Current Streak", color: "hsl(var(--primary))" },
                    target: { label: "Target", color: "hsl(var(--muted))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={habitStreakData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="habit" type="category" width={80} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="target" fill="hsl(var(--muted))" />
                      <Bar dataKey="streak" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="radar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Comprehensive Wellness Radar
              </CardTitle>
              <CardDescription>360-degree view of your holistic wellness</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  score: { label: "Current Score", color: "hsl(var(--primary))" },
                  fullMark: { label: "Maximum", color: "hsl(var(--muted))" },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={wellnessRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Wellness Score"
                      dataKey="score"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Target"
                      dataKey="fullMark"
                      stroke="hsl(var(--muted))"
                      fill="transparent"
                      strokeDasharray="5 5"
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="habits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Sleep & Mood Patterns
              </CardTitle>
              <CardDescription>Understand how your sleep affects your daily mood</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  sleep: { label: "Sleep Hours", color: "hsl(var(--chart-4))" },
                  mood: { label: "Mood Rating", color: "hsl(var(--chart-1))" },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="sleep"
                      stackId="1"
                      stroke="hsl(var(--chart-4))"
                      fill="hsl(var(--chart-4))"
                      fillOpacity={0.6}
                    />
                    <Line yAxisId="right" type="monotone" dataKey="mood" stroke="hsl(var(--chart-1))" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
