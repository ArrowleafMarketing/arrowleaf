"use client";

import { useEffect } from "react";

/**
 * Touch screens have no hover, so the case cards' "open the work window"
 * moment would never happen there. This plays it on scroll instead: while a
 * card's middle sits in the middle band of the screen it gets data-open="true" (styled
 * with the `cta-open:` variant, the hover state's twin), and it closes again
 * as it moves on, in either direction. Mouse users keep plain hover.
 */
export function CardPeek({ selector }: { selector: string }) {
  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    // Watch a 1px line across each card's middle, not the card itself: a
    // tall card would overlap the band from almost anywhere on the page.
    const lines = [...document.querySelectorAll<HTMLElement>(selector)]
      .map((card) => card.querySelector<HTMLElement>("[data-peek]"))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const card = (e.target as HTMLElement).closest<HTMLElement>("[data-cta-host]");
          if (card) card.dataset.open = e.isIntersecting ? "true" : "false";
        }
      },
      // The middle 30% of the screen.
      { rootMargin: "-35% 0px -35% 0px" },
    );
    lines.forEach((l) => io.observe(l));
    return () => io.disconnect();
  }, [selector]);
  return null;
}
