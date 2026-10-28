"use client";

import { useEffect, useState } from "react";
import { Img } from "./Img";
import { categories } from "@/content/products";

const SLIDES = categories.map((c) => ({ image: c.image, alt: c.imageAlt, name: c.name, order: c.order }));
const INTERVAL = 2600;

/** Crossfading reel of every Kosmex range, used behind the flag on EU market heroes. */
export function ProductCycle({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), INTERVAL);
    return () => clearInterval(t);
  }, []);
  const s = SLIDES[i];
  return (
    <figure className={`relative overflow-hidden rounded-2xl bg-forest-3 shadow-[0_30px_60px_-25px_rgba(0,0,0,.6)] ${className}`} style={{ ["--dur" as string]: `${INTERVAL + 600}ms` }}>
      {SLIDES.map((sl, n) => (
        <div key={sl.image} className={`reel-scene ${n === i ? "is-active" : ""}`}>
          <Img name={sl.image} alt={sl.alt} priority sizes="(min-width:1024px) 36vw, 100vw" className={`absolute inset-0 h-full w-full object-cover ${n === i ? "kb-in" : ""}`} />
        </div>
      ))}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-forest-3/85 via-forest-3/10 to-transparent" />
      <figcaption className="absolute inset-x-5 bottom-5 z-[3] flex items-end justify-between gap-4 pl-[40%]">
        <span key={i} className="reel-caption text-right">
          <span className="block text-[.68rem] font-semibold uppercase tracking-[.18em] text-gold">0{s.order} · All ranges available</span>
          <span className="serif mt-1 block text-[1.35rem] leading-tight text-white">{s.name}</span>
        </span>
      </figcaption>
      <div className="absolute inset-x-5 top-5 z-[3] flex gap-1.5">
        {SLIDES.map((sl, n) => (
          <span key={sl.image} className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/25">
            <span key={n === i ? `a${i}` : undefined} className={`absolute inset-y-0 left-0 rounded-full bg-gold ${n < i ? "w-full" : n === i ? "reel-progress" : "w-0"}`} style={n === i ? { animationDuration: `${INTERVAL}ms` } : undefined} />
          </span>
        ))}
      </div>
    </figure>
  );
}
