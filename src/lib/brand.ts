/**
 * Arrowleaf Marketing + Media: brand constants.
 *
 * Single source of truth for brand values that need to exist in TypeScript
 * (metadata, structured data, alt text, palette-driven UI). The CSS side of
 * these tokens lives in `src/app/globals.css` under `@theme`, keep the two in
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
  email: "contact@arrowleafmarketing.com",
  phone: "(855) 763-7679",
  /** The phone number in tel: form, for links. */
  phoneHref: "tel:+18557637679",
} as const;

/**
 * Brand palette. Hex values are lifted verbatim from the style guide's
 * "Brand Colors" page: do not round or "correct" them.
 *
 * Usage follows the 60-30-10 rule: a dominant color (60%), a secondary (30%),
 * and an accent (10%).
 */
export const colors = {
  /** Primary: the brand's two load-bearing colors, plus its paper. */
  primary: {
    /** Volt Green. The signature color. */
    volt: "#d2eb37",
    /** Lapis Blue. Grounds the brand; strong enough for large fills. */
    lapis: "#0700ff",
    /** Extra Light Yellow. The default page canvas, warmer than pure white. */
    paper: "#f4f4f2",
  },
  /** Secondary: supporting fills and all body text. */
  secondary: {
    /** Neon Red. Highlights and emphasis, never large areas of body text. */
    neonRed: "#f55d2c",
    white: "#ffffff",
    /** Near-black with a green cast. The default text color. */
    black: "#161c16",
  },
  /**
   * Accent: special circumstances only, typically inside gradients.
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
  /** Poppins SemiBold (600): headings and subheadings. */
  heading: { family: "Poppins", weight: 600 },
  /** IBM Plex Serif Regular Italic: the brand's signature accent in headings. */
  headingAccent: { family: "IBM Plex Serif", weight: 400, style: "italic" },
  /** IBM Plex Serif Bold: small section headers and eyebrows, usually uppercase. */
  eyebrow: { family: "IBM Plex Serif", weight: 700 },
  /**
   * Body copy. The style guide says Poppins ExtraLight (200); on screen the
   * site uses Light (300) for legibility. Regular (400) is also allowed.
   */
  body: { family: "Poppins", weight: 300 },
  bodyAlt: { family: "Poppins", weight: 400 },
} as const;

/**
 * Mission · Vision · Values · Beliefs · Perspective (MVVBP), 2026. The
 * current source of truth for positioning and voice; it supersedes the
 * mission, beliefs and values in the September 2025 style guide.
 * Source: docs/source/Arrowleaf_MVVBP.pdf. Summary: docs/BRAND.md §1.
 */
export const compass = {
  /** The one-line position, from "Our Perspective". */
  positioning: "Not a vendor. Not a volume agency. A trusted growth partner.",
  mission:
    "We are strategic growth partners, applying leading-edge methods to transform businesses into brands they're proud of and marketing engines that deliver results.",
  /**
   * INTERNAL ONLY. The vision is stated as company revenue targets. Use it to
   * understand ambition; never publish the numbers on the site.
   */
  vision: {
    internal: true,
    text: "To ignite a million-dollar company within one year and reach $5 million in growth within three to five years, unlocking our clients' hidden potential by transforming their brands and marketing strategies. We empower both our clients and our team to unlock financial independence and support their wildest dreams.",
  },
  /** Who we serve now. */
  audience: "Established businesses at pivotal moments.",
  perspective: [
    "Arrowleaf is in a season of momentum and opportunity. We are experiencing real growth and leaning into it with intention, focus, and discipline. Today, we see ourselves as a trusted growth partner for established businesses at pivotal moments.",
    "This season is about sharpening our craft, choosing the right clients, investing deeply in our people, and laying the foundation for sustainable growth. Arrowleaf today is defined by clarity, confidence, and forward motion: growing with purpose and building something that lasts.",
  ],
  /** "Clarity, confidence, and forward motion." */
  character: ["clarity", "confidence", "forward motion"],
} as const;

/** Brand voice, for copy review and as context when drafting site content. */
export const voice = {
  summary:
    "A trusted growth partner: clear, confident, and moving forward. Plain words, real relationships, and results we stand behind, spoken like someone who's in it for the long run.",
  traits: [
    "clear",
    "confident",
    "forward-moving",
    "strategic",
    "partner-minded",
    "honest",
    "warm",
    "purposeful",
    "quality-driven",
    "human",
  ],
  /** Things the brand explicitly does not do. Useful as copy guardrails. */
  avoid: [
    "sounding like a vendor or a volume agency",
    "chasing short-term wins at the expense of the relationship",
    "rushed work or shortcuts, and copy that promises speed over quality",
    "jargon and \"black box\" explanations",
    "hiding misses, sandbagging results, or overpromising",
    "chasing trends without strategy",
    "publishing internal revenue goals (the vision's numbers)",
    "em dashes, anywhere (they read as AI-written)",
  ],
} as const;

/**
 * Values: the principles that govern how we choose clients, treat our team,
 * and deliver work. Non-negotiable, in every engagement. (MVVBP, 2026)
 */
export const values = [
  {
    name: "Partnership",
    body: "We build long-term relationships and prioritize enduring success over short-term wins.",
  },
  {
    name: "Commitment",
    body: "We go above and beyond for client success, regardless of immediate financial return.",
  },
  {
    name: "Quality",
    body: "No shortcuts. No rushed work. We refuse to sacrifice quality for speed or convenience. Standards first.",
  },
  {
    name: "People First",
    body: "We trust, protect, and invest in our team, because strong people build strong companies.",
  },
  {
    name: "Alignment",
    body: "We choose right-fit clients built on mutual trust and shared values.",
  },
] as const;

/**
 * Beliefs: what we hold to be true, the convictions beneath the strategy and
 * the reasons we work the way we do. (MVVBP, 2026)
 */
export const beliefs = [
  {
    name: "Relationships First",
    body: "Real growth comes from real relationships, with our clients, our team, and our community.",
  },
  {
    name: "Community Impact",
    body: "Our work should uplift people beyond business metrics.",
  },
  {
    name: "Help Others Succeed",
    body: "When we help others get what they need, our success follows.",
  },
  {
    name: "Always Learning",
    body: "Growth requires curiosity and continuous improvement.",
  },
  {
    name: "Integrity Always",
    body: "We do what's right, even when it's hard.",
  },
] as const;

/** Logo assets, all served from `public/brand/logo`. */
export const logos = {
  /**
   * Icon mark: favicons, avatars, watermarks, tight spaces.
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
  /** Secondary lockup: icon + "arrowleaf", no descriptor. */
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
  /** Soft mesh gradients: the brand's "anti-design" texture. */
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
