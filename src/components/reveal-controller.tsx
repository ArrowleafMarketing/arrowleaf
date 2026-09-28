"use client";

import { useEffect } from "react";

/**
 * Plays every `data-reveal` block in, choosing the entrance by how the reader
 * got there (see "Reveals" in globals.css and docs/MOTION.md). Mounted once,
 * in the root layout.
 *
 * - For a short window after a page appears (first load, refresh, or a
 *   client navigation), anything on screen gets the "load" entrance,
 *   staggered in reading order. When the URL has a #section the window runs
 *   longer, so the section the page glides to still gets its entrance.
 * - After that, blocks get the barely-there "scroll" entrance, triggered a
 *   little before they reach the viewport.
 * - Blocks that start above the viewport are shown without animation.
 *
 * New pages are picked up by watching the DOM, so pages need no wiring: a new
 * <main> means a new page, and restarts the load window.
 */

/** How long after a page appears its on-screen blocks still count as "load". */
const LOAD_WINDOW_MS = 800;
/** Same, when the URL targets a #section the page will glide to. */
const HASH_WINDOW_MS = 2000;
/** Most stagger steps in one entrance, so long lists don't trail. */
const MAX_LOAD_STEPS = 8;
const MAX_SCROLL_STEPS = 4;

/** Load: 70ms per step; scroll: 40ms. Mirrors the tokens in globals.css. */
const LOAD_STEP_MS = 70;
const SCROLL_STEP_MS = 40;

export function RevealController() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.hasAttribute("data-reveals")) return;
    root.setAttribute("data-reveal-live", "");

    let windowEnd = 0;
    let currentMain: Element | null = null;
    const observed = new WeakSet<Element>();

    const show = (el: Element, mode: "load" | "scroll" | "instant", step = 0) => {
      const html = el as HTMLElement;
      const explicit = html.dataset.revealStep;
      const n = explicit === undefined ? step : Number(explicit);
      const ms = mode === "load" ? LOAD_STEP_MS : SCROLL_STEP_MS;
      if (mode !== "instant") html.style.setProperty("--reveal-delay", `${n * ms}ms`);
      html.dataset.revealed = mode;
    };

    const io = new IntersectionObserver(
      (entries) => {
        const load = performance.now() < windowEnd;
        const arriving = entries
          .filter((e) => {
            if (e.isIntersecting) return true;
            // Above the viewport already (a restored scroll): just show it.
            if (e.boundingClientRect.bottom <= 0) {
              io.unobserve(e.target);
              show(e.target, "instant");
            }
            return false;
          })
          .map((e) => e.target)
          .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
        arriving.forEach((el, i) => {
          io.unobserve(el);
          show(el, load ? "load" : "scroll", Math.min(i, load ? MAX_LOAD_STEPS : MAX_SCROLL_STEPS));
        });
      },
      // Scroll reveals start a little before the block enters the screen.
      { rootMargin: "0px 0px 10% 0px" },
    );

    const scan = () => {
      const main = document.querySelector("main");
      if (main && main !== currentMain) {
        currentMain = main;
        windowEnd = performance.now() + (location.hash.length > 1 ? HASH_WINDOW_MS : LOAD_WINDOW_MS);
      }
      document.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        io.observe(el);
      });
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  return null;
}
