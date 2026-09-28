/**
 * Opening block for interior pages: eyebrow, headline, lede, on the static
 * cool mesh gradient (the home page keeps the animated glow to itself).
 * Pulled up under the translucent header like the home hero.
 */
export function PageIntro({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <section className="-mt-16 bg-mesh-cool">
      <div className="page-gutter pb-16 pt-36 sm:pb-24 sm:pt-44">
        <p data-reveal className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-ink/60">
          {eyebrow}
        </p>
        <h1 data-reveal className="mt-4 max-w-4xl text-hero">{title}</h1>
        <p data-reveal className="mt-6 max-w-2xl text-lg text-ink/70 sm:text-xl">{lede}</p>
      </div>
    </section>
  );
}
