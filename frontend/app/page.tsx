import { ArtiFusionHero } from "@/components/artifusion-hero"
import { ArtiFusionFeatures } from "@/components/artifusion-features"
import { ArtiFusionStats } from "@/components/artifusion-stats"
import { ArtiFusionTestimonials } from "@/components/artifusion-testimonials"
import { ArtiFusionCTA } from "@/components/artifusion-cta"
import { AnimatedSection } from "@/components/animated-section"

export default function ArtiFusionLanding() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="relative z-10">
        <main className="max-w-7xl mx-auto relative">
          <ArtiFusionHero />
        </main>

        <AnimatedSection className="relative z-10 max-w-7xl mx-auto px-6 mt-16" delay={0.1}>
          <ArtiFusionStats />
        </AnimatedSection>

        <AnimatedSection className="relative z-10 max-w-7xl mx-auto mt-16" delay={0.2}>
          <ArtiFusionFeatures />
        </AnimatedSection>

        <AnimatedSection className="relative z-10 max-w-7xl mx-auto mt-16" delay={0.3}>
          <ArtiFusionTestimonials />
        </AnimatedSection>

        <AnimatedSection className="relative z-10 max-w-7xl mx-auto mt-16" delay={0.4}>
          <ArtiFusionCTA />
        </AnimatedSection>
      </div>
    </div>
  )
}
