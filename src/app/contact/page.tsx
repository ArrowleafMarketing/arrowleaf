import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/page-intro";
import { PageTransition } from "@/components/page-transition";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with Arrowleaf: a short call about what's working, what isn't, and what to test first.",
};

const steps = [
  { title: "A 30-minute call", body: "What you sell, who buys it, and what you've tried. No pitch deck." },
  { title: "A plain-English plan", body: "What we'd do first, what it costs, and the number it should move." },
  { title: "Numbers every month", body: "If we work together, you see the results, good and bad, on a schedule." },
] as const;

export default function ContactPage() {
  return (
    <PageTransition>
      <main className="flex-1 bg-paper">
        <PageIntro
          eyebrow="Contact"
          title="Let's talk"
          lede="Tell us where you're stuck. We'll come back with what we'd look at first."
        />
        <section className="page-gutter grid gap-14 pb-24 sm:pb-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
          <div>
          <ol className="grid content-start">
            {steps.map((s, i) => (
              <li key={s.title} data-reveal className="grid grid-cols-[3rem_minmax(0,1fr)] border-t border-ink/15 py-6 last:border-b">
                <span className="font-serif text-sm font-bold tracking-[0.2em] text-ink/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-2xl">{s.title}</h2>
                  <p className="mt-1.5 text-base text-ink/75">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div data-reveal className="mt-10 text-base">
            <p className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
              Rather email or call?
            </p>
            <p className="mt-3">
              <a href={`mailto:${brand.email}`} className="font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
                {brand.email}
              </a>
            </p>
            <p className="mt-1">
              <a href={brand.phoneHref} className="font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
                {brand.phone}
              </a>
            </p>
          </div>
          </div>

          {/* Form first on phones, so it's right under the intro. */}
          <div className="max-lg:order-first">
            <ContactForm />
          </div>

        </section>
      </main>
    </PageTransition>
  );
}
