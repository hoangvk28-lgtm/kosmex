"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav, type NavItem } from "@/content/navigation";
import { site } from "@/content/site";
import { Logo } from "./Logo";
import { Icon } from "./Icon";

const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path.startsWith(href));

export function Header() {
  const path = usePathname() || "/";
  const [open, setOpen] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [path]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const enter = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(i);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 140);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="hidden bg-forest-3 text-[.78rem] text-white/70 lg:block">
        <div className="wrap flex h-9 items-center justify-between">
          <span className="tracking-wide">Leading Plywood Manufacturer & Exporter · Vietnam</span>
          <div className="flex items-center gap-6">
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 hover:text-white"><Icon name="mail" className="h-3.5 w-3.5" />{site.email}</a>
            <a href={site.phoneHref} className="inline-flex items-center gap-2 hover:text-white"><Icon name="phone" className="h-3.5 w-3.5" />{site.phoneDisplay}</a>
            <Link href="/quality/technical-data-sheets/" className="inline-flex items-center gap-2 hover:text-white"><Icon name="doc" className="h-3.5 w-3.5" />Technical documents</Link>
          </div>
        </div>
      </div>

      <div className={`border-b bg-white/95 backdrop-blur transition-shadow duration-300 ${scrolled ? "border-line shadow-[0_8px_30px_-18px_rgba(21,58,50,.35)]" : "border-line/70"}`}>
        <div className="wrap flex h-[76px] items-center justify-between gap-6">
          <Logo />

          <nav ref={navRef} aria-label="Main" className="hidden h-full lg:block">
            <ul className="flex h-full items-center">
              {mainNav.map((item, i) => (
                <li key={item.href} className="h-full" onMouseEnter={() => item.menu && enter(i)} onMouseLeave={() => item.menu && leave()}>
                  {item.menu ? (
                    <button
                      type="button"
                      aria-expanded={open === i}
                      aria-controls={`menu-${i}`}
                      onClick={() => setOpen(open === i ? null : i)}
                      className={`relative flex h-full items-center gap-1 whitespace-nowrap px-3 text-[.95rem] font-medium transition-colors xl:px-5 ${isActive(path, item.href) || open === i ? "text-forest" : "text-charcoal/80 hover:text-forest"}`}
                    >
                      {item.label}
                      <Icon name="chevron" className={`h-3.5 w-3.5 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
                      <ActiveBar on={isActive(path, item.href)} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      aria-current={isActive(path, item.href) ? "page" : undefined}
                      className={`relative flex h-full items-center whitespace-nowrap px-3 text-[.95rem] font-medium transition-colors xl:px-5 ${isActive(path, item.href) ? "text-forest" : "text-charcoal/80 hover:text-forest"}`}
                    >
                      {item.label}
                      <ActiveBar on={isActive(path, item.href)} />
                    </Link>
                  )}
                  {item.menu && <DesktopMenu id={`menu-${i}`} item={item} show={open === i} />}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/request-a-quote/" className="btn btn-primary btn-sm hidden rounded-full! px-5 sm:inline-flex">
              Request a Quote
              <Icon name="arrow" />
            </Link>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center border border-line text-forest lg:hidden rounded-full"
              aria-expanded={mobile}
              aria-controls="mobile-nav"
              aria-label={mobile ? "Close menu" : "Open menu"}
              onClick={() => setMobile(!mobile)}
            >
              <Icon name={mobile ? "close" : "menu"} className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <MobileNav open={mobile} path={path} />
    </header>
  );
}

function ActiveBar({ on }: { on: boolean }) {
  return <span aria-hidden className={`absolute inset-x-2.5 bottom-0 h-[2px] origin-left bg-gold transition-transform duration-300 ${on ? "scale-x-100" : "scale-x-0"}`} />;
}

function DesktopMenu({ id, item, show }: { id: string; item: NavItem; show: boolean }) {
  const base = `absolute left-0 right-0 top-full border-b border-line bg-white shadow-[0_30px_60px_-30px_rgba(21,58,50,.35)] transition-all duration-300 ${show ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`;

  if (item.menu === "products" && item.groups) {
    return (
      <div id={id} className={base}>
        <div className="wrap grid grid-cols-12 gap-8 py-10">
          <div className="col-span-9 grid grid-cols-4 gap-8">
            {item.groups.map((g) => (
              <div key={g.href} className={g.flagship ? "-m-4 bg-ivory p-4" : ""}>
                {g.flagship && <span className="mb-3 inline-block bg-forest px-2 py-0.5 text-[.625rem] font-bold uppercase tracking-[.16em] text-gold">Flagship</span>}
                <Link href={g.href} className="block font-display text-[1.02rem] font-bold leading-snug text-forest hover:underline underline-offset-4">
                  {g.label}
                </Link>
                <ul className="mt-4 space-y-1 border-t border-line pt-4">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="group flex items-center justify-between py-1.5 text-[.9rem] text-charcoal/80 hover:text-forest">
                        {l.label}
                        <Icon name="arrow" className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Link href="/products/film-faced-plywood/" className="zoom-parent group relative col-span-3 block min-h-[240px] overflow-hidden">
            <div className="film-surface zoom-img absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-3/95 via-forest-3/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="text-[.68rem] font-bold uppercase tracking-[.18em] text-gold">KOSMEX logo film</p>
              <p className="mt-2 font-display text-lg font-bold leading-snug">Branded film faced plywood</p>
              <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold">View specifications <Icon name="arrow" /></span>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div id={id} className={base}>
      <div className="wrap py-9">
        <div className="mb-5 flex items-baseline justify-between border-b border-line pb-4">
          <Link href={item.href} className="font-display text-lg font-bold text-forest hover:underline underline-offset-4">{item.label}</Link>
          <Link href={item.href} className="link-arrow text-sm">Overview <Icon name="arrow" /></Link>
        </div>
        <ul className="grid grid-cols-4 gap-x-8 gap-y-1">
          {item.links!.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="group block py-2.5">
                <span className="flex items-center gap-2 text-[.95rem] font-semibold text-charcoal group-hover:text-forest">
                  {l.label}
                  <Icon name="arrow" className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
                {l.desc && <span className="mt-0.5 block text-[.8125rem] leading-snug text-muted">{l.desc}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileNav({ open, path }: { open: boolean; path: string }) {
  const [section, setSection] = useState<string | null>(null);
  return (
    <div
      id="mobile-nav"
      className={`fixed inset-x-0 bottom-0 top-[76px] z-40 overflow-y-auto bg-white transition-[opacity,visibility] duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
    >
      <nav aria-label="Mobile" className="wrap pb-36 pt-4">
        <ul className="divide-y divide-line">
          {mainNav.map((item) => {
            const expanded = section === item.href;
            if (!item.menu)
              return (
                <li key={item.href}>
                  <Link href={item.href} aria-current={isActive(path, item.href) ? "page" : undefined} className="flex items-center justify-between py-4 font-display text-[1.05rem] font-bold text-forest">
                    {item.label}
                  </Link>
                </li>
              );
            return (
              <li key={item.href}>
                <button type="button" aria-expanded={expanded} onClick={() => setSection(expanded ? null : item.href)} className="flex w-full items-center justify-between py-4 text-left font-display text-[1.05rem] font-bold text-forest">
                  {item.label}
                  <Icon name="chevron" className={`h-5 w-5 transition-transform ${expanded ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="pb-5">
                      <Link href={item.href} className="block py-2 text-[.95rem] font-semibold text-forest-2">All {item.label} →</Link>
                      {item.groups?.map((g) => (
                        <div key={g.href} className="mt-3 border-l-2 border-gold/60 pl-4">
                          <Link href={g.href} className="block py-1.5 font-semibold text-charcoal">{g.label}</Link>
                          {g.links.map((l) => (
                            <Link key={l.href} href={l.href} className="block py-1.5 text-[.93rem] text-muted">{l.label}</Link>
                          ))}
                        </div>
                      ))}
                      {item.links?.map((l) => (
                        <Link key={l.href} href={l.href} className="block py-2 text-[.95rem] text-charcoal/85">{l.label}</Link>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="fixed inset-x-0 bottom-0 border-t border-line bg-white p-4">
        <Link href="/request-a-quote/" className="btn btn-primary w-full">Request a Quote <Icon name="arrow" /></Link>
        <div className="mt-3 flex justify-center gap-6 text-sm text-muted">
          <a href={`mailto:${site.email}`}>Email sales</a>
          <a href={site.phoneHref}>{site.phoneDisplay}</a>
        </div>
      </div>
    </div>
  );
}
