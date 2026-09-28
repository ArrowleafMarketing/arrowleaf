import { recapClients, testimonials } from "@/lib/cases";

/**
 * Social proof, on Lapis: one featured quote, two supporting ones, and a
 * slow ticker of the brands in the 2025 recap. Quotes are MOCK
 * (src/lib/cases.ts). The ticker runs on the `marquee` keyframes in
 * globals.css, pauses on hover, and sits still under reduced motion.
 */
export function Testimonials() {
  const [lead, ...more] = testimonials;
  return (
    <section className="overflow-hidden bg-lapis text-white">
      <div className="page-gutter py-24 sm:py-28">
        <p data-reveal className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-white/70">
          In their words
        </p>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
          <figure data-reveal>
            <span aria-hidden className="block font-serif text-8xl leading-[0.6] text-volt italic">
              &ldquo;
            </span>
            <blockquote className="mt-4 text-[clamp(1.75rem,3.4vw,2.9rem)] font-semibold leading-[1.15] tracking-tight">
              {lead.quote}
            </blockquote>
            <figcaption className="mt-8 text-sm">
              <span className="font-semibold">{lead.name}</span>
              <span className="text-white/70"> · {lead.role}</span>
            </figcaption>
          </figure>

          <div className="grid content-end gap-5">
            {more.map((t) => (
              <figure key={t.name} data-reveal className="rounded-brand-lg bg-white/10 p-7">
                <blockquote className="text-lg leading-relaxed">{t.quote}</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-white/70"> · {t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      <div data-reveal="fade" className="group border-t border-white/20 py-7">
        <p className="sr-only">Brands featured in our 2025 recap: {recapClients.join(", ")}.</p>
        <div
          aria-hidden
          className="flex w-max animate-[marquee_48s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        >
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {recapClients.map((name) => (
                <li key={name} className="flex items-center gap-10 pr-10 text-2xl font-semibold tracking-tight text-white/75 sm:text-3xl">
                  {name}
                  <span className="size-2 rounded-full bg-volt" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
