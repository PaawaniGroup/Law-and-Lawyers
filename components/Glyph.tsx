import { glyphs } from "@/lib/glyphs";

interface GlyphProps {
  slug: string;
  size?: number;
  /** Strokes start undrawn and draw in when the parent .pr-row is hovered or focused. */
  drawOnHover?: boolean;
  className?: string;
}

export function Glyph({ slug, size = 24, drawOnHover = false, className }: GlyphProps) {
  const paths = glyphs[slug];
  if (!paths) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={["glyph", drawOnHover ? "glyph-hover" : "", className].filter(Boolean).join(" ")}
      style={{ strokeWidth: (1.25 * 24) / size }} /* always renders as a 1.25px stroke */
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} pathLength={1} />
      ))}
    </svg>
  );
}
