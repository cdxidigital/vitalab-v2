"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  MessageCircle,
  Share2,
  Trophy,
  Users,
  Calendar,
  Target,
  Award,
  TrendingUp,
  Clock,
  Star,
  Plus,
  Send,
} from "lucide-react"

interface Post {
  id: string
  user: {
    name: string
    avatar: string
    badge?: string
  }
  content: string
  type: "achievement" | "challenge" | "tip" | "milestone"
  timestamp: string
  likes: number
  comments: number
  isLiked: boolean
  achievement?: {
    title: string
    icon: string
    points: number
  }
  challenge?: {
    name: string
    participants: number
    daysLeft: number
  }
}

interface Challenge {
  id: string
  title: string
  description: string
  participants: number
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  category: string
  reward: number
  isJoined: boolean
}

interface Event {
  id: string
  title: string
  expert: string
  date: string
  time: string
  attendees: number
  category: string
  isRegistered: boolean
}

const mockPosts: Post[] = [
  {
    id: "1",
    user: { name: "Sarah Chen", avatar: "/diverse-user-avatars.png", badge: "Wellness Warrior" },
    content:
      "Just completed my 30-day yoga challenge! Feeling stronger and more centered than ever. The mind-body connection is real! 🧘‍♀️",
    type: "achievement",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    isLiked: false,
    achievement: { title: "30-Day Yoga Master", icon: "🧘‍♀️", points: 500 },
  },
  {
    id: "2",
    user: { name: "Mike Rodriguez", avatar: "/diverse-user-avatar-set-2.png", badge: "Fitness Enthusiast" },
    content: "Who's joining the 'Walk 10K Steps Daily' challenge? Let's motivate each other to stay active!",
    type: "challenge",
    timestamp: "4 hours ago",
    likes: 18,
    comments: 12,
    isLiked: true,
    challenge: { name: "Walk 10K Steps Daily", participants: 156, daysLeft: 23 },
  },
  {
    id: "3",
    user: { name: "Dr. Emma Wilson", avatar: "/user-profile-illustration.png", badge: "Wellness Expert" },
    content:
      "Pro tip: Start your morning with 5 minutes of deep breathing. It sets a positive tone for the entire day and reduces cortisol levels.",
    type: "tip",
    timestamp: "6 hours ago",
    likes: 45,
    comments: 15,
    isLiked: false,
  },
  {
    id: "4",
    user: { name: "Alex Kim", avatar: "/diverse-user-avatars.png", badge: "Mindfulness Advocate" },
    content: "Milestone alert! Just hit my 100th meditation session. The journey of self-discovery continues...",
    type: "milestone",
    timestamp: "8 hours ago",
    likes: 32,
    comments: 6,
    isLiked: true,
  },
]

const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "21-Day Meditation Journey",
    description: "Build a consistent meditation practice with guided sessions",
    participants: 234,
    duration: "21 days",
    difficulty: "Beginner",
    category: "Mental Wellness",
    reward: 300,
    isJoined: false,
  },
  {
    id: "2",
    title: "Hydration Hero Challenge",
    description: "Drink 8 glasses of water daily for optimal health",
    participants: 189,
    duration: "14 days",
    difficulty: "Beginner",
    category: "Physical Health",
    reward: 200,
    isJoined: true,
  },
  {
    id: "3",
    title: "Digital Detox Weekend",
    description: "Disconnect from devices and reconnect with yourself",
    participants: 67,
    duration: "3 days",
    difficulty: "Advanced",
    category: "Mental Wellness",
    reward: 400,
    isJoined: false,
  },
]

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Stress Management Masterclass",
    expert: "Dr. Sarah Johnson",
    date: "Dec 15, 2024",
    time: "7:00 PM EST",
    attendees: 156,
    category: "Mental Health",
    isRegistered: false,
  },
  {
    id: "2",
    title: "Nutrition for Optimal Energy",
    expert: "Chef Marcus Green",
    date: "Dec 18, 2024",
    time: "6:30 PM EST",
    attendees: 203,
    category: "Nutrition",
    isRegistered: true,
  },
  {
    id: "3",
    title: "Building Healthy Sleep Habits",
    expert: "Dr. Lisa Park",
    date: "Dec 20, 2024",
    time: "8:00 PM EST",
    attendees: 89,
    category: "Sleep Health",
    isRegistered: false,
  },
]

export function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges)
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const [newPost, setNewPost] = useState("")

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const handleJoinChallenge = (challengeId: string) => {
    setChallenges(
      challenges.map((challenge) =>
        challenge.id === challengeId
          ? {
              ...challenge,
              isJoined: !challenge.isJoined,
              participants: challenge.isJoined ? challenge.participants - 1 : challenge.participants + 1,
            }
          : challenge,
      ),
    )
  }

  const handleRegisterEvent = (eventId: string) => {
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              isRegistered: !event.isRegistered,
              attendees: event.isRegistered ? event.attendees - 1 : event.attendees + 1,
            }
          : event,
      ),
    )
  }

  const getPostIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return Trophy
      case "challenge":
        return Target
      case "tip":
        return Star
      case "milestone":
        return Award
      default:
        return MessageCircle
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700 border-green-200"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "Advanced":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="feed">Community Feed</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="events">Expert Events</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6">
          {/* Create Post */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                Share Your Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Share your wellness wins, tips, or ask for support..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Badge variant="outline">Achievement</Badge>
                  <Badge variant="outline">Tip</Badge>
                  <Badge variant="outline">Question</Badge>
                </div>
                <Button disabled={!newPost.trim()}>
                  <Send className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {posts.map((post) => {
                const PostIcon = getPostIcon(post.type)
                return (
                  <Card key={post.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {post.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{post.user.name}</span>
                            {post.user.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {post.user.badge}
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                          </div>

                          <p className="text-sm">{post.content}</p>

                          {post.achievement && (
                            <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-3">
                              <div className="flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-primary" />
                                <span className="font-medium text-primary">{post.achievement.title}</span>
                                <Badge className="bg-primary/10 text-primary border-primary/20">
                                  +{post.achievement.points} pts
                                </Badge>
                              </div>
                            </div>
                          )}

                          {post.challenge && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Target className="w-5 h-5 text-blue-600" />
                                  <span className="font-medium text-blue-900">{post.challenge.name}</span>
                                </div>
                                <div className="text-xs text-blue-600">
                                  {post.challenge.participants} participants • {post.challenge.daysLeft} days left
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-4 pt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLike(post.id)}
                              className={post.isLiked ? "text-red-500" : ""}
                            >
                              <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                              {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {post.comments}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="w-4 h-4 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                  </div>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {challenge.participants}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {challenge.duration}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{challenge.category}</Badge>
                    <div className="flex items-center gap-1 text-sm font-medium text-primary">
                      <Award className="w-4 h-4" />
                      {challenge.reward} pts
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    variant={challenge.isJoined ? "secondary" : "default"}
                    onClick={() => handleJoinChallenge(challenge.id)}
                  >
                    {challenge.isJoined ? "Joined" : "Join Challenge"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="space-y-4">
            {events.map((event) => (
              <Card key={event.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">with {event.expert}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.attendees} attending
                        </div>
                      </div>
                      <Badge variant="outline">{event.category}</Badge>
                    </div>
                    <Button
                      variant={event.isRegistered ? "secondary" : "default"}
                      onClick={() => handleRegisterEvent(event.id)}
                    >
                      {event.isRegistered ? "Registered" : "Register"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Weekly Wellness Leaders
              </CardTitle>
              <CardDescription>Top performers in our community this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { rank: 1, name: "Sarah Chen", points: 2450, badge: "🏆", change: "+12" },
                  { rank: 2, name: "Mike Rodriguez", points: 2380, badge: "🥈", change: "+8" },
                  { rank: 3, name: "Emma Wilson", points: 2290, badge: "🥉", change: "+15" },
                  { rank: 4, name: "Alex Kim", points: 2180, badge: "", change: "-2" },
                  { rank: 5, name: "Lisa Park", points: 2150, badge: "", change: "+5" },
                ].map((user) => (
                  <div key={user.rank} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {user.badge || user.rank}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.points} points</p>
                      </div>
                    </div>
                    <Badge variant={user.change.startsWith("+") ? "default" : "secondary"}>
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {user.change}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
