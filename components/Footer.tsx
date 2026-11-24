import Link from "next/link";
import { site } from "@/content/site";
import { Seal } from "./Seal";
import { ThemeToggle } from "./ThemeToggle";

export function Footer() {
  const { contact } = site;
  return (
    <footer className="section tone-2 !pb-10" aria-label="Site footer">
      <div className="wrap">
        <div className="grid12 gap-y-12">
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <Seal size={112} className="seal-spin text-evergreen" />
            <p className="mt-6 font-serif text-2xl leading-tight">{site.name}</p>
            <p className="label label-2 mt-2">{site.descriptor}</p>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <h2 className="label label-brass mb-4">Address</h2>
            <address className="t-small not-italic">
              {contact.addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <h2 className="label label-brass mb-4">Telephone and email</h2>
            <p className="t-small">
              <a href={contact.phoneHref} className="link tnum">
                {contact.phoneDisplay}
              </a>
            </p>
            <p className="t-small mt-2">
              <a href={`mailto:${contact.email}`} className="link break-all">
                {contact.email}
              </a>
            </p>
          </div>

          <nav className="col-span-12 md:col-span-6 lg:col-span-3" aria-label="Footer">
            <h2 className="label label-brass mb-4">The site</h2>
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
