import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { Icon } from "@/components/Icon";
import { DocAction } from "@/components/cards";
import { PageHero, SectionHeading } from "@/components/ui";
import { documents, docClassLabel, type DocClass } from "@/content/documents";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Certificates & Quality Documentation",
  description: "Kosmex certificates, declarations, laboratory test reports, QC reports and traceability records, each with issuer, reference, scope and validity.",
  path: "/certificates/",
});

const groups: { cls: DocClass; title: string; text: string }[] = [
  { cls: "certification", title: "Third-party certifications", text: "Issued by an accredited certification body after audit. Always check the scope." },
  { cls: "dop", title: "Declarations of Performance", text: "Manufacturer declarations under the EU Construction Products Regulation, linked to CE marking." },
  { cls: "lab-test", title: "Laboratory test reports", text: "Results for a submitted sample, against a named test method. They do not certify every batch." },
  { cls: "qc-report", title: "Internal QC reports", text: "Kosmex batch inspection records against agreed acceptance criteria." },
  { cls: "traceability", title: "Traceability records", text: "Species, origin and supplier documentation for buyers' due diligence." },
];

export default function CertificatesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Certificates", href: "/certificates/" }]}
        eyebrow="Compliance library"
        title="Certificates & quality documentation"
        lede="Each document is listed with its issuer, reference, scope and validity. A certificate is shown as held only when we can publish the document itself."
      >
        {groups.map((g) => (
          <a key={g.cls} href={`#${g.cls}`} className="border border-line bg-white px-4 py-2 text-[.86rem] font-semibold text-charcoal hover:border-forest">{g.title}</a>
        ))}
      </PageHero>

      <section className="section-sm bg-white">
        <div className="wrap grid gap-10 lg:grid-cols-3">
          {[
            ["Certification", "An independent body audits a system or product scope and issues a certificate with a number, scope and validity period. Example: FSC Chain of Custody."],
            ["Product testing", "A laboratory tests a submitted sample with a named method (e.g. EN 310) and reports results for that sample only."],
            ["Declaration", "The manufacturer declares performance, as in a TDS or a Declaration of Performance. Ask which declared values are backed by tests."],
          ].map(([t, d]) => (
            <div key={t} className="border-t-2 border-forest pt-5">
              <h2 className="text-[1.2rem]">{t}</h2>
              <p className="mt-2 text-[.95rem] text-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {groups.map((g, gi) => {
        const docs = documents.filter((d) => d.docClass === g.cls);
        return (
          <section key={g.cls} id={g.cls} className={`section-sm scroll-mt-32 ${gi % 2 ? "bg-white" : ""}`}>
            <div className="wrap">
              <SectionHeading align="split" eyebrow={`0${gi + 1} · ${docClassLabel[g.cls]}`} title={g.title} lede={g.text} />
              <div className="mt-10 space-y-4">
                {docs.map((d) => (
                  <article key={d.slug} className="grid gap-6 border border-line bg-white p-6 md:p-7 lg:grid-cols-12 lg:items-center">
                    <div className="lg:col-span-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`badge ${d.availability === "download" ? "badge-verified" : d.availability === "on-request" ? "badge-declared" : "badge-pending"}`}>
                          {d.availability === "download" ? "Published" : d.availability === "on-request" ? "On request" : "Not yet published"}
                        </span>
                      </div>
                      <h3 className="mt-3 text-[1.2rem]">
                        <Link href={`/certificates/${d.slug}/`} className="hover:underline underline-offset-4">{d.title}</Link>
                      </h3>
                      <p className="mt-1.5 text-[.88rem] text-muted">{d.summary}</p>
                    </div>
                    <dl className="grid grid-cols-2 gap-x-5 gap-y-3 text-[.85rem] lg:col-span-5">
                      {[["Issuer", d.issuer ?? "—"], ["Reference", d.reference ?? "—"], ["Scope", d.product], ["Date / validity", d.facts?.find((f) => f.label === "Valid")?.value ?? d.revision ?? "—"]].map(([k, v]) => (
                        <div key={k}>
                          <dt className="text-[.62rem] font-bold uppercase tracking-[.14em] text-stone">{k}</dt>
                          <dd className="mt-0.5 font-semibold text-charcoal">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="space-y-2 lg:col-span-2">
                      <DocAction d={d} />
                      <Link href={`/certificates/${d.slug}/`} className="flex items-center justify-center gap-1.5 py-1 text-[.82rem] font-semibold text-forest hover:underline">Details <Icon name="arrow" className="h-3.5 w-3.5" /></Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="section-sm bg-ivory-2">
        <div className="wrap flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[length:var(--text-h3)]">Technical documentation support</h2>
            <p className="mt-2 text-muted">Need a document that is not listed, or one for a specific order? Contact our team.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${site.email}?subject=Document%20request`} className="btn btn-primary"><Icon name="mail" /> {site.email}</a>
            <Link href="/request-a-quote/" className="btn btn-outline">Request documents</Link>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
