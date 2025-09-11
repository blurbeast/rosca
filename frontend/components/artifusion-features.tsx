import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Shield, Zap, Palette, Users, Globe } from "lucide-react"

export function ArtiFusionFeatures() {
  const features = [
    {
      icon: Palette,
      title: "AI-Powered NFT Generation",
      description:
        "Transform your ideas into stunning NFTs using advanced AI models. Generate unique artworks from simple text prompts or enhance uploaded images.",
      badge: "AI Studio",
      gradient: "from-primary/20 to-primary/5",
    },
    {
      icon: Shield,
      title: "No-Loss Auction System",
      description:
        "Revolutionary auction mechanism where participants never lose their investment. Win NFTs or get your bid back - it's that simple.",
      badge: "Zero Risk",
      gradient: "from-secondary/20 to-secondary/5",
    },
    {
      icon: Zap,
      title: "Tokenbound NFT Launchpad",
      description:
        "Launch collections with smart contract wallets attached to each NFT. Create utility-rich NFTs that can hold assets and interact with DeFi.",
      badge: "Advanced",
      gradient: "from-primary/20 to-secondary/20",
    },
    {
      icon: Users,
      title: "Community-Driven Marketplace",
      description:
        "Join a thriving ecosystem of creators and collectors. Discover trending collections, follow favorite artists, and build your reputation.",
      badge: "Social",
      gradient: "from-secondary/20 to-primary/5",
    },
    {
      icon: Globe,
      title: "Shape Network Integration",
      description:
        "Built on Shape Network for lightning-fast transactions and minimal fees. Seamless Web3 experience with enterprise-grade security.",
      badge: "Web3",
      gradient: "from-primary/15 to-secondary/15",
    },
    {
      icon: Sparkles,
      title: "Advanced Analytics",
      description:
        "Track your portfolio performance, auction success rates, and market trends. Make informed decisions with comprehensive data insights.",
      badge: "Analytics",
      gradient: "from-secondary/20 to-primary/10",
    },
  ]

  return (
    <section className="py-16 px-6">
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-4 glassmorphism">
          <Sparkles className="w-4 h-4 mr-2" />
          Platform Features
        </Badge>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Everything You Need to <span className="holographic-text">Succeed</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          ArtiFusion combines cutting-edge AI technology with innovative auction mechanics to create the ultimate NFT
          trading platform.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="glassmorphism border-border/50 hover:neon-glow transition-all duration-300 group"
          >
            <CardContent className="p-6">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-6 h-6 text-primary" />
              </div>

              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <Badge variant="secondary" className="text-xs text-nowrap">
                  {feature.badge}
                </Badge>
              </div>

              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
