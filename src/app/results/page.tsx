import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Results",
  description: "Recent Arrowleaf work across content, video, websites, and brand.",
};

/**
 * Clients and the work shown for each, as labelled in the 2025 recap reel.
 * No outcomes or metrics yet — those come with real case studies.
 */
const work = [
  { client: "Sawtooth Fortified", kind: "Website + brand rebuild" },
  { client: "Arcadia", kind: "Content generation" },
  { client: "Lone Pine Truss", kind: "Website video" },
  { client: "Casino.org", kind: "Documentary + content" },
  { client: "Garman Hill", kind: "Venue video + content" },
  { client: "Scandia Inn", kind: "Event recap" },
  { client: "Venturely", kind: "Event recap" },
  { client: "ASA of Idaho", kind: "Content + event recap" },
  { client: "Dips", kind: "Product reveal" },
  { client: "Maddyn Homes", kind: "Real estate listing" },
  { client: "433 Sugarloaf Place", kind: "Real estate listing" },
  { client: "Patty Eckebrecht", kind: "Real estate listing" },
] as const;

// Mock page: layout placeholder until case studies exist.
export default function ResultsPage() {
  return (
    <PageTransition>
      <main className="flex-1 bg-paper">
        <PageIntro
          eyebrow="Results"
          title="Recent work"
          lede="Full case studies are on the way. Here are some of the brands featured in our 2025 recap."
        />

        <section className="page-gutter py-16 sm:py-20">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {work.map((w) => (
              <li
                key={w.client}
                data-reveal
                className="flex min-h-44 flex-col justify-between rounded-brand-lg border border-hairline bg-white p-6"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-ink/55">{w.kind}</p>
                <div className="mt-8">
                  <h2 className="text-2xl">{w.client}</h2>
                  <p className="mt-2 text-sm text-ink/55">Case study coming soon</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </PageTransition>
  );
}
