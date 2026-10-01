/** Symmetric ease: builds speed, travels, lands softly. */
export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

type Interrupt = "wheel" | "touchstart" | "keydown" | "pointerdown";

/**
 * Eased programmatic scroll to `y`. Native `behavior: "smooth"` can't be
 * timed and feels abrupt. Input listed in `interruptOn` (by default any
 * wheel, touch, key or pointer press) hands control straight back to the
 * visitor. Returns a cancel function.
 */
export function animateScrollTo(
  y: number,
  duration: number,
  {
    ease = easeInOutCubic,
    onDone,
    interruptOn = ["wheel", "touchstart", "keydown", "pointerdown"],
  }: { ease?: (t: number) => number; onDone?: () => void; interruptOn?: readonly Interrupt[] } = {},
) {
  const from = window.scrollY;
  const dy = y - from;
  let frame = 0;
  let start = 0;
  const stop = () => {
    cancelAnimationFrame(frame);
    interruptOn.forEach((type) => window.removeEventListener(type, stop));
  };
  const step = (now: number) => {
    if (!start) start = now;
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo({ top: from + dy * ease(t), behavior: "instant" });
    if (t < 1) frame = requestAnimationFrame(step);
    else {
      stop();
      onDone?.();
    }
  };
  interruptOn.forEach((type) => window.addEventListener(type, stop, { passive: true }));
  frame = requestAnimationFrame(step);
  return stop;
}
