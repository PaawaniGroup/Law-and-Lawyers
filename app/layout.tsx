import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { DisclaimerGate } from "@/components/DisclaimerGate";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { SmoothScroll } from "@/components/SmoothScroll";
import { site } from "@/content/site";
import { legalServiceJsonLd, siteUrl } from "@/lib/seo";

// Display serif: Newsreader (SIL OFL, from Google Fonts), self-hosted. The variable font's optical-size
// axis (6–72) is kept; weight is fixed at 400 and the glyph set trimmed to Latin so each file is about
// 60KB instead of 130–150KB (see README, "Fonts"). Roman is preloaded because headlines need it; the
// italic is a separate family, fetched only where used (numerals, seal, initials).
const newsreader = localFont({
  src: [{ path: "./fonts/Newsreader-opsz.woff2", style: "normal", weight: "400" }],
  display: "block", // preloaded and small: headlines wait for it instead of reflowing when it arrives
  adjustFontFallback: "Times New Roman",
  variable: "--font-newsreader",
});
const newsreaderItalic = localFont({
  src: [{ path: "./fonts/Newsreader-Italic-opsz.woff2", style: "italic", weight: "400" }],
  display: "optional", // decorative uses only: never swaps in late
  preload: false,
  adjustFontFallback: "Times New Roman",
  variable: "--font-newsreader-italic",
});

// Body font: small and preloaded. "optional" means it never swaps in late (no reflow, no layout shift);
// if it is not ready within ~100ms the system fallback is used for that first view only.
const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "optional",
  variable: "--font-instrument",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
  variable: "--font-plex-mono",
});

const description =
  "The Law & Lawyers (Advocates and Solicitors) is a registered partnership firm of advocates in Roorkee, District Haridwar, Uttarakhand. Property, land and revenue, banking and finance, corporate, GST, income tax, intellectual property and statutory compliance.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `Advocates in Roorkee | ${site.name}`, template: `%s | ${site.name}` },
  description,
  applicationName: site.name,
  openGraph: {
    siteName: site.name,
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `Seal of ${site.legalName}, Roorkee` }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4EFE6" },
    { media: "(prefers-color-scheme: dark)", color: "#111412" },
  ],
  colorScheme: "light dark",
};

/** Runs before first paint: applies the saved/system theme and skips the gate flash if already accepted. */
const bootScript = `(function(){try{var d=document.documentElement,t=localStorage.getItem('ll-theme');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.dataset.theme=t;}catch(e){}try{if(sessionStorage.getItem('ll-disclaimer-accepted')==='1')document.documentElement.dataset.gate='ok'}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${newsreader.variable} ${newsreaderItalic.variable} ${instrument.variable} ${plexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <JsonLd data={legalServiceJsonLd} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div id="site-shell">
          <Header />
          <div id="site-shell-body">
            <main id="main" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
        </div>
        <DisclaimerGate />
        <SmoothScroll />
        <Analytics />
        <div className="grain" aria-hidden="true" />
        <noscript>
          <style>{`.gate{display:none!important}[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
