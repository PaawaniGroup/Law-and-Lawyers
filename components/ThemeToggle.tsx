"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const subscribe = (cb: () => void) => {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
};
const getSnapshot = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");
const getServerSnapshot = (): Theme => "light";

function applyTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("ll-theme", next);
  } catch {
    /* preference simply isn't remembered */
  }
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div className="theme-toggle" role="group" aria-label="Colour theme">
      {(["light", "dark"] as const).map((t) => (
        <button key={t} type="button" className="label" aria-pressed={theme === t} onClick={() => applyTheme(t)}>
          {t}
        </button>
      ))}
    </div>
  );
}
