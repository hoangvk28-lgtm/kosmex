import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { Icon } from "@/components/Icon";
import { Img } from "@/components/Img";
import { QualityNav } from "@/components/quality";
import { PageHero, SectionHeading } from "@/components/ui";
import { qcStages, qualityPages } from "@/content/quality";
import { documents } from "@/content/documents";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Quality Control & Technical Expertise",
  description: "How Kosmex defines, inspects, tests and documents plywood quality: QC process, specifications, technical data sheets, QC reports and laboratory test reports.",
  path: "/quality/",
});

export default function QualityPage() {
  const published = documents.filter((d) => d.availability === "download").length;
  return (
    <>
      <PageHero
        dark
        crumbs={[{ name: "Quality & Expertise", href: "/quality/" }]}
        eyebrow="Technical & quality center"
        title="Quality you can inspect"
        lede="We define each specification, measure it in production, verify key properties in independent laboratories and document the result. This center shows what we publish, and what we hold per order."
        aside={
          <dl className="grid grid-cols-3 gap-px bg-white/12 text-center">
            {[["6", "QC stages"], [String(published), "Published documents"], ["4", "EN / DIN test methods"]].map(([n, l]) => (
              <div key={l} className="bg-forest px-3 py-6">
                <dd className="font-display text-3xl font-extrabold text-gold">{n}</dd>
                <dt className="mt-1 text-[.72rem] font-semibold uppercase tracking-[.1em] text-white/70">{l}</dt>
              </div>
            ))}
          </dl>
        }
      />
      <QualityNav current="" />

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Our approach" title="Specification, inspection, evidence" />
            <div className="mt-6 space-y-4 text-charcoal/85">
              <p>Quality claims mean little without a defined specification and a record. Every Kosmex product starts from a written specification: species, construction, glue, dimensions and tolerances.</p>
              <p>Production checks confirm the specification batch by batch. Independent laboratories test key properties against EN and DIN methods. We keep the three levels apart: declared values, laboratory results and certificates.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {(["qc-thickness-caliper", "qc-moisture-meter", "qc-bending-test", "qc-dimension-check"] as const).map((n, i) => (
              <figure key={n} className="relative aspect-square overflow-hidden bg-forest">
                <Img name={n} alt={["Caliper thickness check on film faced panel", "Moisture meter reading on wood", "Bending test rig with KOSMEX panel", "Tape-measure dimensional check"][i]} sizes="(min-width:1024px) 28vw, 50vw" className="absolute inset-0 h-full w-full object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-3/90 to-transparent p-4 pt-10 text-[.82rem] font-semibold text-white">
                  {["Thickness calibration", "Moisture control", "Bending test", "Dimensional inspection"][i]}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="wrap">
          <SectionHeading eyebrow="Explore" title="Quality & technical resources" />
          <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {qualityPages.filter((q) => q.slug).map((q) => (
              <Link key={q.slug} href={`/quality/${q.slug}/`} className="group flex min-h-[190px] flex-col bg-white p-7 transition-colors hover:bg-ivory">
                <h3 className="text-[1.15rem]">{q.title}</h3>
                <p className="mt-2 flex-1 text-[.92rem] text-muted">{q.text}</p>
                <Icon name="arrow" className="mt-5 h-5 w-5 text-forest transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="QC process" title="Six stages, from log to container" />
          <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {qcStages.map((s) => (
              <li key={s.n} className="border-t-2 border-forest bg-white p-7">
                <span className="font-display text-[.85rem] font-bold text-gold-2">{s.n}</span>
                <h3 className="mt-2 text-[1.15rem]">{s.title}</h3>
                <p className="mt-2 text-[.93rem] text-muted">{s.short}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CTASection title="Need documents for supplier qualification?" text="Request TDS, test reports, batch QC records and sourcing documents with your enquiry." />
    </>
  );
}
