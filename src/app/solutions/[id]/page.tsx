import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/arrow-icon";
import { PageIntro } from "@/components/page-intro";
import { PageTransition } from "@/components/page-transition";
import { services } from "@/lib/services";

// Mock page: one per service group, so the deck's cards have somewhere to go.
export function generateStaticParams() {
  return services.map((s) => ({ id: s.id }));
}

export const dynamicParams = false;

const find = (id: string) => services.find((s) => s.id === id);

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = find((await params).id);
  return service ? { title: service.title, description: service.summary } : {};
}

export default async function ServicePage({ params }: Props) {
  const service = find((await params).id);
  if (!service) notFound();

  return (
    <PageTransition>
      <main className="flex-1 bg-paper">
        <PageIntro
          eyebrow={`Solutions · ${service.index}`}
          title={service.title}
          lede={service.summary}
        />
        <section className="page-gutter pb-24 sm:pb-28">
          <ul className="max-w-3xl">
            {service.offerings.map((offering) => (
              <li
                key={offering}
                data-reveal
                className="border-t border-ink/12 py-5 text-xl font-medium last:border-b sm:text-2xl"
              >
                {offering}
              </li>
            ))}
          </ul>
          <Link
            href="/solutions"
            data-reveal
            className="group mt-12 inline-flex items-center gap-2 text-sm font-medium text-ink/70 transition-colors hover:text-ink"
          >
            <ArrowIcon className="rotate-180 transition-transform duration-300 ease-brand group-hover:-translate-x-0.5" />
            All solutions
          </Link>
        </section>
      </main>
    </PageTransition>
  );
}
