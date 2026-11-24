// WCAG contrast check for every text/background pair used on the site, in both themes.
// Reads the colour tokens straight from app/globals.css so it cannot drift. Run: npm run check:contrast
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const grab = (block) => {
  const out = {};
  for (const [, k, v] of block.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)) out[k] = v;
  return out;
};
const light = grab(css.match(/:root\s*\{([\s\S]*?)\n\}/)[1]);
const dark = grab(css.match(/:root\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/)[1]);

const rgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const lin = (c) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = (h) => {
  const [r, g, b] = rgb(h).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const mix = (fg, bg, alpha) =>
  "#" + rgb(fg).map((c, i) => Math.round(c * alpha + rgb(bg)[i] * (1 - alpha)).toString(16).padStart(2, "0")).join("");

// [description, foreground token, background token, minimum, alpha?]
const pairs = [
  ["Body text on page", "ink", "paper", 4.5],
  ["Body text on alternate section", "ink", "paper-2", 4.5],
  ["Secondary text on page", "ink-2", "paper", 4.5],
  ["Secondary text on alternate section", "ink-2", "paper-2", 4.5],
  ["Brass labels/numerals (--brass-ink) on page", "brass-ink", "paper", 4.5],
  ["Brass labels/numerals (--brass-ink) on alternate", "brass-ink", "paper-2", 4.5],
  ["Oxblood text/placeholder on page", "oxblood", "paper", 4.5],
  ["Oxblood text/placeholder on alternate", "oxblood", "paper-2", 4.5],
  ["Evergreen link/heading text on page", "evergreen", "paper", 4.5],
  ["Primary button: paper text on evergreen", "paper", "evergreen", 4.5],
  ["Contact band text: paper on evergreen", "paper", "evergreen", 4.5],
  ["Contact band labels (90% paper) on evergreen", "paper", "evergreen", 4.5, 0.9],
  ["Selected theme toggle: paper on ink", "paper", "ink", 4.5],
  ["Focus ring (oxblood) vs page, 3:1 non-text", "oxblood", "paper", 3],
  ["Focus ring (oxblood) vs alternate, 3:1", "oxblood", "paper-2", 3],
  ["Focus ring on evergreen (paper), 3:1", "paper", "evergreen", 3],
  ["Input underline (ink-2) vs page, 3:1 non-text", "ink-2", "paper", 3],
  ["Input underline (ink-2) vs alternate, 3:1", "ink-2", "paper-2", 3],
  ["Gate: label (brass-ink) on paper panel", "brass-ink", "paper", 4.5],
];

let failures = 0;
for (const [name, theme] of [["LIGHT", light], ["DARK", dark]]) {
  console.log(`\n${name}`);
  for (const [desc, fg, bg, min, alpha] of pairs) {
    const fgHex = alpha ? mix(theme[fg], theme[bg], alpha) : theme[fg];
    const r = ratio(fgHex, theme[bg]);
    const ok = r >= min;
    if (!ok) failures++;
    console.log(`${ok ? "PASS" : "FAIL"}  ${r.toFixed(2).padStart(5)}:1  (needs ${min})  ${desc}`);
  }
}
console.log(`\nBrass hairline (#A88A55 light / #C2A574 dark) is decorative only; it is never used for text.`);
console.log(`Raw --brass on paper (light): ${ratio(light.brass, light.paper).toFixed(2)}:1 (why text uses --brass-ink)`);
console.log(failures ? `\n${failures} FAILURE(S)` : "\nAll pairs pass WCAG 2.2 AA in both themes.");
process.exit(failures ? 1 : 0);
