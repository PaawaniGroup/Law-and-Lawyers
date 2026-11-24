import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/firm",
    "/partners",
    ...site.partners.map((p) => `/partners/${p.slug}`),
    "/practice",
    ...site.practiceAreas.map((p) => `/practice/${p.slug}`),
    "/contact",
    "/disclaimer",
    "/privacy",
    "/terms",
  ];
  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
