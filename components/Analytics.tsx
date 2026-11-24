"use client";

import { useEffect } from "react";
import { GATE_EVENT, GATE_KEY } from "./gate-constants";

/**
 * Privacy-friendly analytics (Plausible). Loads ONLY after the visitor has accepted the
 * disclaimer, and only when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set. No cookies, no other trackers.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  useEffect(() => {
    if (!domain) return;
    const load = () => {
      if (document.querySelector("script[data-plausible]")) return;
      const s = document.createElement("script");
      s.defer = true;
      s.dataset.domain = domain;
      s.dataset.plausible = "1";
      s.src = "https://plausible.io/js/script.js";
      document.head.appendChild(s);
    };
    try {
      if (sessionStorage.getItem(GATE_KEY) === "1") load();
    } catch {
      /* storage unavailable: do not load analytics */
    }
    window.addEventListener(GATE_EVENT, load, { once: true });
    return () => window.removeEventListener(GATE_EVENT, load);
  }, [domain]);

  return null;
}
