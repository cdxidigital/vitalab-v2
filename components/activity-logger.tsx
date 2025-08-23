"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { createClient } from "@/lib/supabase/client"
import {
  Activity,
  Brain,
  Users,
  Utensils,
  Moon,
  Droplets,
  Plus,
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  Search,
  Heart,
  Sparkles,
} from "lucide-react"

interface ActivityEntry {
  id: string
  text: string
  category: "physical" | "mental" | "social" | "nutrition" | "sleep" | "hydration" | "emotional" | "spiritual"
  impact: number
  timestamp: Date
  aiAnalysis: string
  activity_id?: string
}

interface DatabaseActivity {
  id: string
  name: string
  category: string
  subcategory: string
  description: string
  lifescore_impact: number
  tags: string[]
}

const quickActions = [
  { icon: Activity, label: "30min walk", category: "physical", impact: 8 },
  { icon: Utensils, label: "Healthy meal", category: "nutrition", impact: 6 },
  { icon: Brain, label: "10min meditation", category: "mental", impact: 7 },
  { icon: Droplets, label: "Glass of water", category: "hydration", impact: 3 },
  { icon: Moon, label: "8 hours sleep", category: "sleep", impact: 9 },
  { icon: Users, label: "Social time", category: "social", impact: 5 },
  { icon: Heart, label: "Gratitude practice", category: "emotional", impact: 6 },
  { icon: Sparkles, label: "Mindful breathing", category: "spiritual", impact: 5 },
]

export function ActivityLogger() {
  const [activities, setActivities] = useState<ActivityEntry[]>([])
  const [databaseActivities, setDatabaseActivities] = useState<DatabaseActivity[]>([])
  const [filteredActivities, setFilteredActivities] = useState<DatabaseActivity[]>([])
  const [inputText, setInputText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLogging, setIsLogging] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<DatabaseActivity | null>(null)
  const supabase = createClient()

  useEffect(() => {
    loadDatabaseActivities()
    loadUserActivities()
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = databaseActivities.filter(
        (activity) =>
          activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
      setFilteredActivities(filtered.slice(0, 20))
    } else {
      setFilteredActivities([])
    }
  }, [searchQuery, databaseActivities])

  const loadDatabaseActivities = async () => {
    try {
      const { data, error } = await supabase.from("activities_master").select("*").order("name")

      if (error) throw error
      setDatabaseActivities(data || [])
    } catch (error) {
      console.error("Error loading activities:", error)
    }
  }

  const loadUserActivities = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from("user_activities")
        .select(`
          *,
          activities_master (
            name,
            category,
            lifescore_impact
          )
        `)
        .eq("user_id", user.id)
        .order("logged_at", { ascending: false })
        .limit(10)

      if (error) throw error

      const transformedActivities = (data || []).map((item: any) => ({
        id: item.id,
        text: item.notes || item.activities_master?.name || "Activity logged",
        category: item.activities_master?.category?.toLowerCase() || "physical",
        impact: item.lifescore_impact || item.activities_master?.lifescore_impact || 0,
        timestamp: new Date(item.logged_at),
        aiAnalysis: `LifeScore impact: ${item.lifescore_impact > 0 ? "+" : ""}${item.lifescore_impact}`,
        activity_id: item.activity_id,
      }))

      setActivities(transformedActivities)
    } catch (error) {
      console.error("Error loading user activities:", error)
    }
  }

  const simulateAIAnalysis = (
    text: string,
  ): { category: ActivityEntry["category"]; impact: number; analysis: string; matchedActivity?: DatabaseActivity } => {
    const lowerText = text.toLowerCase()

    const matchedActivity = databaseActivities.find(
      (activity) =>
        activity.name.toLowerCase().includes(lowerText) ||
        activity.tags.some((tag) => lowerText.includes(tag.toLowerCase())),
    )

    if (matchedActivity) {
      return {
        category: matchedActivity.category.toLowerCase() as ActivityEntry["category"],
        impact: matchedActivity.lifescore_impact,
        analysis: `Matched activity: ${matchedActivity.name}. ${matchedActivity.description}`,
        matchedActivity,
      }
    }

    if (
      lowerText.includes("exercise") ||
      lowerText.includes("walk") ||
      lowerText.includes("run") ||
      lowerText.includes("yoga")
    ) {
      return {
        category: "physical",
        impact: Math.floor(Math.random() * 8) + 5,
        analysis: "Great physical activity detected!",
      }
    }
    if (lowerText.includes("meditat") || lowerText.includes("mindful") || lowerText.includes("relax")) {
      return {
        category: "mental",
        impact: Math.floor(Math.random() * 6) + 4,
        analysis: "Excellent mindfulness practice",
      }
    }
    if (lowerText.includes("friend") || lowerText.includes("social") || lowerText.includes("family")) {
      return { category: "social", impact: Math.floor(Math.random() * 7) + 3, analysis: "Positive social connection" }
    }
    if (lowerText.includes("stress") || lowerText.includes("anxious") || lowerText.includes("worried")) {
      return {
        category: "mental",
        impact: -(Math.floor(Math.random() * 5) + 2),
        analysis: "Stress detected - consider coping strategies",
      }
    }

    return { category: "physical", impact: Math.floor(Math.random() * 6) + 1, analysis: "Activity logged successfully" }
  }

  const handleNaturalLanguageLog = async () => {
    if (!inputText.trim()) return

    setIsLogging(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      await new Promise((resolve) => setTimeout(resolve, 1500))

      const aiResult = simulateAIAnalysis(inputText)

      const { data: activityData, error: activityError } = await supabase
        .from("user_activities")
        .insert({
          user_id: user.id,
          activity_id: aiResult.matchedActivity?.id || null,
          notes: inputText,
          lifescore_impact: aiResult.impact,
          logged_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (activityError) throw activityError

      const { error: lifescoreError } = await supabase.rpc("update_user_lifescore", {
        user_id: user.id,
        impact_value: aiResult.impact,
      })

      if (lifescoreError) console.error("Error updating LifeScore:", lifescoreError)

      const newActivity: ActivityEntry = {
        id: activityData.id,
        text: inputText,
        category: aiResult.category,
        impact: aiResult.impact,
        timestamp: new Date(),
        aiAnalysis: aiResult.analysis,
        activity_id: aiResult.matchedActivity?.id,
      }

      setActivities([newActivity, ...activities])
      setInputText("")
    } catch (error) {
      console.error("Error logging activity:", error)
    } finally {
      setIsLogging(false)
    }
  }

  const handleQuickLog = async (action: (typeof quickActions)[0]) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const matchedActivity = databaseActivities.find((activity) =>
        activity.name.toLowerCase().includes(action.label.toLowerCase()),
      )

      const { data: activityData, error: activityError } = await supabase
        .from("user_activities")
        .insert({
          user_id: user.id,
          activity_id: matchedActivity?.id || null,
          notes: action.label,
          lifescore_impact: matchedActivity?.lifescore_impact || action.impact,
          logged_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (activityError) throw activityError

      const { error: lifescoreError } = await supabase.rpc("update_user_lifescore", {
        user_id: user.id,
        impact_value: matchedActivity?.lifescore_impact || action.impact,
      })

      if (lifescoreError) console.error("Error updating LifeScore:", lifescoreError)

      const newActivity: ActivityEntry = {
        id: activityData.id,
        text: action.label,
        category: action.category as ActivityEntry["category"],
        impact: matchedActivity?.lifescore_impact || action.impact,
        timestamp: new Date(),
        aiAnalysis: `Quick logged: ${action.label}`,
        activity_id: matchedActivity?.id,
      }

      setActivities([newActivity, ...activities])
    } catch (error) {
      console.error("Error quick logging activity:", error)
    }
  }

  const handleDatabaseActivityLog = async (activity: DatabaseActivity) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data: activityData, error: activityError } = await supabase
        .from("user_activities")
        .insert({
          user_id: user.id,
          activity_id: activity.id,
          notes: activity.name,
          lifescore_impact: activity.lifescore_impact,
          logged_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (activityError) throw activityError

      const { error: lifescoreError } = await supabase.rpc("update_user_lifescore", {
        user_id: user.id,
        impact_value: activity.lifescore_impact,
      })

      if (lifescoreError) console.error("Error updating LifeScore:", lifescoreError)

      const newActivity: ActivityEntry = {
        id: activityData.id,
        text: activity.name,
        category: activity.category.toLowerCase() as ActivityEntry["category"],
        impact: activity.lifescore_impact,
        timestamp: new Date(),
        aiAnalysis: activity.description,
        activity_id: activity.id,
      }

      setActivities([newActivity, ...activities])
      setSearchQuery("")
      setSelectedActivity(null)
    } catch (error) {
      console.error("Error logging database activity:", error)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "physical":
        return Activity
      case "mental":
        return Brain
      case "social":
        return Users
      case "nutrition":
        return Utensils
      case "sleep":
        return Moon
      case "hydration":
        return Droplets
      case "emotional":
        return Heart
      case "spiritual":
        return Sparkles
      default:
        return Activity
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "physical":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "mental":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "social":
        return "bg-green-100 text-green-700 border-green-200"
      case "nutrition":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "sleep":
        return "bg-indigo-100 text-indigo-700 border-indigo-200"
      case "hydration":
        return "bg-cyan-100 text-cyan-700 border-cyan-200"
      case "emotional":
        return "bg-pink-100 text-pink-700 border-pink-200"
      case "spiritual":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours === 1) return "1 hour ago"
    return `${diffInHours} hours ago`
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            AI-Powered Activity Logger
          </CardTitle>
          <CardDescription>
            Log your activities naturally or search from our database of {databaseActivities.length.toLocaleString()}{" "}
            wellness activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="natural" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="natural">Natural Language</TabsTrigger>
              <TabsTrigger value="search">Search Activities</TabsTrigger>
              <TabsTrigger value="quick">Quick Actions</TabsTrigger>
            </TabsList>

            <TabsContent value="natural" className="space-y-4">
              <div className="space-y-3">
                <Textarea
                  placeholder="Tell me about your activity... (e.g., 'Just finished a 30-minute run in the park, feeling energized!')"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={handleNaturalLanguageLog} disabled={!inputText.trim() || isLogging} className="w-full">
                  {isLogging ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      AI Analyzing...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Log Activity
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="search" className="space-y-4">
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search activities, moods, or feelings... (e.g., 'yoga', 'stress relief', 'gratitude')"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {filteredActivities.length > 0 && (
                  <ScrollArea className="h-[300px] border rounded-lg">
                    <div className="p-2 space-y-2">
                      {filteredActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="p-3 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
                          onClick={() => handleDatabaseActivityLog(activity)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h4 className="font-medium text-sm">{activity.name}</h4>
                              <p className="text-xs text-muted-foreground">{activity.description}</p>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {activity.category}
                                </Badge>
                                {activity.subcategory && (
                                  <Badge variant="secondary" className="text-xs">
                                    {activity.subcategory}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <Badge
                              variant={activity.lifescore_impact > 0 ? "default" : "destructive"}
                              className={
                                activity.lifescore_impact > 0 ? "bg-green-100 text-green-700 border-green-200" : ""
                              }
                            >
                              {activity.lifescore_impact > 0 ? "+" : ""}
                              {activity.lifescore_impact}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}

                {searchQuery && filteredActivities.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No activities found matching "{searchQuery}"</p>
                    <p className="text-sm">Try searching for activities, moods, or wellness practices</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="quick" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
                      onClick={() => handleQuickLog(action)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm text-center">{action.label}</span>
                      <Badge variant="secondary" className="text-xs">
                        +{action.impact}
                      </Badge>
                    </Button>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Your logged activities and their impact on your LifeScore</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {activities.map((activity) => {
                const Icon = getCategoryIcon(activity.category)
                return (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card/50">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium">{activity.text}</p>
                        <div className="flex items-center gap-2">
                          <Badge className={getCategoryColor(activity.category)}>{activity.category}</Badge>
                          <Badge
                            variant={activity.impact > 0 ? "default" : "destructive"}
                            className={activity.impact > 0 ? "bg-green-100 text-green-700 border-green-200" : ""}
                          >
                            {activity.impact > 0 ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            )}
                            {activity.impact > 0 ? "+" : ""}
                            {activity.impact}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{activity.aiAnalysis}</p>
                      <p className="text-xs text-muted-foreground">{formatTimeAgo(activity.timestamp)}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
