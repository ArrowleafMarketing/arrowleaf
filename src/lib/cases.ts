/**
 * Case studies, from the team's case-study drafts (Bookmark Medical, Auto
 * Blinds, Smith Family Medicine). Every number here is from those drafts;
 * don't round, extrapolate or invent a trend. Media is the clients' own
 * footage and photography from their site projects, copied into
 * public/work/.
 */

export type CaseMedia =
  | { kind: "video"; mp4: string; webm?: string; poster: string }
  | {
      kind: "image";
      src: string;
      alt: string;
      position?: string;
      /**
       * Where the subject sits in the photo, as [x%, y%]. On a small card the
       * photo slides so the subject is centered in the corner window while
       * it's small, then settles back as the window opens.
       */
      focus?: readonly [number, number];
    };

export type CaseStudy = {
  id: string;
  client: string;
  industry: string;
  /** One line on the situation, in plain words. */
  summary: string;
  /** The headline outcome, shown first and biggest. */
  metric: { value: string; label: string };
  /** The line under the headline number: what it means, and over what time. */
  detail: string;
  /** Where the number comes from. Results you can check, not vibes. */
  source: string;
  /** A real series behind the headline number, oldest first. Only when we have one. */
  trend?: readonly number[];
  /** Supporting numbers, shown on the featured case. */
  more?: readonly { value: string; label: string }[];
  services: readonly string[];
  /** The case-study page: headline, the situation, what we did, what changed. */
  story: {
    /** Plain part, then the accent part (set in the serif italic). */
    headline: readonly [string, string];
    intro: readonly string[];
    timeline: readonly { when: string; title: string; body: string }[];
    /** Anything that doesn't fit the timeline (Auto Blinds' internal app). */
    extra?: { title: string; body: string };
    results: readonly { value: string; label: string }[];
  };
  /** What the work window shows, captioned on it. */
  work: string;
  media: CaseMedia;
  /** A different shot for the full case study, when the card's doesn't suit it. */
  storyMedia?: CaseMedia;
};

export const cases: readonly CaseStudy[] = [
  {
    id: "bookmark-medical",
    client: "Bookmark Medical",
    industry: "Primary care, AZ & TN",
    summary:
      "Four acquired practices, four different names. We brought them together as one brand, with a site and paid media built to grow new patients.",
    metric: { value: "+58%", label: "new patients booked" },
    detail: "94 to 149 a month, launch through August",
    source: "Paid ads only, tracked from ad click to booked appointment",
    trend: [94, 125, 149],
    more: [
      { value: "−70%", label: "cost per new patient" },
      { value: "780K", label: "people reached in five weeks" },
    ],
    services: ["Naming & brand", "Photo & video", "Website", "Paid media"],
    story: {
      headline: ["One name. One brand.", "One Bookmark Medical."],
      intro: [
        "Bookmark Medical grew by purchasing several independent primary care practices across multiple states, but the brand hadn't caught up to the growth. Patients and providers were still split across four different names, with nothing tying them together as one company.",
        "Bookmark wanted to come together under one brand: strong enough to unite every clinic, provider, and patient, match the quality of care they were already delivering, and give them a foundation to keep growing on.",
      ],
      timeline: [
        { when: "April", title: "A new name", body: "Developed the Bookmark Medical name and brand identity to unite four brands into one." },
        { when: "May", title: "Photo & video", body: "On-location photo and video shoots with leadership, providers, and patients in Arizona and Tennessee." },
        { when: "May", title: "A new website", body: "Built around one thing: helping patients find the right practice and provider, and book online, easily." },
        { when: "May 26", title: "Launch", body: "The new brand and website went live, with paid media split between brand awareness and new patient growth. HIPAA-compliant tracking was built in from day one." },
      ],
      results: [
        { value: "780K", label: "people reached with the new brand in the first five weeks" },
        { value: "+170%", label: "monthly website sessions, May to August (47,968 to 129,589), mostly from organic search" },
        { value: "+58%", label: "new patients booked from paid ads, launch through August (94 to 149 a month)" },
        { value: "−70%", label: "cost per new patient booked over the same period" },
      ],
    },
    work: "On location in Arizona & Tennessee",
    media: {
      kind: "video",
      mp4: "/work/bookmark/clinic.mp4",
      webm: "/work/bookmark/clinic.webm",
      poster: "/work/bookmark/clinic-poster.jpg",
    },
  },
  {
    id: "auto-blinds",
    client: "Auto Blinds",
    industry: "Home services, new company",
    summary:
      "A brand-new company with a better way to buy automatic blinds, and no way yet for anyone to find it.",
    metric: { value: "197", label: "leads from paid ads" },
    detail: "33 became paying customers",
    source: "Meta + Google combined",
    services: ["Website", "Paid ads", "Custom app", "Content"],
    story: {
      headline: ["Built to be fast.", "Built to be found."],
      intro: [
        "The founders of Auto Blinds saw a gap: automatic blinds were expensive and slow to get, and their supply-chain know-how could fix both. But a great idea from a brand-new company doesn't mean anything if no one can find you. Auto Blinds needed a website, and a way to get in front of customers, from day one.",
      ],
      timeline: [
        { when: "March", title: "A new website", body: "Built Auto Blinds a home online: a place for new customers to find them and see what they offer." },
        { when: "March to May", title: "Paid advertising", body: "Launched Google and Meta ads, then tuned and scaled them steadily as demand grew." },
        { when: "June", title: "A new market", body: "Expanded advertising into Utah County, opening a second service area." },
        { when: "August", title: "More content, more often", body: "Auto Blinds was already posting on social. We stepped in with photo, video, and more consistent content to build the brand further." },
      ],
      extra: {
        title: "An operating system for the business",
        body: "As Auto Blinds grew, leads, quotes, billing, and order tracking were spread across different tools. We built them a custom internal app: one place to manage leads, clients, billing, and the full order-to-installation process. It's a foundation they can expand into new markets on, and a first step into using AI to run more of the business day to day.",
      },
      results: [
        { value: "197", label: "leads generated through paid advertising (Meta + Google combined)" },
        { value: "33", label: "of those leads became paying customers" },
      ],
    },
    work: "Built to be found",
    media: { kind: "video", mp4: "/work/autoblinds/blinds.mp4", poster: "/work/autoblinds/blinds-poster.jpg" },
  },
  {
    id: "smith-family-medicine",
    client: "Smith Family Medicine",
    industry: "Direct primary care",
    summary:
      "Two doctors left corporate care to start a practice built on relationships, and needed people to understand what that means.",
    metric: { value: "387", label: "leads from paid ads" },
    detail: "Every one managed in a CRM we built",
    source: "Meta + Google combined",
    services: ["Brand", "Website", "Paid ads", "CRM"],
    story: {
      headline: ["A practice built on", "relationships"],
      intro: [
        "Two providers left corporate primary care to build something different: a direct primary care practice built around real relationships with patients, not insurance cycles. Starting fresh, they needed an online presence that could explain what direct primary care is, and give people a reason to choose Smith Family Medicine.",
      ],
      timeline: [
        { when: "January", title: "Ads and CRM", body: "Launched paid advertising and built out a CRM to manage every lead, from first inquiry to booked membership." },
        { when: "March", title: "A brand of their own", body: "Developed a new logo and brand identity for the practice." },
        { when: "April", title: "A new website", body: "Launched a new website built to turn visitors into new members." },
        { when: "July", title: "Capturing the practice", body: "With their new office finished, we filmed new photo and video content: real moments between the doctors and their patients." },
      ],
      results: [{ value: "387", label: "leads generated through paid advertising (Meta + Google combined)" }],
    },
    work: "The founders, at the new office",
    media: {
      kind: "image",
      src: "/work/smith/founders.jpg",
      alt: "The two founding doctors of Smith Family Medicine in their new office",
      position: "50% 30%",
      focus: [50, 42],
    },
    storyMedia: {
      kind: "image",
      src: "/work/smith/family-visit.jpg",
      alt: "A Smith Family Medicine doctor with a mother and her two young children",
    },
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
