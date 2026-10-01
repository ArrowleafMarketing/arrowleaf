"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { LogoLockup } from "@/components/logo";
import { brand } from "@/lib/brand";
import { services } from "@/lib/services";

/**
 * The phone menu (below md, where the inline nav is hidden): a menu button
 * that opens a full-screen sheet with the same destinations as the desktop
 * nav, plus each service. Closes on navigation, on Escape, and from its own
 * close button; the page behind can't scroll while it's open.
 *
 * The sheet is portaled to <body> so it's positioned against the window, not
 * the header (which gets transforms and a view-transition name).
 */
const links = [
  { href: "/about", label: "About" },
  { href: "/solutions", label: "Solutions" },
  { href: "/results", label: "Results" },
  { href: "/contact", label: "Contact" },
] as const;

export function MobileMenu() {
  const pathname = usePathname();
  // Remembers which page the menu was opened on, so moving to another page
  // closes it without any extra state updates.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (on: boolean) => setOpenOn(on ? pathname : null);
  // Portals need the document: true only in the browser.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="inline-flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5 md:hidden"
      >
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden className="size-5">
          <path d="M3 6h14M3 10h14M3 14h14" />
        </svg>
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[200] flex flex-col overflow-y-auto bg-paper md:hidden"
          >
            <div className="page-gutter flex h-16 shrink-0 items-center justify-between">
              <Link href="/" onClick={() => setOpen(false)} aria-label={`${brand.shortName} home`}>
                <LogoLockup className="h-7 w-auto text-ink" title="" />
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
              >
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden className="size-5">
                  <path d="M5 5l10 10M15 5 5 15" />
                </svg>
              </button>
            </div>

            <nav aria-label="Mobile" className="page-gutter flex flex-1 flex-col pb-10">
              <ul className="grid">
                {links.map((l) => (
                  <li key={l.href} className="border-b border-ink/12">
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === l.href ? "page" : undefined}
                      className="flex items-center justify-between py-4 text-3xl font-semibold tracking-tight aria-[current=page]:text-lapis"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mt-10 font-serif text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
                Solutions
              </p>
              <ul className="mt-3 grid gap-2">
                {services.map((s) => (
                  <li key={s.id}>
                    <Link href={`/solutions/${s.id}`} onClick={() => setOpen(false)} className="text-lg text-ink/80">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-auto inline-flex justify-center rounded-full bg-ink px-6 py-4 text-base font-medium text-white"
              >
                Let&apos;s talk
              </Link>
            </nav>
          </div>,
          document.body,
        )}
    </>
  );
}
