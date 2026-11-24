import Link from "next/link";
import { site } from "@/content/site";
import { Arrow } from "./Arrow";
import { Glyph } from "./Glyph";
import { RevealRule } from "./Reveal";

/** Editorial numbered index of the ten practice areas. Rows, not cards. */
export function PracticeIndex({ idPrefix = "pi", alwaysGlyph = false }: { idPrefix?: string; alwaysGlyph?: boolean }) {
  return (
    <ol aria-label="Practice areas">
      {site.practiceAreas.map((p, i) => (
        <li key={p.slug}>
          <RevealRule delay={Math.min(i * 0.05, 0.4)} />
          <Link href={`/practice/${p.slug}`} className="pr-row" id={`${idPrefix}-${p.slug}`}>
            <span className="label pr-num tnum">{p.num}</span>
            <h3 className="t-h3">{p.title}</h3>
            <p className="t-small ink-2 md:pr-4">{p.intro}</p>
            <span className="pr-glyph text-ink">
              <Glyph slug={p.slug} size={alwaysGlyph ? 40 : 32} drawOnHover={!alwaysGlyph} />
            </span>
            <Arrow className="pr-arrow" />
          </Link>
        </li>
      ))}
      <li aria-hidden="true">
        <RevealRule delay={0.45} />
      </li>
    </ol>
  );
}
