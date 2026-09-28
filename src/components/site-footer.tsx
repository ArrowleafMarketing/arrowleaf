import Link from "next/link";
import { CtaPill } from "@/components/cta-pill";
import { LogoLockup } from "@/components/logo";
import { brand } from "@/lib/brand";
import { services } from "@/lib/services";

/**
 * Site footer, on Ink. Tagline and the talk button, the link columns, then
 * the lockup set edge to edge as the footer's floor. On browsers with
 * scroll-driven animations the lockup rises into place as the footer scrolls
 * up (`footer-rise` in globals.css); elsewhere it just sits there.
 *
 * Rendered by PageTransition, so it travels with each page.
 */
const company = [
  { href: "/about", label: "About" },
  { href: "/results", label: "Results" },
  { href: "/solutions", label: "Solutions" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="overflow-hidden bg-ink text-white">
      <div className="page-gutter grid gap-14 pb-16 pt-20 sm:pt-24 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <p className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.025em]">
            Marketing <em className="font-serif font-normal tracking-normal text-volt">made clear</em>.
          </p>
          <p className="mt-5 max-w-sm text-base text-white/65">
            Brand, content, and paid growth on one shared plan, proven every
            month.
          </p>
          <CtaPill href="/contact" tone="volt" className="mt-8">
            Let&apos;s talk
          </CtaPill>
        </div>

        <nav aria-label="Solutions">
          <p className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-white/50">
            Solutions
          </p>
          <ul className="mt-5 grid gap-3">
            {services.map((s) => (
              <li key={s.id}>
                <FooterLink href={`/solutions/${s.id}`}>{s.title}</FooterLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid content-start gap-12 sm:grid-cols-2 lg:grid-cols-1">
          <nav aria-label="Company">
            <p className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              Company
            </p>
            <ul className="mt-5 grid gap-3">
              {company.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              Based in
            </p>
            <p className="mt-5 text-base text-white/80">{brand.locality}</p>
          </div>
        </div>
      </div>

      <div className="page-gutter flex flex-col gap-3 border-t border-white/15 py-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {brand.name}
        </p>
        <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-white">
          Back to top
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-3.5">
            <path d="M8 13V3M4 7l4-4 4 4" />
          </svg>
        </a>
      </div>

      <div className="page-gutter footer-rise pb-[clamp(0.75rem,2vw,2rem)]">
        <LogoLockup title="" className="block w-full text-volt" />
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-base text-white/80 transition-colors hover:text-white"
    >
      {children}
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-3 -translate-x-1 opacity-0 transition-[opacity,translate] duration-300 ease-brand group-hover:translate-x-0 group-hover:opacity-100">
        <path d="M5 11 11 5M6 5h5v5" />
      </svg>
    </Link>
  );
}
