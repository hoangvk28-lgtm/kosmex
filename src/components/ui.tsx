import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "./Icon";
import { breadcrumbLd } from "@/lib/seo";
import { statusHelp, statusLabel, type Status } from "@/content/site";

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  as: Tag = "h2",
  className = "",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "split";
  as?: "h1" | "h2";
  className?: string;
  children?: ReactNode;
}) {
  if (align === "split") {
    return (
      <div className={`grid gap-6 lg:grid-cols-12 lg:items-end ${className}`}>
        <div className="lg:col-span-7">
          {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
          <Tag>{title}</Tag>
        </div>
        <div className="lg:col-span-5">
          {lede && <p className="lede">{lede}</p>}
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <Tag>{title}</Tag>
      {lede && <p className="lede mt-5">{lede}</p>}
      {children}
    </div>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`badge badge-${status}`} title={statusHelp[status]}>
      {statusLabel[status]}
    </span>
  );
}

export function StatusLegend({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted ${className}`}>
      {(["verified", "declared", "pending"] as Status[]).map((s) => (
        <span key={s} className="inline-flex items-center gap-2">
          <StatusBadge status={s} />
          <span className="text-[.8125rem]">{statusHelp[s]}</span>
        </span>
      ))}
    </div>
  );
}

export function Breadcrumbs({ items, light = false }: { items: { name: string; href: string }[]; light?: boolean }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={`text-[.8125rem] ${light ? "text-white/65" : "text-muted"}`}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((it, i) => (
            <li key={it.href} className="inline-flex items-center gap-2">
              {i > 0 && <span aria-hidden className="opacity-50">/</span>}
              {i === all.length - 1 ? (
                <span aria-current="page" className={light ? "text-white" : "text-charcoal"}>{it.name}</span>
              ) : (
                <Link href={it.href} className="hover:underline underline-offset-4">{it.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(all)} />
    </>
  );
}

/** Standard interior page hero. `dark` for technical/brand pages. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lede,
  dark = false,
  children,
  aside,
}: {
  crumbs: { name: string; href: string }[];
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  dark?: boolean;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className={`${dark ? "on-dark bg-forest text-white grain" : "bg-ivory"} relative overflow-hidden`}>
      <div className="wrap pb-14 pt-10 md:pb-20 md:pt-14">
        <Breadcrumbs items={crumbs} light={dark} />
        <div className={`mt-10 grid gap-10 ${aside ? "lg:grid-cols-12 lg:items-end" : ""}`}>
          <div className={aside ? "lg:col-span-7" : "max-w-4xl"}>
            {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
            <h1>{title}</h1>
            {lede && <p className="lede mt-6 max-w-2xl">{lede}</p>}
            {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </div>
      {!dark && <div className="wrap"><div className="rule-top" /></div>}
    </section>
  );
}

export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`link-arrow ${className}`}>
      {children}
      <Icon name="arrow" />
    </Link>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  size,
  icon = "arrow",
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "gold" | "outline" | "light";
  size?: "sm";
  icon?: string | null;
  className?: string;
  external?: boolean;
}) {
  const cls = `btn btn-${variant} ${size ? "btn-sm" : ""} ${className}`;
  const inner = (
    <>
      {children}
      {icon && <Icon name={icon} />}
    </>
  );
  if (external || href.startsWith("mailto:") || href.startsWith("tel:") || href.endsWith(".pdf") || href.startsWith("http"))
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>
        {inner}
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Amber notice used wherever content awaits Kosmex confirmation. */
export function PendingNote({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div role="note" className={`flex gap-3 border-l-2 border-amber bg-amber-bg px-5 py-4 text-sm leading-relaxed text-[#6b4a14] ${className}`}>
      <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0" />
      <div>{children}</div>
    </div>
  );
}
