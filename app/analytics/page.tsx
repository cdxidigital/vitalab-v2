import { AnalyticsCharts } from "@/components/analytics-charts"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vitalab-high-resolution-logo-transparent-YRIAa2uo4kU2WWzQGNz9sZoDCxshpt.png"
                alt="VitaLab Logo"
                className="h-8 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-foreground">Analytics & Insights</h1>
                <p className="text-sm text-muted-foreground">Deep dive into your wellness data</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <AnalyticsCharts />
      </main>
    </div>
  )
}
