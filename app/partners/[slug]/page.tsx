import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Glyph } from "@/components/Glyph";
import { JsonLd } from "@/components/JsonLd";
import { MaskLines } from "@/components/MaskLines";
import { Portrait } from "@/components/Portrait";
import { RevealRule, Wipe } from "@/components/Reveal";
import { getPartner, practicesLedBy, site } from "@/content/site";
import { chunkSentences } from "@/lib/paragraphs";
import { pageMeta, personJsonLd } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;
export const generateStaticParams = () => site.partners.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const partner = getPartner((await params).slug);
  if (!partner) return {};
  return pageMeta({
    title: `Advocate ${partner.name}`,
    description: `${partner.title}, ${partner.designation}, The Law & Lawyers, advocates in Roorkee. Enrolment No. ${partner.enrolmentNo}. ${partner.coreAreas.slice(0, 3).join(", ")}.`,
    path: `/partners/${partner.slug}`,
  });
}

export default async function PartnerPage({ params }: { params: Params }) {
  const partner = getPartner((await params).slug);
  if (!partner) notFound();
  const other = site.partners.find((p) => p.slug !== partner.slug)!;
  const practices = practicesLedBy(partner.slug);

  const credentials: [string, string, boolean?][] = [
    ["Qualifications", partner.qualifications],
    ["Bar Council Enrolment No.", partner.enrolmentNo],
    ["State Bar Council", partner.barCouncil],
    ["Experience", partner.experience],
    ["Practising since", partner.practisingSince, partner.practisingSince.startsWith("[")],
  ];

  return (
    <>
      <JsonLd data={personJsonLd(partner)} />
      <article aria-labelledby="page-title" className="wrap grid12 gap-y-14 pb-[clamp(72px,10vw,140px)] pt-8 lg:pt-16">
        {/* Left: portrait + credentials */}
        <div className="col-span-12 lg:col-span-4">
          <Wipe>
            <Portrait partner={partner} priority sizes="(min-width: 1024px) 30vw, 90vw" />
          </Wipe>
          <h2 className="label label-brass mb-3 mt-10">Credentials</h2>
          <table className="dl-table">
            <caption className="sr-only">Credentials of Advocate {partner.name}</caption>
            <tbody>
              {credentials.map(([label, value, isPlaceholder]) => (
                <tr key={label}>
                  <th scope="row" className="label">
                    {label}
                  </th>
                  <td>{isPlaceholder ? <span className="placeholder">{value}</span> : value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: the chambers CV */}
        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <p className="label label-2">Partner profile</p>
          <MaskLines tag="h1" id="page-title" lines={[`Adv. ${partner.name}`]} className="t-display mt-6 !text-[clamp(2.5rem,5.4vw,4.75rem)]" />
          <p className="t-pull mt-6 text-ink-2">
            {partner.title} · {partner.designation}
          </p>

          <div className="t-body mt-12 max-w-[68ch] space-y-5">
            {chunkSentences(partner.profile, 2).map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          <h2 className="t-h2 mt-20">Core practice areas</h2>
          <ul className="mt-6 border-t border-rule">
            {partner.coreAreas.map((area) => (
              <li key={area} className="border-b border-rule py-3.5">
                {area}
              </li>
            ))}
          </ul>

          <h2 className="t-h2 mt-20">Practice pages</h2>
          <ul className="mt-6">
            {practices.map((p, i) => (
              <li key={p.slug}>
                <RevealRule delay={i * 0.04} />
                <Link href={`/practice/${p.slug}`} className="pr-row !grid-cols-[48px_minmax(0,1fr)_32px_28px] !gap-x-5">
                  <span className="label pr-num tnum">{p.num}</span>
                  <span className="t-h3 !text-[1.25rem]">{p.title}</span>
                  <span className="pr-glyph text-ink !block">
                    <Glyph slug={p.slug} size={28} drawOnHover />
                  </span>
                  <span className="pr-arrow !block" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
            <li aria-hidden="true">
              <RevealRule delay={0.3} />
            </li>
          </ul>

          <div className="mt-20 flex flex-wrap items-center justify-between gap-x-10 gap-y-6 border-t border-rule pt-8">
            <Link href={`/partners/${other.slug}`} className="link">
              {other.shortName} <span className="a">→</span>
            </Link>
            <Link href="/contact" className="btn">
              <span className="btn-label">{site.cta.contactFirm}</span>
              <span className="arr" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
