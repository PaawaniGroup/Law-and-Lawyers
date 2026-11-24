import Link from "next/link";
import type { Partner } from "@/content/site";
import { Portrait } from "./Portrait";
import { Wipe } from "./Reveal";

export function PartnerCard({ partner, className = "" }: { partner: Partner; className?: string }) {
  return (
    <article className={className} aria-labelledby={`partner-${partner.slug}`}>
      <Wipe>
        <Link href={`/partners/${partner.slug}`} tabIndex={-1} aria-hidden="true" className="block">
          <Portrait partner={partner} sizes="(min-width: 1024px) 40vw, 90vw" />
        </Link>
      </Wipe>
      <h3 id={`partner-${partner.slug}`} className="t-h2 mt-6">
        Adv. {partner.name}
      </h3>
      <p className="t-body ink-2 mt-1">
        {partner.title}
        <span aria-hidden="true" className="mx-2 text-brass-ink">
          ·
        </span>
        <span className="sr-only">, </span>
        {partner.designation}
      </p>
      <p className="label label-brass tnum mt-4">Enrolment No. {partner.enrolmentNo}</p>
      <p className="t-small mt-4 max-w-[46ch]">{partner.coreAreas.slice(0, 3).join(" · ")}</p>
      <p className="mt-6">
        <Link href={`/partners/${partner.slug}`} className="link">
          Profile of {partner.shortName} <span className="a">→</span>
        </Link>
      </p>
    </article>
  );
}
