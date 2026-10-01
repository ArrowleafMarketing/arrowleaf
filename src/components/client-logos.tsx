import Image from "next/image";
import { clientLogos, type ClientLogo } from "@/lib/clients";

/**
 * Who we work with, on Lapis: three rows of client logos drifting past (the
 * middle row the other way), all set as one-color white marks
 * (src/lib/clients.ts). Runs on the `marquee` keyframes in globals.css, fades
 * out at both edges, and sits still under reduced motion.
 */
export function ClientLogos() {
  return (
    <section className="overflow-hidden bg-lapis text-white">
      <div className="page-gutter pt-20 sm:pt-24">
        <p data-reveal className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-white/80">
          Who we work with
        </p>
        <h2 data-reveal className="mt-3 max-w-2xl text-3xl sm:text-4xl">
          Growing alongside <em>great businesses</em>
        </h2>
      </div>

      <div
        data-reveal="fade"
        className="mt-10 grid gap-7 pb-20 pt-4 sm:mt-12 sm:pb-24 [--logo-h:1.5rem] [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)] sm:gap-9 sm:py-12 sm:[--logo-h:1.85rem]"
      >
        <p className="sr-only">Some of the businesses we work with: {clientLogos.map((c) => c.name).join(", ")}.</p>
        {LOGO_ROWS.map((row, r) => (
          <div
            key={r}
            aria-hidden
            // Lapis on the moving track itself: it's its own compositing group, so
            // the "light" and "threshold" logos need a backdrop inside it to blend with.
            className={`flex w-max bg-lapis animate-[marquee_100s_linear_infinite] motion-reduce:animate-none ${
              r === 1 ? "[animation-direction:reverse]" : ""
            }`}
          >
            {[0, 1].map((half) => (
              <ul key={half} className="flex shrink-0 items-center">
                {/* Each half repeats its row so it's always wider than the screen. */}
                {[...row, ...row].map((logo, i) => (
                  <li key={`${logo.name}-${i}`} className="flex items-center pr-14 sm:pr-20">
                    <LogoMark logo={logo} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/** Three rows, dealt out in turn so each row gets a mix of marks. */
const LOGO_ROWS = [0, 1, 2].map((r) => clientLogos.filter((_, i) => i % 3 === r));

/** How each tone turns a full-color file into a clean white mark on Lapis. */
const TONE_STYLE: Record<NonNullable<ClientLogo["tone"]>, React.CSSProperties> = {
  silhouette: { filter: "brightness(0) invert(1)" },
  light: { filter: "grayscale(1)", mixBlendMode: "screen" },
  threshold: { filter: "grayscale(1) contrast(100) invert(1)", mixBlendMode: "screen" },
};

function LogoMark({ logo }: { logo: ClientLogo }) {
  return (
    <Image
      src={logo.src}
      alt=""
      width={Math.round(logo.ratio * 100)}
      height={100}
      unoptimized={logo.src.endsWith(".svg")}
      className="w-auto max-w-none object-contain opacity-90"
      style={{
        height: `calc(var(--logo-h) * ${logo.scale ?? 1})`,
        aspectRatio: logo.ratio,
        ...TONE_STYLE[logo.tone ?? "silhouette"],
      }}
    />
  );
}
