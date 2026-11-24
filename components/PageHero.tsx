import type { ReactNode } from "react";
import { MaskLines } from "./MaskLines";
import { splitLines } from "@/lib/text";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  maxChars?: number;
  aside?: ReactNode;
}

/** Title block for inner pages: asymmetric, with the title set in the left 8 columns. */
export function PageHero({ eyebrow, title, lead, maxChars = 22, aside }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="relative">
      <div className="wrap grid12 pb-[clamp(56px,8vw,112px)] pt-8 lg:pt-16">
        <div className="col-span-12 lg:col-span-2">
          <p className="marg label !static !mb-6 lg:!mb-0">{eyebrow}</p>
        </div>
        <div className={`col-span-12 ${aside ? "lg:col-span-7" : "lg:col-span-10"}`}>
          <MaskLines tag="h1" id="page-title" lines={splitLines(title, maxChars)} className="t-h1" />
          {lead && <div className="t-pull mt-10 max-w-[52ch] text-ink-2">{lead}</div>}
        </div>
        {aside && <div className="hidden text-ink-2 lg:col-span-3 lg:col-start-10 lg:block lg:self-center">{aside}</div>}
      </div>
    </section>
  );
}
