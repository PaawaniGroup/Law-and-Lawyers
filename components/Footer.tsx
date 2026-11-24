import Link from "next/link";
import { site } from "@/content/site";
import { MapCard } from "./MapCard";
import { Seal } from "./Seal";
import { ThemeToggle } from "./ThemeToggle";

export function Footer() {
  const { contact } = site;
  return (
    <footer className="section night !pb-10" aria-label="Site footer">
      <div className="wrap">
        <div className="grid12 gap-y-14">
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <Seal size={112} className="seal-spin text-evergreen" />
            <p className="mt-6 font-serif text-2xl leading-tight">{site.name}</p>
            <p className="label label-2 mt-2">{site.descriptor}</p>
            <nav aria-label="Footer" className="mt-8">
              <h2 className="label label-brass mb-3">The site</h2>
              <ul className="t-small grid grid-cols-2 gap-x-6 gap-y-1 lg:grid-cols-1">
                {[...site.nav, ...site.legalLinks].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link link-quiet">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-4 lg:col-start-4">
            <h2 className="label label-brass mb-4">Office address</h2>
            <address className="t-body not-italic">
              <span className="block font-serif text-xl">{site.legalName}</span>
              <span className="mt-3 block">
                {contact.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </span>
            </address>
            <dl className="t-small mt-8 border-t border-rule">
              <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-3 border-b border-rule py-3">
                <dt className="label label-2 pt-0.5">Telephone</dt>
                <dd>
                  <a href={contact.phoneHref} className="link tnum">
                    {contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-3 border-b border-rule py-3">
                <dt className="label label-2 pt-0.5">Email</dt>
                <dd>
                  <a href={`mailto:${contact.email}`} className="link break-all">
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-3 border-b border-rule py-3">
                <dt className="label label-2 pt-0.5">Office hours</dt>
                <dd>
                  <span className="placeholder">{contact.officeHours}</span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <h2 className="label label-brass mb-4">Location</h2>
            <MapCard />
          </div>
        </div>

        <div className="mt-16 border-t border-rule pt-8">
          <p className="label label-2 tnum">
            {site.constitution} · Reg. No. {site.registrationNo} · Est. {site.established}
          </p>
          <p className="t-small ink-2 measure mt-4">{site.disclaimer.footer}</p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <p className="label label-2">© {site.copyrightYear} {site.name}</p>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
