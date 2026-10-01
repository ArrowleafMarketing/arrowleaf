import Link from "next/link";
import { ArrowIcon } from "@/components/arrow-icon";
import { FloatingHeader } from "@/components/floating-header";
import { LogoLockup } from "@/components/logo";
import { MobileMenu } from "@/components/mobile-menu";
import { NavLink } from "@/components/nav-link";
import { SolutionsMenu } from "@/components/solutions-menu";
import { brand } from "@/lib/brand";

/**
 * Slim sticky header: the pattern shared by every reference site: logo left,
 * sparse nav, single CTA right.
 *
 * Rendered once in the root layout so it persists across pages. The shell
 * (FloatingHeader) docks it at the top and floats it as a glass capsule once
 * the page scrolls: pass `float={false}` there to keep it attached. While a
 * page transition runs, the shell names it `site-header` so it stays pinned
 * above the moving pages (see "Page transitions" in globals.css).
 *
 * Uses the secondary lockup because the primary (with "marketing + media") is
 * not yet available as a vector. See docs/BRAND.md, "Asset gaps", swap it in
 * here when it arrives, since the style guide specifies primary for the header.
 */
export function SiteHeader() {
  return (
    <FloatingHeader>
      <Link href="/" aria-label={`${brand.shortName} home`}>
        <LogoLockup className="h-7 w-auto text-ink" title="" />
      </Link>

      <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
        <NavLink href="/about">About</NavLink>
        <SolutionsMenu />
        <NavLink href="/results">Results</NavLink>
      </nav>

      <div className="flex items-center gap-1.5">
      {/* The arrow swings from → to ↗ on hover/focus, with a small spring
          overshoot so it reads as pointing rather than just rotating. */}
      <Link
        href="/contact"
        className="group inline-flex items-center gap-1.5 rounded-brand bg-ink px-4 py-2 text-sm font-medium text-white transition-[background-color,border-radius] duration-500 ease-brand hover:bg-lapis group-data-[floating=true]/header:rounded-full"
      >
        Let&apos;s talk
        <ArrowIcon className="transition-transform duration-300 ease-spring group-hover:-rotate-45 group-focus-visible:-rotate-45" />
      </Link>
        <MobileMenu />
      </div>
    </FloatingHeader>
  );
}
