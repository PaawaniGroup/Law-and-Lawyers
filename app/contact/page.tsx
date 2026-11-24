import { ContactForm } from "@/components/ContactForm";
import { MapCard } from "@/components/MapCard";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Address, telephone and email of The Law & Lawyers, advocates in Roorkee, District Haridwar, Uttarakhand, and an enquiry form.",
  path: "/contact",
});

export default function ContactPage() {
  const { contact } = site;
  return (
    <>
      <PageHero eyebrow="Contact" title="Contact the firm." lead={site.contactIntro} />
      <Section id="details" num="01" label="Details & enquiry" tone="paper-2">
        <div className="grid gap-x-16 gap-y-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          <div>
            <h3 className="label label-brass border-t border-brass pt-3">Office</h3>
            <address className="t-body mt-4 not-italic">
              {site.legalName}
              <br />
              {contact.addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>

            <dl className="mt-10 border-t border-rule">
              <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-4 border-b border-rule py-4">
                <dt className="label label-2 pt-1">Telephone</dt>
                <dd>
                  <a href={contact.phoneHref} className="link tnum">
                    {contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-4 border-b border-rule py-4">
                <dt className="label label-2 pt-1">Email</dt>
                <dd>
                  <a href={`mailto:${contact.email}`} className="link break-all">
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-4 border-b border-rule py-4">
                <dt className="label label-2 pt-1">Office hours</dt>
                <dd>
                  <span className="placeholder">{contact.officeHours}</span>
                </dd>
              </div>
            </dl>

            <div className="mt-12">
              <MapCard />
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
