import Link from "next/link";
import { EnquiryBand } from "@/components/EnquiryBand";
import { HeroMap } from "@/components/HeroMap";
import { JsonLd } from "@/components/JsonLd";
import { MaskLines } from "@/components/MaskLines";
import { PartnerCard } from "@/components/PartnerCard";
import { PracticeIndex } from "@/components/PracticeIndex";
import { RevealRule, Wipe } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { site } from "@/content/site";
import { pageMeta, personJsonLd } from "@/lib/seo";
import { splitLines } from "@/lib/text";

export const metadata = {
  ...pageMeta({
  title: "Advocates in Roorkee",
  description:
    "A registered partnership of advocates in Roorkee, District Haridwar, advising on property, land and revenue, banking and finance, corporate, GST, income tax and regulatory matters since 2021.",
  path: "/",
  }),
  // The root title template does not apply to the page that shares its segment.
  title: { absolute: `Advocates in Roorkee | ${site.legalName}` },
};

export default function HomePage() {
  const { hero, firm } = site;
  return (
    <>
      {site.partners.map((p) => (
        <JsonLd key={p.slug} data={personJsonLd(p)} />
      ))}

      {/* HERO */}
      <section aria-labelledby="hero-heading" className="relative">
        <div className="wrap grid12 items-start gap-y-12 pb-16 pt-8 lg:pt-14">
          <div className="col-span-12 lg:col-span-7">
            <p className="label label-2">
              {hero.eyebrow}
            </p>
            <MaskLines tag="h1" id="hero-heading" lines={splitLines(hero.headline, 16)} className="t-display mt-8" />
            <p className="mt-10 max-w-[48ch] text-[1.1875rem] leading-[1.6] text-ink-2">
              {hero.subline}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
              <Link href="/contact" className="btn">
                <span className="btn-label">{site.cta.enquiry}</span>
                <span className="arr" aria-hidden="true" />
              </Link>
              <Link href="/practice" className="link">
                {site.cta.practice} <span className="a">→</span>
              </Link>
            </div>
          </div>
          <div className="col-span-12 mx-auto w-full max-w-[520px] lg:col-span-5 lg:max-w-none">
            <HeroMap />
          </div>
        </div>
        <div className="wrap">
          <div className="hair" />
          <p className="label label-2 tnum py-5">
            {site.constitution} · Reg. No. {site.registrationNo} · Est. {site.established}
          </p>
        </div>
      </section>

      {/* § 01 THE FIRM */}
      <Section id="firm" num="01" label="The Firm" tone="paper-2">
        <RevealRule />
        <p className="t-pull mt-8 max-w-[44ch] sm:max-w-[52ch] lg:max-w-[58ch]">{firm.intro}</p>
        <p className="mt-10">
          <Link href="/firm" className="link">
            {site.cta.moreFirm} <span className="a">→</span>
          </Link>
        </p>
      </Section>

      {/* § 02 PRACTICE */}
      <Section id="practice" num="02" label="Practice">
        <p className="t-h3 ink-2 mb-10 max-w-[40ch]">{site.practiceIntro}</p>
        <PracticeIndex />
      </Section>

      {/* § 03 WHOM WE ACT FOR */}
      <Section id="clients" num="03" label="Whom we act for" tone="paper-2" tight>
        <ul className="flex flex-wrap font-serif text-[clamp(1.0625rem,1.55vw,1.375rem)] leading-snug tracking-[-0.01em]">
          {site.whomWeActFor.map((who, i) => (
            <li key={who} className="whitespace-nowrap">
              {who}
              {i < site.whomWeActFor.length - 1 && (
                <span aria-hidden="true" className="mx-[0.55em] text-brass-ink">
                  ·
                </span>
              )}
              <span className="sr-only">, </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* § 04 HOW WE WORK */}
      <Section id="method" num="04" label="How we work">
        <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
          {site.howWeWork.map((step, i) => (
            <li key={step.num}>
              <RevealRule delay={i * 0.12} />
              <p className="label label-brass tnum mt-5">{step.num}</p>
              <h3 className="t-h3 mt-3">{step.title}</h3>
              <p className="t-small ink-2 mt-3 max-w-[32ch]">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* § 05 PARTNERS */}
      <Section id="partners" num="05" label="Partners" tone="paper-2">
        <div className="grid gap-x-12 gap-y-16 md:grid-cols-2">
          <PartnerCard partner={site.partners[0]} />
          <PartnerCard partner={site.partners[1]} className="md:mt-20" />
        </div>
        <p className="mt-16">
          <Link href="/partners" className="link">
            About the partners <span className="a">→</span>
          </Link>
        </p>
      </Section>

      {/* § 06 PRINCIPLES */}
      <Section id="principles" num="06" label="Principles">
        <Wipe>
          <ol className="ledger ledger-margin border-t border-rule lg:pl-14">
            {firm.principles.map((pr, i) => (
              <li
                key={pr.name}
                className="ledger-row grid items-center gap-x-6 gap-y-1 py-5 md:grid-cols-[56px_minmax(0,0.9fr)_minmax(0,1.6fr)] md:py-0"
              >
                <span className="label label-brass tnum">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h3">{pr.name}</h3>
                <p className="t-body ink-2">{pr.text.charAt(0).toUpperCase() + pr.text.slice(1)}</p>
              </li>
            ))}
          </ol>
        </Wipe>
      </Section>

      <EnquiryBand perf />
    </>
  );
}
