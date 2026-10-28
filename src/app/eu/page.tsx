import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { Icon } from "@/components/Icon";
import { PageHero, SectionHeading } from "@/components/ui";
import { markets } from "@/content/markets";
import { productName } from "@/content/products";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "EU Markets — Plywood Supply for European Buyers",
  description:
    "Kosmex Plywood market pages for Poland, Italy, Spain, Belgium, Cyprus, Bulgaria, Germany and Sweden: products, documents and procurement considerations.",
  path: "/eu/",
});

export default function MarketsPage() {
  return (
    <>
      <PageHero
        dark
        crumbs={[{ name: "EU Markets", href: "/eu/" }]}
        eyebrow="European markets"
        title="Supporting plywood buyers across Europe"
        lede="Dedicated pages for eight priority markets, each built around the products, documents and procurement questions most relevant to buyers there."
      />
      <section className="section">
        <div className="wrap">
          <div className="grid gap-5 md:grid-cols-2">
            {markets.map((m, i) => (
              <Link key={m.slug} href={`/eu/${m.slug}/`} className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white p-8 transition-colors hover:border-forest/40">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-5">
                    <img src={`/flags/${m.code.toLowerCase()}.svg`} alt={`Flag of ${m.name}`} width={64} height={48} className="mt-1 h-12 w-16 shrink-0 rounded-lg object-cover shadow-sm ring-1 ring-line" />
                    <div>
                    <span className="font-display text-[.78rem] font-bold tracking-[.14em] text-stone">{String(i + 1).padStart(2, "0")} · {m.code}</span>
                    <h2 className="mt-2 text-[1.9rem] text-forest">{m.name}</h2>
                    <p className="text-[.9rem] text-muted">{m.native}</p>
                    </div>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-forest transition-colors group-hover:border-forest group-hover:bg-forest group-hover:text-white"><Icon name="arrow" /></span>
                </div>
                <p className="mt-6 text-[.95rem] text-charcoal/85">{m.buyerSegments.join(" · ")}</p>
                <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                  {m.focusProducts.map((p) => (
                    <span key={p} className="rounded-full bg-ivory-2 px-3 py-1 text-[.78rem] font-semibold text-forest-2">{productName(p)}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-sm bg-white">
        <div className="wrap">
          <SectionHeading
            eyebrow="How we supply"
            title="From Vietnam, by container, with documents"
            lede="Kosmex supplies European buyers directly from Vietnam. We do not operate local offices or European warehouses, and we do not claim established distribution in these countries. Each market page explains what we can document and support today."
          />
        </div>
      </section>
      <CTASection />
    </>
  );
}
