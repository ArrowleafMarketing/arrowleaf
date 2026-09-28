import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a conversation with Arrowleaf: a short call about what's working, what isn't, and what to test first.",
};

const steps = [
  { title: "A 30-minute call", body: "What you sell, who buys it, and what you've tried. No pitch deck." },
  { title: "A plain-English plan", body: "What we'd do first, what it costs, and the number it should move." },
  { title: "Numbers every month", body: "If we work together, you see the results, good and bad, on a schedule." },
] as const;

// Mock page: the form isn't connected yet.
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
          <ol className="grid content-start">
            {steps.map((s, i) => (
              <li key={s.title} data-reveal className="grid grid-cols-[3rem_minmax(0,1fr)] border-t border-ink/15 py-6 last:border-b">
                <span className="font-serif text-sm font-bold tracking-[0.2em] text-ink/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-2xl">{s.title}</h2>
                  <p className="mt-1.5 text-base text-ink/65">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <form data-reveal className="grid gap-4 rounded-brand-lg border border-hairline bg-white p-7 sm:p-9" aria-describedby="form-note">
            {[
              { id: "name", label: "Name", type: "text", auto: "name" },
              { id: "email", label: "Email", type: "email", auto: "email" },
              { id: "company", label: "Company", type: "text", auto: "organization" },
            ].map((f) => (
              <label key={f.id} className="grid gap-1.5 text-sm font-medium">
                {f.label}
                <input
                  id={f.id}
                  name={f.id}
                  type={f.type}
                  autoComplete={f.auto}
                  className="rounded-brand border border-ink/15 bg-paper px-4 py-3 text-base font-normal outline-offset-2 focus:border-lapis"
                />
              </label>
            ))}
            <label className="grid gap-1.5 text-sm font-medium">
              What would you like to move?
              <textarea
                name="message"
                rows={4}
                className="rounded-brand border border-ink/15 bg-paper px-4 py-3 text-base font-normal outline-offset-2 focus:border-lapis"
              />
            </label>
            <button
              type="button"
              disabled
              className="mt-2 justify-self-start rounded-full bg-ink px-6 py-3 text-sm font-medium text-white opacity-50"
            >
              Send
            </button>
            <p id="form-note" className="text-xs text-ink/50">
              Mock form: not connected yet.
            </p>
          </form>
        </section>
      </main>
    </PageTransition>
  );
}
