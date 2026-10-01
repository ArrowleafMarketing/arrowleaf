"use client";

import { useEffect, useRef, useState } from "react";
import { GlowField } from "@/components/glow-field";
import { PillarCards } from "@/components/pillar-cards";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { animateScrollTo, easeInOutCubic } from "@/lib/scroll";

/**
 * The hero stage: glow, headline copy (passed in as children), and a row along
 * the bottom with the three pillars and the showreel as a tile on the right,
 * the same height as the pillars.
 *
 * On large screens (the `pin:` variant in globals.css) the stage is exactly
 * one screen and pins in place; scrolling grows the reel from its tile to
 * fill the screen while the copy and pillars fade out, holds it full-screen,
 * then lets the page move on. Everywhere else the hero lays out normally and
 * the reel stays in its tile.
 *
 * How the growth works:
 *  - The reel is a full-stage video layer revealed through a `clip-path`
 *    window that starts exactly over the tile and opens to the full stage.
 *  - `growth` picks the direction:
 *      "down-left": the tile's top edge stays attached to the page. The
 *        headline and pillars keep scrolling up 1:1 with the wheel (the stage
 *        is pinned, so they're shifted to look like normal scrolling), while
 *        the reel spills left across the pillars and down to the bottom of the
 *        screen. It's full-screen the moment its top reaches the top.
 *      "up-left": the content stays put and the tile's bottom-right corner is
 *        the anchor; the reel opens up and left over everything.
 *  - The video inside is scaled and shifted so it stays cover-fit and centred
 *    in the window at every step, like an `object-fit: cover` box growing.
 *  - Scroll is a linear input, so progress runs through an ease-in-out curve:
 *    it starts gently, commits through the middle and settles at full size.
 * Whether the stage is pinned is read from CSS (`position: sticky`), so the
 * breakpoint, height and reduced-motion rules live in one place.
 *
 * The glow stays fixed behind the pinned stage rather than scrolling with the
 * content, so whatever the reel hasn't covered yet is still glowing, all the
 * way to full screen.
 *
 * Clicking the reel scrolls to the point where it's full screen, playing the
 * growth for you (an eased ~1.2s scroll the visitor can interrupt with the
 * wheel, touch or keys). Once it's full screen, or wherever the stage doesn't
 * pin, a click plays/pauses instead.
 *
 * The tile wears a stacked offset shadow in brand colors (Volt, Neon Red,
 * Lapis), stepping out down-right at full strength. The colors run as a
 * continuous conveyor (`tier-flow` in globals.css): each band emerges from
 * behind the tile, travels out through the stack, fades at the outer edge and
 * comes back in at the front, so the colors keep rotating through every
 * position. The flow widens on hover (the "click me" cue). The shadow tracks
 * the reel's window as it grows: same rect, same corner radius, so it keeps
 * flowing along the growing edge until it runs off the screen, fading just
 * before full screen. Under reduced motion it's a still stack.
 *
 * The play/pause control is always available (moving content over five
 * seconds must be pausable), and the reel doesn't autoplay under reduced
 * motion.
 */

/** Matches `rounded-brand-lg` (1.25rem) so the window starts flush with the tile. */
const START_RADIUS = 20;
/** Share of the pinned scroll spent growing; the rest holds at full size. */
const GROW_SHARE = 0.78;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const px = (n: number) => `${Math.round(n * 10) / 10}px`;

/**
 * The tile's offset shadow, in the order the colors emerge. Bands are spaced
 * one step apart (`--tier`: 3px on phones, 5px up) and travel three steps.
 */
const SHADOW_TIERS = ["bg-volt", "bg-neon-red", "bg-lapis"] as const;
/** Time for one band to travel from behind the tile to the outer edge. */
const FLOW_MS = 2400;
/** The flow begins shortly after load, so the first bands visibly emerge. */
const FLOW_START_MS = 450;

/** How long the click-to-expand scroll takes. */
const EXPAND_SCROLL_MS = 1200;

export type ReelGrowth = "down-left" | "up-left";

export function ShowcaseScroll({
  children,
  growth = "down-left",
}: {
  children: React.ReactNode;
  growth?: ReelGrowth;
}) {
  const reduced = usePrefersReducedMotion();
  /** null = follow the default (autoplay unless reduced motion). */
  const [userWantsPlay, setUserWantsPlay] = useState<boolean | null>(null);
  const [inView, setInView] = useState(false);
  const [tileHover, setTileHover] = useState(false);
  const wantsPlay = userWantsPlay ?? !reduced;

  const sceneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLUListElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const expandRef = useRef<HTMLButtonElement>(null);
  const tiersRef = useRef<HTMLDivElement>(null);
  /** Scroll position where the reel is full screen; null when not pinned. */
  const fullAtRef = useRef<number | null>(null);
  const progressRef = useRef(0);
  const cancelScrollRef = useRef<(() => void) | null>(null);

  // Scroll-driven growth.
  useEffect(() => {
    const scene = sceneRef.current;
    const stage = stageRef.current;
    const content = contentRef.current;
    const copy = copyRef.current;
    const list = pillarsRef.current;
    const slot = slotRef.current;
    const layer = layerRef.current;
    const video = videoRef.current;
    const button = buttonRef.current;
    const expand = expandRef.current;
    const tiers = tiersRef.current;
    if (!scene || !stage || !content || !copy || !list || !slot || !layer || !video || !button || !expand || !tiers) return;

    let frame = 0;
    let pinned = false;

    const update = () => {
      frame = 0;
      // Reads first, then writes, so each frame does one layout at most.
      const s = stage.getBoundingClientRect();
      const sl = slot.getBoundingClientRect();
      const sceneTop = scene.getBoundingClientRect().top;
      const travel = scene.offsetHeight - stage.offsetHeight;
      const bw = button.offsetWidth;
      const bh = button.offsetHeight;

      const W = s.width;
      const H = s.height;
      // The tile's resting position in the stage, independent of the content
      // shift applied below (the content wrapper starts at the stage's top).
      const c = content.getBoundingClientRect();
      const tile = { x: sl.left - s.left, y: sl.top - c.top, w: sl.width, h: sl.height };
      const scrolled = pinned ? Math.max(0, -sceneTop) : 0;

      let p: number, e: number, x: number, y: number, w: number, h: number, shift: number;
      if (growth === "down-left") {
        // Grow over exactly the distance it takes the tile's top to reach the
        // top of the screen, so the content tracks the scroll 1:1.
        p = pinned && tile.y > 0 ? clamp01(scrolled / tile.y) : 0;
        fullAtRef.current = pinned ? window.scrollY + sceneTop + tile.y : null;
        e = easeInOutCubic(p);
        shift = -tile.y * p;
        const top = tile.y + shift;
        const left = lerp(tile.x, 0, e);
        const right = lerp(tile.x + tile.w, W, e);
        const bottom = lerp(tile.y + tile.h, H, e);
        x = left; y = top; w = right - left; h = bottom - top;
      } else {
        p = pinned && travel > 0 ? clamp01(scrolled / (travel * GROW_SHARE)) : 0;
        fullAtRef.current = pinned ? window.scrollY + sceneTop + travel * GROW_SHARE : null;
        e = easeInOutCubic(p);
        shift = 0;
        x = lerp(tile.x, 0, e);
        y = lerp(tile.y, 0, e);
        w = lerp(tile.w, W, e);
        h = lerp(tile.h, H, e);
      }

      const radius = lerp(START_RADIUS, 0, e);
      layer.style.clipPath = `inset(${px(y)} ${px(W - x - w)} ${px(H - y - h)} ${px(x)} round ${px(radius)})`;
      // Keep the reel cover-fit and centred inside the window.
      const k = Math.max(w / W, h / H);
      video.style.transform = `translate3d(${px(x + w / 2 - W / 2)}, ${px(y + h / 2 - H / 2)}, 0) scale(${k})`;
      button.style.transform = `translate3d(${px(x + w - bw - 14)}, ${px(y + h - bh - 14)}, 0)`;
      // The expand hit-area tracks the window, so its focus ring outlines the reel.
      expand.style.transform = `translate3d(${px(x)}, ${px(y)}, 0)`;
      expand.style.width = px(w);
      expand.style.height = px(h);
      progressRef.current = p;
      // The shadow rides the window's edge until it runs off the screen; the
      // last sliver fades so nothing peeks out below once the stage unpins.
      tiers.style.transform = `translate3d(${px(x)}, ${px(y)}, 0)`;
      tiers.style.width = px(w);
      tiers.style.height = px(h);
      tiers.style.setProperty("--r", px(radius));
      tiers.style.opacity = (1 - clamp01((e - 0.9) / 0.1)).toFixed(3);
      tiers.style.visibility = "visible";
      content.style.transform = `translate3d(0, ${px(shift)}, 0)`;
      copy.style.opacity = String(1 - clamp01(e / 0.55));
      copy.style.transform = growth === "up-left" ? `translate3d(0, ${px(-40 * e)}, 0)` : "";
      list.style.opacity = String(1 - clamp01(e / 0.4));
      list.style.transform = `translate3d(0, ${px(24 * e)}, 0)`;
      layer.style.visibility = "visible";
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const remeasure = () => {
      pinned = getComputedStyle(stage).position === "sticky";
      schedule();
    };

    remeasure();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure);
    const ro = new ResizeObserver(remeasure);
    ro.observe(stage);
    ro.observe(slot);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      ro.disconnect();
    };
  }, [reduced, growth]);

  useEffect(() => () => cancelScrollRef.current?.(), []);

  const onReelClick = () => {
    const target = fullAtRef.current;
    if (target === null || progressRef.current >= 0.999) {
      setUserWantsPlay(!wantsPlay);
      return;
    }
    cancelScrollRef.current?.();
    if (reduced) window.scrollTo(0, target);
    else cancelScrollRef.current = animateScrollTo(target, EXPAND_SCROLL_MS);
  };

  // Only decode video while the scene is on screen.
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "200px 0px",
    });
    io.observe(scene);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (wantsPlay && inView) {
      // Rejects if the browser blocks playback; the button then offers Play.
      video.play().catch(() => setUserWantsPlay(false));
    } else {
      video.pause();
    }
  }, [wantsPlay, inView]);

  return (
    <div ref={sceneRef} className="relative pin:h-[220svh]">
      <div
        ref={stageRef}
        className="relative isolate pin:sticky pin:top-0 pin:flex pin:h-svh pin:flex-col"
      >
        <GlowField />

        <div ref={contentRef} className="will-change-transform pin:flex pin:flex-1 pin:flex-col">
          <div
            ref={copyRef}
            className="page-gutter pt-36 will-change-[opacity,transform] sm:pt-44 pin:flex pin:flex-1 pin:flex-col pin:justify-center pin:pb-[min(2.5rem,4svh)] pin:pt-16"
          >
            {children}
          </div>

          <div className="page-gutter grid gap-4 pb-16 pt-16 sm:pt-20 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] pin:pb-[min(2rem,3.5svh)] pin:pt-0">
            <PillarCards ref={pillarsRef} />

            {/* The tile sets where the reel starts. It shows the poster until the
                video layer has measured itself into place. Its bottom margin
                matches the cards' shadow reserve, so the reel lines up with the
                card faces. */}
            <div
              ref={slotRef}
              aria-hidden
              data-reveal="fade"
              data-reveal-step="6"
              className="aspect-video rounded-brand-lg bg-ink bg-[url(/brand/video/reel-poster.webp)] bg-cover bg-center lg:mb-[8px] lg:aspect-auto"
            />
          </div>
        </div>

        {/* The offset shadow. Positioned and sized to the reel's window every
            frame, above the page content and below the video. */}
        <div
          ref={tiersRef}
          aria-hidden
          data-reveal="fade"
          data-reveal-step="6"
          data-hover={tileHover ? "true" : undefined}
          className="invisible absolute left-0 top-0 z-[5] isolate [--flow-reach:calc(var(--tier)*3*var(--k))] [--k:1] [--r:20px] [--tier:3px] data-[hover=true]:[--k:1.45] sm:[--tier:5px]"
        >
          {SHADOW_TIERS.map((color, i) => (
            <span
              key={color}
              className={`absolute inset-0 rounded-[var(--r)] ${color} [animation:tier-flow_var(--flow-ms)_linear_var(--flow-delay)_infinite] motion-reduce:translate-[calc(var(--tier)*var(--i))] motion-reduce:[animation:none]`}
              style={
                {
                  "--i": i + 1,
                  "--flow-ms": `${FLOW_MS}ms`,
                  // A third of a cycle apart, so the bands stay evenly spaced.
                  "--flow-delay": `${FLOW_START_MS + (i * FLOW_MS) / SHADOW_TIERS.length}ms`,
                  // Resting order for the still stack under reduced motion.
                  zIndex: SHADOW_TIERS.length - i,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <div ref={layerRef} data-reveal="fade" data-reveal-step="6" className="invisible absolute inset-0 z-10 overflow-hidden">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full origin-center object-cover will-change-transform"
            poster="/brand/video/reel-poster.webp"
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Arrowleaf 2025 showreel"
          >
            <source src="/brand/video/reel-1080.mp4" type="video/mp4" media="(min-width: 1024px)" />
            <source src="/brand/video/reel-720.mp4" type="video/mp4" />
          </video>

          <button
            ref={expandRef}
            type="button"
            onClick={onReelClick}
            onPointerEnter={() => setTileHover(true)}
            onPointerLeave={() => setTileHover(false)}
            onFocus={() => setTileHover(true)}
            onBlur={() => setTileHover(false)}
            aria-label="Watch the showreel"
            title="Watch the showreel"
            className="absolute left-0 top-0 cursor-pointer rounded-[inherit] outline-offset-[-4px]"
          />

          <button
            ref={buttonRef}
            type="button"
            onClick={() => setUserWantsPlay(!wantsPlay)}
            aria-label={wantsPlay ? "Pause showreel" : "Play showreel"}
            className="absolute left-0 top-0 inline-flex items-center gap-2 rounded-full bg-ink/70 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-ink"
          >
            {wantsPlay ? (
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className="size-3">
                <rect x="3" y="2" width="3.5" height="12" rx="1" />
                <rect x="9.5" y="2" width="3.5" height="12" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className="size-3">
                <path d="M4 2.5v11a1 1 0 0 0 1.5.86l9-5.5a1 1 0 0 0 0-1.72l-9-5.5A1 1 0 0 0 4 2.5z" />
              </svg>
            )}
            {wantsPlay ? "Pause" : "Play reel"}
          </button>
        </div>
      </div>
    </div>
  );
}
