import Link from "next/link";
import { ShowcaseScroll } from "@/components/showcase-scroll";

/**
 * Home hero.
 *
 * Follows the skeleton shared by the reference sites (GitHub, Snowflake,
 * Datadog): oversized two-line headline, one-line subhead, two CTAs. The
 * three pillars run in a row along the bottom with the showreel as a tile on
 * the right; on large screens the hero is exactly one screen and scrolling
 * grows the reel to fill it (see ShowcaseScroll).
 *
 * The wrapper is pulled up under the sticky header (`-mt-16`) so the glow
 * shows through the header's translucent background.
 */
export function Hero() {
  return (
    <div className="relative -mt-16">
      <ShowcaseScroll>
        <div className="mx-auto max-w-4xl text-center">
          {/* Top margin stands in for the eyebrow that used to sit here, keeping
              the headline where it was. */}
          <h1 data-reveal className="mt-10 text-display-fit pin:mt-[min(2.5rem,5svh)]">Growth without the guesswork</h1>

          <p data-reveal className="mx-auto mt-7 max-w-3xl text-balance text-lg text-ink/80 sm:text-xl pin:mt-[min(1.75rem,3svh)]">
            A strategic growth partner for established businesses at pivotal
            moments, building brands you&apos;re proud of and marketing engines
            that deliver results.
          </p>

          <div data-reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row pin:mt-[min(2.5rem,4.4svh)]">
            <Link
              href="/contact"
              className="w-full rounded-brand bg-ink px-6 py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-lapis sm:w-auto"
            >
              Start a conversation
            </Link>
            <a
              href="#solutions"
              className="w-full rounded-brand border border-ink/20 bg-white/60 px-6 py-3.5 text-center text-sm font-medium text-ink transition-colors hover:border-ink/40 hover:bg-white sm:w-auto"
            >
              See what we do
            </a>
          </div>
        </div>
      </ShowcaseScroll>
    </div>
  );
}
