# The Law & Lawyers (Advocates and Solicitors), Roorkee

Website for the firm. Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis.
Designed as "The Registry": the visual language of Indian legal paper (ledgers, stamp paper, revenue
maps, red tape), typographic and calm.

> **Bar Council of India, Rule 36.** This is an informational site, not a marketing site. Before adding
> anything, read [Compliance rules](#compliance-rules-bci-rule-36).

---

## 1. Setup

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local     # then fill in the values (section 2)
npm run dev                    # http://localhost:3000
```

```bash
npm run build && npm run start # production build, served locally
npm run typecheck
npm run lint
```

Deploy on Vercel: import the repository, add the environment variables from section 2, deploy. No other
configuration is needed.

## 2. Environment variables

| Variable | Needed | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes (production) | Canonical URLs, sitemap, Open Graph. Defaults to `https://lawandlawyers.in`. **Confirm the live domain.** |
| `RESEND_API_KEY` | yes | Sends enquiries by email through Resend. |
| `RESEND_FROM` | yes | Sender, e.g. `The Law & Lawyers <enquiries@lawandlawyers.in>`. The domain must be verified in Resend. |
| `CONTACT_TO` | no | Recipient. Defaults to `advocate@lawandlawyers.in`. |
| `FORMSPREE_ENDPOINT` | recommended | Fallback. Used if Resend fails or is not configured. Full endpoint URL. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | no | Enables Plausible analytics. It loads only **after** the visitor accepts the disclaimer. |

How the enquiry form behaves:

- It validates on the server with Zod, has a hidden honeypot field, and limits each IP to 5 enquiries per 15 minutes.
- In production, if neither Resend nor Formspree is configured (or both fail), the visitor sees an honest
  "could not be sent, please telephone…" message. It never reports a false success.
- In development with no provider configured, the enquiry is logged to the terminal and the success state is shown, so the flow can be tested.
- The rate limiter is in memory. On serverless hosting each instance has its own counter, so it blunts casual abuse only. For a hard limit, back it with a shared store such as Upstash Redis.

## 3. Editing the copy: `content/site.ts`

**All text lives in `content/site.ts`.** Edit it without touching any component. It contains the hero
text, firm description, vision, mission, principles, "how we work", partners, the ten practice areas, contact
details, disclaimer text, form text, and the Privacy and Terms copy.

- **Practice areas** are an array; each has a `slug`, `intro`, `services`, `leads` (partner slugs or `"firm"`), `related` (cross-links) and `seoTitle`. The ten pages at `/practice/[slug]`, the home index, the sitemap and the previous/next navigation are all generated from it. Add, remove or reorder entries there. (A new practice area also needs a glyph with the same key in `lib/glyphs.ts`.)
- **Partners**: edit the entries in `partners`. The profile pages, home cards, JSON-LD and "Practice pages" lists are generated.
- **Headline**: the firm's two alternative headlines are stored in `hero.headlineAlternatives`. Copy one into `hero.headline` to switch.
- **Photographs**: add a `photo` to a partner:

  ```ts
  photo: { src: "/photos/monika-bhandari.jpg", width: 1200, height: 1500, alt: "Advocate Monika Bhandari" }
  ```

  Put the file in `public/photos/`. Use 4:5 portraits. Direction: natural window light, muted warm grade, plain plaster wall or bookshelves, relaxed pose. Real photographs only. Until supplied, a designed placeholder (initials on paper) is shown.

### Placeholders still to confirm

Anything in square brackets is deliberately visible so nothing is invented:

| Placeholder | Where |
|---|---|
| `[Confirm office hours]` | `contact.officeHours` |
| `[Confirm year]` (Mayank Pal, "Practising since") | `partners[1].practisingSince` |
| `[Confirm effective date]` | Privacy notice and Terms (`legal.*.updated`) |
| `[Confirm retention period…]`, `[Confirm the name of the person who will receive grievances.]`, `[Confirm the hosting and email regions in use.]` | Privacy notice |
| `[Confirm the courts that will have jurisdiction.]` | Terms |

**The Privacy notice and Terms of use were drafted for this site with the DPDP Act, 2023 in mind. They are not part of the supplied copy. The firm's counsel should review both before launch.**

## 4. Compliance rules (BCI Rule 36)

The site is built to be informational only. Do not add any of the following (the brief forbids them):
testimonials, client names or logos, case results, success rates, "matters handled" counters, awards, fees
or pricing, "free consultation", comparisons with other firms, superlatives (best, top, leading, No. 1,
premier, expert in), "Hire us / Book now / Get started" calls to action, chat bots, exit-intent popups or lead-capture overlays.

What is built in:

- **Entry disclaimer modal** (`components/DisclaimerGate.tsx`): blocks the page until "I Agree"; acceptance is remembered **for the session only** (`sessionStorage`); focus is trapped; the page behind is `inert`; Escape does not dismiss it; "Exit" opens a blank page. It is rendered on the server, so there is no flash of unguarded content, and a one-line script in `<head>` hides it immediately for visitors who already accepted this session.
- A short disclaimer in the footer of every page, and a full `/disclaimer` page.
- Plausible analytics loads only after acceptance. No other third-party trackers. The map loads only on click.

`npm run check:banned` scans every rendered page for banned words and BCI red flags.

## 5. Design system

**Colour tokens** are CSS variables in `app/globals.css` (`:root` for light, `@media (prefers-color-scheme: dark)` and `[data-theme="dark"]` for dark) and are mapped into Tailwind (`bg-paper`, `text-ink-2`, …). The footer toggle sets `[data-theme]`; a tiny script in `<head>` applies the saved or system theme before first paint.

> One deliberate addition: **`--brass-ink`**. The brief's brass (`#A88A55`) is only about 2.9:1 on the paper colour, which fails WCAG AA for text. `--brass` is used for hairlines and decoration only; all brass-coloured *text* uses `--brass-ink` (a darker tone of the same hue in light mode, identical in dark mode).

**Typography**
- Headings: Newsreader (with its optical-size axis; italic for emphasis). Body: Instrument Sans. Labels and numerals: IBM Plex Mono.
- Fluid scale with `clamp()` is in `globals.css` (`.t-display`, `.t-h1`, `.t-h2`, …).
- Optional Hindi version (Tiro Devanagari Hindi / Noto Sans Devanagari) is **not built**; the brief marks it optional.

**Fonts.** Instrument Sans and IBM Plex Mono use `next/font/google` (self-hosted at build time). **Newsreader is self-hosted from `app/fonts/` rather than loaded through `next/font/google`.** These are Google Fonts' own variable files (SIL Open Font License, included as `OFL-Newsreader.txt`), instanced at weight 400 and trimmed to Latin with fontTools. The optical-size axis (6 to 72) is kept. This cuts each file from about 130–150 KB to about 60 KB, which matters for load speed on mobile networks. To go back to the Google loader, replace the two `localFont` calls in `app/layout.tsx` with `Newsreader({ axes: ["opsz"], style: ["normal","italic"], … })`.

**Motion.** Slow (900ms, `cubic-bezier(.2,.7,.1,1)`); at most one entrance effect per section. Hero headline and drawing are pure CSS (they never wait for JavaScript). Scroll reveals (hairline draw, line-by-line mask, clip-path wipe) use Framer Motion's `inView` and `animate`. Lenis smooth scrolling starts only when the visitor has not asked for reduced motion. Under `prefers-reduced-motion` every animation is switched off in CSS and everything appears in its final state.

**Dark panels ("night").** `.night` (in `globals.css`) re-maps the colour tokens for everything inside it, so any section or block can go near-black with no component changes: pass `tone="night"` to `Section`, or add the class to a wrapper. Used for the hero map panel, "Whom we act for", "Principles", practice-page heroes, "Vision & Mission" and the footer. `npm run check:contrast` covers these pairs too.

**Law-themed line drawings** (`lib/emblems.ts`, `components/Emblem.tsx`): scales, court portico, open law book, a file tied with red tape, gavel. Same 1.25px monoline as the practice glyphs. The State Emblem of India and the Ashoka Chakra are deliberately **not** used (restricted by the State Emblem of India (Prohibition of Improper Use) Act, 2005). Note: the original brief banned gavel and scales clip art; these are custom line drawings added at the firm's request.

**Photographs.** Office photos supplied by the firm are in `public/photos/` (resized to 2000-2400px, all EXIF and GPS data stripped) and declared in the `photos` export of `content/site.ts`; they are served as AVIF/WebP by `next/image`. A photo of a client meeting was left out on purpose (confidentiality). Real portraits of the partners are still needed (see "Photographs" above).

**Graphics** (all custom SVG, no stock imagery):

| Asset | Where |
|---|---|
| Hero survey drawing | `lib/hero-map-data.ts` (generated), `components/HeroMap.tsx`, `public/svg/hero-map.svg` |
| Firm seal | `components/Seal.tsx`, `public/svg/seal.svg`, `app/icon.svg` (favicon), `public/og.png` (Open Graph), `app/apple-icon.png` |
| Ten practice glyphs | `lib/glyphs.ts`, `components/Glyph.tsx`, `public/svg/glyphs/*.svg` |
| Paper grain | `public/textures/grain.svg` |

```bash
node scripts/gen-hero-map.mjs   # regenerate the survey drawing data (deterministic; edit the seed to change it)
npm run build:svgs              # re-export the standalone SVG files
npm run build:og                # re-render og.png and apple-icon.png (needs Google Chrome installed)
```

The seal rotates (90s per turn) in the footer only. The perforated stamp-paper edge appears twice: above the home page contact band and on the Firm page.

## 6. Quality checks

```bash
npm run check:contrast          # WCAG contrast for every text/background pair, both themes (reads tokens from globals.css)
npm run build && npm run start  # then, in another terminal:
BASE=http://localhost:3000 npm run check:banned
BASE=http://localhost:3000 npm run qa   # disclaimer modal, keyboard, form, reduced motion, 5 widths, mobile menu, header
```

`npm run qa` needs Google Chrome installed (it drives it with `playwright-core`; nothing is downloaded). To also exercise the form's success path, start a second server with a (mock) `FORMSPREE_ENDPOINT` and pass `SEND_BASE`.

Lighthouse: run it against a production build (`npm run build && npm run start`), not `npm run dev`.

## 7. Structure

```
app/                 routes (/, /firm, /partners[/slug], /practice[/slug], /contact, /disclaimer, /privacy, /terms, 404), sitemap, robots
app/contact/actions.ts   enquiry server action (Zod, honeypot, rate limit, Resend, Formspree fallback)
app/fonts/           self-hosted Newsreader subset (+ licence)
components/          header, footer, disclaimer gate, reveal effects, seal, glyphs, hero map, form, map card, …
content/site.ts      ALL COPY
lib/                 SEO + JSON-LD, enquiry schema, glyph paths, hero-map data, text helpers
public/              svg/, textures/, og.png
scripts/             asset generators and the QA scripts above
```

SEO: per-page title, description and canonical URL; `sitemap.xml`; `robots.txt`; JSON-LD `LegalService` (address, phone, email, areaServed Roorkee / Haridwar / Uttarakhand) on every page and `Person` for each partner. No opening hours, prices, ratings or reviews are marked up.
