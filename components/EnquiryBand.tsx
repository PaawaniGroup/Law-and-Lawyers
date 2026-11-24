import Link from "next/link";
import { site } from "@/content/site";
import { splitLines } from "@/lib/text";
import { RevealLines } from "./Reveal";

/** Full-width evergreen contact band (home and practice pages). */
export function EnquiryBand({ perf = false }: { perf?: boolean }) {
  const { contact, enquiryBand } = site;
  return (
    <section className="band" aria-labelledby="band-heading">
      {perf && (
        <div
          aria-hidden="true"
          className="perf absolute left-0 right-0 top-0"
          style={{ ["--perf-bg" as string]: "var(--night)", marginBottom: 0 }}
        />
      )}
      <div className="wrap grid12 gap-y-14 py-[clamp(80px,10vw,150px)]">
        <div className="col-span-12 lg:col-span-7">
          <p className="label mb-8 opacity-90">Enquiries</p>
          <RevealLines lines={splitLines(enquiryBand.heading, 14)} tag="h2" id="band-heading" className="t-h1" />
          <p className="t-body mt-8 max-w-[52ch]">{enquiryBand.text}</p>
          <div className="mt-10">
            <Link href="/contact" className="btn btn-invert">
              <span className="btn-label">{site.cta.enquiry}</span>
              <span className="arr" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 lg:col-start-9 lg:pt-14">
          <div className="border-t border-[color-mix(in_srgb,var(--paper)_40%,transparent)] pt-5">
            <p className="label mb-3 opacity-90">Address</p>
            <address className="t-small not-italic">
              {contact.addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </div>
          <div className="mt-8 border-t border-[color-mix(in_srgb,var(--paper)_40%,transparent)] pt-5">
            <p className="label mb-3 opacity-90">Telephone and email</p>
            <p className="t-small">
              <a href={contact.phoneHref} className="link tnum">
                {contact.phoneDisplay}
              </a>
            </p>
            <p className="t-small mt-1">
              <a href={`mailto:${contact.email}`} className="link break-all">
                {contact.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
