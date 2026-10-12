import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BackNineSignup } from "@/components/back-nine-signup";
import { CtaPill } from "@/components/cta-pill";
import { PageTransition } from "@/components/page-transition";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Back Nine partners",
  description:
    "Paid social and Google campaigns built for Back Nine franchisees: more simulator demos booked, more members through your door.",
};

type Plan = {
  name: string;
  price: string;
  cadence: string;
  tagline: string;
  includes?: string;
  features: { title: string; detail: string }[];
  featured?: boolean;
  /** Custom is scoped on a call, so it goes to /contact instead of the form. */
  custom?: boolean;
};

// Display copy only. What is actually charged lives in the GHL form.
const plans: Plan[] = [
  {
    name: "Starter",
    price: "$800",
    cadence: "/month, 1 platform",
    tagline: "Get on the map",
    features: [
      { title: "Meta Ads or Google Ads", detail: "Choose your primary channel" },
      { title: "Campaign setup and management", detail: "Ad copy, creative direction, audience targeting" },
      { title: "Monthly performance report", detail: "Leads, bookings and spend" },
      { title: "Continuous optimization", detail: "We adjust so you don't have to" },
    ],
  },
  {
    name: "Growth",
    price: "$1,000",
    cadence: "/month, 3 platforms",
    tagline: "Scale your franchise",
    includes: "Everything in Starter, plus",
    featured: true,
    features: [
      { title: "Meta Ads and Google Ads", detail: "Full funnel, awareness to conversion, on both platforms" },
      { title: "Retargeting campaigns", detail: "Re-engage warm audiences" },
      { title: "Cross-platform reporting", detail: "One view of demos, members and ROAS across channels" },
    ],
  },
  {
    name: "Custom",
    price: "Custom",
    cadence: "built for you",
    tagline: "Dominate your market",
    includes: "Everything in Growth, plus",
    custom: true,
    features: [
      { title: "Multi-channel strategy", detail: "A platform mix tailored to your market and goals" },
      { title: "Creative asset production", detail: "Photo, video and ad creative" },
      { title: "Priority support and strategy", detail: "Direct access to our team" },
    ],
  },
];

/**
 * Landing page for Back Nine franchisees (replaces the old WordPress
 * /back9-event page, which redirects here). Plans, then the GHL sign-up and
 * payment form. Deliberately not in the main nav or sitemap: it's for a
 * specific partner audience, reached by direct link.
 */
export default function BackNinePartnerPage() {
  return (
    <PageTransition>
      <main className="flex-1 bg-paper">
        <section className="-mt-16 bg-mesh-cool">
          <div className="page-gutter pb-16 pt-36 sm:pb-24 sm:pt-44">
            <div data-reveal>
              <Image
                src="/partners/back-nine.png"
                alt="Back Nine"
                width={768}
                height={162}
                preload
                className="h-auto w-[min(22rem,80vw)]"
              />
            </div>
            <p data-reveal className="mt-10 font-serif text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
              For Back Nine franchisees
            </p>
            <h1 data-reveal className="mt-4 max-w-4xl text-hero">
              More demos. More members. <em>Less guesswork.</em>
            </h1>
            <p data-reveal className="mt-6 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              <span className="mark-volt">We drive demand.</span> <em className="font-serif font-normal">You run the business.</em>
            </p>
            <p data-reveal className="mt-6 max-w-2xl text-lg text-ink/80 sm:text-xl">
              We run paid social and Google campaigns built for Back Nine franchisees, managing every
              dollar of ad spend and optimizing for what matters: more simulator demos booked, more
              members through your door. No guesswork, no wasted budget. A growth partner who
              understands your business and shows you the numbers.
            </p>
            <div data-reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <CtaPill href="#sign-up">Sign up now</CtaPill>
              <Link
                href="#plans"
                className="-my-2 py-2 text-sm font-medium underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
              >
                Compare plans
              </Link>
            </div>
          </div>
        </section>

        <section id="plans" className="page-gutter scroll-mt-20 py-20 sm:py-28">
          <p data-reveal className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
            Plans
          </p>
          <h2 data-reveal className="mt-4 max-w-3xl text-hero">
            Pick your <em>lane</em>.
          </h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard key={plan.name} plan={plan} />
            ))}
          </div>
        </section>

        <section
          id="sign-up"
          className="page-gutter grid scroll-mt-20 gap-14 border-t border-hairline py-20 sm:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20"
        >
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p data-reveal className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
              Get started
            </p>
            <h2 data-reveal className="mt-4 text-hero">
              Ready to fill your bays? <em>Let&apos;s build your campaign.</em>
            </h2>
            <p data-reveal className="mt-6 max-w-xl text-lg text-ink/80">
              Add your franchise location, pick Starter or Growth, and you&apos;re in. We&apos;ll be in
              touch to kick off setup.
            </p>
            <div data-reveal className="mt-10 text-base">
              <p className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
                Thinking Custom?
              </p>
              <p className="mt-3 max-w-md text-ink/75">
                Custom plans are built around your market. Tell us about your location and we&apos;ll
                put one together.
              </p>
              <p className="mt-4">
                <Link href="/contact" className="font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
                  Start a conversation
                </Link>
              </p>
              <p className="mt-1">
                <a href={`mailto:${brand.email}`} className="font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
                  {brand.email}
                </a>
              </p>
            </div>
          </div>

          <BackNineSignup />
        </section>
      </main>
    </PageTransition>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const { featured } = plan;
  const muted = featured ? "text-white/75" : "text-ink/70";
  return (
    <article
      data-reveal
      className={`flex flex-col rounded-brand-lg p-7 sm:p-9 ${
        featured ? "bg-lapis text-white" : "border border-hairline bg-white"
      }`}
    >
      <h3 className="text-xl">{plan.name}</h3>
      <p className="mt-5 flex flex-wrap items-baseline gap-x-2">
        <span className="text-5xl font-semibold tracking-[-0.03em]">{plan.price}</span>
        <span className={`text-sm ${muted}`}>{plan.cadence}</span>
      </p>
      <p className={`mt-2 font-serif text-lg italic ${featured ? "text-white/90" : "text-ink/80"}`}>
        {plan.tagline}
      </p>

      {plan.includes && (
        <p className={`mt-8 font-serif text-xs font-bold uppercase tracking-[0.2em] ${muted}`}>
          {plan.includes}:
        </p>
      )}
      <ol className={`grid ${plan.includes ? "mt-3" : "mt-8"}`}>
        {plan.features.map((f, i) => (
          <li
            key={f.title}
            className={`grid grid-cols-[2.5rem_minmax(0,1fr)] border-t py-4 ${
              featured ? "border-white/20" : "border-ink/15"
            }`}
          >
            <span className={`font-serif text-sm font-bold tracking-[0.2em] ${featured ? "text-white/50" : "text-ink/40"}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="font-medium">{f.title}</p>
              <p className={`mt-0.5 text-sm ${muted}`}>{f.detail}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-auto pt-8">
        <CtaPill href={plan.custom ? "/contact" : "#sign-up"} tone={featured ? "white" : "ink"}>
          {plan.custom ? "Let's talk" : `Choose ${plan.name}`}
        </CtaPill>
      </div>
    </article>
  );
}
