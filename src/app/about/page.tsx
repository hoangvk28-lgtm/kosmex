import { CTASection } from "@/components/CTASection";
import { Img } from "@/components/Img";
import { ArrowLink, PageHero, SectionHeading } from "@/components/ui";
import { categories, productHref } from "@/content/products";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About Kosmex Plywood",
  description: "Kosmex Plywood is the plywood brand of KOSMEX COMPANY LIMITED, a Vietnamese manufacturer of film faced, furniture, upholstery and packing plywood.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About Us", href: "/about/" }]}
        eyebrow="About the brand"
        title="A plywood partner built on product knowledge"
        lede={`Kosmex Plywood is the plywood brand of ${site.legalName}, Hanoi, Vietnam.`}
      />
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="space-y-5 text-[1.03rem] text-charcoal/85 lg:col-span-6">
            <p>Kosmex manufactures plywood for construction, furniture and industrial packaging. According to company information, Kosmex was established in {site.founded}.</p>
            <p>Kosmex Plywood brings the export range under one brand. It is led by film faced plywood carrying the KOSMEX logo in the film, and backed by published technical data, laboratory test reports and FSC Chain of Custody certification.</p>
            <p>Our positioning is simple: technical expertise before scale. We publish what we can document, mark what is pending, and work with buyers on a written specification.</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-forest lg:col-span-6">
            <Img name="ffp-branded-panels" alt="KOSMEX-printed film faced plywood panels in production" sizes="(min-width:1024px) 50vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </section>
      <section className="section bg-white">
        <div className="wrap">
          <SectionHeading eyebrow="Principles" title="How we work with buyers" />
          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
            {[
              ["Specification first", "Every order starts from a written specification: species, construction, glue, dimensions and tolerances."],
              ["Evidence over adjectives", "Declared values, laboratory results and certificates are labelled separately and linked to their documents."],
              ["Transparent limits", "We do not claim capacity, certifications or market presence we cannot document."],
            ].map(([t, d]) => (
              <div key={t} className="bg-white p-8"><h3 className="text-[1.2rem]">{t}</h3><p className="mt-3 text-muted">{d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-[length:var(--text-h3)]">Company details</h2>
            <dl className="mt-6 divide-y divide-line border-y border-line text-[.95rem]">
              {[["Legal name", site.legalName], [site.office.label, site.office.lines.join(", ")], [site.factory.label, site.factory.lines.join(", ")], ["Sales", site.email], ["Corporate website", "kosmexgroup.com"]].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[10rem_1fr] gap-4 py-3"><dt className="font-semibold">{k}</dt><dd className="text-muted">{v}</dd></div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="text-[length:var(--text-h3)]">Our ranges</h2>
            <ul className="mt-6 space-y-3">
              {categories.map((c) => <li key={c.slug}><ArrowLink href={productHref(c.slug)}>{`0${c.order} · ${c.name}`}</ArrowLink></li>)}
            </ul>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
