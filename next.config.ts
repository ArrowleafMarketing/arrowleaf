import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // On by default for `next dev` since 16.1. Disabled because it restores
    // stale Tailwind output across restarts: Tailwind v4 only re-runs when
    // globals.css itself changes, so classes that first appear in a new
    // component file silently never get generated. This site is small enough
    // that a cold dev compile costs well under a second.
    turbopackFileSystemCacheForDev: false,
    // Runs route navigations as React view transitions, which drives the
    // page-drop animation (see src/components/page-transition.tsx).
    viewTransition: true,
  },
};

export default nextConfig;
