import { CommunityFeed } from "@/components/community-feed"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/images/design-mode/vitalab-high-resolution-logo-transparent.png"
                alt="VitaLab Logo"
                className="h-8 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-foreground">Community Hub</h1>
                <p className="text-sm text-muted-foreground">Connect, inspire, and grow together</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <CommunityFeed />
      </main>
    </div>
  )
}
