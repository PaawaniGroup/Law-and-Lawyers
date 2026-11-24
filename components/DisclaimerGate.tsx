"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { site } from "@/content/site";
import { GATE_EVENT, GATE_KEY } from "./gate-constants";
import { Seal } from "./Seal";

const SHELL_ID = "site-shell";

const subscribe = (cb: () => void) => {
  window.addEventListener(GATE_EVENT, cb);
  return () => window.removeEventListener(GATE_EVENT, cb);
};
const readAccepted = () => {
  try {
    return sessionStorage.getItem(GATE_KEY) === "1";
  } catch {
    return false; // storage blocked: the gate shows on every page load, the safe default
  }
};

/**
 * Bar Council of India entry disclaimer.
 * - Blocks the page until "I Agree" is chosen; acceptance is remembered for the session only.
 * - Rendered open on the server so there is no flash of unguarded content. A tiny inline script
 *   in <head> hides it at once for visitors who have already accepted this session.
 * - Focus is trapped inside; the page behind is made inert; Escape does not dismiss it.
 */
export function DisclaimerGate() {
  const d = site.disclaimer;
  const accepted = useSyncExternalStore(subscribe, readAccepted, () => false);
  const [dismissed, setDismissed] = useState(false);
  const open = !accepted && !dismissed;
  const agreeRef = useRef<HTMLButtonElement>(null);
  const exitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const shell = document.getElementById(SHELL_ID);
    if (!open) {
      shell?.removeAttribute("inert");
      document.documentElement.style.overflow = "";
      return;
    }
    shell?.setAttribute("inert", "");
    document.documentElement.style.overflow = "hidden";
    agreeRef.current?.focus();
    return () => {
      shell?.removeAttribute("inert");
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const accept = () => {
    try {
      sessionStorage.setItem(GATE_KEY, "1");
    } catch {
      /* ignore */
    }
    document.documentElement.dataset.gate = "ok";
    setDismissed(true);
    window.dispatchEvent(new Event(GATE_EVENT));
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  const exit = () => window.location.replace("about:blank");

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      return;
    }
    if (e.key !== "Tab") return;
    const first = agreeRef.current;
    const last = exitRef.current;
    if (!first || !last) return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!open) return null;

  return (
    <div
      className="gate fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-6"
      style={{ background: "color-mix(in srgb, var(--ink) 62%, transparent)" }}
      data-lenis-prevent
      onKeyDown={onKeyDown}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="gate-title"
        aria-describedby="gate-lead"
        className="relative w-full max-w-[680px] border border-rule bg-paper p-6 sm:p-10"
        style={{ borderTop: "3px solid var(--evergreen)" }}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="label label-brass">Bar Council of India · Rule 36</p>
            <h2 id="gate-title" className="t-h1 mt-3">
              {d.title}
            </h2>
          </div>
          <Seal size={72} className="shrink-0 text-evergreen" />
        </div>

        <p id="gate-lead" className="t-body mt-6">
          {d.lead}
        </p>
        <ul className="mt-5 border-t border-rule">
          {d.points.map((point) => (
            <li key={point} className="t-small border-b border-rule py-3 pl-6 relative">
              <span aria-hidden="true" className="absolute left-0 top-[1.35em] h-px w-3 bg-brass" />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <button ref={agreeRef} type="button" className="btn" onClick={accept}>
            <span className="btn-label">{d.agree}</span>
            <span className="arr" aria-hidden="true" />
          </button>
          <button ref={exitRef} type="button" className="link" onClick={exit}>
            {d.exit}
          </button>
        </div>
      </div>
    </div>
  );
}
