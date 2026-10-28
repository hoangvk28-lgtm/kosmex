import { CTASection } from "@/components/CTASection";
import { Icon, LinkedInIcon, WhatsAppIcon } from "@/components/Icon";
import { Button, PageHero } from "@/components/ui";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact Kosmex Plywood",
  description: "Contact the Kosmex Plywood sales team in Hanoi, Vietnam by email, phone or WhatsApp for specifications, documents and quotations.",
  path: "/contact/",
});

export default function ContactPage() {
  const channels = [
    { icon: <Icon name="mail" className="h-5 w-5" />, label: "Sales email", value: site.email, href: `mailto:${site.email}` },
    { icon: <Icon name="phone" className="h-5 w-5" />, label: "Phone", value: site.phoneDisplay, href: site.phoneHref },
    { icon: <WhatsAppIcon className="h-5 w-5" />, label: "WhatsApp", value: site.phoneDisplay, href: site.whatsappHref },
    { icon: <LinkedInIcon className="h-5 w-5" />, label: "LinkedIn", value: "Kosmex sales profile", href: site.linkedinHref },
  ];
  return (
    <>
      <PageHero crumbs={[{ name: "Contact", href: "/contact/" }]} eyebrow="Contact" title="Talk to the plywood team" lede="For specifications, documents, samples or quotations, contact our sales team directly or send a structured request.">
        <Button href="/request-a-quote/">Request a Quote</Button>
      </PageHero>
      <section className="section-sm">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-7">
            {channels.map((c) => (
              <a key={c.label} href={c.href} {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})} className="group flex flex-col gap-4 bg-white p-8 transition-colors hover:bg-ivory">
                <span className="grid h-11 w-11 place-items-center bg-forest text-white">{c.icon}</span>
                <span className="text-[.7rem] font-bold uppercase tracking-[.16em] text-stone">{c.label}</span>
                <span className="font-display text-[1.1rem] font-bold text-forest group-hover:underline underline-offset-4">{c.value}</span>
              </a>
            ))}
          </div>
          <div className="space-y-6 lg:col-span-5">
            <div className="border border-line bg-white p-8">
              <p className="text-[.7rem] font-bold uppercase tracking-[.16em] text-stone">{site.office.label}</p>
              <p className="mt-2 font-display text-[1.15rem] font-bold">{site.legalName}</p>
              <address className="mt-2 not-italic text-muted">{site.office.lines.map((l) => <span key={l} className="block">{l}</span>)}</address>
            </div>
            <div className="border border-line bg-white p-8">
              <p className="text-[.7rem] font-bold uppercase tracking-[.16em] text-stone">{site.factory.label}</p>
              <address className="mt-2 not-italic text-muted">{site.factory.lines.map((l) => <span key={l} className="block">{l}</span>)}</address>
            </div>
            <p className="text-[.85rem] text-muted">Kosmex is based in Vietnam (ICT, UTC+7).</p>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
