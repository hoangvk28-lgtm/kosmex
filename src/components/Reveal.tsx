"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Adds .is-in to .reveal / .reveal-stagger / .reveal-img elements as they enter the viewport. Content stays visible without JS. */
export function Reveal() {
  const path = usePathname();
  useEffect(() => {
    document.documentElement.classList.add("js");
    // Subpages: tag content blocks automatically (sections that already opt in are left alone)
    document.querySelectorAll<HTMLElement>("main > section:not(:first-of-type)").forEach((sec) => {
      if (sec.querySelector(".reveal, .reveal-stagger, .reveal-img")) return;
      sec.querySelectorAll<HTMLElement>(":scope .wrap > *").forEach((el) => {
        if (el.closest(".reveal, .reveal-stagger") && el.closest(".reveal, .reveal-stagger") !== el) return;
        const list = el.matches("ul, ol, .grid") && el.children.length >= 3;
        el.classList.add(list ? "reveal-stagger" : "reveal");
      });
    });
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-in), .reveal-stagger:not(.is-in), .reveal-img:not(.is-in)"));
    els.forEach((el) => {
      if (el.classList.contains("reveal-stagger")) Array.from(el.children).forEach((c, i) => (c as HTMLElement).style.setProperty("--i", String(i)));
    });
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);
  return null;
}
