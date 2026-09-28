"use client";

import { useEffect, useState } from "react";

/** Scroll distance before the header lifts off into a floating capsule. */
const DETACH_AT = 16;

/**
 * The header's shell. Attached full-width at the top of the page; once the
 * page scrolls it detaches into a floating "liquid glass" capsule — still
 * nearly full width, inset just enough to float (`--float-inset`: 8–16px),
 * rounded, frosted and brightening what's behind it, with a top-edge
 * highlight and a soft drop shadow. It re-docks at the top.
 *
 * The capsule's inner padding shrinks by the same inset, so the logo, nav and
 * CTA stay exactly where they are when it detaches — only the glass moves.
 *
 * Structure matters here:
 *  - The glass is its own layer behind the content, not a style on the
 *    content. `backdrop-filter` (or any positioning) on the content wrapper
 *    would become the containing block for the Solutions dropdown, which is
 *    positioned against the header itself.
 *  - The glass layer and the content morph with identical sizes and timing,
 *    so they move as one.
 *  - The header is only given its `view-transition-name` while a page
 *    transition is running (`:active-view-transition`). A permanent name
 *    makes it a "backdrop root", and the glass inside could then only blur
 *    the header's own (empty) contents instead of the page behind it.
 *  - The header keeps the same 65px footprint in both states, so the page
 *    never shifts when it detaches. Its empty strip ignores the pointer while
 *    floating, so the page beside the capsule stays clickable.
 *
 * Set `float={false}` to keep the classic attached header.
 */
export function FloatingHeader({
  children,
  float = true,
}: {
  children: React.ReactNode;
  float?: boolean;
}) {
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    if (!float) return;
    let frame = 0;
    const check = () => {
      frame = 0;
      setFloating(window.scrollY > DETACH_AT);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [float]);

  const on = floating && float;

  return (
    <header
      data-floating={on ? "true" : undefined}
      className="group/header pointer-events-none sticky top-0 z-50 h-[65px] [--float-inset:clamp(0.5rem,1.25vw,1rem)] [:root:active-view-transition_&]:[view-transition-name:site-header]"
    >
      {/* Glass surface. Negative z keeps it under the (unpositioned) content. */}
      <div
        aria-hidden
        className={[
          "absolute inset-x-0 top-0 -z-10 mx-auto h-[65px] w-full",
          "border border-transparent border-b-hairline",
          "bg-paper/80 [backdrop-filter:blur(12px)_saturate(1)_brightness(1)]",
          "shadow-[0_0_0_0_transparent,0_0_0_0_transparent,inset_0_0_0_0_transparent,inset_0_0_0_0_transparent]",
          "transition-[top,width,height,border-radius,background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-brand",
          // Floating: a frosted capsule.
          "group-data-[floating=true]/header:top-2 group-data-[floating=true]/header:h-12",
          "group-data-[floating=true]/header:w-[calc(100%-2*var(--float-inset))]",
          "group-data-[floating=true]/header:rounded-3xl",
          "group-data-[floating=true]/header:border-white/60",
          "group-data-[floating=true]/header:bg-white/50",
          "group-data-[floating=true]/header:[backdrop-filter:blur(24px)_saturate(1.8)_brightness(1.08)]",
          "group-data-[floating=true]/header:shadow-[0_14px_36px_-14px_rgb(22_28_22/0.32),0_2px_8px_-2px_rgb(22_28_22/0.12),inset_0_1px_0_0_rgb(255_255_255/0.8),inset_0_-1px_0_0_rgb(22_28_22/0.06)]",
        ].join(" ")}
      >
        {/* Sheen: light catching the top of the glass. */}
        <span className="absolute inset-0 rounded-[inherit] bg-linear-to-b from-white/55 via-white/5 to-transparent opacity-0 transition-opacity duration-500 ease-brand group-data-[floating=true]/header:opacity-100" />
      </div>

      <div
        className={[
          "pointer-events-auto mx-auto flex h-16 w-full items-center justify-between gap-6 px-[var(--gutter)]",
          "transition-[margin,width,height,padding] duration-500 ease-brand",
          "group-data-[floating=true]/header:mt-2 group-data-[floating=true]/header:h-12",
          "group-data-[floating=true]/header:w-[calc(100%-2*var(--float-inset))]",
          "group-data-[floating=true]/header:px-[calc(var(--gutter)-var(--float-inset))]",
        ].join(" ")}
      >
        {children}
      </div>
    </header>
  );
}
