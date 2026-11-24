import Link from "next/link";
import { EnquiryBand } from "@/components/EnquiryBand";
import { Emblem } from "@/components/Emblem";
import { OfficePhoto } from "@/components/OfficePhoto";
import { PageHero } from "@/components/PageHero";
import { PracticeGrid } from "@/components/PracticeGrid";
import { RevealRule } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { photos, site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "The Firm",
  description:
    "The Law & Lawyers (Advocates and Solicitors), a registered partnership firm of advocates in Roorkee, District Haridwar, Uttarakhand. Vision, mission, principles and firm particulars.",
  path: "/firm",
});

export default function FirmPage() {
  const { firm } = site;
  return (
    <>
      <PageHero
        eyebrow="The Firm"
        title="A registered partnership of advocates in Roorkee."
        aside={<Emblem name="book" size={230} />}
      />

      <Section id="about" num="01" label="About" tone="paper-2">
        <p className="t-pull max-w-[58ch]">{firm.intro}</p>
        <p className="t-body ink-2 measure mt-10">{firm.second}</p>
        <p className="t-body measure mt-6">{firm.commitment}</p>
      </Section>

      <Section id="office" num="02" label="The office">
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-12">
          <OfficePhoto
            photo={photos.workstations}
            className="md:col-span-7"
            ratio="aspect-square"
            sizes="(min-width: 1024px) 55vw, 100vw"
            caption="Workstations"
          />
          <div className="grid gap-y-10 md:col-span-5 md:mt-16">
            <OfficePhoto photo={photos.corridor} ratio="aspect-[3/2]" sizes="(min-width: 1024px) 40vw, 100vw" caption="Entrance corridor" />
            <OfficePhoto photo={photos.desks} ratio="aspect-[3/2]" sizes="(min-width: 1024px) 40vw, 100vw" caption="Working floor" />
          </div>
        </div>
      </Section>

      <Section id="services" num="03" label="Services at a glance" tone="paper-2">
        <ul className="grid gap-x-12 md:grid-cols-2">
          {firm.servicesList.map((item, i) => (
            <li key={item} className="grid grid-cols-[48px_minmax(0,1fr)] gap-x-4 border-t border-rule py-4">
              <span className="label label-brass tnum pt-1.5">{String(i + 1).padStart(2, "0")}</span>
              <span className="t-body">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="vision-mission" num="04" label="Vision & Mission" tone="night">
        <div className="grid gap-x-16 gap-y-16 md:grid-cols-2">
          <div>
            <RevealRule />
            <h3 className="t-h1 mt-6">Vision</h3>
            <p className="t-body mt-6 max-w-[52ch] text-ink-2">{firm.vision}</p>
          </div>
          <div>
            <RevealRule delay={0.12} />
            <h3 className="t-h1 mt-6">Mission</h3>
            <p className="t-body mt-6 max-w-[52ch] text-ink-2">{firm.mission}</p>
          </div>
        </div>
      </Section>

      <Section id="principles" num="05" label="Principles">
        <div className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_230px]">
          <ol className="border-t border-rule">
            {firm.principles.map((pr, i) => (
              <li
                key={pr.name}
                className="grid items-baseline gap-x-6 gap-y-1 border-b border-rule py-6 md:grid-cols-[56px_minmax(0,0.9fr)_minmax(0,1.6fr)]"
              >
                <span className="label label-brass tnum">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h3">{pr.name}</h3>
                <p className="t-body ink-2">{pr.text.charAt(0).toUpperCase() + pr.text.slice(1)}</p>
              </li>
            ))}
          </ol>
          <Emblem name="scales" size={230} className="mx-auto hidden text-ink-2 lg:block" />
        </div>
      </Section>

      <div className="perf" aria-hidden="true" style={{ ["--perf-bg" as string]: "var(--paper)" }} />
      <Section id="particulars" num="06" label="Firm particulars" tone="paper-2">
        <table className="dl-table max-w-[760px]">
          <caption className="sr-only">Firm particulars</caption>
          <tbody>
            {firm.particulars.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="label">
                  {row.label}
                </th>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section id="areas" num="07" label="Practice areas">
        <PracticeGrid />
        <p className="mt-10">
          <Link href="/practice" className="link">
            {site.cta.practice} <span className="a">→</span>
          </Link>
        </p>
      </Section>

      <EnquiryBand />
    </>
  );
}
