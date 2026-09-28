/**
 * MOCK case studies for the home page's results preview. The clients, numbers
 * and quotes are invented placeholders to design against. Replace every entry
 * with a real, client-approved case before launch; never ship these.
 */

export type CaseStudy = {
  id: string;
  client: string;
  industry: string;
  /** The headline outcome, shown first and biggest. */
  metric: { value: string; label: string };
  /** Before and after, in plain words, plus the window it was measured over. */
  before: string;
  after: string;
  period: string;
  /** Where the number comes from. Results you can check, not vibes. */
  source: string;
  /** The trend behind the number, oldest first. Only its shape is drawn. */
  trend: readonly number[];
  /** Supporting numbers, shown on the featured case. */
  more?: readonly { value: string; label: string }[];
  services: readonly string[];
  /** What the creative was, captioned on the work window. */
  work: string;
  media: "reel" | "lapis-ad" | "red-pack";
};

export const cases: readonly CaseStudy[] = [
  {
    id: "ridgeline",
    client: "Ridgeline Outfitters",
    industry: "Outdoor retail",
    metric: { value: "3.4×", label: "return on ad spend" },
    before: "1.2× ROAS",
    after: "3.4× ROAS",
    period: "5 months",
    source: "Meta Ads + Shopify, attributed revenue",
    trend: [1.2, 1.3, 1.25, 1.7, 2.1, 2.0, 2.6, 3.0, 3.4],
    more: [
      { value: "−31%", label: "cost per purchase" },
      { value: "2.1M", label: "video views" },
    ],
    services: ["Paid social", "Video", "Creative direction"],
    work: "Spring campaign film",
    media: "reel",
  },
  {
    id: "northfork",
    client: "Northfork Dental",
    industry: "Healthcare",
    metric: { value: "+212%", label: "new-patient bookings" },
    before: "38 a month",
    after: "119 a month",
    period: "6 months",
    source: "Booking system, first visits",
    trend: [38, 41, 40, 55, 63, 71, 88, 104, 119],
    services: ["Website", "Google Ads", "Local SEO"],
    work: "Site + search ads",
    media: "lapis-ad",
  },
  {
    id: "basalt",
    client: "Basalt Coffee Co.",
    industry: "Food & beverage",
    metric: { value: "+68%", label: "online orders" },
    before: "410 a month",
    after: "690 a month",
    period: "4 months",
    source: "Shopify orders",
    trend: [410, 402, 440, 470, 455, 530, 590, 640, 690],
    services: ["Branding", "Social", "Email"],
    work: "Rebrand + launch content",
    media: "red-pack",
  },
] as const;

/** MOCK testimonials. Invented people and companies; replace with approved quotes. */
export const testimonials = [
  {
    quote:
      "Every month we get the numbers, the good and the bad, in plain English. It's the first time marketing has felt like something we can actually manage.",
    name: "Jordan Reyes",
    role: "Owner, Reyes Home Builders",
  },
  {
    quote:
      "They came in like an extension of our team and hit every deadline on a national launch. The creative performed, and we could prove it.",
    name: "David Okafor",
    role: "VP Marketing, Keystone Materials",
  },
  {
    quote:
      "They cut two channels we loved and doubled down on one we'd ignored. Bookings are up and we're spending less.",
    name: "Priya Shah",
    role: "Founder, Lumen Physical Therapy",
  },
] as const;

/** Real clients featured in the 2025 recap reel (names only). */
export const recapClients = [
  "Sawtooth Fortified",
  "Arcadia",
  "Lone Pine Truss",
  "Casino.org",
  "Garman Hill",
  "Scandia Inn",
  "Venturely",
  "ASA of Idaho",
  "Dips",
  "Maddyn Homes",
] as const;
