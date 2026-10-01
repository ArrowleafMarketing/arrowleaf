# Arrowleaf Marketing + Media: brand reference

Digested from two sources:

- **Arrowleaf Mission · Vision · Values · Beliefs · Perspective** (MVVBP,
  2026), `docs/source/Arrowleaf_MVVBP.pdf`. **The source of truth for
  positioning, voice and tone** (§1, §3). Where it and the style guide
  disagree on anything but visuals, it wins.
- **[Arrowleaf] Brand Style Guide**, last updated September 2025 (prepared by
  Arrowleaf Marketing and Media & Tyler Shae Powell). The source for color,
  type, logo and graphics (§4 onward).

This file is the written reference. The machine-readable versions live in:

- `src/lib/brand.ts`, TypeScript constants (metadata, alt text, palette)
- `src/app/globals.css`, Tailwind v4 `@theme` tokens and brand utilities
- `/brand` route: live rendering of every token, for eyeballing changes

When a brand value changes, update all three.

---

## 1. Positioning

Source: MVVBP (2026), "an internal compass and external signal, guiding
decisions, shaping culture, and aligning our work with what matters most."

**The position.** *Not a vendor. Not a volume agency.* **A trusted growth
partner** for established businesses at pivotal moments.

**Mission.** We are strategic growth partners, applying leading-edge methods
to transform businesses into brands they're proud of and marketing engines
that deliver results.

**Vision** *(internal only; never publish the numbers)*. To ignite a
million-dollar company within one year and reach $5 million in growth within
three to five years, unlocking our clients' hidden potential by transforming
their brands and marketing strategies. We empower both our clients and our
team to unlock financial independence and support their wildest dreams.

**Perspective.** Arrowleaf is in a season of momentum and opportunity: real
growth, met with intention, focus, and discipline. This season is about
sharpening our craft, choosing the right clients, investing deeply in our
people, and laying the foundation for sustainable growth. Arrowleaf today is
defined by **clarity, confidence, and forward motion**, growing with purpose
and building something that lasts.

### Values

The principles that govern how we choose clients, treat our team, and deliver
work. Non-negotiable, in every engagement.

1. **Partnership.** We build long-term relationships and prioritize enduring
   success over short-term wins.
2. **Commitment.** We go above and beyond for client success, regardless of
   immediate financial return.
3. **Quality.** No shortcuts. No rushed work. We refuse to sacrifice quality
   for speed or convenience. Standards first.
4. **People First.** We trust, protect, and invest in our team, because strong
   people build strong companies.
5. **Alignment.** We choose right-fit clients built on mutual trust and shared
   values.

### Beliefs

What we hold to be true: the convictions beneath the strategy, the reasons we
work the way we do.

1. **Relationships First.** Real growth comes from real relationships, with
   our clients, our team, and our community.
2. **Community Impact.** Our work should uplift people beyond business
   metrics.
3. **Help Others Succeed.** When we help others get what they need, our
   success follows.
4. **Always Learning.** Growth requires curiosity and continuous improvement.
5. **Integrity Always.** We do what's right, even when it's hard.

### What this means for the site

- Lead with **partnership and results together**: brands people are proud of
  *and* marketing that performs. Results are proof of a good partnership, not
  a replacement for one.
- Speak to **established businesses at a pivotal moment** (a plateau, a
  rebrand, a new market, a team stretched thin), not to startups or anyone
  shopping on price.
- Say **"partner"**, never "vendor"; favor "right fit", "long term", "with
  you". Imply selectivity: we choose clients as much as they choose us.
- Never promise speed at the cost of quality. "Fast" is fine only next to
  "done right".
- The vision's revenue targets are internal ambition. Don't put them on the
  site.
- **No em dashes, ever.** They read as AI-written. Use a period, comma,
  colon or parentheses. (Enforced by `npm run lint`.)

### Superseded (style guide, September 2025)

The style guide's mission ("put brand, content, and paid growth on one shared
plan"), its nine beliefs and nine values are replaced by the above. Still
consistent with the MVVBP and still usable as copy guardrails: plain-English
reporting, no black box, no hiding misses or overpromising, testing
purposefully and scaling what works.

---

## 2. Audience

Per the MVVBP, the target is **established businesses at pivotal moments**.
Two personas drive site copy and IA. Both need the same thing stated
differently: **proof, plain language, and a partner they can trust.**

### Persona 01: Jordan, owner-operator

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

### Persona 02: David, enterprise marketing lead

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

**A trusted growth partner:** clear, confident, and moving forward (the
MVVBP's "clarity, confidence, and forward motion"). We sound like someone
who's in it with you for the long run: warm and human, honest when it's hard
(*Integrity Always*), and plain-spoken, so marketing feels simple and
actionable. Confident without hype; ambitious without overpromising.

**Tone by moment:**

- **Positioning and headlines:** assured and direct. Short sentences. The
  "Not a vendor. Not a volume agency." rhythm is the model.
- **Explaining the work:** plain English, specific, generous. Show the plan
  and the numbers.
- **Talking about people and clients:** warm and relational. "With you",
  "together", "for the long run".
- **Asking for the conversation:** low-pressure and selective. A conversation
  about fit, not a pitch.

**Visual vibe keywords** (style guide, still current): confident, clean,
purposeful, transparent, modern, energetic, trustworthy, straightforward,
strategic, human.

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
| Extra Light Yellow     | `#f4f4f2` | `paper`         | Default page canvas, warmer than white. |

### Secondary

| Name     | Hex       | Token      | Notes                                      |
| -------- | --------- | ---------- | ------------------------------------------ |
| Neon Red | `#f55d2c` | `neon-red` | Highlights and emphasis, not body text.    |
| White    | `#ffffff` | `white`    |                                            |
| Black    | `#161c16` | `ink`      | Near-black with a green cast. Default text.|

### Accent: special circumstances only

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
| Body copy & subheaders          | Poppins Light (guide: ExtraLight 200) | 300 on screen |
| Body (alternative)              | Poppins Regular               | 400          |

### The signature heading treatment

The brand's recognizable move is a heading in Poppins SemiBold with **one word
set in IBM Plex Serif italic**: "Title _example_", "Reach _your people_",
"Brand _style guide_".

`globals.css` wires this to `<em>` inside any heading:

```html
<h1>Marketing <em>made clear</em>.</h1>
```

Poppins Regular is acceptable for body when it helps legibility, for example
white text on Lapis.

---

## 6. Logo

The leaf symbolizes growth, adaptability, and forward momentum; as an arrow it
represents purposeful direction. The sub-name "marketing + media" signals both
strategic expertise and creative execution, a full-spectrum partner.

| Variant       | Contents                                | Use                                                                      |
| ------------- | --------------------------------------- | ------------------------------------------------------------------------ |
| **Primary**   | icon + "arrowleaf" + "marketing + media" | **Website header (desktop and mobile)**, stationery, email signatures, social banners, print collateral, signage, advertising. |
| **Secondary** | icon + "arrowleaf"                      | Social graphics where space is tight, digital ads, swag, internal decks, email headers. |
| **Icon**      | leaf mark only                          | Social profile images, favicons and app icons, watermarks, merch, small digital placements. |

### Color rules for the logo

- On **Volt Green**: use white. Use black only when the logo sits close to black
  text, or at very small physical sizes, as a rough guide, when the "arrowleaf"
  wordmark (Poppins SemiBold) is 12pt or smaller.
- On **Lapis** and **Neon Red**: use white.
- On light/gradient backgrounds: black.

### In code

Use the inlined SVG components: they inherit `currentColor`, so color is
controlled by a text utility:

```tsx
import { LogoIcon, LogoLockup } from "@/components/logo";

<LogoLockup className="h-10 w-auto text-ink" />
<LogoIcon className="h-8 w-8 text-white" />   // on Lapis or Volt
```

---

## 7. Brand graphics & patterns

**Anti-design = industry disruptor / breaking out of the box.** Gradients and
abstract elements give the brand subtle touches of anti-design, just enough
edge to keep it modern and unexpected, signaling clarity, transparency, and a
willingness to break from "business as usual" while staying professional and
trustworthy.

Other elements that fit: 3D renders, emojis, illustrations, and bold shapes.

The soft mesh gradient is the primary texture. Three ways to use it:

- **Animated glow**: `<GlowField />` from `@/components/glow-field`. Five
  soft blobs (orange, pink, magenta, cyan, a hint of lapis) that wander
  continuously: each sways on mismatched horizontal/vertical periods, so the
  paths curve and never stop. Used as the home hero background. Tune speed and
  range with the `motion` numbers per blob in that file. Compositor-only
  animation (cheap to run); freezes under `prefers-reduced-motion`. Avoid
  putting `backdrop-blur` elements over it: they re-blur every frame.
- **Static CSS** (no image request, scales to any section):
  `bg-mesh-warm`, `bg-mesh-cool`
- **Raster**, for large hero areas: `/brand/gradient/mesh-01…05.webp`

Supporting utilities:

- `bg-pixel-grid`: the faint pixel/grid pattern from the guide
- `mark-volt`: the Volt Green highlighter treatment behind inline text, as in
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

1. **Primary logo lockup** (icon + "arrowleaf" + "marketing + media"), the
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
4. **Client logos** for any "trusted by" strip, the export's logos are theme
   placeholders, except `alexais` (a real client, in `Alexaisjpg-*`).

---

## 9. Source

Original style guide: `[Arrowleaf] - Style Guide.pdf` (22 pages).
Original media export:
`media_library_export-arrowleaf_marketing-2026_09_25_20_09_45` (139 files,
421 MB: roughly 37 exact-duplicate pairs, and mostly theme placeholders).
