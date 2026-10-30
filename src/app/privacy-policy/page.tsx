import { PageHero } from "@/components/ui";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = { ...pageMeta({ title: "Privacy Policy", description: "How Kosmex Plywood processes personal data submitted through this website.", path: "/privacy-policy/" }), robots: { index: false, follow: true } };

export default function PrivacyPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Privacy Policy", href: "/privacy-policy/" }]} title="Privacy Policy" />
      <section className="section-sm">
        <div className="wrap max-w-3xl space-y-6 text-charcoal/85">
          <h2 className="text-[length:var(--text-h3)]">Controller</h2>
          <p>{site.legalName}, {site.office.lines.join(", ")}. Contact: {site.email}.</p>
          <h2 className="text-[length:var(--text-h3)]">Data we collect</h2>
          <p>When you submit the Request a Quote form we process the details you provide: name, company, business email, phone, country, product requirements and any file you attach. We use them only to answer your enquiry and prepare a quotation.</p>
          <h2 className="text-[length:var(--text-h3)]">Legal basis and retention</h2>
          <p>Processing is based on your consent and on steps taken at your request before entering a contract (GDPR Art. 6(1)(a) and (b)). Enquiry data is kept for as long as needed to handle the enquiry and any resulting business relationship.</p>
          <h2 className="text-[length:var(--text-h3)]">Processors</h2>
          <p>Form submissions are stored by our hosting provider (Netlify, Inc.) on our behalf. This website does not use advertising cookies. If analytics are added later, this policy will be updated first.</p>
          <h2 className="text-[length:var(--text-h3)]">Your rights</h2>
          <p>You may request access to, correction of or deletion of your personal data, or withdraw consent, by emailing {site.email}.</p>
        </div>
      </section>
    </>
  );
}
