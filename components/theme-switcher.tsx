"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { Palette, Check } from "lucide-react"

const themes = [
  {
    id: "default",
    name: "VitaLab Green",
    description: "Classic wellness green theme",
    colors: {
      primary: "hsl(142, 76%, 36%)",
      secondary: "hsl(142, 76%, 46%)",
      accent: "hsl(142, 76%, 56%)",
    },
    preview: ["bg-green-500", "bg-green-600", "bg-green-700"],
  },
  {
    id: "forest",
    name: "Forest",
    description: "Deep forest greens",
    colors: {
      primary: "hsl(120, 60%, 25%)",
      secondary: "hsl(120, 60%, 35%)",
      accent: "hsl(120, 60%, 45%)",
    },
    preview: ["bg-green-800", "bg-green-700", "bg-green-600"],
  },
  {
    id: "ocean",
    name: "Ocean",
    description: "Calming ocean blues",
    colors: {
      primary: "hsl(200, 80%, 40%)",
      secondary: "hsl(180, 80%, 50%)",
      accent: "hsl(160, 80%, 60%)",
    },
    preview: ["bg-blue-600", "bg-cyan-500", "bg-teal-500"],
  },
  {
    id: "sunset",
    name: "Sunset",
    description: "Warm sunset colors",
    colors: {
      primary: "hsl(20, 80%, 50%)",
      secondary: "hsl(0, 80%, 60%)",
      accent: "hsl(340, 80%, 70%)",
    },
    preview: ["bg-orange-500", "bg-red-500", "bg-pink-500"],
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean grayscale theme",
    colors: {
      primary: "hsl(0, 0%, 40%)",
      secondary: "hsl(0, 0%, 50%)",
      accent: "hsl(0, 0%, 60%)",
    },
    preview: ["bg-gray-600", "bg-gray-500", "bg-gray-400"],
  },
]

interface ThemeSwitcherProps {
  currentTheme: string
  onThemeChange: (themeId: string) => void
}

export default function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)

  const applyTheme = (theme: (typeof themes)[0]) => {
    const root = document.documentElement
    root.style.setProperty("--primary", theme.colors.primary)
    root.style.setProperty("--secondary", theme.colors.secondary)
    root.style.setProperty("--accent", theme.colors.accent)
  }

  const handleThemeChange = async (themeId: string) => {
    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      await supabase.from("profiles").update({ theme_preference: themeId }).eq("id", user.id)

      const selectedTheme = themes.find((t) => t.id === themeId)
      if (selectedTheme) {
        applyTheme(selectedTheme)
      }

      onThemeChange(themeId)
    }
    setIsOpen(false)
  }

  useEffect(() => {
    const selectedTheme = themes.find((t) => t.id === currentTheme)
    if (selectedTheme) {
      applyTheme(selectedTheme)
    }
  }, [currentTheme])

  if (!isOpen) {
    return (
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)} className="flex items-center gap-2">
        <Palette className="w-4 h-4" />
        Theme
      </Button>
    )
  }

  return (
    <Card className="absolute top-12 right-0 w-80 z-50 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Choose Theme</span>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            ×
          </Button>
        </CardTitle>
        <CardDescription>Select a color theme that resonates with you</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
              currentTheme === theme.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
            onClick={() => handleThemeChange(theme.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{theme.name}</h4>
                  {currentTheme === theme.id && <Check className="w-4 h-4 text-primary" />}
                </div>
                <p className="text-sm text-muted-foreground">{theme.description}</p>
              </div>
              <div className="flex gap-1">
                {theme.preview.map((color, index) => (
                  <div key={index} className={`w-6 h-6 rounded-full ${color}`} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
