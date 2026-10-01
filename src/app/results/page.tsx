import type { Metadata } from "next";
import Image from "next/image";
import { HashScroll } from "@/components/hash-scroll";
import { InViewVideo } from "@/components/in-view-video";
import { PageIntro } from "@/components/page-intro";
import { PageTransition } from "@/components/page-transition";
import { cases, recapClients, type CaseStudy } from "@/lib/cases";

export const metadata: Metadata = {
  title: "Results",
  description:
    "Case studies from Bookmark Medical, Auto Blinds, and Smith Family Medicine: what we built, and what it changed.",
};

/**
 * Results: each case study in full, results first. The headline and the
 * numbers lead; the story (situation, timeline, what we built) follows.
 * Home page cards link to each case by its id.
 */
export default function ResultsPage() {
  return (
    <PageTransition>
      <main className="flex-1 bg-paper">
        <PageIntro
          eyebrow="Results"
          title={
            <>
              Work that <em>moved the numbers</em>
            </>
          }
          lede="Three recent partnerships, told by what changed. Every number here is tracked, and we're happy to show you how."
        />

        {cases.map((study) => (
          <CaseSection key={study.id} study={study} />
        ))}

        <section className="page-gutter border-t border-hairline py-16 sm:py-20">
          <h2 data-reveal className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
            More from our 2025 recap
          </h2>
          <ul data-reveal className="mt-6 flex flex-wrap gap-2">
            {recapClients.map((name) => (
              <li key={name} className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium">
                {name}
              </li>
            ))}
          </ul>
        </section>
        <HashScroll />
      </main>
    </PageTransition>
  );
}

function CaseSection({ study }: { study: CaseStudy }) {
  const { story } = study;
  const media = study.storyMedia ?? study.media;
  return (
    <section
      id={study.id}
      className="page-gutter scroll-mt-20 border-t border-hairline py-20 sm:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p data-reveal className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
            {study.client} · {study.industry}
          </p>
          <h2 data-reveal className="mt-4 text-4xl leading-[1.05] sm:text-5xl">
            {story.headline[0]} <em>{story.headline[1]}</em>
          </h2>

          <dl
            data-reveal
            className={`mt-10 grid gap-x-8 gap-y-8 border-t border-ink/15 pt-8 ${
              story.results.length > 1 ? "sm:grid-cols-2" : ""
            }`}
          >
            {story.results.map((r) => (
              <div key={r.label}>
                <dt className="sr-only">{r.label}</dt>
                <dd className="text-5xl font-semibold leading-none tracking-[-0.03em]">{r.value}</dd>
                <dd className="mt-2 max-w-xs text-sm text-ink/70">{r.label}</dd>
              </div>
            ))}
          </dl>

          <ul data-reveal className="mt-10 flex flex-wrap gap-1.5">
            {study.services.map((s) => (
              <li key={s} className="rounded-full border border-ink/15 px-3 py-1 text-xs font-medium">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div data-reveal className="relative aspect-video overflow-hidden rounded-brand-lg bg-ink">
            {media.kind === "video" ? (
              <InViewVideo
                mp4={media.mp4}
                webm={media.webm}
                poster={media.poster}
                className="absolute inset-0 size-full object-cover"
              />
            ) : (
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
                style={{ objectPosition: media.position }}
              />
            )}
          </div>

          <div className="mt-10 grid gap-5">
            {story.intro.map((para) => (
              <p key={para.slice(0, 24)} data-reveal className="max-w-2xl text-lg text-ink/80">
                {para}
              </p>
            ))}
          </div>

          <h3 data-reveal className="mt-14 font-serif text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
            The timeline
          </h3>
          <ol className="mt-6 border-l border-ink/15">
            {story.timeline.map((step) => (
              <li key={step.title} data-reveal className="relative pb-8 pl-8 last:pb-0">
                <span aria-hidden className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-lapis" />
                <p className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
                  {step.when}
                </p>
                <p className="mt-1.5 text-xl font-semibold tracking-tight">{step.title}</p>
                <p className="mt-1.5 max-w-xl text-base text-ink/75">{step.body}</p>
              </li>
            ))}
          </ol>

          {story.extra && (
            <div data-reveal className="mt-12 rounded-brand-lg bg-lapis p-7 text-white sm:p-9">
              <p className="text-2xl font-semibold tracking-tight">{story.extra.title}</p>
              <p className="mt-3 max-w-2xl text-base text-white/85">{story.extra.body}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
