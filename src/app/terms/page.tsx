import { PageHero } from "@/components/ui";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = { ...pageMeta({ title: "Terms of Use", description: "Terms of use for the Kosmex Plywood website.", path: "/terms/" }), robots: { index: false, follow: true } };

export default function TermsPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Terms", href: "/terms/" }]} title="Terms of Use" />
      <section className="section-sm">
        <div className="wrap max-w-3xl space-y-6 text-charcoal/85">
          
          <h2 className="text-[length:var(--text-h3)]">Information on this website</h2>
          <p>Product information is provided for general guidance. Values labelled “Kosmex TDS” are manufacturer declarations. Values labelled “Test report” refer to the tested sample only. Fields marked “To be confirmed” are not specifications. Binding specifications are those agreed in writing for each order.</p>
          <h2 className="text-[length:var(--text-h3)]">Documents</h2>
          <p>Published documents may not be altered. Test reports may only be reproduced in full, in line with the issuing laboratory’s conditions.</p>
          <h2 className="text-[length:var(--text-h3)]">Trademarks</h2>
          <p>KOSMEX and the KOSMEX film print artwork belong to {site.legalName}. FSC® is a trademark of the Forest Stewardship Council.</p>
          <h2 className="text-[length:var(--text-h3)]">Contact</h2>
          <p>{site.email}</p>
        </div>
      </section>
    </>
  );
}
