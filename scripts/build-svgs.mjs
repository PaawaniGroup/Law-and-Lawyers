// Writes the standalone, optimised SVG assets into /public and /app.
// Run: npm run build:svgs  (Node 22.6+; imports the same data the site uses)
import { mkdirSync, writeFileSync } from "node:fs";
import { glyphs } from "../lib/glyphs.ts";
import { heroMap } from "../lib/hero-map-data.ts";

const root = new URL("../", import.meta.url);
const write = (rel, text) => {
  const url = new URL(rel, root);
  mkdirSync(new URL("./", url), { recursive: true });
  writeFileSync(url, text);
  console.log(rel.padEnd(36), `${(text.length / 1024).toFixed(1)} KB`);
};

const EVERGREEN = "#1E3B33";
const SERIF = "Newsreader, Georgia, 'Times New Roman', serif";
const MONO = "'IBM Plex Mono', ui-monospace, Menlo, monospace";

/* ---------- Seal ---------- */
const RING_TEXT = "THE LAW & LAWYERS · ADVOCATES AND SOLICITORS · ROORKEE · EST. 2021 · ";
const sealBody = (color, hi, { fonts = true } = {}) => {
  const layer = (c, tx) => `<g transform="translate(${tx} ${tx})" fill="none" stroke="${c}">
<circle cx="100" cy="100" r="96" stroke-width="1.4"/><circle cx="100" cy="100" r="92" stroke-width=".6"/>
<circle cx="100" cy="100" r="63" stroke-width=".6"/><circle cx="100" cy="100" r="59" stroke-width="1"/>
<text fill="${c}" stroke="none" font-family="${MONO}" font-size="8.4" letter-spacing=".6"><textPath href="#ring" textLength="476" lengthAdjust="spacing">${RING_TEXT.replace("&", "&amp;")}</textPath></text>
<text x="100" y="116" fill="${c}" stroke="none" text-anchor="middle" font-family="${SERIF}" font-style="italic" font-size="${fonts ? 50 : 56}" letter-spacing="-2">L&amp;L</text></g>`;
  return `<defs><path id="ring" d="M24 100a76 76 0 1 1 152 0a76 76 0 1 1-152 0"/></defs>${layer(hi, 0.8)}${layer(color, 0)}`;
};
write(
  "public/svg/seal.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" role="img" aria-label="Seal of The Law &amp; Lawyers, Advocates and Solicitors, Roorkee, established 2021">${sealBody(EVERGREEN, "rgba(255,255,255,.7)")}</svg>`,
);
// Favicon: simplified so it stays legible at 16-32px (no ring text)
write(
  "app/icon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#F4EFE6"/><g fill="none" stroke="${EVERGREEN}"><circle cx="32" cy="32" r="29" stroke-width="2.4"/><circle cx="32" cy="32" r="25" stroke-width="1"/></g><text x="32" y="40.5" text-anchor="middle" fill="${EVERGREEN}" font-family="${SERIF}" font-style="italic" font-size="25" letter-spacing="-1">L&amp;L</text></svg>`,
);

/* ---------- Hero map ---------- */
const m = heroMap;
const css = `.p{fill:transparent;stroke:#16191D;stroke-width:.9;stroke-linejoin:round;stroke-dasharray:1;stroke-dashoffset:1;animation:d 1.2s cubic-bezier(.2,.7,.1,1) forwards;animation-delay:var(--d)}
.p:hover{fill:rgba(30,59,51,.06)}.c{fill:none;stroke:#1E3B33;stroke-width:1.1;stroke-dasharray:1;stroke-dashoffset:1;animation:d 1.4s cubic-bezier(.2,.7,.1,1) .9s forwards}
.k{fill:none;stroke:#F4EFE6;stroke-width:22}.f{fill:none;stroke:#4A4F55;stroke-width:.8}.g{fill:#F4EFE6;stroke:#7A2430;stroke-width:1}
.t{font-family:${MONO};font-size:7.5px;fill:#4A4F55;text-anchor:middle;dominant-baseline:middle;letter-spacing:.04em}
@keyframes d{to{stroke-dashoffset:0}}
@media (prefers-color-scheme:dark){.p{stroke:#ECE6DA}.p:hover{fill:rgba(143,181,164,.06)}.c{stroke:#8FB5A4}.k{stroke:#111412}.f{stroke:#A9A398}.g{fill:#111412;stroke:#C9707A}.t{fill:#A9A398}}
@media (prefers-reduced-motion:reduce){.p,.c{animation:none;stroke-dashoffset:0}}`;
const mapSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${m.viewBox}" role="img" aria-label="Schematic survey drawing of land parcels crossed by a canal"><style>${css}</style>
${m.frame.map((d) => `<path class="f" d="${d}"/>`).join("")}<path class="f" d="${m.strip.line}"/>
${m.parcels.map((p) => `<path class="p" pathLength="1" style="--d:${p.delay}ms" d="${p.d}"/>`).join("")}
<path class="k" d="${m.canal.clear}"/><path class="c" pathLength="1" d="${m.canal.a}"/><path class="c" pathLength="1" d="${m.canal.b}"/>
${m.canal.ticks.map((d) => `<path class="f" d="${d}"/>`).join("")}
${m.pegs.map(([x, y]) => `<circle class="g" cx="${x}" cy="${y}" r="2.6"/>`).join("")}
${m.labels.map((l) => `<text class="t" x="${l.x}" y="${l.y}">${l.t}</text>`).join("")}
<text class="t" style="text-anchor:start" x="${m.strip.textX}" y="${m.strip.textY}">${m.strip.text}</text>
<path class="f" d="${m.north.d}"/><text class="t" x="${m.north.labelX}" y="${m.north.labelY}">N</text></svg>`;
write("public/svg/hero-map.svg", mapSvg);

/* ---------- Glyphs ---------- */
Object.entries(glyphs).forEach(([slug, paths]) => {
  write(
    `public/svg/glyphs/${slug}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths.map((d) => `<path d="${d}"/>`).join("")}</svg>`,
  );
});

/* ---------- Paper grain (feTurbulence) ----------
   Drawn on a 220-unit canvas but declared at 2200px: browsers skip very low bits-per-pixel images
   when choosing the Largest Contentful Paint element, so this texture is never mistaken for content. */
write(
  "public/textures/grain.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" width="2200" height="2200" viewBox="0 0 220 220"><filter id="n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .09  0 0 0 0 .1  0 0 0 0 .11  0 0 0 1.1 -.25"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`,
);
