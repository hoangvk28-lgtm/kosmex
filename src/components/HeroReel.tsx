"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Img } from "./Img";
import { Icon } from "./Icon";

/**
 * Cinematic hero "video" built from HTML/CSS: a timed sequence of real Kosmex
 * production shots with Ken Burns motion, crossfades, a film-print close-up and
 * per-scene captions. No video file, so it stays light and fully static-exportable.
 */
type Scene = { kind: "film" | "photo"; image?: string; kicker: string; title: string; text: string; href: string; motion: string; tag?: string };

const SCENES: Scene[] = [
  { kind: "photo", image: "hero-ffp-workers", kicker: "Film Faced Plywood", title: "Built for performance", text: "Black phenolic film · acacia & eucalyptus cores", href: "/products/film-faced-plywood/", motion: "kb-in", tag: "Sklejka do budowy ogrodzeń" },
  { kind: "photo", image: "hero-ffp-collage", kicker: "Flagship · Film Faced Plywood", title: "KOSMEX film faced plywood", text: "Logo printed into the film · 1220 × 2440 · 1250 × 2500 · 610 × 2500 mm", href: "/products/film-faced-plywood/", motion: "kb-in" },
  { kind: "photo", image: "factory-press-hall", kicker: "Manufacturing", title: "Produced in our own facilities", text: "Northern Vietnam · from veneer to finished panel", href: "/manufacturing/", motion: "kb-up" },
];

const DURATION = 3500;

export function HeroReel() {
  const [i, setI] = useState(0);
    const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setI((n) => (n + 1) % SCENES.length), DURATION);
    return () => clearTimeout(t);
  }, [i, reduced]);

  const s = SCENES[i];

  return (
    <section
      className="on-dark relative isolate flex h-[min(calc(100svh-76px),860px)] min-h-[620px] flex-col overflow-hidden bg-forest-3 text-white lg:h-[min(calc(100svh-112px),880px)]"
      style={{ ["--dur" as string]: `${DURATION}ms` }}
    >
      {/* Scenes */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        {SCENES.map((sc, n) => (
          <div key={n} className={`reel-scene ${n === i ? "is-active" : ""}`}>
            {sc.kind === "film" ? (
              <div className={`film-surface reel-film absolute inset-[-10%] ${n === i ? sc.motion : ""}`} />
            ) : (
              <Img name={sc.image!} alt="" priority sizes="100vw" className={`absolute inset-0 h-full w-full object-cover ${n === i ? sc.motion : ""}`} />
            )}
            {sc.tag && <span lang="pl" className="absolute right-6 top-6 z-[4] rounded-full bg-forest-3/55 px-3 py-1.5 text-[.85rem] font-medium tracking-[.08em] text-white/90 backdrop-blur-sm md:right-10 md:top-8">{sc.tag}</span>}
          </div>
        ))}
        {/* light sweep across the film on scene 1 */}
        {s.kind === "film" && <div key={`sweep-${i}`} className="reel-sweep absolute inset-0 z-[2]" />}
        <div className="absolute inset-0 z-[3] bg-[linear-gradient(180deg,rgba(14,42,36,.15)_0%,rgba(14,42,36,.1)_45%,rgba(14,42,36,.92)_100%)]" />
        <div className="absolute inset-0 z-[3] bg-[linear-gradient(90deg,rgba(14,42,36,.7)_0%,rgba(14,42,36,0)_55%)]" />
              </div>

      {/* Static brand promise (SEO H1) */}
      <div className="wrap flex flex-1 flex-col justify-end pb-24 pt-20 md:pb-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="hero-in text-[.8rem] font-semibold uppercase tracking-[.22em] text-white/75" style={{ ["--d" as string]: "0ms" }}>
              Kosmex Plywood
            </p>
            <h1 className="hero-in serif mt-6 text-[clamp(2rem,1rem+3vw,3.6rem)] font-normal leading-[1] tracking-[-.02em] text-white" style={{ ["--d" as string]: "120ms" }}>
              The leading plywood factory &amp; exporter in Vietnam
            </h1>
            <div className="hero-in mt-9 flex flex-wrap gap-3" style={{ ["--d" as string]: "360ms" }}>
              <Link href="/products/" className="btn btn-gold">Explore products <Icon name="arrow" className="h-4 w-4" /></Link>
              <Link href="/request-a-quote/" className="btn btn-light">Request a quote <Icon name="arrow" className="h-4 w-4" /></Link>
            </div>
          </div>

          {/* Scene caption card */}
          <div className="hero-in hidden sm:block lg:col-span-5 lg:justify-self-end" style={{ ["--d" as string]: "500ms" }}>
            <Link href={s.href} className="group block w-full max-w-sm rounded-2xl border border-white/15 bg-forest-3/40 p-5 backdrop-blur-md transition-colors hover:bg-forest-3/60">
              <div key={i} className="reel-caption">
                <p className="text-[.72rem] font-semibold uppercase tracking-[.2em] text-gold">{s.kicker}</p>
                <p className="serif mt-2 text-[1.3rem] leading-tight text-white">{s.title}</p>
              </div>
              <div className="mt-5 flex items-center gap-2">
                {SCENES.map((_, n) => (
                  <button
                    key={n}
                    type="button"
                    aria-label={`Show scene ${n + 1}`}
                    onClick={(e) => { e.preventDefault(); setI(n); }}
                    className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/20"
                  >
                    <span className={`absolute inset-y-0 left-0 rounded-full bg-gold ${n < i ? "w-full" : n === i ? (reduced ? "w-full" : "reel-progress") : "w-0"}`} key={n === i ? `p-${i}` : undefined} />
                  </button>
                ))}
                <Icon name="arrow" className="ml-2 h-4 w-4 text-white/70 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <a href="#intro" aria-label="Scroll to content" className="scroll-cue absolute hidden md:grid bottom-6 left-1/2 h-11 w-11 -translate-x-1/2 place-items-center rounded-full border border-white/40 text-white/80 transition-colors hover:bg-white hover:text-forest">
        <Icon name="chevron" className="h-5 w-5" />
      </a>
    </section>
  );
}
