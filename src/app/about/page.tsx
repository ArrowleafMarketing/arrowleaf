import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { PageTransition } from "@/components/page-transition";
import { beliefs, values } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About",
  description: "Arrowleaf is a boutique, senior marketing and media team in Boise.",
};

// Mock page: real copy from the brand style guide, final layout still to come.
export default function AboutPage() {
  return (
    <PageTransition>
      <main className="flex-1 bg-paper">
        <PageIntro
          eyebrow="About"
          title="A small, senior team"
          lede="Arrowleaf is a boutique marketing and media team in Boise, known for tying creative to revenue and making marketing decisions faster, together."
        />

        <section className="page-gutter grid gap-6 border-t border-hairline py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <h2 data-reveal className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-ink/60">
            Our mission
          </h2>
          <p data-reveal className="max-w-3xl text-2xl leading-snug sm:text-3xl">
            We partner with owners to put brand, content, and paid growth on one
            shared plan, and prove results with clear, repeatable measurement
            every month.
          </p>
        </section>

        <section className="page-gutter grid gap-6 border-t border-hairline py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <h2 data-reveal className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-ink/60">
            What we believe
          </h2>
          <ul data-reveal className="grid gap-x-10 sm:grid-cols-2">
            {beliefs.map((b) => (
              <li key={b.strong} className="border-t border-hairline py-4 text-base">
                <strong className="font-semibold">{b.strong}</strong>
                {b.rest && <> {b.rest}</>}
              </li>
            ))}
          </ul>
        </section>

        <section className="page-gutter grid gap-6 border-t border-hairline py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <h2 data-reveal className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-ink/60">
            Our values
          </h2>
          <ul data-reveal className="flex flex-wrap gap-2">
            {values.map((v) => (
              <li
                key={v}
                className="rounded-brand bg-lapis px-4 py-2 text-sm font-medium uppercase tracking-wide text-white"
              >
                {v}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </PageTransition>
  );
}
