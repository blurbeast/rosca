import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, Shield, Palette } from "lucide-react"

export function ArtiFusionHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <Badge variant="outline" className="mb-6 px-4 py-2 text-sm glassmorphism neon-glow">
          <Sparkles className="w-4 h-4 mr-2" />
          Powered by Shape Network
        </Badge>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="holographic-text">ArtiFusion</span>
          <br />
          <span className="text-foreground">Create, Auction, Win</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          The future of no-loss NFT trading. Generate AI-powered NFTs, participate in revolutionary auctions, and launch
          tokenbound collections on the cutting edge of Web3.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="flex items-center gap-2 glassmorphism px-4 py-2 rounded-full">
            <Palette className="w-5 h-5 text-primary" />
            <span className="text-sm">AI-Powered Generation</span>
          </div>
          <div className="flex items-center gap-2 glassmorphism px-4 py-2 rounded-full">
            <Shield className="w-5 h-5 text-secondary" />
            <span className="text-sm">No-Loss Auctions</span>
          </div>
          <div className="flex items-center gap-2 glassmorphism px-4 py-2 rounded-full">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm">Tokenbound NFTs</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="px-8 py-4 text-lg neon-glow hover:neon-glow transition-all duration-300">
            Start Creating
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-4 text-lg glassmorphism hover:neon-glow-cyan transition-all duration-300 bg-transparent"
          >
            Browse Auctions
          </Button>
        </div>

        <div className="mt-16 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="glassmorphism rounded-xl p-4 hover:neon-glow transition-all duration-300 animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-3"></div>
                <div className="h-3 bg-muted-foreground/20 rounded mb-2"></div>
                <div className="h-2 bg-muted-foreground/10 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
