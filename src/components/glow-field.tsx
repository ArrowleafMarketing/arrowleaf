/**
 * Animated brand glow: soft color blobs drifting behind content.
 *
 * The moving version of the style guide's mesh gradient: the same orange /
 * pink / magenta / cyan field from the cover page, but alive. Each blob is a
 * radial gradient (no `filter: blur`, which is expensive to animate).
 *
 * Motion: every blob sways horizontally and vertically on two *different*
 * periods, plus a slower breathe in scale. Mismatched periods make each blob
 * trace a continuously curving path (a Lissajous figure) instead of easing to
 * a stop at waypoints, so the field keeps travelling. Keyframes live in
 * globals.css; the numbers here are the only tuning knobs.
 *
 * Accent colors are allowed here: gradients are exactly the "special
 * circumstance" the style guide reserves them for.
 *
 * Drop it inside any `relative isolate overflow-hidden` container.
 */

type Motion = {
  /** Horizontal sway amplitude, each side of center. Travel is 2×. */
  dx: string;
  /** Vertical sway amplitude, each side of center. Travel is 2×. */
  dy: string;
  /** Seconds for one sweep across. Lower = faster. */
  xPeriod: number;
  yPeriod: number;
  breathePeriod: number;
  /** Negative start offset (seconds) so blobs begin mid-path, out of phase. */
  offset: number;
};

type Blob = {
  /** A brand color token, referenced as a CSS variable, never a raw hex. */
  color: string;
  /** Strength at the blob's center, as a percentage of the color. */
  alpha: number;
  /** Position and size. Mobile-first, overridden at `sm`. */
  className: string;
  motion: Motion;
};

/** Sine-shaped in-out: the smoothest turnaround at each end of a sway. */
const EASE = "cubic-bezier(0.37, 0, 0.63, 1)";

/*
  Positions are mobile-first, then overridden at `sm`. A phone hero is narrow
  and very tall, so the blobs stack down its length; a desktop hero is wide and
  short, so they spread across it. Blob width never drops below 26rem, which on
  a phone is wider than the screen: that's what keeps the field full.
*/
const blobs: readonly Blob[] = [
  {
    color: "var(--color-orange)",
    alpha: 72,
    className: "-left-[45%] -top-[4%] sm:-left-[18%] sm:-top-[30%] w-[62vw]",
    motion: { dx: "24vw", dy: "22vh", xPeriod: 11, yPeriod: 14, breathePeriod: 9, offset: -2 },
  },
  {
    color: "var(--color-neon-red)",
    alpha: 38,
    className: "-left-[30%] top-[55%] sm:left-[6%] sm:top-[38%] w-[46vw]",
    motion: { dx: "20vw", dy: "26vh", xPeriod: 13, yPeriod: 10, breathePeriod: 12, offset: -5 },
  },
  {
    color: "var(--color-magenta)",
    alpha: 55,
    className: "left-[10%] top-[28%] sm:left-[28%] sm:top-[4%] w-[52vw]",
    motion: { dx: "26vw", dy: "20vh", xPeriod: 9.5, yPeriod: 15, breathePeriod: 10, offset: -4 },
  },
  {
    color: "var(--color-cyan)",
    alpha: 78,
    className: "-right-[50%] -top-[6%] sm:-right-[18%] sm:-top-[20%] w-[60vw]",
    motion: { dx: "22vw", dy: "24vh", xPeriod: 12, yPeriod: 11, breathePeriod: 13, offset: -8 },
  },
  {
    color: "var(--color-lapis)",
    alpha: 16,
    className: "-right-[40%] top-[70%] sm:right-[4%] sm:top-[42%] w-[44vw]",
    motion: { dx: "18vw", dy: "22vh", xPeriod: 14, yPeriod: 12.5, breathePeriod: 11, offset: -6 },
  },
];

function animationFor(m: Motion) {
  const run = (name: string, period: number, offset: number) =>
    `${name} ${period}s ${EASE} ${offset}s infinite alternate`;
  return [
    run("glow-sway-x", m.xPeriod, m.offset),
    // Staggered from x so the two axes never peak together.
    run("glow-sway-y", m.yPeriod, m.offset * 1.7),
    run("glow-breathe", m.breathePeriod, m.offset * 0.6),
  ].join(", ");
}

export function GlowField({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      {blobs.map((blob) => (
        <span
          key={blob.color}
          className={`absolute aspect-square min-w-[26rem] max-w-[64rem] rounded-full [will-change:transform,translate,scale] ${blob.className}`}
          style={
            {
              "--dx": blob.motion.dx,
              "--dy": blob.motion.dy,
              animation: animationFor(blob.motion),
              backgroundImage: `radial-gradient(closest-side, color-mix(in oklab, ${blob.color} ${blob.alpha}%, transparent), transparent)`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
