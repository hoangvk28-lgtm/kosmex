import { notFound } from "next/navigation";
import { CTASection } from "@/components/CTASection";
import { Icon } from "@/components/Icon";
import { ArticleCard, ResourceNav } from "@/components/resources";
import { JsonLd, PageHero } from "@/components/ui";
import { articles, faqs, resourceSections } from "@/content/resources";
import { faqLd, pageMeta } from "@/lib/seo";

const sections = resourceSections.filter((r) => r.slug !== "knowledge-center");
export const dynamicParams = false;
export const generateStaticParams = () => sections.map((s) => ({ section: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const s = sections.find((x) => x.slug === section);
  if (!s) return {};
  return pageMeta({ title: s.slug === "faq" ? "Plywood FAQ" : s.title, description: `${s.text} Kosmex Plywood resources for European plywood buyers.`, path: `/resources/${s.slug}/` });
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const s = sections.find((x) => x.slug === section);
  if (!s) notFound();
  const list = articles.filter((a) => a.section === s.slug).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHero crumbs={[{ name: "Resources", href: "/resources/" }, { name: s.title, href: `/resources/${s.slug}/` }]} eyebrow="Resources" title={s.slug === "faq" ? "Frequently asked questions" : s.title} lede={s.text} />
      <ResourceNav current={s.slug} />
      <section className="section-sm">
        <div className="wrap">
          {s.slug === "faq" ? (
            <div className="max-w-3xl divide-y divide-line border-y border-line">
              {faqs.map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-[1.12rem] font-bold">
                    <h2 className="text-[1.12rem]">{f.q}</h2>
                    <Icon name="chevron" className="mt-1 h-5 w-5 shrink-0 text-forest transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((a) => <ArticleCard key={a.slug} a={a} />)}
            </div>
          )}
        </div>
      </section>
      <CTASection />
      {s.slug === "faq" && <JsonLd data={faqLd(faqs)} />}
    </>
  );
}
