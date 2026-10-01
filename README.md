# Arrowleaf Marketing + Media: website

Marketing site for [Arrowleaf Marketing + Media](https://arrowleafmarketing.com),
a boutique marketing and media team in Boise, Idaho.

Built with Next.js 16 (App Router, Turbopack), React 19, TypeScript, and
Tailwind CSS v4.

## Getting started

```bash
npm run dev
```

Then open http://localhost:3000.

| Route    | Purpose                                                        |
| -------- | -------------------------------------------------------------- |
| `/`          | Home: hero with the scroll-to-fullscreen reel, then Solutions.  |
| `/about`     | Mock page: mission, beliefs, values from the style guide.      |
| `/solutions` | Mock page: the four departments.                               |
| `/results`   | Mock page: clients from the 2025 recap; case studies to come.  |
| `/brand`     | Internal brand reference. Live rendering of every design token. |

`/brand` is `noindex`. Use it to eyeball changes to the palette, type scale,
logo marks, and gradient utilities.

## Scripts

```bash
npm run dev     # dev server (Turbopack)
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Brand

**`docs/BRAND.md` is the reference**, palette with usage rules, typography
roles, logo variants, voice, personas, and the asset inventory. It is digested
from the September 2025 style guide.

Brand values live in three places that must stay in sync:

1. `src/lib/brand.ts`, TypeScript constants (metadata, alt text, palette)
2. `src/app/globals.css`, Tailwind v4 `@theme` tokens and brand utilities
3. `/brand`, the live reference page

### Tokens at a glance

```
Colors    volt  lapis  paper  neon-red  ink  white  cyan  orange  magenta
Semantic  background  foreground  muted  hairline
Fonts     font-sans (Poppins)   font-serif (IBM Plex Serif)
Sizes     text-display  text-hero
Radius    rounded-brand  rounded-brand-lg
Utilities bg-mesh-warm  bg-mesh-cool  bg-pixel-grid  mark-volt
```

## Project layout

```
src/
├── app/
│   ├── layout.tsx        root layout, fonts, metadata + viewport
│   ├── globals.css       Tailwind v4 @theme tokens + brand utilities
│   ├── page.tsx          placeholder home
│   ├── brand/page.tsx    internal brand reference
│   └── icon.png, apple-icon.png, favicon.ico
├── components/
│   └── logo.tsx          LogoIcon, LogoLockup (inline SVG, currentColor)
└── lib/
    └── brand.ts          brand constants

public/brand/             curated brand assets (732 KB)
docs/BRAND.md             the brand reference
```

## Before launch

`docs/BRAND.md` has a short **Asset gaps** list of things that must come from
the client: most importantly the **primary logo lockup** (not present in the
media export) and **real photography** (the export's imagery is almost entirely
stock/theme placeholder).

## Contributing

`AGENTS.md` carries the working rules, Next.js 16 deprecations to avoid and the
brand non-negotiables. Read it and `docs/BRAND.md` before writing UI.
