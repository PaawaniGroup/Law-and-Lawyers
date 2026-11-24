/**
 * Ten bespoke practice glyphs. 24px grid, 1.25px monoline stroke, round caps and joins.
 * Every element is a <path> so that each can be drawn in with stroke-dashoffset.
 * Keep the keys in step with the practice slugs in content/site.ts.
 */

const rect = (x: number, y: number, w: number, h: number) => `M${x} ${y}H${x + w}V${y + h}H${x}Z`;
const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

export const glyphs: Record<string, string[]> = {
  // 01 Property & Real Estate: a survey plot with a boundary peg
  "property-real-estate": [
    "M4 9.5L13.5 5.5L20 10.5L17.5 19L6 18Z",
    circle(6, 18, 1.4),
    "M6 19.4V22.5",
  ],
  // 02 Land & Revenue: a khasra grid with one parcel outlined
  "land-revenue": [
    rect(3, 4, 18, 16),
    "M9 4V20",
    "M15 4V20",
    "M3 9.3H21",
    "M3 14.7H21",
    "M10.6 10.9L13.8 10.4L14 13.5L10.9 13.9Z",
  ],
  // 03 Banking & Finance: a ledger with a seal
  "banking-finance": [
    rect(5, 3, 14, 18),
    "M8.2 3V21",
    "M10.8 7H16",
    "M10.8 10H16",
    circle(14, 15.6, 2.6),
    "M12.9 18L12.3 20.2",
    "M15.1 18L15.7 20.2",
  ],
  // 04 Corporate & Commercial: a stack of registers
  "corporate-commercial": [
    rect(3, 16.5, 18, 4.5),
    rect(5, 11, 16, 4.5),
    rect(3, 5.5, 16, 4.5),
    "M6 16.5V21",
    "M8 11V15.5",
    "M6 5.5V10",
  ],
  // 05 Statutory & Regulatory Compliance: a ruled register with tick marks
  "regulatory-compliance": [
    rect(4, 3, 16, 18),
    "M11 8H17",
    "M11 12H17",
    "M11 16H17",
    "M6.5 8.2L7.6 9.3L9.2 6.9",
    "M6.5 12.2L7.6 13.3L9.2 10.9",
    "M6.5 16.2L7.6 17.3L9.2 14.9",
  ],
  // 06 GST: an invoice with a % line
  gst: [
    "M5 3H19V21L17 19.6L15 21L13 19.6L11 21L9 19.6L7 21L5 19.6Z",
    "M8 7H13",
    circle(9.6, 11.4, 1.1),
    circle(14.4, 15.4, 1.1),
    "M15 10.6L9 16.2",
  ],
  // 07 Income Tax: a form with numbered sections
  "income-tax": [
    rect(4, 3, 16, 18),
    "M7 6.5V9.5",
    "M11 8H17",
    "M6.4 11V14M8.2 11V14",
    "M11 12.5H17",
    "M5.8 15.5V18.5M7.6 15.5V18.5M9.4 15.5V18.5",
    "M12 17H17",
  ],
  // 08 Contracts & Legal Documentation: two overlapping documents with a signature line
  "contracts-documentation": [
    "M9 18H3V3H15V7",
    rect(9, 7, 12, 14),
    "M12 10.6H18",
    "M11.5 16.4C12.5 13.6 13.5 18.4 14.5 15.6S16.5 15 18 16",
    "M11.5 18.6H18.5",
  ],
  // 09 Intellectual Property Rights: ® inside a frame
  "intellectual-property": [
    rect(3, 3, 18, 18),
    circle(12, 12, 5.8),
    "M10.3 15V9.2H12.4Q14 9.2 14 10.6Q14 12 12.4 12H10.3",
    "M12.5 12L14.2 15",
  ],
  // 10 Registrations & Business Facilitation: a stamp over a document
  registrations: [
    rect(3, 3, 11, 17),
    "M5.5 7H11.5",
    "M5.5 10H10",
    "M5.5 13H9",
    circle(18.6, 6.4, 2),
    "M17.4 8.2L16.9 11.8",
    "M19.8 8.2L20.3 11.8",
    "M14.2 11.8H23V15.2H14.2Z",
    "M14.2 19H23",
  ],
};
