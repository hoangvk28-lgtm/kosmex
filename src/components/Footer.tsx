import Link from "next/link";
import { categories, productHref } from "@/content/products";
import { markets } from "@/content/markets";
import { site } from "@/content/site";
import { Logo } from "./Logo";
import { Icon, LinkedInIcon, WhatsAppIcon } from "./Icon";

const resources = [
  { label: "Quality Control", href: "/quality/" },
  { label: "Technical Data Sheets", href: "/quality/technical-data-sheets/" },
  { label: "QC Reports", href: "/quality/qc-reports/" },
  { label: "Test Reports", href: "/quality/test-reports/" },
  { label: "Certificates", href: "/certificates/" },
  { label: "Manufacturing", href: "/manufacturing/" },
];

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-5 font-sans text-[.72rem] font-bold uppercase tracking-[.18em] text-gold">{title}</h2>
      <ul className="space-y-2.5 text-[.9rem]">{children}</ul>
    </div>
  );
}

const FLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link href={href} className="text-white/72 transition-colors hover:text-white">{children}</Link>
  </li>
);

export function Footer() {
  return (
    <footer className="on-dark relative bg-forest-3 text-white">
      <div className="wrap pb-10 pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.1fr_1fr_1.5fr] lg:gap-10">
          <div>
            <Logo light />
            <p className="mt-6 max-w-xs text-[.95rem] leading-relaxed text-white/72">
              Engineered plywood, manufactured in Vietnam for European importers, distributors and manufacturers.
            </p>
            <p className="mt-4 max-w-xs text-[.82rem] leading-relaxed text-white/50">
              Kosmex Plywood is the plywood brand of {site.legalName}, Hanoi, Vietnam.
            </p>
          </div>

          <Col title="Products">
            {categories.map((c) => (
              <FLink key={c.slug} href={productHref(c.slug)}>{c.name}</FLink>
            ))}
            <FLink href="/request-a-quote/">Request a Quote</FLink>
          </Col>

          <Col title="Technical Resources">
            {resources.map((r) => (
              <FLink key={r.href} href={r.href}>{r.label}</FLink>
            ))}
          </Col>

          <Col title="EU Markets">
            {markets.map((m) => (
              <FLink key={m.slug} href={`/eu/${m.slug}/`}>{m.name}</FLink>
            ))}
          </Col>

          <div>
            <h2 className="mb-5 font-sans text-[.72rem] font-bold uppercase tracking-[.18em] text-gold">Contact</h2>
            <address className="space-y-4 text-[.9rem] not-italic leading-relaxed text-white/72">
              <p><span className="block font-semibold text-white">{site.legalName}</span>{site.office.lines.join(", ")}</p>
              <p>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-white hover:text-gold"><Icon name="mail" />{site.email}</a>
                <br />
                <a href={site.phoneHref} className="mt-1.5 inline-flex items-center gap-2 hover:text-white"><Icon name="phone" />{site.phoneDisplay}</a>
              </p>
            </address>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={site.whatsappHref} target="_blank" rel="noopener" className="inline-flex items-center gap-2 border border-white/25 px-3.5 py-2 text-[.82rem] font-semibold hover:border-white">
                <WhatsAppIcon /> WhatsApp
              </a>
              <a href={site.linkedinHref} target="_blank" rel="noopener" className="inline-flex items-center gap-2 border border-white/25 px-3.5 py-2 text-[.82rem] font-semibold hover:border-white">
                <LinkedInIcon /> {site.linkedinLabel}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-white/12 pt-8 text-[.8rem] text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li><Link href="/privacy-policy/" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms/" className="hover:text-white">Terms</Link></li>
            <li><a href="/sitemap.xml" className="hover:text-white">Sitemap</a></li>
            <li>
              <a href="#top" className="inline-flex items-center gap-2 text-white/70 hover:text-white">
                Back to top <Icon name="arrow-up" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
