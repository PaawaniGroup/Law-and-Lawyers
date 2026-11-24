import { LegalPage } from "@/components/LegalPage";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Disclaimer",
  description:
    "Disclaimer for the website of The Law & Lawyers: information only, not advertising or solicitation, in accordance with the rules of the Bar Council of India.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  const d = site.disclaimer;
  return (
    <LegalPage
      emblem="scales"
      eyebrow="Legal"
      title={d.title}
      intro={d.lead.replace('By clicking "I Agree", you confirm', "By using this website you confirm")}
      sections={[
        { heading: "What you confirm by using this website", paragraphs: [], list: d.points },
        { heading: "Bar Council of India", paragraphs: [d.footer] },
      ]}
    />
  );
}
