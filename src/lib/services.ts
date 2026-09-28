/**
 * The four service groups, in the order they stack on the home page.
 *
 * Ordering follows the brand's own narrative: strategy comes first ("strategy
 * beats tactics — sequence matters more than hustle"), then the systems that
 * carry it, then the creative, then the growth engine that compounds.
 */

export type Service = {
  /** Stable id, also used as the scroll anchor. */
  id: string;
  /** Two-digit index shown as the card's eyebrow. */
  index: string;
  title: string;
  /** One sentence in brand voice — plain English, no jargon. */
  summary: string;
  offerings: readonly string[];
  /**
   * Surface treatment. Pairings obey the style guide's color rules:
   * white on Lapis and on Ink; ink on Volt and on Paper.
   */
  theme: {
    surface: string;
    text: string;
    muted: string;
    rule: string;
    /** The "go" button: a solid disc and the mark on it, in a brand pairing. */
    cta: string;
  };
};

const themes = {
  paper: {
    surface: "bg-white",
    text: "text-ink",
    muted: "text-ink/65",
    rule: "border-ink/12",
    cta: "bg-ink text-white",
  },
  lapis: {
    surface: "bg-lapis",
    text: "text-white",
    muted: "text-white/75",
    rule: "border-white/25",
    cta: "bg-white text-lapis",
  },
  volt: {
    surface: "bg-volt",
    text: "text-ink",
    muted: "text-ink/70",
    rule: "border-ink/20",
    cta: "bg-ink text-volt",
  },
  ink: {
    surface: "bg-ink",
    text: "text-white",
    muted: "text-white/70",
    rule: "border-white/20",
    cta: "bg-volt text-ink",
  },
} as const;

export const services: readonly Service[] = [
  {
    id: "strategy",
    index: "01",
    title: "Strategy & Research",
    summary:
      "We find out what's actually true about your market before anyone spends a dollar.",
    offerings: [
      "Marketing Strategy",
      "Market Research & Analysis",
      "Brand Strategy",
      "Marketing Direction / Consulting",
    ],
    theme: themes.paper,
  },
  {
    id: "technology",
    index: "02",
    title: "Technology & AI",
    summary:
      "The sites, apps, and automations your marketing runs on — built with AI as a co-pilot, never an autopilot.",
    offerings: [
      "Website Design & Development",
      "App Design & Development",
      "CRM & Marketing Automation",
    ],
    theme: themes.lapis,
  },
  {
    id: "creative",
    index: "03",
    title: "Brand & Creative",
    summary:
      "Work people remember. Creative is a growth lever here, not decoration.",
    offerings: [
      "Branding & Identity",
      "Graphic Design",
      "Photography",
      "Video",
      "Creative Direction",
    ],
    theme: themes.volt,
  },
  {
    id: "growth",
    index: "04",
    title: "Marketing & Growth",
    summary:
      "The engine that compounds — tested purposefully, scaled when it works, reported in plain English.",
    offerings: [
      "Digital Advertising",
      "Social Media",
      "Campaign Strategy",
      "Lead Generation / Growth Marketing",
    ],
    theme: themes.ink,
  },
] as const;

/**
 * The three-beat story the work follows. Reordered from "intention, impact,
 * integrate" into narrative sequence — why, then how, then what you get —
 * which maps onto the mission statement almost word for word.
 */
export const pillars = [
  {
    word: "Intention",
    short: "Strategy before spend",
    line: "Every dollar has a reason before it has a channel. Strategy beats tactics.",
  },
  {
    word: "Integration",
    short: "One shared plan",
    line: "Brand, content, and paid growth on one shared plan — not four disconnected ones.",
  },
  {
    word: "Impact",
    short: "Measured every month",
    line: "Proven with clear, repeatable measurement every month. No vanity metrics.",
  },
] as const;
