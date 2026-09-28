# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

Notes already confirmed for **Next.js 16.2.9** in this repo:

- `<Image priority>` is **deprecated** — use `preload` instead.
- `themeColor`, `colorScheme`, and `viewport` are **deprecated** on the
  `metadata` object — use the separate `export const viewport: Viewport`.
- Styling is **Tailwind v4**: tokens go in `@theme` inside
  `src/app/globals.css`. There is no `tailwind.config.js`. Custom utilities use
  `@utility`, not `@layer utilities`.
- `turbopackFileSystemCacheForDev` is **disabled** in `next.config.ts`. With it
  on (the 16.1+ default), dev restarts restored stale Tailwind CSS and classes
  in new component files never appeared. Don't re-enable it without checking
  that bug is gone. Separately, a running dev server can miss edits to
  `globals.css` (new `@keyframes`, rules) even with the cache off; the
  production build is always correct. If a globals change doesn't show up in
  dev, check the served CSS (`curl` the `/_next/static/...css` URL) and
  restart the dev server rather than debugging the code.
- If the Browser pane is **hidden**, Chrome throttles it to ~1 fps: screenshots
  lag and transitions look broken. Verify interactive state with JS
  (`aria-expanded`, computed styles) before assuming a bug.

## The brand comes first

This is the website for **Arrowleaf Marketing + Media**, a boutique marketing
agency. The brand is the product — getting it visibly right matters more here
than on a typical app.

**Read `docs/BRAND.md` before writing any UI.** It is the digested style guide:
palette with usage rules, typography roles, logo variants, voice, and personas.

### Non-negotiables

- **Never hardcode a hex value.** Use the tokens (`bg-volt`, `text-ink`,
  `bg-lapis`, `bg-paper`, …) defined in `src/app/globals.css`. If a color you
  need isn't a token, it probably isn't in the brand.
- **Never put accent colors (cyan, orange, magenta) on Volt Green.**
- On Lapis Blue and Neon Red, text and logo go **white**.
- Headings are Poppins SemiBold with the accent word in IBM Plex Serif italic —
  write it as `<h1>Marketing <em>made clear</em>.</h1>`; `globals.css` handles
  the rest.
- Body copy is Poppins ExtraLight (200). It's already the `body` default.
- Use `<LogoIcon>` / `<LogoLockup>` from `@/components/logo` rather than
  `<img>` — they inherit `currentColor` so the color rules above just work.
- **The site runs edge to edge.** Sections span the full window with the
  `page-gutter` utility for side padding — never wrap a section in a centered
  `max-w-*` container. Capping a *text block's* width for readability
  (`max-w-2xl` on a paragraph) is fine.
- **Every page animates in via `PageTransition`.** Wrap each page's `<main>`
  in it, give that `<main>` `bg-paper` (the incoming page is an opaque window
  sliding over the old one), and use `next/link` for internal links — a plain
  `<a>` does a full reload and skips the transition. The header lives in the
  root layout and is pinned out of the animation. For links to a `#section` on
  another page, render `<HashScroll />` on the target page.
- The palette is **light-first by design**. Do not add a `prefers-color-scheme`
  dark inversion; the colors are brand identity, not a user preference.

- **Motion follows `docs/MOTION.md`.** Tag every content block on a new
  page or section with `data-reveal` (eyebrow, heading, lede, CTA group, each
  card or row); the root layout's `RevealController` plays it in: a visible
  entrance for whatever is on screen when a page appears, a nearly invisible
  one while scrolling. Don't write per-page entrance animations, new easing
  curves or new durations: use the tokens and patterns listed there, and
  check the reduced-motion path.

### Keep the three token sources in sync

A brand value lives in three places. Change one, change all:

1. `src/lib/brand.ts` — TypeScript constants
2. `src/app/globals.css` — `@theme` tokens
3. `/brand` route — the live reference page

### Voice

Clear, direct, jargon-free — "a trusted friend who happens to know their stuff
about marketing." No hype, no black-box language, no overpromising. When writing
site copy, check it against the "What we don't do" list in `docs/BRAND.md`.

## Assets

Curated brand assets are in `public/brand/` — see the inventory and the **asset
gaps** list in `docs/BRAND.md`. Notably: there is no primary logo lockup yet,
and almost all photography in the original export is stock placeholder. Don't
ship theme-placeholder imagery.
