import type { Metadata } from "next";
import Image from "next/image";
import { GlowField } from "@/components/glow-field";
import { LogoIcon, LogoLockup } from "@/components/logo";
import { PageTransition } from "@/components/page-transition";
import { colors, graphics, type, values, voice } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Brand reference",
  description: "Internal reference for Arrowleaf brand tokens and assets.",
  robots: { index: false, follow: false },
};

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-hairline py-14">
      <p className="font-serif text-xs font-bold uppercase tracking-widest text-muted">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Swatch({
  name,
  hex,
  textClass,
}: {
  name: string;
  hex: string;
  textClass: string;
}) {
  return (
    <div className="overflow-hidden rounded-brand border border-hairline">
      <div
        className={`flex h-28 items-end p-3 ${textClass}`}
        style={{ backgroundColor: hex }}
      >
        <span className="text-xs font-medium">{name}</span>
      </div>
      <div className="bg-white px-3 py-2 font-mono text-xs text-muted">
        {hex}
      </div>
    </div>
  );
}

export default function BrandPage() {
  return (
    <PageTransition>
      <main className="mx-auto w-full max-w-5xl bg-paper px-6 py-16">
        <header>
          <p className="font-serif text-xs font-bold uppercase tracking-widest text-muted">
            Internal reference
          </p>
          <h1 className="mt-3 text-display">
            Brand <em>system</em>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Live rendering of every design token defined in{" "}
            <code className="font-mono text-sm">src/lib/brand.ts</code> and{" "}
            <code className="font-mono text-sm">globals.css</code>. If something
            looks wrong here, the tokens are wrong.
          </p>
        </header>

        <Section eyebrow="Logo" title={<>Marks</>}>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-center justify-center rounded-brand border border-hairline bg-white p-8">
              <LogoIcon className="h-20 w-20 text-ink" />
            </div>
            <div className="flex items-center justify-center rounded-brand bg-lapis p-8">
              <LogoIcon className="h-20 w-20 text-white" />
            </div>
            <div className="flex items-center justify-center rounded-brand bg-volt p-8">
              <LogoIcon className="h-20 w-20 text-white" />
            </div>
            <div className="flex items-center justify-center rounded-brand border border-hairline bg-white p-8 sm:col-span-3">
              <LogoLockup className="h-12 w-auto text-ink" />
            </div>
          </div>
          <p className="mt-4 text-sm text-muted">
            On Volt Green the mark is white by default; black is reserved for
            marks sitting beside black text or rendered very small.
          </p>
        </Section>

        <Section eyebrow="Color" title={<>Palette</>}>
          <h3 className="text-sm font-medium uppercase tracking-wide text-muted">
            Primary
          </h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            <Swatch name="Volt Green" hex={colors.primary.volt} textClass="text-ink" />
            <Swatch name="Lapis Blue" hex={colors.primary.lapis} textClass="text-white" />
            <Swatch
              name="Extra Light Yellow"
              hex={colors.primary.paper}
              textClass="text-ink"
            />
          </div>

          <h3 className="mt-10 text-sm font-medium uppercase tracking-wide text-muted">
            Secondary
          </h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            <Swatch name="Neon Red" hex={colors.secondary.neonRed} textClass="text-white" />
            <Swatch name="White" hex={colors.secondary.white} textClass="text-ink" />
            <Swatch name="Black" hex={colors.secondary.black} textClass="text-white" />
          </div>

          <h3 className="mt-10 text-sm font-medium uppercase tracking-wide text-muted">
            Accent — special circumstances only, never on Volt Green
          </h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            <Swatch name="Cyan" hex={colors.accent.cyan} textClass="text-ink" />
            <Swatch name="Orange" hex={colors.accent.orange} textClass="text-ink" />
            <Swatch name="Magenta" hex={colors.accent.magenta} textClass="text-white" />
          </div>
        </Section>

        <Section eyebrow="Typography" title={<>Type scale</>}>
          <div className="space-y-6">
            <div>
              <p className="text-xs text-muted">
                Display — Poppins SemiBold {type.heading.weight} + IBM Plex Serif italic
              </p>
              <p className="text-display">
                Reach <em>your people</em>
              </p>
            </div>
            <div>
              <p className="text-xs text-muted">Hero</p>
              <p className="text-hero">
                Growth without <em>the guesswork</em>
              </p>
            </div>
            <div>
              <p className="text-xs text-muted">
                Eyebrow — IBM Plex Serif Bold, uppercase
              </p>
              <p className="font-serif text-sm font-bold uppercase tracking-widest">
                Our digital services
              </p>
            </div>
            <div>
              <p className="text-xs text-muted">
                Body — Poppins ExtraLight {type.body.weight}
              </p>
              <p className="max-w-xl text-lg">
                We show plans, budgets, and performance in plain English. We are{" "}
                <strong className="font-semibold">accountable stewards</strong> of
                our clients&apos; ad spend, and we{" "}
                <span className="mark-volt">test purposefully</span> and scale what
                works.
              </p>
            </div>
          </div>
        </Section>

        <Section eyebrow="Graphics" title={<>Gradients &amp; pattern</>}>
          <p className="text-sm text-muted">
            Animated glow — the home hero background. Drop{" "}
            <code className="font-mono text-xs">&lt;GlowField /&gt;</code> into
            any <code className="font-mono text-xs">relative isolate overflow-hidden</code>{" "}
            container. Freezes under reduced motion.
          </p>
          <div className="relative isolate mt-3 flex h-64 items-end overflow-hidden rounded-brand border border-hairline bg-paper p-3">
            <GlowField />
            <code className="font-mono text-xs">&lt;GlowField /&gt;</code>
          </div>

          <p className="mt-8 text-sm text-muted">
            Static CSS mesh utilities — no image request, scales to any section.
          </p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <div className="flex h-40 items-end rounded-brand bg-mesh-warm p-3">
              <code className="font-mono text-xs">bg-mesh-warm</code>
            </div>
            <div className="flex h-40 items-end rounded-brand bg-mesh-cool p-3">
              <code className="font-mono text-xs">bg-mesh-cool</code>
            </div>
          </div>

          <p className="mt-8 text-sm text-muted">
            Raster meshes from the brand library, for large hero areas.
          </p>
          <div className="mt-3 grid gap-4 sm:grid-cols-3">
            {graphics.gradients.map((src) => (
              <Image
                key={src}
                src={src}
                alt=""
                width={640}
                height={360}
                className="h-28 w-full rounded-brand object-cover"
              />
            ))}
          </div>

          <div className="mt-8 flex h-40 items-end rounded-brand border border-hairline bg-pixel-grid p-3">
            <code className="font-mono text-xs">bg-pixel-grid</code>
          </div>
        </Section>

        <Section eyebrow="Voice" title={<>How we sound</>}>
          <p className="max-w-2xl text-lg">{voice.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {voice.traits.map((t) => (
              <span
                key={t}
                className="rounded-brand bg-ink px-3 py-1 text-xs uppercase tracking-wide text-white"
              >
                {t}
              </span>
            ))}
          </div>
          <h3 className="mt-10 text-sm font-medium uppercase tracking-wide text-muted">
            Values
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {values.map((v) => (
              <span
                key={v}
                className="rounded-brand bg-lapis px-3 py-1 text-xs uppercase tracking-wide text-white"
              >
                {v}
              </span>
            ))}
          </div>
          <h3 className="mt-10 text-sm font-medium uppercase tracking-wide text-muted">
            We don&apos;t
          </h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
            {voice.avoid.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </Section>
      </main>
    </PageTransition>
  );
}
