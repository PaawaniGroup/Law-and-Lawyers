import { LegalPage } from "@/components/LegalPage";
import { legal } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms of use",
  description: "Terms of use for the website of The Law & Lawyers, advocates in Roorkee, Uttarakhand.",
  path: "/terms",
});

export default function TermsPage() {
  const t = legal.terms;
  return <LegalPage eyebrow="Legal" title={t.title} updated={t.updated} intro={t.intro} sections={t.sections} />;
}
