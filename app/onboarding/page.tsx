import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import OnboardingQuiz from "@/components/onboarding-quiz"

export default async function OnboardingPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Check if user has already completed onboarding
  const { data: profile } = await supabase.from("profiles").select("onboarding_completed").eq("id", user.id).single()

  if (profile?.onboarding_completed) {
    redirect("/dashboard")
  }

  return <OnboardingQuiz />
}
