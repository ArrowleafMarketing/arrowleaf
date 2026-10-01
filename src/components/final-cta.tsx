import Link from "next/link";
import { CtaPill } from "@/components/cta-pill";
import { LogoIcon } from "@/components/logo";

/**
 * The closing ask, on Volt. Results-first to the end: the offer is a short
 * call about the numbers, not a pitch. The oversized mark bleeds off the
 * right edge (on Volt the logo sits in Ink, beside Ink text).
 */
export function FinalCta() {
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-volt text-ink">
      <LogoIcon
        title=""
        className="absolute -right-[12vw] top-1/2 -z-10 w-[62vw] max-w-[46rem] -translate-y-1/2 text-ink/[0.07] sm:-right-[6vw] sm:w-[48vw]"
      />
      <div className="page-gutter py-24 sm:py-32">
        <p data-reveal className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-ink/80">
          Let&apos;s talk
        </p>
        <h2 data-reveal className="mt-4 max-w-4xl text-[clamp(2.75rem,7vw,6rem)] leading-[1.02] tracking-[-0.03em]">
          Let&apos;s put your marketing <em>on the record</em>.
        </h2>
        <p data-reveal className="mt-7 max-w-xl text-lg text-ink/80 sm:text-xl">
          Thirty minutes. We&apos;ll look at what&apos;s working, what isn&apos;t, and what
          we&apos;d test first. No pitch deck.
        </p>
        <div data-reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <CtaPill href="/contact">Start a conversation</CtaPill>
          <Link
            href="/results"
            className="-my-2 py-2 text-sm font-medium underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
          >
            Or see the results first
          </Link>
        </div>
      </div>
    </section>
  );
}
