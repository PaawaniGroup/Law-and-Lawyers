import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Emblem } from "@/components/Emblem";
import { EnquiryBand } from "@/components/EnquiryBand";
import { Glyph } from "@/components/Glyph";
import { MaskLines } from "@/components/MaskLines";
import { Portrait } from "@/components/Portrait";
import { Section } from "@/components/Section";
import { getPractice, partnersFor, site } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { splitLines } from "@/lib/text";
import type { EmblemName } from "@/lib/emblems";

/** Which line drawing sits beside each practice area. */
const EMBLEM_FOR: Record<string, EmblemName> = {
  "property-real-estate": "portico",
  "land-revenue": "file",
  "banking-finance": "book",
  "corporate-commercial": "portico",
  "regulatory-compliance": "file",
  gst: "scales",
  "income-tax": "scales",
  "contracts-documentation": "book",
  "intellectual-property": "gavel",
  registrations: "file",
};

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;
export const generateStaticParams = () => site.practiceAreas.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const practice = getPractice((await params).slug);
  if (!practice) return {};
  return pageMeta({
    title: practice.seoTitle,
    description: `${practice.intro} The Law & Lawyers, advocates in Roorkee, District Haridwar, Uttarakhand.`,
    path: `/practice/${practice.slug}`,
  });
}

export default async function PracticeDetailPage({ params }: { params: Params }) {
  const practice = getPractice((await params).slug);
  if (!practice) notFound();

  const index = site.practiceAreas.findIndex((p) => p.slug === practice.slug);
  const prev = site.practiceAreas[index - 1];
  const next = site.practiceAreas[index + 1];
  const related = practice.related.map((s) => getPractice(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const partners = partnersFor(practice);
  const isFirm = practice.leads.includes("firm");
  const major = Number(practice.num);

  return (
    <>
      {/* HERO (night): numeral, title, intro, large glyph */}
      <section aria-labelledby="page-title" className="night border-y border-rule">
        <div className="wrap grid12 items-center gap-y-8 py-[clamp(56px,8vw,112px)]">
          <div className="col-span-12 lg:col-span-2">
            <p className="label label-brass">Practice area</p>
            <p
              aria-hidden="true"
              className="tnum mt-4 font-serif-italic italic leading-none tracking-[-0.04em] text-brass-ink"
              style={{ fontSize: "clamp(4.5rem, 9vw, 8rem)" }}
            >
              {practice.num}
            </p>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-4">
            <div className="text-brass-ink lg:hidden">
              <Glyph slug={practice.slug} size={56} />
            </div>
            <MaskLines tag="h1" id="page-title" lines={splitLines(practice.title, 24)} className="t-h1 mt-8 lg:mt-0" />
            <p className="t-pull mt-8 max-w-[44ch] text-ink-2">{practice.intro}</p>
            <p className="label label-2 mt-8">
              {practice.services.length} areas of work · {isFirm ? "Handled by the firm" : partners.map((p) => p.shortName).join(" · ")}
            </p>
          </div>
          <div className="hidden text-brass lg:col-span-3 lg:col-start-10 lg:block">
            <Glyph slug={practice.slug} size={190} />
          </div>
        </div>
      </section>

      {/* WHAT THIS COVERS + PARTNER PANEL */}
      <Section id="covers" num="A" label="What this covers" tone="paper-2">
        <div className="grid gap-x-16 gap-y-16 lg:grid-cols-[minmax(0,1fr)_280px]">
          <ol className="grid gap-x-10 md:grid-cols-2">
            {practice.services.map((service, i) => (
              <li key={service} className="grid grid-cols-[52px_minmax(0,1fr)] gap-x-3 border-t border-rule py-5">
                <span className="label label-brass tnum pt-1.5">
                  {major}.{i + 1}
                </span>
                <p className="t-body">{service}</p>
              </li>
            ))}
          </ol>

          <aside aria-labelledby="partners-heading" className="lg:pt-0">
            <h3 id="partners-heading" className="label label-brass border-t border-brass pt-3">
              {partners.length === 1 ? "Partner" : "Partners"}
            </h3>
            {isFirm && <p className="t-small ink-2 mt-3">Handled by the firm.</p>}
            <ul className="mt-5 space-y-5">
              {partners.map((p) => (
                <li key={p.slug}>
                  <Link href={`/partners/${p.slug}`} className="group flex items-center gap-4">
                    <span className="block w-16 shrink-0">
                      <Portrait partner={p} small sizes="64px" />
                    </span>
                    <span>
                      <span className="link block !py-0 font-serif text-xl leading-tight">{p.shortName}</span>
                      <span className="label label-2 mt-1 block">{p.designation}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 text-ink-2">
              <Emblem name={EMBLEM_FOR[practice.slug] ?? "scales"} size={200} className="mx-auto" />
            </div>
          </aside>
        </div>
      </Section>

      {/* RELATED */}
      {related.length > 0 && (
        <Section id="related" num="B" label="Related practice">
          <ul className="grid gap-x-10 md:grid-cols-2 xl:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug} className="border-t border-rule">
                <Link href={`/practice/${r.slug}`} className="flex items-start gap-5 py-5 hover:bg-paper-2">
                  <span className="mt-0.5 text-ink">
                    <Glyph slug={r.slug} size={28} />
                  </span>
                  <span>
                    <span className="label label-brass tnum block">{r.num}</span>
                    <span className="t-h3 mt-1 block !text-[1.25rem]">{r.title}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <EnquiryBand />

      {/* PREVIOUS / NEXT */}
      <nav aria-label="Practice areas" className="border-t border-rule">
        <div className="wrap grid md:grid-cols-2">
          {prev ? (
            <Link href={`/practice/${prev.slug}`} className="block py-10 hover:bg-paper-2 md:pr-8">
              <span className="label label-2 block">← Previous · {prev.num}</span>
              <span className="t-h3 mt-2 block">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/practice/${next.slug}`} className="block border-t border-rule py-10 hover:bg-paper-2 md:border-l md:border-t-0 md:pl-8 md:text-right">
              <span className="label label-2 block">Next · {next.num} →</span>
              <span className="t-h3 mt-2 block">{next.title}</span>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
