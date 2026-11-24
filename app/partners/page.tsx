import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Emblem } from "@/components/Emblem";
import { PageHero } from "@/components/PageHero";
import { PartnerCard } from "@/components/PartnerCard";
import { Section } from "@/components/Section";
import { site } from "@/content/site";
import { pageMeta, personJsonLd } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Partners",
  description:
    "Advocate Monika Bhandari and Advocate Mayank Pal lead The Law & Lawyers, advocates in Roorkee, District Haridwar: corporate, tax, property, land and revenue, banking and finance, and statutory compliance.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      {site.partners.map((p) => (
        <JsonLd key={p.slug} data={personJsonLd(p)} />
      ))}
      <PageHero eyebrow="Partners" title="Two partners, working collaboratively." lead={site.partnersIntro} aside={<Emblem name="file" size={230} />} />
      <Section id="profiles" num="01" label="Profiles" tone="paper-2">
        <div className="grid gap-x-12 gap-y-16 md:grid-cols-2">
          <PartnerCard partner={site.partners[0]} />
          <PartnerCard partner={site.partners[1]} className="md:mt-20" />
        </div>
        <p className="mt-20">
          <Link href="/contact" className="link">
            {site.cta.contactFirm} <span className="a">→</span>
          </Link>
        </p>
      </Section>
    </>
  );
}
