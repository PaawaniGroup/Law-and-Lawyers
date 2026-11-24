import { EnquiryBand } from "@/components/EnquiryBand";
import { PageHero } from "@/components/PageHero";
import { PracticeIndex } from "@/components/PracticeIndex";
import { Section } from "@/components/Section";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Practice areas",
  description:
    "Property title verification, RERA, land and revenue, banking and finance documentation, corporate and commercial law, GST, income tax, contracts, trademarks and registrations. Advocates in Roorkee, Haridwar and Uttarakhand.",
  path: "/practice",
});

export default function PracticePage() {
  return (
    <>
      <PageHero eyebrow="Practice" title="Ten areas of practice." lead={site.practiceIntro} />
      <Section id="index" num="01" label="Index">
        <PracticeIndex idPrefix="px" />
      </Section>
      <EnquiryBand />
    </>
  );
}
