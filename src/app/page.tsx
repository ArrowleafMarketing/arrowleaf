import { AboutTeaser } from "@/components/about-teaser";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { PageTransition } from "@/components/page-transition";
import { ServicesStack } from "@/components/services-stack";
import { Testimonials } from "@/components/testimonials";
import { WorkPreview } from "@/components/work-preview";

export default function Home() {
  return (
    <PageTransition>
      <main className="flex-1 bg-paper">
        <Hero />
        <ServicesStack />
        <WorkPreview />
        <AboutTeaser />
        <Testimonials />
        <FinalCta />
      </main>
    </PageTransition>
  );
}
