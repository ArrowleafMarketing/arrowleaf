import { CtaPill } from "@/components/cta-pill";
import { LeafShape } from "@/components/leaf-shape";
import { values } from "@/lib/brand";

/**
 * About teaser: the position in one line and three of the values that shape
 * how the team works (straight from the 2026 MVVBP in src/lib/brand.ts),
 * with a link to the About page. The two bold leaves are the brand's
 * "anti-design" shape.
 */
const featured = ["Partnership", "Quality", "Alignment"] as const;
const principles = values.filter((v) => (featured as readonly string[]).includes(v.name));

export function AboutTeaser() {
  return (
    <section className="relative isolate overflow-hidden border-t border-hairline bg-paper">
      {/* Tucked under the left column, clear of all text. */}
      <LeafShape className="absolute -bottom-24 -left-20 -z-10 hidden w-72 text-lapis lg:block xl:w-80" />
      <LeafShape className="absolute bottom-12 left-52 -z-10 hidden w-24 rotate-90 text-neon-red lg:block xl:left-60 xl:w-28" />

      <div className="page-gutter grid gap-14 py-24 sm:py-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <p data-reveal className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-ink/70">
            About
          </p>
          <h2 data-reveal className="mt-3 text-hero">
            Not a vendor. <em>A growth partner.</em>
          </h2>
          <p data-reveal className="mt-6 max-w-lg text-lg text-ink/80">
            We work with established businesses at pivotal moments, for the long
            run. Brands you&apos;re proud of, marketing that delivers results, and a
            team that&apos;s in it with you.
          </p>
          <div data-reveal className="mt-10">
            <CtaPill href="/about">Get to know us</CtaPill>
          </div>
        </div>

        <ol className="grid content-start gap-0 lg:pt-10">
          {principles.map((p, i) => (
            <li
              key={p.name}
              data-reveal
              className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 border-t border-ink/15 py-7 last:border-b"
            >
              <span className="font-serif text-sm font-bold tracking-[0.2em] text-ink/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-serif text-2xl font-normal italic tracking-normal sm:text-3xl">{p.name}</h3>
                <p className="mt-2 max-w-md text-base text-ink/75">{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
