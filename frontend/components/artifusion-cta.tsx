import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Wallet } from "lucide-react"

export function ArtiFusionCTA() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Background glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 glassmorphism rounded-2xl p-8 md:p-12 neon-glow">
          <Badge variant="outline" className="mb-6 glassmorphism">
            <Sparkles className="w-4 h-4 mr-2" />
            Ready to Start?
          </Badge>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Join the <span className="holographic-text">Revolution</span>
          </h2>

          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the future of NFT trading today. Create stunning AI-generated art, participate in no-loss
            auctions, and build your digital collection with confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="px-8 py-4 text-lg neon-glow hover:scale-105 transition-all duration-300">
              <Wallet className="w-5 h-5 mr-2" />
              Connect Wallet
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg glassmorphism hover:neon-glow-cyan transition-all duration-300 bg-transparent"
            >
              Explore Platform
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>No setup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span>Instant transactions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
