import { LegalPage } from "@/components/LegalPage";
import { legal } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy notice",
  description:
    "How The Law & Lawyers handles personal data submitted through this website, written with the Digital Personal Data Protection Act, 2023 in mind.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const p = legal.privacy;
  return <LegalPage eyebrow="Legal" title={p.title} updated={p.updated} intro={p.intro} sections={p.sections} emblem="book" />;
}
