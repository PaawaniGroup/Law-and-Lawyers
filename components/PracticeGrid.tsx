import Link from "next/link";
import { site } from "@/content/site";
import { Glyph } from "./Glyph";

/**
 * The ten practice areas as a ruled grid, like the khasra plot grid of a revenue map:
 * hairlines only, no boxes. Each cell shows the glyph, number, title and how many services it covers.
 */
export function PracticeGrid() {
  return (
    <ol aria-label="Practice areas" className="grid grid-cols-2 border-l border-t border-rule md:grid-cols-5">
      {site.practiceAreas.map((p) => (
        <li key={p.slug} className="border-b border-r border-rule">
          <Link
            href={`/practice/${p.slug}`}
            className="group flex h-full min-h-[210px] flex-col justify-between gap-8 p-5 transition-colors duration-500 hover:bg-paper-2 sm:min-h-[240px]"
          >
            <span className="flex items-start justify-between gap-3">
              <span className="label label-brass tnum">{p.num}</span>
              <span className="text-ink transition-colors duration-500 group-hover:text-evergreen">
                <Glyph slug={p.slug} size={52} />
              </span>
            </span>
            <span>
              <span className="t-h3 block !text-[1.15rem] !leading-[1.2] sm:!text-[1.3rem]">{p.shortTitle}</span>
              <span className="label label-2 mt-3 block">
                {p.services.length} areas of work <span aria-hidden="true">→</span>
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
