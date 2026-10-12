import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The old WordPress slug, kept alive for links and QR codes already out there.
      { source: "/back9-event", destination: "/back-9-partner", permanent: true },
    ];
  },
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
