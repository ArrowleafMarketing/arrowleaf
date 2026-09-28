"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * A muted, looping background video that only plays while it's on screen
 * (and never under reduced motion, where it shows its poster).
 */
export function InViewVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => {
      io.disconnect();
      video.pause();
    };
  }, [reduced]);

  return (
    <video
      ref={ref}
      className={className}
      poster="/brand/video/reel-poster.webp"
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
    >
      <source src="/brand/video/reel-1080.mp4" type="video/mp4" media="(min-width: 1024px)" />
      <source src="/brand/video/reel-720.mp4" type="video/mp4" />
    </video>
  );
}
