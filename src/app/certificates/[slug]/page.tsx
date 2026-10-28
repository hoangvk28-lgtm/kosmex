import { notFound } from "next/navigation";
import { CTASection } from "@/components/CTASection";
import { DocAction } from "@/components/cards";
import { ArrowLink, PageHero, PendingNote } from "@/components/ui";
import { availabilityLabel, docClassLabel, documents, getDoc } from "@/content/documents";
import { productHref, productName } from "@/content/products";
import { pageMeta } from "@/lib/seo";

const LIB = documents.filter((d) => ["certification", "dop", "lab-test", "qc-report", "traceability"].includes(d.docClass));
export const dynamicParams = false;
export const generateStaticParams = () => LIB.map((d) => ({ slug: d.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const d = getDoc((await params).slug);
  if (!d) return {};
  return pageMeta({ title: d.title, description: d.summary.slice(0, 158), path: `/certificates/${d.slug}/` });
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const d = getDoc((await params).slug);
  if (!d || !LIB.includes(d)) notFound();
  const rows: [string, string][] = [
    ["Document type", docClassLabel[d.docClass]],
    ["Status", availabilityLabel[d.availability]],
    ["Issuer", d.issuer ?? "—"],
    ["Reference", d.reference ?? "—"],
    ["Applies to", d.product],
    ["Language", d.language],
    ["Date / revision", d.revision ?? "—"],
    ...((d.facts ?? []).map((f) => [f.label, f.value]) as [string, string][]),
  ];
  const related = d.productSlugs.filter((s) => s !== "*");

  return (
    <>
      <PageHero crumbs={[{ name: "Certificates", href: "/certificates/" }, { name: d.title, href: `/certificates/${d.slug}/` }]} eyebrow={docClassLabel[d.docClass]} title={d.title} lede={d.summary} />
      <section className="section-sm">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="table-scroll border border-line bg-white">
              <table className="spec-table">
                <caption className="sr-only">Document details</caption>
                <tbody>
                  {rows.map(([k, v]) => (
                    <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            {d.caveat && <p className="mt-5 border-l-2 border-forest pl-4 text-[.92rem] text-muted">{d.caveat}</p>}
            {d.availability === "pending" && <PendingNote className="mt-5">This document has not been published. Nothing on this page should be read as a claim that Kosmex holds it.</PendingNote>}
          </div>
          <aside className="space-y-5 lg:col-span-4">
            <div className="border border-line bg-white p-6">
              <DocAction d={d} />
              {d.slug === "fsc-chain-of-custody" && (
                <a href="https://info.fsc.org/" target="_blank" rel="noopener" className="mt-3 block text-center text-[.85rem] font-semibold text-forest hover:underline">Verify at info.fsc.org ↗</a>
              )}
            </div>
            {related.length > 0 && (
              <div className="border border-line bg-white p-6">
                <p className="text-[.7rem] font-bold uppercase tracking-[.16em] text-stone">Related products</p>
                <ul className="mt-3 space-y-2">
                  {related.slice(0, 5).map((s) => <li key={s}><ArrowLink href={productHref(s)}>{productName(s)}</ArrowLink></li>)}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
      <CTASection />
    </>
  );
}
