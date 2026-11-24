// Generates the hero "cadastral survey" drawing as data (lib/hero-map-data.ts).
// Deterministic: the same seed always yields the same drawing.
// Run: node scripts/gen-hero-map.mjs
import { writeFileSync } from "node:fs";

function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(2021);
const r1 = (n) => Math.round(n * 10) / 10;

const W = 560;
const H = 700;
const X0 = 28;
const X1 = 532;
const Y0 = 28;
const Y1 = 626;
const C = 6;
const R = 8;
const dx = (X1 - X0) / C;
const dy = (Y1 - Y0) / R;

// --- Canal centreline: a gentle double curve from top-right to bottom-left ---
const canalPt = (t) => {
  const y = Y0 + (Y1 - Y0) * t;
  const x = 436 - 292 * t + 30 * Math.sin(t * Math.PI * 2.1 + 0.4) + 14 * Math.sin(t * Math.PI * 5.3);
  return [x, y];
};
const SAMPLES = 70;
const center = Array.from({ length: SAMPLES + 1 }, (_, i) => canalPt(i / SAMPLES));
const offsetLine = (off) =>
  center.map((p, i) => {
    const a = center[Math.max(0, i - 1)];
    const b = center[Math.min(SAMPLES, i + 1)];
    const tx = b[0] - a[0];
    const ty = b[1] - a[1];
    const len = Math.hypot(tx, ty) || 1;
    return [p[0] + (-ty / len) * off, p[1] + (tx / len) * off];
  });
const line = (pts) => "M" + pts.map((p) => `${r1(p[0])} ${r1(p[1])}`).join("L");
const distToCanal = (x, y) => Math.min(...center.map((p) => Math.hypot(p[0] - x, p[1] - y)));

// --- Jittered grid of vertices ---
const V = [];
for (let j = 0; j <= R; j++) {
  V[j] = [];
  for (let i = 0; i <= C; i++) {
    let x = X0 + i * dx;
    let y = Y0 + j * dy;
    const edgeX = i === 0 || i === C;
    const edgeY = j === 0 || j === R;
    x += (rnd() - 0.5) * dx * (edgeX ? 0.12 : 0.6);
    y += (rnd() - 0.5) * dy * (edgeY ? 0.12 : 0.6);
    V[j][i] = [x, y];
  }
}

// --- Parcels: quads, some merged sideways, some split on a diagonal ---
const used = Array.from({ length: R }, () => Array(C).fill(false));
const polys = [];
for (let j = 0; j < R; j++) {
  for (let i = 0; i < C; i++) {
    if (used[j][i]) continue;
    used[j][i] = true;
    const TL = V[j][i];
    const TR = V[j][i + 1];
    const BR = V[j + 1][i + 1];
    const BL = V[j + 1][i];
    const roll = rnd();
    if (roll < 0.26 && i < C - 1 && !used[j][i + 1]) {
      used[j][i + 1] = true;
      polys.push([TL, TR, V[j][i + 2], V[j + 1][i + 2], BR, BL]);
    } else if (roll < 0.46) {
      if (rnd() < 0.5) {
        polys.push([TL, TR, BR]);
        polys.push([TL, BR, BL]);
      } else {
        polys.push([TL, TR, BL]);
        polys.push([TR, BR, BL]);
      }
    } else {
      polys.push([TL, TR, BR, BL]);
    }
  }
}

const area = (p) => {
  let a = 0;
  for (let k = 0; k < p.length; k++) {
    const [x1, y1] = p[k];
    const [x2, y2] = p[(k + 1) % p.length];
    a += x1 * y2 - x2 * y1;
  }
  return a / 2;
};
const centroid = (p) => {
  const a = area(p);
  let cx = 0;
  let cy = 0;
  for (let k = 0; k < p.length; k++) {
    const [x1, y1] = p[k];
    const [x2, y2] = p[(k + 1) % p.length];
    const f = x1 * y2 - x2 * y1;
    cx += (x1 + x2) * f;
    cy += (y1 + y2) * f;
  }
  return [cx / (6 * a), cy / (6 * a)];
};

const parcels = polys.map((p) => {
  const [cx, cy] = centroid(p);
  const delay = Math.round((1 - cx / W) * 520 + (cy / H) * 620 + rnd() * 140);
  return { d: "M" + p.map((q) => `${r1(q[0])} ${r1(q[1])}`).join("L") + "Z", delay };
});

// --- Plot numbers (schematic, not real khasra numbers) ---
const used_ids = new Set();
const labels = [];
polys.forEach((p) => {
  const a = Math.abs(area(p));
  const [cx, cy] = centroid(p);
  if (a < 2600 || distToCanal(cx, cy) < 24) return;
  let id;
  do {
    id = String(Math.floor(11 + rnd() * 388));
    if (rnd() < 0.22) id += "/" + (1 + Math.floor(rnd() * 3));
  } while (used_ids.has(id));
  used_ids.add(id);
  labels.push({ x: r1(cx), y: r1(cy), t: id });
});

// --- Boundary pegs on a few interior vertices ---
const pegs = [];
const pegCandidates = [];
for (let j = 1; j < R; j++) for (let i = 1; i < C; i++) pegCandidates.push(V[j][i]);
while (pegs.length < 9 && pegCandidates.length) {
  const k = Math.floor(rnd() * pegCandidates.length);
  const [x, y] = pegCandidates.splice(k, 1)[0];
  if (distToCanal(x, y) > 26) pegs.push([r1(x), r1(y)]);
}

// --- Canal bridge ticks at two crossing points ---
const tick = (t) => {
  const i = Math.round(t * SAMPLES);
  const L = offsetLine(-11)[i];
  const Rr = offsetLine(11)[i];
  return `M${r1(L[0])} ${r1(L[1])}L${r1(Rr[0])} ${r1(Rr[1])}`;
};

const data = {
  viewBox: `0 0 ${W} ${H}`,
  frame: [`M8 8H${W - 8}V${H - 8}H8Z`, `M16 16H${W - 16}V${H - 16}H16Z`],
  parcels,
  labels,
  pegs,
  canal: {
    clear: line(center),
    a: line(offsetLine(-5.5)),
    b: line(offsetLine(5.5)),
    ticks: [tick(0.34), tick(0.35), tick(0.71), tick(0.72)],
  },
  strip: { y: 646, line: `M16 646H${W - 16}`, text: "SCHEMATIC · NOT TO SCALE", textX: 32, textY: 674 },
  north: { d: "M508 686V656M508 656L503 667M508 656L513 667", labelX: 508, labelY: 650 },
};

const out = `// GENERATED by scripts/gen-hero-map.mjs. Do not edit by hand.
export interface HeroMapData {
  viewBox: string;
  frame: string[];
  parcels: { d: string; delay: number }[];
  labels: { x: number; y: number; t: string }[];
  pegs: [number, number][];
  canal: { clear: string; a: string; b: string; ticks: string[] };
  strip: { y: number; line: string; text: string; textX: number; textY: number };
  north: { d: string; labelX: number; labelY: number };
}

export const heroMap: HeroMapData = ${JSON.stringify(data)};
`;
writeFileSync(new URL("../lib/hero-map-data.ts", import.meta.url), out);
console.log(`parcels=${parcels.length} labels=${labels.length} pegs=${pegs.length} bytes=${out.length}`);
