import { site } from "@/content/site";
import { Button } from "./ui";

export function CTASection({
  title = "Looking for a reliable plywood supply partner?",
  text = "Share your requirements with our team and receive product information and a tailored quotation.",
  rfqHref = "/request-a-quote/",
  rfqLabel = "Request a Quote",
}: {
  title?: string;
  text?: string;
  rfqHref?: string;
  rfqLabel?: string;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-forest text-white">
      <div className="film-surface absolute inset-y-0 right-0 hidden w-[38%] opacity-90 lg:block" aria-hidden />
      <div className="absolute inset-y-0 right-0 hidden w-[38%] bg-gradient-to-r from-forest via-forest/50 to-transparent lg:block" aria-hidden />
      <div className="wrap relative section-sm">
        <div className="max-w-2xl">
          <p className="eyebrow mb-6">Request for quotation</p>
          <h2 className="text-white">{title}</h2>
          <p className="lede mt-5">{text}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href={rfqHref} variant="gold">{rfqLabel}</Button>
            <Button href={`mailto:${site.email}?subject=Plywood%20enquiry`} variant="light" icon="mail">Email Sales</Button>
          </div>
          <p className="mt-6 text-[.85rem] text-white/55">
            Sales: <a className="underline-offset-4 hover:underline" href={`mailto:${site.email}`}>{site.email}</a> · <a className="underline-offset-4 hover:underline" href={site.phoneHref}>{site.phoneDisplay}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
