import Link from "next/link";
import { LeafCta } from "@/components/leaf-cta";

/**
 * The primary "go" button: a label and the Arrowleaf mark, which turns into
 * an up-right arrow on hover (LeafCta). `tone` picks a brand pairing for the
 * pill and its disc.
 */
const TONES = {
  ink: { pill: "bg-ink text-white hover:bg-lapis", disc: "bg-volt text-ink" },
  volt: { pill: "bg-volt text-ink", disc: "bg-ink text-volt" },
  white: { pill: "bg-white text-ink", disc: "bg-ink text-white" },
} as const;

export function CtaPill({
  href,
  children,
  tone = "ink",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  tone?: keyof typeof TONES;
  className?: string;
}) {
  const t = TONES[tone];
  return (
    <Link
      href={href}
      data-cta-host
      className={`group/cta inline-flex items-center gap-4 rounded-full py-1.5 pl-6 pr-1.5 text-sm font-medium outline-offset-4 transition-colors duration-300 ${t.pill} ${className}`}
    >
      {children}
      <LeafCta className={t.disc} />
    </Link>
  );
}
