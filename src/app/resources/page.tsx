import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { Icon } from "@/components/Icon";
import { ArticleCard, ResourceNav } from "@/components/resources";
import { PageHero, SectionHeading } from "@/components/ui";
import { articles, resourceSections } from "@/content/resources";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Plywood Knowledge Center",
  description: "Technical guides, procurement guides, product comparisons and FAQ for plywood buyers: TDS, test reports, inspection and EU import documents.",
  path: "/resources/",
});

export default function ResourcesPage() {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  const [lead, ...rest] = sorted;
  return (
    <>
      <PageHero crumbs={[{ name: "Resources", href: "/resources/" }]} eyebrow="Plywood knowledge center" title="Technical knowledge for plywood buyers" lede="Guides that support engineering checks, supplier qualification and procurement decisions." />
      <ResourceNav current="knowledge-center" />
      <section className="section-sm">
        <div className="wrap grid gap-5 lg:grid-cols-12">
          <Link href={`/resources/articles/${lead.slug}/`} className="on-dark group relative flex min-h-[340px] flex-col justify-end overflow-hidden bg-forest p-9 text-white lg:col-span-7">
            <div className="film-surface absolute inset-y-0 right-0 w-1/2 opacity-40" aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/85 to-transparent" aria-hidden />
            <div className="relative max-w-lg">
              <p className="eyebrow">Latest guide</p>
              <h2 className="mt-4 text-[length:var(--text-h3)] text-white">{lead.title}</h2>
              <p className="mt-3 text-white/75">{lead.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-bold">Read guide <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </div>
          </Link>
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-5">
            {resourceSections.filter((r) => r.slug !== "knowledge-center").map((r) => (
              <Link key={r.slug} href={`/resources/${r.slug}/`} className="group flex flex-col bg-white p-6 hover:bg-ivory">
                <span className="font-display font-bold text-forest">{r.title}</span>
                <span className="mt-1.5 flex-1 text-[.85rem] text-muted">{r.text}</span>
                <Icon name="arrow" className="mt-4 h-4 w-4 text-forest transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-sm bg-white">
        <div className="wrap">
          <SectionHeading eyebrow="All articles" title="Guides & insights" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => <ArticleCard key={a.slug} a={a} />)}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
