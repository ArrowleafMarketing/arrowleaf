"use client";

import { useEffect, useRef } from "react";
import { LogoIcon } from "@/components/logo";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * The Arrowleaf mark as a "go" button. At rest it's the logo; when its card is
 * hovered (or the link is focused) the mark turns into an up-and-right arrow,
 * the direction its leaf already points.
 *
 * The change is one diagonal wipe traveling the way the leaf points: a single
 * edge sweeps from the bottom-left corner to the top-right, the logo cut away
 * ahead of it and the arrow revealed behind it, so you see the arrow come out
 * of the mark rather than replace it. Once it's through, the arrow does a
 * small double bounce up-right (the pillar cards' hop, pointed the way it
 * goes). Leaving plays the wipe back and the logo returns.
 *
 * The host must carry `group/cta` (for the wipe, pure CSS) and
 * `data-cta-host` (for the bounce, found from here, so the host needs no
 * wiring). Decorative: the link around it carries the accessible name.
 */

/** Clip polygons for a diagonal wipe edge at s (0 = bottom-left corner, 2 = top-right). */
const ahead = (s: number) =>
  `polygon(${(s - 2) * 100}% -100%, ${(s + 1) * 100}% 200%, 300% 200%, 300% -100%)`;
const behind = (s: number) =>
  `polygon(${(s - 2) * 100}% -100%, ${(s + 1) * 100}% 200%, -200% 200%, -200% -100%)`;

const WIPE_MS = 420;
const BOUNCE: Keyframe[] = [
  { translate: "0 0", easing: "cubic-bezier(0.25, 0, 0.35, 1)" },
  { translate: "2px -2px", offset: 0.28, easing: "cubic-bezier(0.6, 0, 0.8, 1)" },
  { translate: "0 0", offset: 0.52, easing: "cubic-bezier(0.25, 0, 0.35, 1)" },
  { translate: "1px -1px", offset: 0.72, easing: "cubic-bezier(0.45, 0, 0.55, 1)" },
  { translate: "0 0" },
];

export function LeafCta({ className = "" }: { className?: string }) {
  const arrowRef = useRef<SVGSVGElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const arrow = arrowRef.current;
    const host = arrow?.closest<HTMLElement>("[data-cta-host]");
    if (!arrow || !host || reduced) return;
    let bounce: Animation | undefined;
    const start = () => {
      bounce?.cancel();
      bounce = arrow.animate(BOUNCE, { duration: 600, delay: WIPE_MS - 40 });
    };
    const stop = () => bounce?.cancel();
    const enter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") start();
    };
    host.addEventListener("pointerenter", enter);
    host.addEventListener("pointerleave", stop);
    host.addEventListener("focusin", start);
    host.addEventListener("focusout", stop);
    return () => {
      host.removeEventListener("pointerenter", enter);
      host.removeEventListener("pointerleave", stop);
      host.removeEventListener("focusin", start);
      host.removeEventListener("focusout", stop);
      stop();
    };
  }, [reduced]);

  const layer =
    "absolute inset-0 m-auto size-[45%] transition-[clip-path] duration-[420ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none";

  return (
    <span
      aria-hidden
      className={`relative block size-10 rounded-full transition-transform duration-500 ease-spring group-hover/cta:scale-105 ${className}`}
    >
      <span
        className={`${layer} [clip-path:var(--rest)] group-hover/cta:[clip-path:var(--on)] group-has-focus-visible/cta:[clip-path:var(--on)] group-focus-visible/cta:[clip-path:var(--on)]`}
        style={{ "--rest": ahead(0), "--on": ahead(2) } as React.CSSProperties}
      >
        <LogoIcon title="" className="size-full" />
      </span>
      <span
        className={`${layer} [clip-path:var(--rest)] group-hover/cta:[clip-path:var(--on)] group-has-focus-visible/cta:[clip-path:var(--on)] group-focus-visible/cta:[clip-path:var(--on)]`}
        style={{ "--rest": behind(0), "--on": behind(2) } as React.CSSProperties}
      >
        <svg
          ref={arrowRef}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-full overflow-visible"
        >
          <path d="M4 20 20 4M8 4h12v12" />
        </svg>
      </span>
    </span>
  );
}
