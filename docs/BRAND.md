# Arrowleaf Marketing + Media — brand reference

Digested from **[Arrowleaf] Brand Style Guide**, last updated September 2025
(prepared by Arrowleaf Marketing and Media & Tyler Shae Powell).

This file is the written reference. The machine-readable versions live in:

- `src/lib/brand.ts` — TypeScript constants (metadata, alt text, palette)
- `src/app/globals.css` — Tailwind v4 `@theme` tokens and brand utilities
- `/brand` route — live rendering of every token, for eyeballing changes

When a brand value changes, update all three.

---

## 1. Positioning

**Unique value proposition.** We connect with our clients. We show plans,
budgets, and performance in plain English. We are accountable stewards of our
clients' ad spend. We create and perform as if our client's businesses were our
own. We test purposefully and scale what works. We craft clean, usable creative
that moves buyers.

**What we don't do.** Gatekeep data. Play "black box." Confuse with jargon. Shy
away from responsibility and transparency. Hide misses, sandbag results, or
overpromise. Chase trends without strategy or experiment without learning.

**Mission.** Partner with owners to put brand, content, and paid growth on one
shared plan — and prove results with clear, repeatable measurement every month.

**Vision.** Our clients run on a simple growth system: clear positioning,
standout creative, and a test-and-scale engine that produces predictable
pipeline. Arrowleaf is the boutique, senior team known for tying creative to
revenue and making marketing decisions faster, together.

### Beliefs

- Culture over skill.
- Strategy beats tactics — sequence matters more than hustle.
- Brand and performance compound; you need both to grow past plateau.
- Quality outperforms volume when paired with consistent cadence.
- Data should decide, not dictate — measure what matters, ignore vanity.
- AI is a co-pilot, not autopilot — use it to speed craft, not replace it.
- Ethical marketing wins long-term — permission, clarity, and real value.
- Small, senior teams beat big, busy ones when accountability is clear.
- Creative is a growth lever, not decoration.

### Values

Transparency · Standing Out (uniqueness) · Clarity · Helpfulness · Success ·
Shared Interest · Exceptional Quality · Positivity · Integrity

---

## 2. Audience

Two personas drive site copy and IA. Both need the same thing stated
differently: **proof, plain language, and a partner they can trust.**

### Persona 01 — Jordan, owner-operator

38, entrepreneur in Boise, $100K+ annual revenue. Built the business on
determination; overwhelmed by websites, ads, and social. Busy schedule leaves no
room to do marketing herself.

- **Finds us via:** referrals from other owners, Google searches for Boise
  marketing agencies / fractional marketing support, local networking and
  chambers, targeted ads and LinkedIn content.
- **Pain:** overwhelmed by tasks she has no time or expertise for; struggles to
  find a partner she can truly trust.
- **Cares about:** trust and transparency, clear jargon-free communication,
  tangible revenue results, reliability and follow-through.

### Persona 02 — David, enterprise marketing lead

52, VP of Marketing at a national construction materials company doing hundreds
of millions annually. Large team, multimillion-dollar budgets, recurring
bandwidth gaps.

- **Finds us via:** strained in-house teams, agencies that overpromise and can't
  deliver at enterprise scale, high-stakes deadlines where failure is expensive.
- **Cares about:** proven delivery at scale with no missed deadlines;
  accountability and clarity (clear budgets, measurable KPIs, reporting
  executives understand); a partner that feels like an extension of his team;
  creative that performs.

---

## 3. Voice

Clear, direct, and jargon-free, making complex marketing feel simple and
actionable. **A trusted friend who happens to know their stuff about
marketing.** It balances professional confidence with approachable candor —
always transparent, focused on results, and unafraid to say the hard thing when
it helps clients move forward.

**Visual vibe keywords:** confident, clean, purposeful, transparent, modern,
energetic, trustworthy, straightforward, strategic, human.

---

## 4. Color

The brand is **clean and minimal at its core, energized by bold Volt electric
yellow-green and grounded by a lapis blue.**

Apply the **60-30-10 rule**: a dominant color (60%), a secondary (30%), and an
accent (10%).

### Primary

| Name                   | Hex       | Token           | Notes                                    |
| ---------------------- | --------- | --------------- | ---------------------------------------- |
| Volt Green             | `#d2eb37` | `volt`          | The signature color.                     |
| Lapis Blue             | `#0700ff` | `lapis`         | Grounds the brand; good for large fills. |
| Extra Light Yellow     | `#f4f4f2` | `paper`         | Default page canvas — warmer than white. |

### Secondary

| Name     | Hex       | Token      | Notes                                      |
| -------- | --------- | ---------- | ------------------------------------------ |
| Neon Red | `#f55d2c` | `neon-red` | Highlights and emphasis, not body text.    |
| White    | `#ffffff` | `white`    |                                            |
| Black    | `#161c16` | `ink`      | Near-black with a green cast. Default text.|

### Accent — special circumstances only

| Name    | Hex       | Token     |
| ------- | --------- | --------- |
| Cyan    | `#7df5f0` | `cyan`    |
| Orange  | `#ffaa06` | `orange`  |
| Magenta | `#cb6ce6` | `magenta` |

### Color rules

- **Never put accent colors on Volt Green.** The style guide is explicit
  ("Eww").
- On **Lapis** and **Neon Red**, set the logo and text in **white**.
- Prefer black, white, or primary colors for logo applications. Avoid accent
  colors except in special circumstances.
- Volt Green text on Lapis, and Lapis text on Volt, are called out as
  combinations to avoid.

> The guide closes this section with: _"Following these guidelines will help
> with overall branding consistency but with the brand's subtle undertones of
> anti-design, rules are meant to be broken."_ Treat the rules as the default,
> and break them deliberately rather than accidentally.

---

## 5. Typography

Both families are free to use. Loaded via `next/font/google` in
`src/app/layout.tsx` and self-hosted automatically.

| Role                            | Font                          | Weight       |
| ------------------------------- | ----------------------------- | ------------ |
| Headings & subheadings          | Poppins SemiBold              | 600          |
| Heading accent, subheader, eyebrow | IBM Plex Serif Regular Italic | 400 italic   |
| Small section headers & eyebrows | IBM Plex Serif Bold           | 700, uppercase |
| Body copy & subheaders          | Poppins ExtraLight            | 200          |
| Body (alternative)              | Poppins Regular               | 400          |

### The signature heading treatment

The brand's recognizable move is a heading in Poppins SemiBold with **one word
set in IBM Plex Serif italic** — "Title _example_", "Reach _your people_",
"Brand _style guide_".

`globals.css` wires this to `<em>` inside any heading:

```html
<h1>Marketing <em>made clear</em>.</h1>
```

Poppins Regular is acceptable for body when it helps legibility — for example
white text on Lapis.

---

## 6. Logo

The leaf symbolizes growth, adaptability, and forward momentum; as an arrow it
represents purposeful direction. The sub-name "marketing + media" signals both
strategic expertise and creative execution — a full-spectrum partner.

| Variant       | Contents                                | Use                                                                      |
| ------------- | --------------------------------------- | ------------------------------------------------------------------------ |
| **Primary**   | icon + "arrowleaf" + "marketing + media" | **Website header (desktop and mobile)**, stationery, email signatures, social banners, print collateral, signage, advertising. |
| **Secondary** | icon + "arrowleaf"                      | Social graphics where space is tight, digital ads, swag, internal decks, email headers. |
| **Icon**      | leaf mark only                          | Social profile images, favicons and app icons, watermarks, merch, small digital placements. |

### Color rules for the logo

- On **Volt Green**: use white. Use black only when the logo sits close to black
  text, or at very small physical sizes — as a rough guide, when the "arrowleaf"
  wordmark (Poppins SemiBold) is 12pt or smaller.
- On **Lapis** and **Neon Red**: use white.
- On light/gradient backgrounds: black.

### In code

Use the inlined SVG components — they inherit `currentColor`, so color is
controlled by a text utility:

```tsx
import { LogoIcon, LogoLockup } from "@/components/logo";

<LogoLockup className="h-10 w-auto text-ink" />
<LogoIcon className="h-8 w-8 text-white" />   // on Lapis or Volt
```

---

## 7. Brand graphics & patterns

**Anti-design = industry disruptor / breaking out of the box.** Gradients and
abstract elements give the brand subtle touches of anti-design — just enough
edge to keep it modern and unexpected, signaling clarity, transparency, and a
willingness to break from "business as usual" while staying professional and
trustworthy.

Other elements that fit: 3D renders, emojis, illustrations, and bold shapes.

The soft mesh gradient is the primary texture. Three ways to use it:

- **Animated glow** — `<GlowField />` from `@/components/glow-field`. Five
  soft blobs (orange, pink, magenta, cyan, a hint of lapis) that wander
  continuously — each sways on mismatched horizontal/vertical periods, so the
  paths curve and never stop. Used as the home hero background. Tune speed and
  range with the `motion` numbers per blob in that file. Compositor-only
  animation (cheap to run); freezes under `prefers-reduced-motion`. Avoid
  putting `backdrop-blur` elements over it — they re-blur every frame.
- **Static CSS** (no image request, scales to any section):
  `bg-mesh-warm`, `bg-mesh-cool`
- **Raster**, for large hero areas: `/brand/gradient/mesh-01…05.webp`

Supporting utilities:

- `bg-pixel-grid` — the faint pixel/grid pattern from the guide
- `mark-volt` — the Volt Green highlighter treatment behind inline text, as in
  "Crafting custom solutions in `branding`"

---

## 8. Asset inventory

Curated into `public/brand/` (732 KB total, 18 files). Everything here was
verified by eye against the style guide.

```
public/brand/
├── logo/
│   ├── icon.svg                      vector, currentColor  ← prefer this
│   ├── lockup-secondary.svg          vector, currentColor  ← prefer this
│   ├── icon-{black,white,volt,lapis}.png            1024px
│   └── lockup-secondary-{black,white,volt,lapis}.png 2400px wide
├── gradient/mesh-01…05.webp          brand mesh gradients
├── pattern/pixel-grid.webp           pixel/grid texture
├── shape/leaf-pair.png               blue + red leaf shapes
├── photo/team.webp                   the one real team photograph
└── video/
    ├── reel-1080.mp4                 2025 Recap showreel, muted, 1080p (22 MB)
    ├── reel-720.mp4                  same, 720p for phones (11 MB)
    └── reel-poster.{webp,jpg}        title-card frame at 5.5s, shown before playback
```

The reel files are web encodes (H.264, no audio, fast-start) of
`2025-Show-Reel-Compressed.mov` from the media export. They're used by the home
hero's showcase scene (`src/components/showcase-scroll.tsx`).

The SVGs were traced from the highest-resolution brand masters
(`Arrowleaf-Logos-02.png` at 2084², `Asset-7@4x.png` at 3103×637) and verified
against the style guide renderings. The app icons in `src/app/`
(`favicon.ico`, `icon.png`, `apple-icon.png`) are the Volt Green mark on Black.

### Asset gaps

These need to come from the client or the brand designer before launch:

1. **Primary logo lockup** (icon + "arrowleaf" + "marketing + media") — the
   style guide specifies this for the website header, but the media export did
   not contain it. Only the secondary lockup and the icon were present. Ideally
   request the original **vector** (`.svg`/`.ai`/`.eps`) for all three variants
   rather than raster.
2. **Real photography.** Every headshot, testimonial portrait, portfolio
   screenshot, and product shot in the export is stock or a WordPress theme
   placeholder (purple-circle headshots, "waveless"/"Sitemark"/"Nextmove"
   placeholder logos, generic product photography). Only `photo/team.webp` is a
   genuine Arrowleaf photograph. The site needs real team photos, real client
   logos, and real case-study imagery.
3. **Show reel hosting.** Web encodes of the 2025 Recap now live in
   `public/brand/video/` (33 MB total) so the hero works today. Before launch,
   move them to a video CDN (Mux, Cloudflare Stream, or Vercel Blob) so they
   stream adaptively and stay out of the repo, then point the `<source>` URLs
   in `showcase-scroll.tsx` at them. The original `.mov` masters (~430 MB)
   were never committed.
4. **Client logos** for any "trusted by" strip — the export's logos are theme
   placeholders, except `alexais` (a real client, in `Alexaisjpg-*`).

---

## 9. Source

Original style guide: `[Arrowleaf] - Style Guide.pdf` (22 pages).
Original media export:
`media_library_export-arrowleaf_marketing-2026_09_25_20_09_45` (139 files,
421 MB — roughly 37 exact-duplicate pairs, and mostly theme placeholders).
