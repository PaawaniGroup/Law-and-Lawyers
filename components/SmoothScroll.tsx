"use client";

import { useEffect } from "react";

/** Lenis smooth scrolling. Never starts for visitors who prefer reduced motion. */
export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) return;

    let cancelled = false;
    let raf = 0;
    let destroy: (() => void) | undefined;

    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled || query.matches) return;
      const lenis = new Lenis({ duration: 1.1, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
      const frame = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
      destroy = () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
      };
    };

    const timer = window.setTimeout(() => void start(), 300);

    const onChange = () => {
      if (query.matches) destroy?.();
    };
    query.addEventListener("change", onChange);

    return () => {
      cancelled = true;
      query.removeEventListener("change", onChange);
      window.clearTimeout(timer);
      destroy?.();
    };
  }, []);

  return null;
}
