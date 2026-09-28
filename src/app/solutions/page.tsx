import type { Metadata } from "next";
import { FinalCta } from "@/components/final-cta";
import { HashScroll } from "@/components/hash-scroll";
import { PageIntro } from "@/components/page-intro";
import { PageTransition } from "@/components/page-transition";
import { ServicesStack } from "@/components/services-stack";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Strategy & Research, Technology & AI, Brand & Creative, and Marketing & Growth: four disciplines on one plan.",
};

// Mock page: reuses the home page's solutions deck under its own intro.
export default function SolutionsPage() {
  return (
    <PageTransition>
      <main className="flex-1 bg-paper">
        <PageIntro
          eyebrow="Solutions"
          title="Four disciplines, one plan"
          lede="Most agencies sell you one of these. Growth past a plateau needs all four pointed in the same direction."
        />
        <ServicesStack showHeader={false} />
        <FinalCta />
        <HashScroll />
      </main>
    </PageTransition>
  );
}
