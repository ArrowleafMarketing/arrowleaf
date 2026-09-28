/**
 * Arrowleaf Marketing + Media — brand constants.
 *
 * Single source of truth for brand values that need to exist in TypeScript
 * (metadata, structured data, alt text, palette-driven UI). The CSS side of
 * these tokens lives in `src/app/globals.css` under `@theme` — keep the two in
 * sync when a value changes.
 *
 * Source: [Arrowleaf] Brand Style Guide, last updated September 2025.
 */

export const brand = {
  name: "Arrowleaf Marketing + Media",
  shortName: "Arrowleaf",
  domain: "arrowleafmarketing.com",
  url: "https://arrowleafmarketing.com",
  locality: "Boise, Idaho",
  tagline: "Marketing made clear.",
} as const;

/**
 * Brand palette. Hex values are lifted verbatim from the style guide's
 * "Brand Colors" page — do not round or "correct" them.
 *
 * Usage follows the 60-30-10 rule: a dominant color (60%), a secondary (30%),
 * and an accent (10%).
 */
export const colors = {
  /** Primary — the brand's two load-bearing colors, plus its paper. */
  primary: {
    /** Volt Green. The signature color. */
    volt: "#d2eb37",
    /** Lapis Blue. Grounds the brand; strong enough for large fills. */
    lapis: "#0700ff",
    /** Extra Light Yellow. The default page canvas — warmer than pure white. */
    paper: "#f4f4f2",
  },
  /** Secondary — supporting fills and all body text. */
  secondary: {
    /** Neon Red. Highlights and emphasis, never large areas of body text. */
    neonRed: "#f55d2c",
    white: "#ffffff",
    /** Near-black with a green cast. The default text color. */
    black: "#161c16",
  },
  /**
   * Accent — special circumstances only, typically inside gradients.
   * The style guide explicitly warns against accents on Volt Green.
   */
  accent: {
    cyan: "#7df5f0",
    orange: "#ffaa06",
    magenta: "#cb6ce6",
  },
} as const;

/**
 * Color pairings the style guide calls out as unsafe. Worth checking against
 * when adding a new surface/text combination.
 */
export const colorRules = {
  /** On these backgrounds, set the logo and text in white. */
  preferWhiteOn: [colors.primary.lapis, colors.secondary.neonRed],
  /** Accent colors must not sit on Volt Green. */
  neverOnVolt: [colors.accent.cyan, colors.accent.orange, colors.accent.magenta],
  /**
   * On Volt Green the logo is normally white. Black is allowed when the logo
   * sits next to black text, or at very small physical sizes (wordmark set at
   * 12pt or smaller).
   */
  voltLogoDefault: "white",
} as const;

/**
 * Typography roles. The font families themselves are loaded in
 * `src/app/layout.tsx` via `next/font/google` and exposed as CSS variables.
 */
export const type = {
  /** Poppins SemiBold (600) — headings and subheadings. */
  heading: { family: "Poppins", weight: 600 },
  /** IBM Plex Serif Regular Italic — the brand's signature accent in headings. */
  headingAccent: { family: "IBM Plex Serif", weight: 400, style: "italic" },
  /** IBM Plex Serif Bold — small section headers and eyebrows, usually uppercase. */
  eyebrow: { family: "IBM Plex Serif", weight: 700 },
  /** Poppins ExtraLight (200) — body copy. Poppins Regular (400) is also allowed. */
  body: { family: "Poppins", weight: 200 },
  bodyAlt: { family: "Poppins", weight: 400 },
} as const;

/** Brand voice, for copy review and as context when drafting site content. */
export const voice = {
  summary:
    "Clear, direct, and jargon-free — a trusted friend who happens to know their stuff about marketing.",
  traits: [
    "confident",
    "clean",
    "purposeful",
    "transparent",
    "modern",
    "energetic",
    "trustworthy",
    "straightforward",
    "strategic",
    "human",
  ],
  /** Things the brand explicitly does not do. Useful as copy guardrails. */
  avoid: [
    "gatekeeping data",
    '"black box" explanations',
    "jargon",
    "hiding misses or sandbagging results",
    "overpromising",
    "chasing trends without strategy",
  ],
} as const;

/** From the style guide's "The Beliefs". `strong` is the bolded phrase. */
export const beliefs = [
  { strong: "Culture over skill.", rest: "" },
  { strong: "Strategy beats tactics", rest: "sequence matters more than hustle." },
  { strong: "Brand and performance compound;", rest: "you need both to grow past plateau." },
  { strong: "Quality outperforms volume", rest: "when paired with consistent cadence." },
  { strong: "Data should decide, not dictate", rest: "measure what matters, ignore vanity." },
  { strong: "AI is a co-pilot, not autopilot", rest: "use it to speed craft, not replace it." },
  { strong: "Ethical marketing wins long-term", rest: "permission, clarity, and real value." },
  { strong: "Small, senior teams beat big, busy ones", rest: "when accountability is clear." },
  { strong: "Creative is a growth lever", rest: "not decoration." },
] as const;

export const values = [
  "Transparency",
  "Standing Out",
  "Clarity",
  "Helpfulness",
  "Success",
  "Shared Interest",
  "Exceptional Quality",
  "Positivity",
  "Integrity",
] as const;

/** Logo assets, all served from `public/brand/logo`. */
export const logos = {
  /**
   * Icon mark — favicons, avatars, watermarks, tight spaces.
   * The SVG inherits `currentColor`, so prefer it wherever the color is
   * driven by CSS.
   */
  icon: {
    svg: "/brand/logo/icon.svg",
    black: "/brand/logo/icon-black.png",
    white: "/brand/logo/icon-white.png",
    volt: "/brand/logo/icon-volt.png",
    lapis: "/brand/logo/icon-lapis.png",
  },
  /** Secondary lockup — icon + "arrowleaf", no descriptor. */
  secondary: {
    svg: "/brand/logo/lockup-secondary.svg",
    black: "/brand/logo/lockup-secondary-black.png",
    white: "/brand/logo/lockup-secondary-white.png",
    volt: "/brand/logo/lockup-secondary-volt.png",
    lapis: "/brand/logo/lockup-secondary-lapis.png",
  },
} as const;

/** Background textures and brand graphics. */
export const graphics = {
  /** Soft mesh gradients — the brand's "anti-design" texture. */
  gradients: [
    "/brand/gradient/mesh-01.webp",
    "/brand/gradient/mesh-02.webp",
    "/brand/gradient/mesh-03.webp",
    "/brand/gradient/mesh-04.webp",
    "/brand/gradient/mesh-05.webp",
  ],
  /** Faint pixel-grid pattern, for layering over light surfaces. */
  pixelGrid: "/brand/pattern/pixel-grid.webp",
  leafPair: "/brand/shape/leaf-pair.png",
} as const;

export type BrandColor =
  | keyof typeof colors.primary
  | keyof typeof colors.secondary
  | keyof typeof colors.accent;
