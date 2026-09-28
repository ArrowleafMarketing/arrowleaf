"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** True when `pathname` is `href` or a page beneath it. */
export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

/**
 * Header nav link that marks the current page: full-strength ink plus a Volt
 * underline, and `aria-current="page"` for assistive tech.
 */
export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const active = isActivePath(usePathname(), href);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative py-2 text-sm font-medium transition-colors ${
        active ? "text-ink" : "text-ink/70 hover:text-ink"
      }`}
    >
      {children}
      {active && (
        <span aria-hidden className="absolute inset-x-0 -bottom-0.5 h-[3px] rounded-full bg-volt" />
      )}
    </Link>
  );
}
