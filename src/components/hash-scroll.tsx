"use client";

import { useEffect } from "react";

/**
 * Scrolls to the URL's `#section` after the page transition has landed.
 *
 * The browser's own jump-to-anchor fires while the view transition is still
 * running and lands in the wrong place, so pages that are linked to by hash
 * (e.g. /solutions#technology from the Solutions menu) render this instead:
 * the new page drops in, then glides down to the section.
 */
export function HashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    let cancelled = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const go = () => {
      if (cancelled) return;
      document.getElementById(id)?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    };

    // Wait for the transition when the browser exposes it; otherwise wait
    // out the drop duration from globals.css.
    const active = (document as Document & { activeViewTransition?: ViewTransition })
      .activeViewTransition;
    if (active) {
      active.finished.then(go, go);
    } else {
      const ms = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--page-drop-duration"),
      );
      const timer = window.setTimeout(go, (Number.isFinite(ms) ? ms : 850) + 60);
      return () => {
        cancelled = true;
        window.clearTimeout(timer);
      };
    }
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
