import { useId } from "react";

const RING_TEXT = "THE LAW & LAWYERS · ADVOCATES AND SOLICITORS · ROORKEE · EST. 2021 · ";

interface SealProps {
  size?: number;
  className?: string;
  /** Draws the rings and fades in the monogram (used for the enquiry-received state). */
  stamp?: boolean;
  decorative?: boolean;
}

/**
 * The firm seal: "L&L" in Newsreader italic with ring text in mono.
 * Drawn as a blind-stamped impression: a pale highlight offset beneath the ink.
 */
export function Seal({ size = 160, className, stamp = false, decorative = true }: SealProps) {
  const id = useId().replace(/:/g, "");
  const ringId = `ring-${id}`;

  const layer = (stroke: string, offset: number, key: string) => (
    <g key={key} transform={`translate(${offset} ${offset})`} fill="none" stroke={stroke}>
      <circle className={stamp ? "ring" : undefined} pathLength={1} cx="100" cy="100" r="96" strokeWidth="1.4" />
      <circle className={stamp ? "ring" : undefined} pathLength={1} cx="100" cy="100" r="92" strokeWidth=".6" />
      <circle className={stamp ? "ring" : undefined} pathLength={1} cx="100" cy="100" r="63" strokeWidth=".6" />
      <circle className={stamp ? "ring" : undefined} pathLength={1} cx="100" cy="100" r="59" strokeWidth="1" />
      <text
        className="ringtext"
        fill={stroke}
        stroke="none"
        fontFamily="var(--font-mono)"
        fontSize="8.4"
        letterSpacing=".6"
      >
        <textPath href={`#${ringId}`} textLength="476" lengthAdjust="spacing">
          {RING_TEXT}
        </textPath>
      </text>
      <text
        className="mono-ll"
        x="100"
        y="117"
        fill={stroke}
        stroke="none"
        textAnchor="middle"
        fontFamily="var(--font-serif-italic)"
        fontStyle="italic"
        fontSize="50"
        letterSpacing="-2"
      >
        L&amp;L
      </text>
    </g>
  );

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={[stamp ? "seal-stamp" : "", className].filter(Boolean).join(" ")}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : "Seal of The Law & Lawyers, Advocates and Solicitors, Roorkee, established 2021"}
      focusable="false"
    >
      <defs>
        <path id={ringId} d="M24 100a76 76 0 1 1 152 0a76 76 0 1 1-152 0" />
      </defs>
      {layer("var(--emboss-hi)", 0.8, "hi")}
      {layer("currentColor", 0, "ink")}
    </svg>
  );
}
