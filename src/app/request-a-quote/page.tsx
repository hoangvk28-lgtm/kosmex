import { Icon, WhatsAppIcon } from "@/components/Icon";
import { RFQForm } from "@/components/RFQForm";
import { PageHero } from "@/components/ui";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Request a Quote",
  description: "Request a plywood quotation from Kosmex: film faced, furniture, upholstery or packing plywood. Share product, quantity and destination port.",
  path: "/request-a-quote/",
});

const steps = [
  ["Review", "We review your application, specification and volume."],
  ["Confirm", "We confirm the available specification and any open technical points."],
  ["Document", "We share the relevant TDS, test reports and other documents."],
  ["Quote", "You receive a written commercial quotation."],
];

export default function RfqPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Request a Quote", href: "/request-a-quote/" }]}
        eyebrow="B2B enquiry"
        title="Request a quotation"
        lede="A structured enquiry helps us understand your exact requirements before we discuss price. It takes about three minutes."
      />
      <section className="section-sm">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <RFQForm />
          </div>
          <aside className="space-y-5 lg:col-span-4">
            <div className="on-dark bg-forest p-8 text-white lg:sticky lg:top-36">
              <h2 className="text-[1.25rem] text-white">What happens next</h2>
              <ol className="mt-6 space-y-5">
                {steps.map(([t, d], i) => (
                  <li key={t} className="grid grid-cols-[2.25rem_1fr] gap-3">
                    <span className="grid h-8 w-8 place-items-center border border-gold/60 font-display text-[.75rem] font-bold text-gold">{i + 1}</span>
                    <div><p className="font-semibold">{t}</p><p className="text-[.88rem] text-white/70">{d}</p></div>
                  </li>
                ))}
              </ol>
              <div className="mt-8 space-y-3 border-t border-white/15 pt-6 text-[.92rem]">
                <p className="text-[.68rem] font-bold uppercase tracking-[.16em] text-mint">Prefer direct contact?</p>
                <a href={`mailto:${site.email}?subject=RFQ`} className="flex items-center gap-3 hover:text-gold"><Icon name="mail" />{site.email}</a>
                <a href={site.phoneHref} className="flex items-center gap-3 hover:text-gold"><Icon name="phone" />{site.phoneDisplay}</a>
                <a href={site.whatsappHref} target="_blank" rel="noopener" className="flex items-center gap-3 hover:text-gold"><WhatsAppIcon />WhatsApp</a>
              </div>
            </div>
            <p className="flex gap-2 px-1 text-[.8rem] leading-relaxed text-muted">
              <Icon name="lock" className="mt-0.5 h-4 w-4 shrink-0" />
              Your details are used only to answer this enquiry. They are not shared with third parties for marketing.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
