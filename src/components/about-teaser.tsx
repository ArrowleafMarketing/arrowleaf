import { CtaPill } from "@/components/cta-pill";
import { LeafShape } from "@/components/leaf-shape";

/**
 * About teaser: who's doing the work, in one screen. A plain statement and
 * three of the beliefs that shape how the team works, with a link to the
 * About page. The two bold leaves are the brand's "anti-design" shape.
 */
const principles = [
  {
    title: "Strategy beats tactics.",
    body: "Sequence matters more than hustle. We decide what to do first before we spend on anything.",
  },
  {
    title: "Creative is a growth lever.",
    body: "Not decoration. Everything we make has a job and a number it's meant to move.",
  },
  {
    title: "Data decides. It doesn't dictate.",
    body: "We measure what matters, ignore vanity metrics, and show you all of it.",
  },
] as const;

export function AboutTeaser() {
  return (
    <section className="relative isolate overflow-hidden border-t border-hairline bg-paper">
      {/* Tucked under the left column, clear of all text. */}
      <LeafShape className="absolute -bottom-24 -left-20 -z-10 hidden w-72 text-lapis lg:block xl:w-80" />
      <LeafShape className="absolute bottom-12 left-52 -z-10 hidden w-24 rotate-90 text-neon-red lg:block xl:left-60 xl:w-28" />

      <div className="page-gutter grid gap-14 py-24 sm:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <p data-reveal className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-ink/60">
            About
          </p>
          <h2 data-reveal className="mt-3 text-hero">
            Small team. <em>Senior hands.</em>
          </h2>
          <p data-reveal className="mt-6 max-w-lg text-lg text-ink/70">
            The people you meet are the people doing the work. No hand-offs to
            juniors, no black box: a boutique team that ties creative to revenue
            and helps you make marketing decisions faster.
          </p>
          <div data-reveal className="mt-10">
            <CtaPill href="/about">Meet the team</CtaPill>
          </div>
        </div>

        <ol className="grid content-start gap-0 lg:pt-10">
          {principles.map((p, i) => (
            <li
              key={p.title}
              data-reveal
              className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 border-t border-ink/15 py-7 last:border-b"
            >
              <span className="font-serif text-sm font-bold tracking-[0.2em] text-ink/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-2xl sm:text-3xl">{p.title}</h3>
                <p className="mt-2 max-w-md text-base text-ink/65">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
