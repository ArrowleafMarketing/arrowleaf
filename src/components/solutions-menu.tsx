"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowIcon } from "@/components/arrow-icon";
import { isActivePath } from "@/components/nav-link";
import { pillars, services } from "@/lib/services";

/**
 * "Solutions" mega-menu: a full-width panel showing the four departments as
 * cards, each in its own brand color, the same deck as the home page stack.
 *
 * Built as a disclosure (button + panel of links), not an ARIA `menu`, which is
 * the right pattern for site navigation.
 *
 * Opens on hover for mouse users (with a short close delay so the pointer can
 * travel from the trigger down to the panel), and on click/tap/Enter for
 * everyone else. Closes on Escape, on a click outside, when focus leaves the
 * menu, and when a link is followed.
 *
 * The panel and the page dim are positioned against the sticky header, which
 * is their nearest positioned ancestor: keep the wrappers here unpositioned.
 */

/** Grace period for the pointer to cross from the trigger into the panel. */
const CLOSE_DELAY_MS = 180;

export function SolutionsMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const onSolutions = isActivePath(usePathname(), "/solutions");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  /**
   * True while the panel is open only because the mouse is hovering it. A
   * click in that state confirms the menu rather than toggling it shut;
   * otherwise hover-then-click would open and immediately close it.
   */
  const openedByHover = useRef(false);

  const close = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    openedByHover.current = false;
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      // Only pull focus back if it was inside the menu; a hover-opened menu
      // shouldn't steal focus from wherever the user actually is.
      const hadFocus = wrapperRef.current?.contains(document.activeElement);
      close();
      if (hadFocus) buttonRef.current?.focus();
    }

    function onPointerDown(e: PointerEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) close();
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, close]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  return (
    <>
      {/* Page dim. Rendered before the panel so the panel paints above it. */}
      <div
        aria-hidden
        className={`absolute inset-x-0 top-full h-dvh bg-ink/25 transition-opacity duration-300 ease-brand ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        ref={wrapperRef}
        onPointerEnter={(e) => {
          if (e.pointerType !== "mouse") return;
          window.clearTimeout(closeTimer.current);
          if (!open) {
            openedByHover.current = true;
            setOpen(true);
          }
        }}
        onPointerLeave={(e) => {
          if (e.pointerType !== "mouse") return;
          closeTimer.current = window.setTimeout(close, CLOSE_DELAY_MS);
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close();
        }}
      >
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-current={onSolutions ? "page" : undefined}
          onClick={() => {
            if (openedByHover.current) {
              openedByHover.current = false;
              return;
            }
            setOpen((o) => !o);
          }}
          className={`relative inline-flex items-center gap-1.5 py-2 text-sm font-medium transition-colors ${
            open || onSolutions ? "text-ink" : "text-ink/80 hover:text-ink"
          }`}
        >
          {onSolutions && (
            <span aria-hidden className="absolute inset-x-0 -bottom-0.5 h-[3px] rounded-full bg-volt" />
          )}
          Solutions
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className={`size-3.5 transition-transform duration-300 ease-brand ${
              open ? "rotate-180" : ""
            }`}
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>

        {/*
          `invisible` (visibility: hidden) takes the closed panel out of the
          tab order and the accessibility tree. Visibility flips *instantly* on
          open: if it transitioned, the panel would stay hidden for the first
          frame and a quick Enter-then-Tab would skip straight past it. On close
          it waits 300ms so the fade-out can play.

          tabIndex={-1} lets a click on the panel's background take focus, so
          it doesn't count as focus leaving the menu.
        */}
        <div
          id={panelId}
          tabIndex={-1}
          className={`pointer-events-none page-gutter absolute inset-x-0 top-full z-10 pt-3 outline-none ${
            open
              ? "visible translate-y-0 opacity-100 [transition:opacity_300ms_var(--ease-brand),translate_300ms_var(--ease-brand),visibility_0s]"
              : "invisible -translate-y-2 opacity-0 [transition:opacity_300ms_var(--ease-brand),translate_300ms_var(--ease-brand),visibility_0s_300ms]"
          }`}
        >
          <div className="pointer-events-auto max-h-[calc(100dvh-5rem)] overflow-y-auto group-data-[floating=true]/header:mx-[calc(var(--float-inset)-var(--gutter))] rounded-brand-lg border border-hairline bg-paper shadow-[0_24px_80px_-24px_rgb(22_28_22_/_0.35)]">
            <div className="flex items-end justify-between gap-6 px-6 pt-5">
              <div>
                <p className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-ink/65">
                  Solutions
                </p>
                <p className="mt-1.5 text-2xl font-semibold tracking-tight">
                  Four disciplines,{" "}
                  <em className="font-serif font-normal tracking-normal">
                    one plan
                  </em>
                </p>
              </div>
              <Link
                href="/solutions"
                onClick={close}
                className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-ink/80 transition-colors hover:text-ink"
              >
                View all
                <ArrowIcon className="transition-transform duration-300 ease-brand group-hover:translate-x-0.5" />
              </Link>
            </div>

            <ul className="grid gap-3 px-6 pb-6 pt-5 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service, i) => (
                <li
                  key={service.id}
                  className={`transition-[opacity,translate] duration-500 ease-brand ${
                    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  }`}
                  style={{ transitionDelay: open ? `${80 + i * 55}ms` : "0ms" }}
                >
                  <Link
                    href={`/solutions#${service.id}`}
                    onClick={close}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-brand border p-5 transition-[translate,box-shadow] duration-300 ease-brand hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgb(22_28_22_/_0.45)] focus-visible:-translate-y-1 ${service.theme.surface} ${service.theme.text} ${service.theme.rule}`}
                  >
                    {/* Oversized ghost numeral: the deck's index, as texture. */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-1 -top-5 font-serif text-[7rem] font-bold leading-none opacity-[0.07] transition-transform duration-500 ease-brand group-hover:-translate-x-1 group-hover:translate-y-1"
                    >
                      {service.index}
                    </span>

                    <span className="font-serif text-xs font-bold tracking-[0.2em]">
                      {service.index}
                    </span>
                    <span className="mt-5 text-xl font-semibold leading-tight tracking-tight">
                      {service.title}
                    </span>
                    {/* Dropped on short laptop screens so the panel fits without
                        scrolling; the offerings below still carry the info. */}
                    <span
                      className={`mt-2 text-sm leading-relaxed [@media(max-height:720px)]:hidden ${service.theme.muted}`}
                    >
                      {service.summary}
                    </span>

                    <ul className={`mt-4 border-t pt-3 ${service.theme.rule}`}>
                      {service.offerings.map((offering) => (
                        <li
                          key={offering}
                          className="flex items-baseline gap-2 py-[3px] text-sm font-medium"
                        >
                          <span
                            aria-hidden
                            className="size-1 shrink-0 translate-y-[-0.2em] rounded-full bg-current opacity-50"
                          />
                          {offering}
                        </li>
                      ))}
                    </ul>

                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium">
                      Explore
                      <ArrowIcon className="transition-transform duration-300 ease-brand group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-4 border-t border-hairline bg-white/70 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-sm text-ink/80">
                <span className="font-serif italic text-ink">
                  {pillars.map((p) => p.word).join(" · ")}
                </span>
                <span aria-hidden className="mx-3 text-ink/25">
                  /
                </span>
                Not sure where to start? We&apos;ll figure it out together.
              </p>
              <Link
                href="/contact"
                onClick={close}
                className="group inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-brand bg-ink px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-lapis lg:self-auto"
              >
                Start a conversation
                <ArrowIcon className="transition-transform duration-300 ease-brand group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
