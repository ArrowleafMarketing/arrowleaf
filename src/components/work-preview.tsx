import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/arrow-icon";
import { InViewVideo } from "@/components/in-view-video";
import { LeafCta } from "@/components/leaf-cta";
import { cases, type CaseStudy } from "@/lib/cases";

/**
 * Results preview: "the numbers come first."
 *
 * Each case is a scorecard. The outcome is the biggest thing on it, with the
 * before and after, the trend, and where the number comes from. The creative
 * sits in a window in the corner: the work is there, but it's supporting
 * evidence. Hover a card and the window opens across the whole card (the
 * hero reel's growing-window move), so the work that produced the number
 * takes over while the number stays on top.
 *
 * The trend line draws itself when the card arrives (`data-draw`, part of the
 * reveal system in globals.css).
 *
 * Cases come from src/lib/cases.ts (real client work; numbers from the
 * team's case-study drafts).
 */
export function WorkPreview() {
  const [feature, ...rest] = cases;
  return (
    <section id="work" className="bg-paper">
      <div className="page-gutter py-24 sm:py-28">
        <header className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p data-reveal className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
              Results
            </p>
            <h2 data-reveal className="mt-3 text-hero">
              The numbers come <em>first</em>
            </h2>
          </div>
          <div data-reveal className="flex flex-col items-start gap-5 lg:items-end lg:text-right">
            <p className="max-w-md text-lg text-ink/80">
              Creative is how we get there. Every case starts with what it moved,
              and where you can check it.
            </p>
            <Link
              href="/results"
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-lapis"
            >
              All results
              <ArrowIcon className="transition-transform duration-300 ease-brand group-hover:translate-x-0.5" />
            </Link>
          </div>
        </header>

        <div className="mt-14 grid gap-5 sm:mt-16 lg:grid-cols-12 lg:grid-rows-2">
          <CaseCard study={feature} feature className="lg:col-span-7 lg:row-span-2" />
          {rest.map((study) => (
            <CaseCard key={study.id} study={study} className="lg:col-span-5" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CaseCard({
  study,
  feature = false,
  className = "",
}: {
  study: CaseStudy;
  feature?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/results#${study.id}`}
      data-reveal
      data-cta-host
      aria-label={`${study.client}: ${study.metric.value} ${study.metric.label}. View results.`}
      className={`group/cta relative isolate flex overflow-hidden rounded-brand-lg border border-hairline bg-white text-ink outline-offset-4 ${
        feature ? "lg:min-h-[38rem]" : ""
      } ${className}`}
    >
      {/* The work window. Rests along the bottom on phones and in the right
          corner from lg, and opens to fill the card on hover or focus. */}
      <div
        className={`absolute inset-0 -z-10 transition-[clip-path] duration-700 ease-brand group-hover/cta:[clip-path:inset(0_round_0)] group-focus-visible/cta:[clip-path:inset(0_round_0)] ${
          feature
            ? "lg:[clip-path:inset(46%_4%_4%_52%_round_18px)] xl:[clip-path:inset(46%_4%_4%_44%_round_18px)]"
            : "lg:[clip-path:inset(24%_4%_4%_60%_round_14px)]"
        } [clip-path:inset(calc(100%_-_15rem)_1rem_1rem_1rem_round_14px)]`}
      >
        <CaseMediaLayer media={study.media} framed={!feature} />
        {/* Darkens the footage under the white text once the window opens. */}
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 ease-brand group-hover/cta:bg-ink/60 group-focus-visible/cta:bg-ink/60" />
        {/* Keeps the caption legible over bright footage while it's small. */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ink/55 to-transparent" />
        <p
          className={`absolute bottom-7 right-8 text-right text-xs font-medium text-white transition-[bottom,right] duration-700 ease-brand lg:bottom-[calc(4%+0.75rem)] lg:right-[calc(4%+0.9rem)] lg:group-hover/cta:bottom-5 lg:group-hover/cta:right-6 ${
            // Wrap inside the corner window rather than spill past its edge.
            feature ? "lg:max-w-[44%]" : "lg:max-w-[30%]"
          }`}
        >
          {study.work}
        </p>
      </div>

      {/* The scorecard. Turns white as the work opens behind it. */}
      <div
        className={`flex w-full flex-col transition-colors duration-500 group-hover/cta:text-white group-focus-visible/cta:text-white ${
          feature ? "p-7 pb-[17rem] sm:p-10 sm:pb-[17rem] lg:pb-10" : "p-7 pb-[17rem] lg:pb-7"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm">
            <span className="font-semibold">{study.client}</span>
            <span className="text-ink/65 transition-colors duration-500 group-hover/cta:text-white/80">
              {" "}
              · {study.industry}
            </span>
          </p>
          <LeafCta className="shrink-0 bg-ink text-white" />
        </div>

        <div className={feature ? "mt-10 sm:mt-14" : "mt-6"}>
          <p
            className={`font-semibold leading-none tracking-[-0.04em] ${
              feature ? "text-[clamp(4.5rem,11vw,9rem)]" : "text-[clamp(3.25rem,6vw,4.5rem)]"
            }`}
          >
            {study.metric.value}
          </p>
          <p className={`mt-2 font-medium ${feature ? "text-xl sm:text-2xl" : "text-lg"}`}>
            {study.metric.label}
          </p>
        </div>

        <div className={`flex flex-col items-start gap-2 ${feature ? "mt-8" : "mt-4"}`}>
          {study.trend && <Trend values={study.trend} />}
          <p className="max-w-[16rem] text-sm leading-relaxed text-ink/70 transition-colors duration-500 group-hover/cta:text-white/80">
            {study.detail}
          </p>
        </div>

        {study.more && (
          <dl className="mt-10 grid max-w-[15rem] grid-cols-2 gap-6 border-t border-ink/12 pt-6 transition-colors duration-500 group-hover/cta:border-white/25">
            {study.more.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd className="text-3xl font-semibold tracking-tight">{m.value}</dd>
                <dd className="mt-1 text-xs text-ink/70 transition-colors duration-500 group-hover/cta:text-white/85">
                  {m.label}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="pt-8 lg:mt-auto">
          {feature && (
            <p className="mb-3 text-xs text-ink/60 lg:max-w-[45%] xl:max-w-[40%] transition-colors duration-500 group-hover/cta:text-white/80">
              Source: {study.source}
            </p>
          )}
          <ul className={`flex flex-wrap gap-1.5 ${feature ? "lg:max-w-[45%] xl:max-w-[40%]" : "lg:max-w-[56%]"}`}>
            {study.services.map((s) => (
              <li
                key={s}
                className="rounded-full border border-ink/15 px-2.5 py-1 text-[0.7rem] font-medium transition-colors duration-500 group-hover/cta:border-white/40"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Link>
  );
}

/** A small trend line, drawn in on arrival. Shape only, no axes. */
function Trend({ values }: { values: readonly number[] }) {
  const w = 120;
  const h = 40;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pts = values.map((v, i) => [
    (i / (values.length - 1)) * (w - 4) + 2,
    h - 3 - ((v - min) / (max - min || 1)) * (h - 6),
  ]);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("");
  const [ex, ey] = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} aria-hidden className="h-10 w-[7.5rem] shrink-0 overflow-visible">
      <path
        d={d}
        data-draw
        pathLength={1}
        strokeDasharray="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-lapis group-hover/cta:text-volt"
      />
      <circle cx={ex} cy={ey} r="3.5" className="fill-neon-red" />
    </svg>
  );
}

/** The client's own footage or photography, filling the work window. */
/** Center of a small card's corner window at rest, in % of the card (lg and up). */
const SMALL_WINDOW_CENTER = [78, 60] as const;

function CaseMediaLayer({ media, framed = false }: { media: CaseStudy["media"]; framed?: boolean }) {
  if (media.kind === "video") {
    return (
      <InViewVideo
        mp4={media.mp4}
        webm={media.webm}
        poster={media.poster}
        className="absolute inset-0 size-full object-cover"
      />
    );
  }
  const image = (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      sizes="(min-width: 1024px) 50vw, 100vw"
      className="object-cover"
      style={{ objectPosition: media.position }}
    />
  );
  if (!framed || !media.focus) return image;
  // Slide the subject into the small window at rest; open back to the full frame.
  const [fx, fy] = media.focus;
  const rest = `translate(${SMALL_WINDOW_CENTER[0] - fx}%, ${SMALL_WINDOW_CENTER[1] - fy}%)`;
  return (
    <div
      className="absolute inset-0 transition-transform duration-700 ease-brand lg:[transform:var(--rest)] lg:group-hover/cta:[transform:none] lg:group-focus-visible/cta:[transform:none]"
      style={{ "--rest": rest } as React.CSSProperties}
    >
      {image}
    </div>
  );
}
