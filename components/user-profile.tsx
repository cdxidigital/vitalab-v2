"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Shield, Download, Upload, Camera, Save, Moon, Sun, Smartphone, Lock } from "lucide-react"

interface UserData {
  name: string
  email: string
  bio: string
  age: number
  height: string
  weight: string
  activityLevel: string
  goals: {
    steps: number
    sleep: number
    water: number
    exercise: number
  }
  achievements: {
    totalPoints: number
    streaks: number
    challenges: number
    level: string
  }
}

interface AppSettings {
  notifications: {
    push: boolean
    email: boolean
    reminders: boolean
    social: boolean
  }
  privacy: {
    profileVisible: boolean
    shareProgress: boolean
    showInLeaderboard: boolean
    dataCollection: boolean
  }
  preferences: {
    theme: string
    units: string
    language: string
    startWeek: string
  }
}

const mockUserData: UserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  bio: "Wellness enthusiast on a journey to better health and mindfulness. Love yoga, hiking, and connecting with like-minded people.",
  age: 32,
  height: "5'10\"",
  weight: "165 lbs",
  activityLevel: "moderately-active",
  goals: {
    steps: 10000,
    sleep: 8,
    water: 8,
    exercise: 30,
  },
  achievements: {
    totalPoints: 2450,
    streaks: 7,
    challenges: 12,
    level: "Wellness Warrior",
  },
}

const mockSettings: AppSettings = {
  notifications: {
    push: true,
    email: true,
    reminders: true,
    social: false,
  },
  privacy: {
    profileVisible: true,
    shareProgress: true,
    showInLeaderboard: true,
    dataCollection: true,
  },
  preferences: {
    theme: "system",
    units: "imperial",
    language: "english",
    startWeek: "monday",
  },
}

export function UserProfile() {
  const [userData, setUserData] = useState<UserData>(mockUserData)
  const [settings, setSettings] = useState<AppSettings>(mockSettings)
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Here you would typically save to backend
    console.log("Profile saved:", userData)
  }

  const handleGoalChange = (goal: keyof UserData["goals"], value: number[]) => {
    setUserData({
      ...userData,
      goals: {
        ...userData.goals,
        [goal]: value[0],
      },
    })
  }

  const handleSettingChange = (category: keyof AppSettings, setting: string, value: boolean | string) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: value,
      },
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">Personal Information</CardTitle>
              <CardDescription>Manage your profile information and achievements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Header */}
              <div className="flex items-start gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/user-profile-illustration.png" />
                    <AvatarFallback className="text-2xl">
                      {userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold">{userData.name}</h2>
                    <Badge className="bg-primary/10 text-primary border-primary/20">
                      {userData.achievements.level}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{userData.achievements.totalPoints}</div>
                      <div className="text-sm text-muted-foreground">Total Points</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{userData.achievements.streaks}</div>
                      <div className="text-sm text-muted-foreground">Active Streaks</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{userData.achievements.challenges}</div>
                      <div className="text-sm text-muted-foreground">Challenges Won</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={userData.age}
                    onChange={(e) => setUserData({ ...userData, age: Number.parseInt(e.target.value) })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="activity-level">Activity Level</Label>
                  <Select
                    value={userData.activityLevel}
                    onValueChange={(value) => setUserData({ ...userData, activityLevel: value })}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary</SelectItem>
                      <SelectItem value="lightly-active">Lightly Active</SelectItem>
                      <SelectItem value="moderately-active">Moderately Active</SelectItem>
                      <SelectItem value="very-active">Very Active</SelectItem>
                      <SelectItem value="extremely-active">Extremely Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    value={userData.height}
                    onChange={(e) => setUserData({ ...userData, height: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    value={userData.weight}
                    onChange={(e) => setUserData({ ...userData, weight: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={userData.bio}
                  onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                  disabled={!isEditing}
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSaveProfile}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    <Shield className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">Wellness Goals</CardTitle>
              <CardDescription>Set and track your personal wellness targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Daily Steps Goal</Label>
                    <span className="text-sm font-medium">{userData.goals.steps.toLocaleString()} steps</span>
                  </div>
                  <Slider
                    value={[userData.goals.steps]}
                    onValueChange={(value) => handleGoalChange("steps", value)}
                    max={20000}
                    min={5000}
                    step={500}
                    className="w-full"
                  />
                  <Progress value={(userData.goals.steps / 20000) * 100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Sleep Goal</Label>
                    <span className="text-sm font-medium">{userData.goals.sleep} hours</span>
                  </div>
                  <Slider
                    value={[userData.goals.sleep]}
                    onValueChange={(value) => handleGoalChange("sleep", value)}
                    max={12}
                    min={6}
                    step={0.5}
                    className="w-full"
                  />
                  <Progress value={(userData.goals.sleep / 12) * 100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Water Intake Goal</Label>
                    <span className="text-sm font-medium">{userData.goals.water} glasses</span>
                  </div>
                  <Slider
                    value={[userData.goals.water]}
                    onValueChange={(value) => handleGoalChange("water", value)}
                    max={15}
                    min={4}
                    step={1}
                    className="w-full"
                  />
                  <Progress value={(userData.goals.water / 15) * 100} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Exercise Goal</Label>
                    <span className="text-sm font-medium">{userData.goals.exercise} minutes/day</span>
                  </div>
                  <Slider
                    value={[userData.goals.exercise]}
                    onValueChange={(value) => handleGoalChange("exercise", value)}
                    max={120}
                    min={15}
                    step={5}
                    className="w-full"
                  />
                  <Progress value={(userData.goals.exercise / 120) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">Notification Preferences</CardTitle>
              <CardDescription>Control how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                  </div>
                  <Switch
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) => handleSettingChange("notifications", "push", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly progress reports via email</p>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => handleSettingChange("notifications", "email", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Activity Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get reminded to log activities and check-ins</p>
                  </div>
                  <Switch
                    checked={settings.notifications.reminders}
                    onCheckedChange={(checked) => handleSettingChange("notifications", "reminders", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Social Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get notified about community activity</p>
                  </div>
                  <Switch
                    checked={settings.notifications.social}
                    onCheckedChange={(checked) => handleSettingChange("notifications", "social", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">Privacy & Security</CardTitle>
              <CardDescription>Manage your privacy settings and data sharing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Public Profile</Label>
                    <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                  </div>
                  <Switch
                    checked={settings.privacy.profileVisible}
                    onCheckedChange={(checked) => handleSettingChange("privacy", "profileVisible", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Share Progress</Label>
                    <p className="text-sm text-muted-foreground">Allow others to see your wellness progress</p>
                  </div>
                  <Switch
                    checked={settings.privacy.shareProgress}
                    onCheckedChange={(checked) => handleSettingChange("privacy", "shareProgress", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Leaderboard Participation</Label>
                    <p className="text-sm text-muted-foreground">Show your ranking in community leaderboards</p>
                  </div>
                  <Switch
                    checked={settings.privacy.showInLeaderboard}
                    onCheckedChange={(checked) => handleSettingChange("privacy", "showInLeaderboard", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Data Collection</Label>
                    <p className="text-sm text-muted-foreground">Allow anonymous data collection for app improvement</p>
                  </div>
                  <Switch
                    checked={settings.privacy.dataCollection}
                    onCheckedChange={(checked) => handleSettingChange("privacy", "dataCollection", checked)}
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="space-y-4">
                  <h4 className="font-medium">Account Security</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Lock className="w-4 h-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Enable Two-Factor Authentication
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Download My Data
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">App Preferences</CardTitle>
              <CardDescription>Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select
                    value={settings.preferences.theme}
                    onValueChange={(value) => handleSettingChange("preferences", "theme", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center gap-2">
                          <Sun className="w-4 h-4" />
                          Light
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center gap-2">
                          <Moon className="w-4 h-4" />
                          Dark
                        </div>
                      </SelectItem>
                      <SelectItem value="system">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          System
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Units</Label>
                  <Select
                    value={settings.preferences.units}
                    onValueChange={(value) => handleSettingChange("preferences", "units", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="imperial">Imperial (lbs, ft)</SelectItem>
                      <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select
                    value={settings.preferences.language}
                    onValueChange={(value) => handleSettingChange("preferences", "language", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Week Starts On</Label>
                  <Select
                    value={settings.preferences.startWeek}
                    onValueChange={(value) => handleSettingChange("preferences", "startWeek", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sunday">Sunday</SelectItem>
                      <SelectItem value="monday">Monday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="space-y-4">
                  <h4 className="font-medium">Data Management</h4>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Import Data
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
