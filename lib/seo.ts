import type { Metadata } from "next";
import { site, type Partner } from "@/content/site";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://lawandlawyers.in").replace(/\/$/, "");

export const absoluteUrl = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
}

/** Per-page title, description and canonical URL. The root layout supplies the title template. */
export function pageMeta({ title, description, path }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: { title: `${title} | ${site.name}`, description, url: absoluteUrl(path), type: "website" },
  };
}

const areaServed = ["Roorkee", "Haridwar", "Uttarakhand"];

/** LegalService: address, phone, email, area served. No hours, prices or ratings. */
export const legalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": `${siteUrl}/#firm`,
  name: site.legalName,
  alternateName: site.name,
  url: siteUrl,
  telephone: "+917302983391",
  email: site.contact.email,
  foundingDate: site.established,
  address: {
    "@type": "PostalAddress",
    streetAddress: "House No. 1380, Ganga Enclave",
    addressLocality: "Roorkee",
    addressRegion: "Uttarakhand",
    postalCode: "247667",
    addressCountry: "IN",
  },
  areaServed: areaServed.map((name) => ({ "@type": name === "Uttarakhand" ? "State" : "City", name })),
  knowsAbout: site.practiceAreas.map((p) => p.title),
};

export const personJsonLd = (p: Partner) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/partners/${p.slug}#person`,
  name: `${p.name}`,
  honorificPrefix: "Advocate",
  jobTitle: `${p.title}, ${p.designation}`,
  url: absoluteUrl(`/partners/${p.slug}`),
  worksFor: { "@id": `${siteUrl}/#firm` },
  knowsAbout: p.coreAreas,
});
