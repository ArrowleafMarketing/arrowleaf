import { ViewTransition } from "react";
import { SiteFooter } from "@/components/site-footer";

/**
 * Page-level view transition: the incoming page drops down from the top like
 * a new window sliding over the old one, which recedes beneath it. The CSS
 * lives in globals.css under "Page transitions".
 *
 * Wrap each page's `<main>` in this: never the layout. Layouts persist
 * across navigations, so a boundary there would never enter or exit. The
 * header lives in the layout and is pinned out of the animation separately.
 *
 * The page's `<main>` must paint an opaque background (`bg-paper`): the
 * incoming page is a window sliding over the old one, and a transparent page
 * would show the old one through it.
 *
 * The site footer is rendered here, after the page, so it travels with the
 * page it belongs to instead of jumping as page heights change underneath
 * the transition.
 *
 * `default="none"` keeps it silent for everything except a page actually
 * mounting or unmounting during a navigation.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div className="flex flex-1 flex-col">
        {children}
        <SiteFooter />
      </div>
    </ViewTransition>
  );
}
