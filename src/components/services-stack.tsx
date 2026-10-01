"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowIcon } from "@/components/arrow-icon";
import { LeafCta } from "@/components/leaf-cta";
import { services } from "@/lib/services";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * The four service groups as a stack of cards that scroll over one another,
 * filed like folders: as each card slides up over the one before, that card's
 * title shrinks and rises into its top strip, so every card stays readable as
 * a tab above the next.
 *
 * The stacking itself is plain CSS `position: sticky` (the `stack-card`
 * utility in globals.css, applied as `sm:stack-card`): nothing hijacks the
 * scrollbar and it works from the keyboard. Each card sticks one tab height
 * lower than the one before, so exactly its tab strip is left showing. On
 * phones the overlap is off (a tall card would be clipped before it could
 * pin) and the cards fall back to a normal list.
 *
 * The title move is scroll-linked, read from the card positions: it starts the
 * moment the next card's top edge reaches this card's bottom, and finishes by
 * the time that edge reaches where the title started, so the title is always
 * ahead of the card covering it. The big title shrinks toward the tab while a
 * one-line tab label grows out of it and takes over; for a one-line title the
 * two coincide exactly, so it reads as the title itself shrinking. Scrolling
 * back reverses it. Under reduced motion the two just cross-fade in place.
 *
 * The section after the stack slides up over it like a fifth card, and the
 * last card's title folds into its tab as it does, so all four behave the
 * same. Whatever follows ServicesStack on a page gets that treatment.
 *
 * Each card links to its service page. The link is the Arrowleaf-mark button
 * at the end of the tab strip, stretched over the whole card, so hovering
 * anywhere on the card (even just its tab, once stacked) turns the mark into
 * an arrow.
 */

/** Distance from the viewport top for the first card, clearing the header. */
const STACK_TOP_REM = 6;
/**
 * Height of a card's tab strip, and so how far each card sticks below the one
 * before: the card's top padding, its index row, and the same again below.
 */
const TAB_REM = 4.25;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (a: number, b: number, n: number) => {
  const x = clamp01((n - a) / (b - a));
  return x * x * (3 - 2 * x);
};

/** An element's layout offset inside `root`, ignoring any transforms. */
function offsetIn(el: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

export function ServicesStack({ showHeader = true }: { showHeader?: boolean }) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const cards = [...list.querySelectorAll<HTMLElement>("[data-stack-card]")].map((li) => ({
      li,
      article: li.querySelector<HTMLElement>("article")!,
      title: li.querySelector<HTMLElement>("[data-title]")!,
      tab: li.querySelector<HTMLElement>("[data-tab]")!,
      rule: li.querySelector<HTMLElement>("[data-rule]")!,
    }));

    // Layout geometry, in each card's own coordinates. Re-read on resize.
    type Geo = { titleY: number; dx: number; dy: number; s: number; ruleK: number };
    let geo: Geo[] = [];
    const measure = () => {
      geo = cards.map(({ article, title, tab, rule }) => {
        const t = offsetIn(title, article);
        const l = offsetIn(tab, article);
        const r = offsetIn(rule, article);
        const titleStyle = getComputedStyle(title);
        const s = parseFloat(getComputedStyle(tab).fontSize) / parseFloat(titleStyle.fontSize);
        // Line up the scaled title's first line with the tab label's line.
        const lineGap = (tab.offsetHeight - parseFloat(titleStyle.lineHeight) * s) / 2;
        return {
          titleY: t.y,
          dx: l.x - t.x,
          dy: l.y + lineGap - t.y,
          s,
          // How much of the rule to pull back so it starts just after the label.
          ruleK: clamp01((l.x + tab.offsetWidth + 16 - r.x) / Math.max(1, rule.offsetWidth)),
        };
      });
    };

    let frame = 0;
    const update = () => {
      frame = 0;
      const stacked = getComputedStyle(cards[0].li).position === "sticky";
      // Whatever slides over the last card: the section after this one.
      const cover = list.closest("section")?.nextElementSibling;
      cards.forEach((card, i) => {
        const next = cards[i + 1]?.article ?? cover;
        let p = 0;
        if (stacked && next) {
          const a = card.article.getBoundingClientRect();
          const edge = next.getBoundingClientRect().top;
          p = clamp01((a.bottom - edge) / Math.max(1, a.height - geo[i].titleY));
        }
        const e = p * p * (3 - 2 * p);
        const fade = smooth(0.35, 0.75, p);
        const { dx, dy, s, ruleK } = geo[i];
        card.title.style.opacity = String(1 - fade);
        card.tab.style.opacity = String(fade);
        card.rule.style.transform = `scaleX(${1 - ruleK * e})`;
        if (reduced) {
          card.title.style.transform = "";
          card.tab.style.transform = "";
          return;
        }
        card.title.style.transform = `translate(${dx * e}px, ${dy * e}px) scale(${1 - (1 - s) * e})`;
        const back = 1 - e;
        card.tab.style.transform = `translate(${-dx * back}px, ${-dy * back}px) scale(${1 + (1 / s - 1) * back})`;
      });
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = () => {
      measure();
      request();
    };

    measure();
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", resize);
    const fonts = document.fonts;
    fonts?.ready.then(resize);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <section id="solutions" data-stack-section className="scroll-mt-16 bg-paper">
      <div className={`page-gutter pb-24 sm:pb-28 ${showHeader ? "pt-16 sm:pt-20" : "pt-24 sm:pt-28"}`}>
        {/* One compact line: eyebrow and heading on the left, a way out to
            the full page on the right. The cards do the explaining. */}
        {showHeader && (
          <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <div>
              <p data-reveal className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
                Solutions
              </p>
              <h2 data-reveal className="mt-2 text-3xl sm:text-4xl">
                What we <em>do</em>
              </h2>
            </div>
            <Link
              href="/solutions"
              data-reveal
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-lapis"
            >
              All solutions
              <ArrowIcon className="transition-transform duration-300 ease-brand group-hover:translate-x-0.5" />
            </Link>
          </header>
        )}

        <ol ref={listRef} className={showHeader ? "mt-8 sm:mt-10" : ""}>
          {services.map((service, i) => (
            <li
              key={service.id}
              id={service.id}
              data-stack-card
              className={`scroll-mt-24 sm:stack-card ${i < services.length - 1 ? "pb-6" : ""}`}
              style={
                {
                  "--stack-top": `${STACK_TOP_REM + i * TAB_REM}rem`,
                  zIndex: i + 1,
                } as React.CSSProperties
              }
            >
              <article
                data-reveal
                data-cta-host
                className={`group/cta ${service.theme.surface} ${service.theme.text} relative flex min-h-[clamp(24rem,58vh,34rem)] flex-col justify-between rounded-brand-lg border ${service.theme.rule} p-8 shadow-[0_-8px_40px_-12px_rgb(22_28_22_/_0.18)] sm:px-12 sm:pb-12 sm:pt-6`}
              >
                {/* The tab strip: index, a rule that shortens to make room for
                    the tab label (shown once the card is covered), and the
                    card's link. The label is positioned from the card, not the
                    strip, because the link's hit area needs the card as its box. */}
                <span
                  aria-hidden
                  data-tab
                  className="absolute left-24 top-6 hidden origin-top-left whitespace-nowrap sm:block text-xl font-semibold leading-none tracking-[-0.02em] opacity-0 will-change-transform"
                >
                  {service.title}
                </span>
                <div className="flex h-5 items-center gap-6">
                  <p className="font-serif text-sm font-bold leading-5 tracking-[0.2em]">
                    {service.index}
                  </p>
                  <span
                    aria-hidden
                    data-rule
                    className={`h-px flex-1 origin-right border-t ${service.theme.rule}`}
                  />
                  <Link
                    href={`/solutions/${service.id}`}
                    aria-label={`Explore ${service.title}`}
                    className="-my-2.5 shrink-0 rounded-full outline-offset-4 after:absolute after:inset-0 after:z-10 after:rounded-brand-lg"
                  >
                    <LeafCta className={service.theme.cta} />
                  </Link>
                </div>

                <div className="mt-10 grid gap-10 sm:mt-[4.5rem] md:grid-cols-[1.1fr_1fr] md:gap-16">
                  <div>
                    <h3 data-title className="origin-top-left text-4xl will-change-transform sm:text-5xl">
                      {service.title}
                    </h3>
                    <p
                      className={`mt-5 max-w-md text-lg leading-relaxed ${service.theme.muted}`}
                    >
                      {service.summary}
                    </p>
                  </div>

                  <ul className="flex flex-col justify-end gap-0">
                    {service.offerings.map((offering) => (
                      <li
                        key={offering}
                        className={`border-t ${service.theme.rule} py-3.5 text-base font-medium sm:text-lg`}
                      >
                        {offering}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
          {/* A screen of room after the last card, so the whole stack stays
              pinned while the next section slides up over it (that section
              is pulled up over this room: `data-stack-section` in
              globals.css). Sticky cards can't travel past the end of their
              list, so this has to be a list item, not padding. */}
          <li aria-hidden className="hidden h-svh sm:block" />
        </ol>
      </div>
    </section>
  );
}
