import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { DocumentCard } from "@/components/cards";
import { CTASection } from "@/components/CTASection";
import { Img } from "@/components/Img";
import { QualityNav } from "@/components/quality";
import { TechnicalTable } from "@/components/TechnicalTable";
import { ArrowLink, Button, PageHero, SectionHeading } from "@/components/ui";
import { machines, qcStages, qualityPages } from "@/content/quality";
import { documents } from "@/content/documents";
import { categories, productHref } from "@/content/products";
import { pageMeta } from "@/lib/seo";

const pages = qualityPages.filter((q) => q.slug);
export const dynamicParams = false;
export const generateStaticParams = () => pages.map((q) => ({ slug: q.slug }));

const ledes: Record<string, string> = {
  "qc-process": "Six inspection stages from log intake to loaded container, with the checks performed at each stage.",
  "product-specifications": "Every specification field for every Kosmex product, with its source: test report, Kosmex TDS or awaiting data.",
  "technical-data-sheets": "Technical Data Sheets for each range. Published sheets download directly; the rest are marked pending.",
  "qc-reports": "Batch-level inspection records that confirm a shipment meets its agreed specification.",
  "test-reports": "Independent laboratory reports, each with issuing laboratory, report number, method, sample and date.",
  "testing-inspection": "The checks we run in production, and the properties verified by external laboratories.",
  "material-core-expertise": "Species, veneer, glue systems and core construction: the materials science behind each panel.",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const q = pages.find((x) => x.slug === slug);
  if (!q) return {};
  return pageMeta({ title: q.title, description: ledes[q.slug], path: `/quality/${q.slug}/` });
}

export default async function QualitySubPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const q = pages.find((x) => x.slug === slug);
  if (!q) notFound();

  const body: Record<string, ReactNode> = {
    "qc-process": <QcProcess />,
    "product-specifications": <ProductSpecs />,
    "technical-data-sheets": <DocGrid filter={(d) => d.docClass === "tds" || d.docClass === "specification"} intro="A TDS is a manufacturer's declaration of product properties. Check its revision date and which values are backed by test reports." />,
    "qc-reports": <QcReports />,
    "test-reports": <TestReports />,
    "testing-inspection": <TestingInspection />,
    "material-core-expertise": <MaterialExpertise />,
  };

  return (
    <>
      <PageHero crumbs={[{ name: "Quality & Expertise", href: "/quality/" }, { name: q.title, href: `/quality/${q.slug}/` }]} eyebrow="Quality & expertise" title={q.title} lede={ledes[q.slug]} />
      <QualityNav current={q.slug} />
      {body[q.slug]}
      <CTASection title="Need documents for supplier qualification?" text="Request TDS, test reports, batch QC records and sourcing documents with your enquiry." />
    </>
  );
}

/* ---------------------------------------------------------------- pages -- */
function QcProcess() {
  return (
    <section className="section">
      <div className="wrap space-y-6">
        {qcStages.map((s, i) => (
          <article key={s.n} className="grid overflow-hidden overflow-hidden rounded-2xl border border-line bg-white md:grid-cols-12">
            <div className={`relative min-h-[240px] bg-forest md:col-span-5 ${i % 2 ? "md:order-2" : ""}`}>
              <Img name={s.image} alt={`${s.title} at the Kosmex factory`} sizes="(min-width:768px) 40vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <div className="p-8 md:col-span-7 md:p-12">
              <span className="font-display text-[.9rem] font-bold text-gold-2">Stage {s.n}</span>
              <h2 className="mt-2 text-[length:var(--text-h3)]">{s.title}</h2>
              <ul className="mt-6 space-y-3">
                {s.checks.map((c) => (
                  <li key={c} className="flex gap-3 border-t border-line pt-3 text-[.98rem]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold" />{c}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
        <p className="pt-4 text-[.85rem] text-muted">Process steps as published by Kosmex. Kosmex states that its QC procedures follow EN 314 and EN 636 requirements. Inspection frequencies and acceptance limits are agreed per order.</p>
      </div>
    </section>
  );
}

function ProductSpecs() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="mt-10 space-y-4">
          {categories.map((c, i) => (
            <details key={c.slug} open={i === 0} className="group overflow-hidden rounded-2xl border border-line bg-white">
              <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-4 p-6">
                <span className="font-display text-[1.25rem] font-bold text-forest"><span className="mr-3 text-gold-2">0{c.order}</span>{c.name}</span>
                <span className="text-[.82rem] text-muted">
                  {c.specs.filter((s) => s.status !== "pending").length} documented · {c.specs.filter((s) => s.status === "pending").length} awaiting data
                </span>
              </summary>
              <div className="border-t border-line p-6">
                <TechnicalTable rows={c.specs} caption={`${c.name} specification`} legend={false} />
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {[c, ...c.children].map((p) => (
                    <ArrowLink key={p.slug} href={productHref(p.slug)}>{"navLabel" in p ? p.navLabel : "Range overview"}</ArrowLink>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function DocGrid({ filter, intro }: { filter: (d: (typeof documents)[number]) => boolean; intro: string }) {
  return (
    <section className="section">
      <div className="wrap">
        <p className="max-w-3xl text-muted">{intro}</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {documents.filter(filter).map((d) => <DocumentCard key={d.slug} d={d} />)}
        </div>
      </div>
    </section>
  );
}

function QcReports() {
  const fields = ["Order, product and batch reference", "Specification and TDS revision checked against", "Sample size and sampling method", "Thickness and dimensional measurements vs. tolerance", "Moisture content readings", "Surface / film inspection results", "Bond check method and result, where specified", "Packing and labelling check", "Inspector, date and release decision"];
  return (
    <section className="section">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionHeading eyebrow="What a batch QC report records" title="Evidence per shipment" lede="A QC report is the manufacturer's own record for a specific batch. It shows that the process was controlled. It is not an independent test." />
          <ol className="mt-8 divide-y divide-line border-y border-line">
            {fields.map((f, i) => (
              <li key={f} className="flex gap-4 py-3.5 text-[.98rem]"><span className="w-6 font-display text-[.82rem] font-bold text-gold-2">{String(i + 1).padStart(2, "0")}</span>{f}</li>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden bg-forest">
            <Img name="qc-thickness-caliper" alt="Digital caliper measuring film faced plywood thickness" sizes="(min-width:1024px) 45vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="mt-6"><Button href="/request-a-quote/?doc=qc-report-batch" variant="outline">Request a sample QC report</Button></div>
        </div>
      </div>
    </section>
  );
}

function TestReports() {
  const tests = documents.filter((d) => d.docClass === "lab-test");
  return (
    <section className="section">
      <div className="wrap">
        <div className="space-y-5">
          {tests.map((d) => (
            <article key={d.slug} className="grid gap-6 overflow-hidden rounded-2xl border border-line bg-white p-7 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <p className="text-[.7rem] font-bold uppercase tracking-[.16em] text-forest-2">{d.issuer ?? "Laboratory to be confirmed"}</p>
                <h2 className="mt-2 text-[1.3rem]">{d.title}</h2>
                <p className="mt-2 text-[.88rem] text-muted">{d.reference ? `Report ${d.reference} · ` : ""}{d.revision ?? "Not yet published"}</p>
              </div>
              <dl className="grid gap-x-6 gap-y-3 text-[.9rem] sm:grid-cols-2 lg:col-span-5">
                {(d.facts ?? [{ label: "Status", value: d.summary }]).map((f) => (
                  <div key={f.label} className="border-t border-line pt-2">
                    <dt className="text-[.65rem] font-bold uppercase tracking-[.14em] text-stone">{f.label}</dt>
                    <dd className="mt-0.5 font-semibold">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="lg:col-span-2">
                {d.file ? <a href={d.file} download className="btn btn-primary btn-sm w-full">Download PDF</a> : <span className="flex min-h-10 items-center justify-center border border-dashed border-amber/40 bg-amber-bg px-3 text-center text-[.8rem] font-semibold text-amber">Pending publication</span>}
              </div>
              {d.caveat && <p className="text-[.8rem] text-muted lg:col-span-12">{d.caveat}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestingInspection() {
  const inProd = [
    ["Thickness calibration", "Digital caliper measurements after sanding and finishing.", "qc-thickness-caliper"],
    ["Moisture content", "Veneer and panel moisture checked with moisture meters; the TDS declares < 12% (EN 322).", "qc-moisture-meter"],
    ["Dimensional inspection", "Length, width and squareness checked against EN 315 tolerances (±1 mm).", "qc-dimension-check"],
    ["Bending & stiffness", "Bending strength and MOE verified on test equipment and by external laboratories (EN 310).", "qc-bending-test"],
  ] as const;
  const lab = [["EN 310", "Bending strength & modulus of elasticity", "Published"], ["EN 438-2", "Abrasion resistance of film surface", "Published"], ["DIN 51130", "Anti-slip property (ramp test)", "Published"], ["JAS 0233-2", "Bending strength, 12 mm plywood", "Published"], ["EN 717-1", "Formaldehyde emission, 9 mm plywood", "Published"]];
  return (
    <>
      <section className="section">
        <div className="wrap">
          <SectionHeading eyebrow="In production" title="Checks on the factory floor" />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {inProd.map(([t, d, img]) => (
              <article key={t} className="overflow-hidden rounded-2xl border border-line bg-white">
                <div className="relative aspect-[4/3] overflow-hidden bg-forest"><Img name={img} alt={t} sizes="(min-width:1024px) 25vw, 50vw" className="absolute inset-0 h-full w-full object-cover" /></div>
                <div className="p-6"><h3 className="text-[1.1rem]">{t}</h3><p className="mt-2 text-[.92rem] text-muted">{d}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-white">
        <div className="wrap">
          <SectionHeading eyebrow="Independent laboratories" title="Externally tested properties" lede="Laboratory results apply to the sample tested. They are evidence, not a guarantee for every batch." />
          <div className="table-scroll mt-10 rounded-2xl border border-line">
            <table className="spec-table min-w-[600px]">
              <thead><tr><th>Method</th><th>Property</th><th>Report status</th></tr></thead>
              <tbody>
                {lab.map(([m, p, s]) => (
                  <tr key={m}><th scope="row">{m}</th><td>{p}</td><td><span className={`badge ${s === "Published" ? "badge-verified" : "badge-pending"}`}>{s}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6"><ArrowLink href="/quality/test-reports/">View test reports</ArrowLink></div>
        </div>
      </section>
    </>
  );
}

function MaterialExpertise() {
  const species = [
    ["Acacia", "Dense plantation hardwood. Used for formwork cores and heavy packing panels. TDS density for acacia-core film faced plywood: 550 kg/m³."],
    ["Eucalyptus", "Plantation hardwood with good density and fastener holding. Used in mixed formwork cores and furniture and packing panels. TDS: 650 kg/m³ for eucalyptus core."],
    ["Birch", "Fine, light, uniform face veneer for furniture and visible-edge applications."],
    ["Poplar", "Light, easily machined species for lightweight furniture components."],
    ["Okoume · Bintangor · Styrax", "Tropical face veneers that give a more uniform surface on packing and general-purpose panels."],
  ];
  const glues = [
    ["MR (urea-formaldehyde)", "Moisture resistant, for interior use. Not intended for wetting or boiling."],
    ["MUF (melamine-urea-formaldehyde)", "Better water resistance than UF. Used in the Kosmex Economy and Medium grades (BR-6h / BR-12h boil-resistant declaration)."],
    ["PF (phenol-formaldehyde)", "Dark, highly water-resistant glue associated with exterior / EN 314-2 Class 3 bonding."],
    ["WBP", "“Weather and boil proof”: a traditional trade term. A buyer should ask for the EN 314 class and test report instead."],
  ];
  return (
    <>
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><SectionHeading eyebrow="Wood species" title="Species and their roles" /></div>
          <dl className="lg:col-span-8 divide-y divide-line border-y border-line">
            {species.map(([s, d]) => (
              <div key={s} className="grid gap-2 py-5 md:grid-cols-[14rem_1fr]">
                <dt className="font-display text-[1.1rem] font-bold text-forest">{s}</dt>
                <dd className="text-muted">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="section bg-white">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><SectionHeading eyebrow="Adhesives" title="Glue systems explained" /></div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            {glues.map(([g, d]) => (
              <div key={g} className="bg-white p-7"><h3 className="text-[1.05rem]">{g}</h3><p className="mt-2 text-[.93rem] text-muted">{d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Core construction" title="From log to cross-laminated panel" lede="Plywood gets its strength and stability from alternating grain direction. These are the main machine stages in Kosmex production." />
            <div className="relative mt-8 aspect-[4/3] overflow-hidden bg-forest"><Img name="veneer-sorting-floor" alt="Veneer sorting and lay-up floor" sizes="(min-width:1024px) 40vw, 100vw" className="absolute inset-0 h-full w-full object-cover" /></div>
          </div>
          <ol className="lg:col-span-7 lg:pt-16">
            {machines.map((m, i) => (
              <li key={m.name} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-5 last:border-b">
                <span className="font-display text-[.85rem] font-bold text-gold-2">{String(i + 1).padStart(2, "0")}</span>
                <div><h3 className="text-[1.1rem]">{m.name}</h3><p className="mt-1 text-[.93rem] text-muted">{m.text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <div className="wrap pb-16"><Link href="/resources/articles/plywood-species-compared/" className="link-arrow">Read: species compared →</Link></div>
    </>
  );
}
