"use client";

import { useEffect, useRef, useState } from "react";
import { pillars } from "@/lib/services";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * The three pillars as flip cards, each sitting on a solid offset shadow in a
 * brand color (the reel tile's shadow language).
 *
 * - A calm cue that they're interactive: one card at a time does a small double
 *   bounce off its shadow and settles, with a pause before the next card and a longer
 *   rest after the last. It stops for good the first time anyone flips a card.
 * - Input by device: with a mouse, hovering flips a card and leaving flips it
 *   back (mouse clicks do nothing). A tap toggles it on touch screens; Enter or
 *   Space toggles it from the keyboard, and tabbing away turns it back.
 * - Hover is detected on the card's slot (the <li>), never on the rotating
 *   card itself. Mid-flip the card is edge-on and its hit area collapses to a
 *   sliver, which would fire a false "leave" and make the card flicker.
 * - The back is filled with the card's shadow color and plays a small
 *   animation for its idea; it restarts each time the card turns over. While
 *   a card is flipped its shadow turns Ink, so the colored back doesn't merge
 *   into a same-colored shadow.
 *
 * Motion runs on the Web Animations API (the hop) and SVG's own animation
 * elements (the backs), so none of it depends on new stylesheet keyframes.
 * Under reduced motion there's no hop, the flip is instant, and the backs show
 * a still frame.
 */

/** First lift, after the page has settled. */
const HOP_START_MS = 2000;
/** How far a card lifts on the first bounce; the second reaches half that. */
const HOP_LIFT_PX = 4;
/** Both bounces, start to settle. */
const HOP_MS = 1100;
/** From one card's hop to the next (so ~0.7s of stillness between them). */
const HOP_GAP_MS = 1800;
/** Rest after the last card before the sequence starts again. */
const HOP_REST_MS = 3500;

/**
 * A soft double bounce. Each rise eases out and each fall eases in, like a
 * light object under gravity; the second bounce is half the height and the
 * last landing eases in and out so it settles rather than stops.
 */
const RISE = "cubic-bezier(0.25, 0, 0.35, 1)";
const FALL = "cubic-bezier(0.6, 0, 0.8, 1)";
const HOP_KEYFRAMES: Keyframe[] = [
  { translate: "0 0", easing: RISE },
  { translate: `0 -${HOP_LIFT_PX}px`, offset: 0.26, easing: FALL },
  { translate: "0 0", offset: 0.5, easing: RISE },
  { translate: `0 -${HOP_LIFT_PX / 2}px`, offset: 0.7, easing: "cubic-bezier(0.45, 0, 0.55, 1)" },
  { translate: "0 0" },
];

/** Shadow and back face share a color; text on each back is chosen for contrast. */
const TONES = [
  { surface: "bg-volt", text: "text-ink" },
  { surface: "bg-neon-red", text: "text-white" },
  { surface: "bg-lapis", text: "text-white" },
] as const;

type ArtProps = { still: boolean };

/** Intention: a target, crosshairs locking onto the center. */
function TargetArt({ still }: ArtProps) {
  const lock = (dx: number, dy: number) =>
    still ? null : (
      <animateTransform
        attributeName="transform"
        type="translate"
        values={`${dx},${dy}; 0,0; 0,0; ${dx},${dy}`}
        keyTimes="0; 0.38; 0.72; 1"
        dur="3.2s"
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.2 0.8 0.2 1; 0 0 1 1; 0.4 0 0.8 0.4"
      />
    );
  return (
    <svg viewBox="0 0 76 76" fill="none" aria-hidden className="size-16 shrink-0 sm:size-[4.5rem]">
      <circle cx="38" cy="38" r="30" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="6 7">
        {!still && (
          <animateTransform attributeName="transform" type="rotate" from="0 38 38" to="360 38 38" dur="14s" repeatCount="indefinite" />
        )}
      </circle>
      <circle cx="38" cy="38" r="17" stroke="currentColor" strokeOpacity="0.55" strokeWidth="2" />
      <g stroke="var(--color-lapis)" strokeWidth="3.5" strokeLinecap="round">
        <line x1="38" y1="4" x2="38" y2="20">{lock(0, -8)}</line>
        <line x1="38" y1="56" x2="38" y2="72">{lock(0, 8)}</line>
        <line x1="4" y1="38" x2="20" y2="38">{lock(-8, 0)}</line>
        <line x1="56" y1="38" x2="72" y2="38">{lock(8, 0)}</line>
      </g>
      <circle cx="38" cy="38" r="6" fill="var(--color-ink)">
        {!still && (
          <animate attributeName="r" values="0; 0; 7; 6; 6; 0" keyTimes="0; 0.32; 0.42; 0.48; 0.74; 0.9" dur="3.2s" repeatCount="indefinite" />
        )}
      </circle>
    </svg>
  );
}

/** Integration: three streams flowing together into one line. */
function MergeArt({ still }: ArtProps) {
  const flow = still ? null : (
    <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.2s" repeatCount="indefinite" />
  );
  return (
    <svg viewBox="0 0 76 76" fill="none" aria-hidden className="size-16 shrink-0 sm:size-[4.5rem]" strokeLinecap="round">
      <path d="M4 14 C 24 14, 28 38, 46 38" stroke="currentColor" strokeWidth="3" strokeDasharray="5 7">{flow}</path>
      <path d="M4 38 L 46 38" stroke="currentColor" strokeWidth="3" strokeDasharray="5 7">{flow}</path>
      <path d="M4 62 C 24 62, 28 38, 46 38" stroke="currentColor" strokeWidth="3" strokeDasharray="5 7">{flow}</path>
      <path d="M46 38 L 72 38" stroke="var(--color-ink)" strokeWidth="5" strokeDasharray="8 6">{flow}</path>
      <circle cx="46" cy="38" r="6" fill="var(--color-volt)" stroke="var(--color-ink)" strokeWidth="2" />
    </svg>
  );
}

/** Impact: a line chart climbing to a Volt peak. */
function ClimbArt({ still }: ArtProps) {
  return (
    <svg viewBox="0 0 76 76" fill="none" aria-hidden className="size-16 shrink-0 sm:size-[4.5rem]">
      <path d="M6 6 V 70 H 72" stroke="currentColor" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
      <polyline
        points="10,62 24,52 36,56 48,36 60,30 68,12"
        pathLength="100"
        strokeDasharray="100"
        strokeDashoffset={still ? 0 : 100}
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {!still && (
          <animate attributeName="stroke-dashoffset" values="100; 0; 0" keyTimes="0; 0.45; 1" dur="3.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.2 0.8 0.2 1; 0 0 1 1" />
        )}
      </polyline>
      <circle cx="68" cy="12" r={still ? 6 : 0} fill="var(--color-volt)" stroke="var(--color-ink)" strokeWidth="2">
        {!still && (
          <animate attributeName="r" values="0; 0; 8; 6; 6; 0" keyTimes="0; 0.4; 0.48; 0.54; 0.9; 1" dur="3.8s" repeatCount="indefinite" />
        )}
      </circle>
    </svg>
  );
}

const ART = [TargetArt, MergeArt, ClimbArt];

export function PillarCards({ ref }: { ref?: React.Ref<HTMLUListElement> }) {
  const reduced = usePrefersReducedMotion();
  const [flipped, setFlipped] = useState<readonly boolean[]>([false, false, false]);
  /** Bumped on every turn to the back, which remounts (and so restarts) its art. */
  const [turns, setTurns] = useState<readonly number[]>([0, 0, 0]);
  const [engaged, setEngaged] = useState(false);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  /** How the current press started: mouse clicks are ignored (hover handles those). */
  const pressType = useRef("");
  /** Which slots the mouse is over, so a keyboard blur doesn't flip a hovered card. */
  const hovered = useRef<boolean[]>([false, false, false]);

  const flip = (i: number, toBack: boolean) => {
    setFlipped((f) => (f[i] === toBack ? f : f.map((v, k) => (k === i ? toBack : v))));
    if (toBack) setTurns((t) => t.map((v, k) => (k === i ? v + 1 : v)));
    setEngaged(true);
  };

  // The "you can touch these" cue: one card's double bounce at a time, until someone does.
  useEffect(() => {
    if (reduced || engaged) return;
    const timers = new Set<number>();
    const running: Animation[] = [];
    const later = (fn: () => void, ms: number) => {
      const t = window.setTimeout(() => {
        timers.delete(t);
        fn();
      }, ms);
      timers.add(t);
    };
    const cycle = () => {
      cardRefs.current.forEach((el, i) => {
        later(() => {
          if (el) running.push(el.animate(HOP_KEYFRAMES, { duration: HOP_MS }));
        }, i * HOP_GAP_MS);
      });
      later(cycle, (cardRefs.current.length - 1) * HOP_GAP_MS + HOP_MS + HOP_REST_MS);
    };
    later(cycle, HOP_START_MS);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      running.forEach((a) => a.cancel());
    };
  }, [reduced, engaged]);

  return (
    <ul ref={ref} className="grid gap-5 pb-[6px] pr-[9px] will-change-[opacity,transform] sm:grid-cols-3 sm:pb-[8px] sm:pr-[12px]">
      {pillars.map((p, i) => {
        const Art = ART[i];
        const tone = TONES[i];
        return (
          <li
            key={p.word}
            data-reveal
            className="group relative perspective-[1100px]"
            onPointerEnter={(e) => {
              if (e.pointerType !== "mouse") return;
              hovered.current[i] = true;
              flip(i, true);
            }}
            onPointerLeave={(e) => {
              if (e.pointerType !== "mouse") return;
              hovered.current[i] = false;
              flip(i, false);
            }}
          >
            {/* The offset shadow (6px, 8px from sm). Stretches 1.5x on hover, and
                turns Ink while the card shows its (same-colored) back. */}
            <span
              aria-hidden
              className={`absolute inset-0 translate-[6px] rounded-brand-lg sm:translate-[8px] ${
                flipped[i] ? "bg-ink" : tone.surface
              } transition-[translate,background-color] duration-500 ease-spring group-hover:translate-[9px] sm:group-hover:translate-[12px]`}
            />
            <button
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              type="button"
              aria-pressed={flipped[i]}
              data-flipped={flipped[i] ? "true" : undefined}
              onPointerDown={(e) => {
                pressType.current = e.pointerType;
              }}
              onClick={() => {
                // Mouse: hover already did it. Touch tap or keyboard: toggle.
                const viaMouse = pressType.current === "mouse";
                pressType.current = "";
                if (!viaMouse) flip(i, !flipped[i]);
              }}
              onBlur={() => {
                if (flipped[i] && !hovered.current[i]) flip(i, false);
              }}
              className="relative block h-full w-full cursor-pointer text-left transform-3d transition-transform duration-700 ease-spring data-[flipped=true]:rotate-y-180"
            >
              {/* Front. Top-aligned, so the number, word and line start at the
                  same height on every card however long its line runs. */}
              <span className="relative flex h-full flex-col justify-start gap-1.5 rounded-brand-lg border border-ink/12 bg-white p-6 backface-hidden pin:py-[min(1.25rem,2.2svh)]">
                <span className="font-serif text-xs font-bold tracking-[0.2em] text-ink/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-2xl font-semibold tracking-tight text-ink">{p.word}</span>
                <span className="text-sm leading-relaxed text-ink/65">{p.line}</span>
              </span>

              {/* Back */}
              <span
                aria-hidden
                className={`absolute inset-0 flex items-center gap-4 rounded-brand-lg p-5 backface-hidden rotate-y-180 sm:gap-5 sm:p-6 ${tone.surface} ${tone.text}`}
              >
                <Art key={turns[i]} still={reduced} />
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="font-serif text-xs font-bold uppercase tracking-[0.2em] opacity-70">
                    {p.word}
                  </span>
                  <span className="text-xl font-semibold leading-tight tracking-tight sm:text-2xl">
                    {p.short}
                  </span>
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
