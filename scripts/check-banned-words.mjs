// Scans the rendered HTML (visible text, titles and meta descriptions) of every page for banned
// copy and Bar Council of India (Rule 36) red flags. Needs the site running: BASE=http://localhost:3000
// Run: npm run check:banned
const BASE = process.env.BASE ?? "http://localhost:3000";

const banned = [
  // §0.3 banned copy
  "welcome to", "trusted partner", "passionate", "unlock", "elevate", "seamless", "empower",
  "cutting-edge", "cutting edge", "one-stop", "one stop", "journey", "solutions tailored",
  // §0.1 superlatives and solicitation
  "best", "top", "leading", "no\\. ?1", "premier", "expert in", "expertise", "foremost", "renowned", "award",
  "testimonial", "success rate", "matters handled", "cases won", "free consultation", "hire us", "book now",
  "get started", "talk to a lawyer", "affordable", "cheap", "discount", "fee", "fees", "pricing", "price",
  "years of experience in", "guarantee",
];
const re = new RegExp(`(?<![\\w-])(${banned.join("|")})(?![\\w-])`, "gi");

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
paths.push("/this-page-does-not-exist");

const visible = (html) => {
  const meta = [...html.matchAll(/<(?:title|meta[^>]+(?:name="description"|property="og:(?:title|description)")[^>]*)>([^<]*)/g)].map((m) => m[1]);
  const metaContent = [...html.matchAll(/<meta[^>]+(?:name="description"|property="og:(?:title|description)")[^>]*content="([^"]*)"/g)].map((m) => m[1]);
  const body = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
  return [...meta, ...metaContent, body].join(" ");
};

let hits = 0;
for (const p of paths) {
  const res = await fetch(BASE + p);
  const text = visible(await res.text());
  const found = [...text.matchAll(re)].map((m) => m[0].toLowerCase());
  if (found.length) {
    hits += found.length;
    console.log(`FOUND  ${p}: ${[...new Set(found)].join(", ")}`);
  }
}
console.log(`\nScanned ${paths.length} pages for ${banned.length} banned terms: ${hits ? hits + " hit(s)" : "no banned words found"}.`);
process.exit(hits ? 1 : 0);
