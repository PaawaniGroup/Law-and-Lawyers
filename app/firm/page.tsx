import Link from "next/link";
import { EnquiryBand } from "@/components/EnquiryBand";
import { PageHero } from "@/components/PageHero";
import { RevealRule } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { site } from "@/content/site";
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
      <PageHero eyebrow="The Firm" title="A registered partnership of advocates in Roorkee." />

      <Section id="about" num="01" label="About" tone="paper-2">
        <p className="t-pull max-w-[58ch]">{firm.intro}</p>
        <p className="t-body ink-2 measure mt-10">{firm.second}</p>
      </Section>

      <Section id="vision-mission" num="02" label="Vision & Mission">
        <div className="grid gap-x-16 gap-y-16 md:grid-cols-2">
          <div>
            <RevealRule />
            <h3 className="t-h1 mt-6">Vision</h3>
            <p className="t-body mt-6 max-w-[52ch]">{firm.vision}</p>
          </div>
          <div>
            <RevealRule delay={0.12} />
            <h3 className="t-h1 mt-6">Mission</h3>
            <p className="t-body mt-6 max-w-[52ch]">{firm.mission}</p>
          </div>
        </div>
      </Section>

      <Section id="principles" num="03" label="Principles" tone="paper-2">
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
      </Section>

      <div className="perf" aria-hidden="true" style={{ ["--perf-bg" as string]: "var(--paper-2)" }} />
      <Section id="particulars" num="04" label="Firm particulars">
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

      <Section id="areas" num="05" label="Practice areas" tone="paper-2">
        <ul className="grid gap-x-12 md:grid-cols-2">
          {site.practiceAreas.map((p) => (
            <li key={p.slug} className="border-t border-rule">
              <Link href={`/practice/${p.slug}`} className="flex items-baseline gap-5 py-4 hover:bg-paper">
                <span className="label label-brass tnum w-8">{p.num}</span>
                <span className="t-h3 !text-[1.25rem]">{p.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <EnquiryBand />
    </>
  );
}
