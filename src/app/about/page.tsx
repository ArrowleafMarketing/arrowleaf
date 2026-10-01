import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { PageTransition } from "@/components/page-transition";
import { beliefs, compass, values } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About",
  description:
    "Arrowleaf is a trusted growth partner for established businesses at pivotal moments: not a vendor, not a volume agency.",
};

/** A labelled band: small serif label on the left, content on the right. */
function Band({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="page-gutter grid gap-6 border-t border-hairline py-16 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
      <h2 data-reveal className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
        {label}
      </h2>
      <div>{children}</div>
    </section>
  );
}

/** Numbered principle list, for values and beliefs. */
function Principles({ items }: { items: readonly { name: string; body: string }[] }) {
  return (
    <ol className="grid gap-x-12 sm:grid-cols-2">
      {items.map((item, i) => (
        <li
          key={item.name}
          data-reveal
          className="grid grid-cols-[2.25rem_minmax(0,1fr)] border-t border-hairline py-6"
        >
          <span className="font-serif text-sm font-bold tracking-[0.2em] text-ink/40">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-serif text-2xl font-normal italic tracking-normal">{item.name}</h3>
            <p className="mt-1.5 text-base text-ink/80">{item.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// Copy comes from the 2026 MVVBP (src/lib/brand.ts).
export default function AboutPage() {
  return (
    <PageTransition>
      <main className="flex-1 bg-paper">
        <PageIntro
          eyebrow="About"
          title={
            <>
              Not a vendor. <em>A growth partner.</em>
            </>
          }
          lede="We work with established businesses at pivotal moments, building brands they're proud of and marketing that delivers results."
        />

        <Band label="Our mission">
          <p data-reveal className="max-w-3xl text-2xl leading-snug sm:text-3xl">
            {compass.mission}
          </p>
        </Band>

        <Band label="Where we are">
          <div className="max-w-3xl">
            <p data-reveal className="text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
              <em className="font-serif font-normal">Not a vendor. Not a volume agency.</em> A trusted
              growth partner.
            </p>
            {compass.perspective.map((para) => (
              <p key={para.slice(0, 24)} data-reveal className="mt-6 text-lg text-ink/80">
                {para}
              </p>
            ))}
          </div>
        </Band>

        <Band label="Our values">
          <p data-reveal className="mb-8 max-w-2xl text-base text-ink/70">
            How we choose clients, treat our team, and deliver the work. Non-negotiable, in every
            engagement.
          </p>
          <Principles items={values} />
        </Band>

        <Band label="What we believe">
          <p data-reveal className="mb-8 max-w-2xl text-base text-ink/70">
            The convictions beneath the strategy, and the reasons we work the way we do.
          </p>
          <Principles items={beliefs} />
        </Band>
      </main>
    </PageTransition>
  );
}
