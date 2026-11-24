/**
 * Law-themed line drawings, in the same monoline language as the practice glyphs, but large (240 grid).
 * Strokes are 1.25px at any size (vector-effect: non-scaling-stroke, see globals.css).
 * `accent` paths are drawn in the accent colour (red tape, bookmark ribbon).
 *
 * Deliberately NOT used: the State Emblem of India or the Ashoka Chakra. Their use is restricted by the
 * State Emblem of India (Prohibition of Improper Use) Act, 2005.
 */
export type EmblemName = "scales" | "portico" | "book" | "file" | "gavel";

export interface EmblemShape {
  paths: string[];
  accent?: string[];
}

const r = (n: number) => Math.round(n * 10) / 10;
const circle = (cx: number, cy: number, rad: number) =>
  `M${cx - rad} ${cy}a${rad} ${rad} 0 1 0 ${2 * rad} 0a${rad} ${rad} 0 1 0 ${-2 * rad} 0`;
const rect = (x: number, y: number, w: number, h: number) => `M${x} ${y}H${x + w}V${y + h}H${x}Z`;

type Pt = [number, number];
const rotate = (pts: Pt[], deg: number, cx: number, cy: number): Pt[] => {
  const a = (deg * Math.PI) / 180;
  return pts.map(([x, y]) => [cx + (x - cx) * Math.cos(a) - (y - cy) * Math.sin(a), cy + (x - cx) * Math.sin(a) + (y - cy) * Math.cos(a)]);
};
const poly = (pts: Pt[], close = true) => "M" + pts.map(([x, y]) => `${r(x)} ${r(y)}`).join("L") + (close ? "Z" : "");

/* Scales of justice */
const scales: EmblemShape = {
  paths: [
    circle(120, 42, 6),
    "M120 48V69",
    circle(120, 74, 5),
    "M44 74H196",
    circle(48, 74, 3),
    circle(192, 74, 3),
    "M120 79V206",
    "M48 74L22 150M48 74L74 150",
    "M18 150H78C78 172 64 180 48 180C32 180 18 172 18 150Z",
    "M192 74L166 150M192 74L218 150",
    "M162 150H222C222 172 208 180 192 180C176 180 162 172 162 150Z",
    "M92 206H148L154 214H86Z",
    rect(78, 214, 84, 8),
  ],
};

/* Court portico: pediment, five columns, steps */
const column = (x: number): string[] => [
  rect(x - 10, 102, 20, 6),
  `M${x - 6} 108V196`,
  `M${x + 6} 108V196`,
  `M${x} 110V194`,
  rect(x - 10, 196, 20, 6),
];
const portico: EmblemShape = {
  paths: [
    "M14 84L120 26L226 84",
    "M34 80L120 34L206 80",
    circle(120, 62, 6),
    rect(14, 84, 212, 14),
    ...[44, 82, 120, 158, 196].flatMap(column),
    rect(12, 202, 216, 8),
    rect(6, 210, 228, 8),
    "M0 218H240",
  ],
};

/* Open law book with a ribbon */
const bookLines = (side: 1 | -1): string[] =>
  [0, 1, 2, 3, 4, 5].map((i) => {
    const y = 94 + i * 13;
    const xa = side === 1 ? 194 : 46;
    const xb = side === 1 ? 132 : 108;
    const xm = side === 1 ? 162 : 78;
    return `M${xa} ${y}Q${xm} ${y - 5} ${xb} ${y + 3}`;
  });
const book: EmblemShape = {
  paths: [
    "M120 76C98 64 64 62 32 72V176C64 166 98 168 120 182Z",
    "M120 76C142 64 176 62 208 72V176C176 166 142 168 120 182Z",
    "M26 178C60 170 96 172 120 186C144 172 180 170 214 178",
    "M32 176L26 178V182",
    "M208 176L214 178V182",
    "M120 76V182",
    ...bookLines(1),
    ...bookLines(-1),
  ],
  accent: ["M120 186V210L127 203L134 210V188"],
};

/* A file tied with red tape ("lal fita") */
const file: EmblemShape = {
  paths: [
    "M54 74V62H186V74",
    "M40 74H100L110 86H200V198H40Z",
    circle(120, 136, 5),
  ],
  accent: [
    "M114 86V130M126 86V130",
    "M114 142V198M126 142V198",
    "M40 130H114M40 142H114",
    "M126 130H200M126 142H200",
    "M114 136C100 118 82 122 86 134C90 148 108 142 114 136Z",
    "M126 136C140 118 158 122 154 134C150 148 132 142 126 136Z",
    "M117 142L104 176L112 172L120 144Z",
    "M123 142L136 176L128 172L120 144Z",
  ],
};

/* Gavel and sounding block */
const head = (pts: Pt[]) => poly(rotate(pts, 32, 120, 120));
const gavel: EmblemShape = {
  paths: [
    head([[80, 50], [160, 50], [160, 84], [80, 84]]),
    head([[96, 50], [96, 84]]).replace("Z", ""),
    head([[144, 50], [144, 84]]).replace("Z", ""),
    head([[116, 84], [116, 180], [124, 180], [124, 84]]),
    "M56 198H176V208H56Z",
    "M72 188H160L166 198H66Z",
  ],
};

export const emblems: Record<EmblemName, EmblemShape> = { scales, portico, book, file, gavel };
