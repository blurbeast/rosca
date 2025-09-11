import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"

export function ArtiFusionTestimonials() {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "Digital Artist",
      avatar: "/digital-artist-avatar.png",
      content:
        "ArtiFusion revolutionized how I create and sell my art. The AI generation tools are incredible, and the no-loss auctions mean I can bid confidently on pieces I love.",
      rating: 5,
      badge: "Creator",
    },
    {
      name: "Sarah Martinez",
      role: "NFT Collector",
      avatar: "/nft-collector-avatar.png",
      content:
        "Finally, an auction platform where I don't have to worry about losing money on failed bids. The tokenbound NFTs add so much utility - it's the future of digital ownership.",
      rating: 5,
      badge: "Collector",
    },
    {
      name: "Marcus Johnson",
      role: "Web3 Developer",
      avatar: "/web3-developer-avatar.png",
      content:
        "The technical innovation behind ArtiFusion is impressive. Shape Network integration makes transactions seamless, and the smart contract architecture is solid.",
      rating: 5,
      badge: "Developer",
    },
  ]

  return (
    <section className="py-16 px-6">
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-4 glassmorphism">
          <Quote className="w-4 h-4 mr-2" />
          Success Stories
        </Badge>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Loved by <span className="holographic-text">Creators</span> & Collectors
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Join thousands of satisfied users who have transformed their NFT experience with ArtiFusion
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="glassmorphism border-border/50 hover:neon-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <blockquote className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</blockquote>

              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-primary/20"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {testimonial.badge}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
