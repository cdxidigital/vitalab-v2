"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface QuizData {
  dateOfBirth: string
  gender: string
  heightCm: number
  weightKg: number
  activityLevel: string
  goals: string[]
  sleepHours: number
  stressLevel: number
  socialConnections: number
  spiritualPractice: string
  themePreference: string
}

const themes = [
  { id: "default", name: "Default", colors: ["bg-green-500", "bg-emerald-500", "bg-teal-500"] },
  { id: "forest", name: "Forest", colors: ["bg-green-700", "bg-green-600", "bg-green-500"] },
  { id: "ocean", name: "Ocean", colors: ["bg-blue-600", "bg-cyan-500", "bg-teal-500"] },
  { id: "sunset", name: "Sunset", colors: ["bg-orange-500", "bg-red-500", "bg-pink-500"] },
  { id: "minimal", name: "Minimal", colors: ["bg-gray-600", "bg-gray-500", "bg-gray-400"] },
]

const goals = [
  "Lose Weight",
  "Gain Muscle",
  "Improve Fitness",
  "Reduce Stress",
  "Better Sleep",
  "Increase Energy",
  "Mental Clarity",
  "Social Connection",
  "Spiritual Growth",
  "Work-Life Balance",
]

export default function OnboardingQuiz() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const [quizData, setQuizData] = useState<QuizData>({
    dateOfBirth: "",
    gender: "",
    heightCm: 170,
    weightKg: 70,
    activityLevel: "",
    goals: [],
    sleepHours: 8,
    stressLevel: 5,
    socialConnections: 5,
    spiritualPractice: "",
    themePreference: "default",
  })

  const totalSteps = 6
  const progress = ((currentStep + 1) / totalSteps) * 100

  const handleGoalToggle = (goal: string) => {
    setQuizData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal) ? prev.goals.filter((g) => g !== goal) : [...prev.goals, goal],
    }))
  }

  const calculateInitialLifeScore = (data: QuizData): number => {
    let score = 500 // Base score

    // Activity level impact
    const activityBonus = {
      sedentary: -50,
      lightly_active: -20,
      moderately_active: 20,
      very_active: 50,
      extremely_active: 80,
    }
    score += activityBonus[data.activityLevel as keyof typeof activityBonus] || 0

    // Sleep impact
    if (data.sleepHours >= 7 && data.sleepHours <= 9) score += 30
    else if (data.sleepHours < 6 || data.sleepHours > 10) score -= 30

    // Stress level impact (1-10 scale, lower is better)
    score += (10 - data.stressLevel) * 5

    // Social connections impact
    score += (data.socialConnections - 5) * 8

    // Goals impact (having goals is positive)
    score += Math.min(data.goals.length * 10, 50)

    // Spiritual practice impact
    if (data.spiritualPractice === "regular") score += 25
    else if (data.spiritualPractice === "occasional") score += 10

    return Math.max(100, Math.min(900, score)) // Keep within reasonable bounds
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("No user found")

      const initialLifeScore = calculateInitialLifeScore(quizData)

      const { error } = await supabase
        .from("profiles")
        .update({
          date_of_birth: quizData.dateOfBirth,
          gender: quizData.gender,
          height_cm: quizData.heightCm,
          weight_kg: quizData.weightKg,
          activity_level: quizData.activityLevel,
          goals: quizData.goals,
          theme_preference: quizData.themePreference,
          lifescore: initialLifeScore,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      // Log initial LifeScore
      await supabase.from("lifescore_history").insert({
        user_id: user.id,
        lifescore: initialLifeScore,
        change_amount: initialLifeScore - 500,
        reason: "Initial onboarding assessment",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Error completing onboarding:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const steps = [
    // Step 1: Basic Info
    <div key="basic" className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Let's start with the basics</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={quizData.dateOfBirth}
              onChange={(e) => setQuizData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Gender</Label>
            <RadioGroup
              value={quizData.gender}
              onValueChange={(value) => setQuizData((prev) => ({ ...prev, gender: value }))}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>,

    // Step 2: Physical Metrics
    <div key="physical" className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Physical Information</h3>
        <div className="space-y-6">
          <div>
            <Label>Height: {quizData.heightCm} cm</Label>
            <Slider
              value={[quizData.heightCm]}
              onValueChange={(value) => setQuizData((prev) => ({ ...prev, heightCm: value[0] }))}
              max={220}
              min={120}
              step={1}
              className="mt-2"
            />
          </div>
          <div>
            <Label>Weight: {quizData.weightKg} kg</Label>
            <Slider
              value={[quizData.weightKg]}
              onValueChange={(value) => setQuizData((prev) => ({ ...prev, weightKg: value[0] }))}
              max={200}
              min={30}
              step={0.5}
              className="mt-2"
            />
          </div>
        </div>
      </div>
    </div>,

    // Step 3: Activity Level
    <div key="activity" className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Activity Level</h3>
        <RadioGroup
          value={quizData.activityLevel}
          onValueChange={(value) => setQuizData((prev) => ({ ...prev, activityLevel: value }))}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sedentary" id="sedentary" />
            <Label htmlFor="sedentary" className="flex-1">
              <div className="font-medium">Sedentary</div>
              <div className="text-sm text-gray-500">Little to no exercise</div>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lightly_active" id="lightly_active" />
            <Label htmlFor="lightly_active" className="flex-1">
              <div className="font-medium">Lightly Active</div>
              <div className="text-sm text-gray-500">Light exercise 1-3 days/week</div>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="moderately_active" id="moderately_active" />
            <Label htmlFor="moderately_active" className="flex-1">
              <div className="font-medium">Moderately Active</div>
              <div className="text-sm text-gray-500">Moderate exercise 3-5 days/week</div>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="very_active" id="very_active" />
            <Label htmlFor="very_active" className="flex-1">
              <div className="font-medium">Very Active</div>
              <div className="text-sm text-gray-500">Hard exercise 6-7 days/week</div>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="extremely_active" id="extremely_active" />
            <Label htmlFor="extremely_active" className="flex-1">
              <div className="font-medium">Extremely Active</div>
              <div className="text-sm text-gray-500">Very hard exercise, physical job</div>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>,

    // Step 4: Goals
    <div key="goals" className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">What are your wellness goals?</h3>
        <p className="text-gray-600 mb-4">Select all that apply</p>
        <div className="grid grid-cols-2 gap-3">
          {goals.map((goal) => (
            <div key={goal} className="flex items-center space-x-2">
              <Checkbox
                id={goal}
                checked={quizData.goals.includes(goal)}
                onCheckedChange={() => handleGoalToggle(goal)}
              />
              <Label htmlFor={goal} className="text-sm">
                {goal}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>,

    // Step 5: Lifestyle
    <div key="lifestyle" className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Lifestyle Assessment</h3>
        <div className="space-y-6">
          <div>
            <Label>Average sleep per night: {quizData.sleepHours} hours</Label>
            <Slider
              value={[quizData.sleepHours]}
              onValueChange={(value) => setQuizData((prev) => ({ ...prev, sleepHours: value[0] }))}
              max={12}
              min={3}
              step={0.5}
              className="mt-2"
            />
          </div>
          <div>
            <Label>Stress level (1 = very low, 10 = very high): {quizData.stressLevel}</Label>
            <Slider
              value={[quizData.stressLevel]}
              onValueChange={(value) => setQuizData((prev) => ({ ...prev, stressLevel: value[0] }))}
              max={10}
              min={1}
              step={1}
              className="mt-2"
            />
          </div>
          <div>
            <Label>Social connections (1 = very isolated, 10 = very social): {quizData.socialConnections}</Label>
            <Slider
              value={[quizData.socialConnections]}
              onValueChange={(value) => setQuizData((prev) => ({ ...prev, socialConnections: value[0] }))}
              max={10}
              min={1}
              step={1}
              className="mt-2"
            />
          </div>
          <div>
            <Label>Spiritual/mindfulness practice</Label>
            <Select
              value={quizData.spiritualPractice}
              onValueChange={(value) => setQuizData((prev) => ({ ...prev, spiritualPractice: value }))}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select your practice level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="occasional">Occasional</SelectItem>
                <SelectItem value="regular">Regular practice</SelectItem>
                <SelectItem value="daily">Daily practice</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>,

    // Step 6: Theme Selection
    <div key="theme" className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Choose your theme</h3>
        <p className="text-gray-600 mb-4">Select a color theme that resonates with you</p>
        <div className="grid grid-cols-1 gap-4">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                quizData.themePreference === theme.id
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setQuizData((prev) => ({ ...prev, themePreference: theme.id }))}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{theme.name}</h4>
                </div>
                <div className="flex space-x-1">
                  {theme.colors.map((color, index) => (
                    <div key={index} className={`w-6 h-6 rounded-full ${color}`} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-600 mt-2">
            Step {currentStep + 1} of {totalSteps}
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-800">Welcome to VitaLab</CardTitle>
            <CardDescription>Let's personalize your wellness experience with a quick assessment</CardDescription>
          </CardHeader>
          <CardContent>
            {steps[currentStep]}

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep === totalSteps - 1 ? (
                <Button onClick={handleSubmit} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                  {isLoading ? "Completing..." : "Complete Setup"}
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrentStep((prev) => Math.min(totalSteps - 1, prev + 1))}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
