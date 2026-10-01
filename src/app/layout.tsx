import type { Metadata, Viewport } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Poppins, IBM_Plex_Serif } from "next/font/google";
import { RevealController } from "@/components/reveal-controller";
import { SiteHeader } from "@/components/site-header";
import { brand, colors } from "@/lib/brand";
import "./globals.css";

/*
  Neither Poppins nor IBM Plex Serif is offered as a variable font, so weights
  are declared explicitly. Keep these lists tight, every weight is a separate
  self-hosted file.

  Poppins: 200 ExtraLight, 300 Light (body), 400 Regular (body alt), 500 Medium,
  600 SemiBold (headings), 700 Bold (emphasis).
  IBM Plex Serif: 400 italic (heading accent), 700 (eyebrows/section headers).
*/
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

const plexSerif = IBM_Plex_Serif({
  variable: "--font-plex-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} | ${brand.tagline}`,
    template: `%s | ${brand.shortName}`,
  },
  description:
    "Arrowleaf is a strategic growth partner for established businesses at pivotal moments: brands you're proud of, and marketing engines that deliver results.",
  applicationName: brand.name,
  openGraph: {
    type: "website",
    siteName: brand.name,
    locale: "en_US",
    url: brand.url,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // `themeColor` belongs on the viewport export as of Next 14, it is
  // deprecated on the metadata object.
  themeColor: colors.secondary.black,
  colorScheme: "light",
};

/*
  Marks the document for reveal animations before first paint, so blocks
  that will animate in are hidden from the start instead of flashing. Skipped
  under reduced motion. If the controller never starts (a script error), the
  mark comes off after 4s and everything shows.
*/
/*
  Google Tag Manager, via Next's own integration (@next/third-parties): the
  container script loads after hydration so it never blocks the first paint.
  Only rendered when NEXT_PUBLIC_GTM_ID is set, so set it for Production in
  Vercel and leave it unset locally and on previews to keep test traffic out
  of the analytics. The ID isn't a secret (it's in every page's source); the
  variable is just the on/off switch per environment.

  GA4 (configured inside GTM) records page views on client-side navigation
  through its "page changes based on browser history events" setting, which
  is on by default, so no extra routing hook is needed here.
*/
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

const revealScript = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches){var d=document.documentElement;d.setAttribute("data-reveals","");setTimeout(function(){if(!d.hasAttribute("data-reveal-live"))d.removeAttribute("data-reveals")},4000)}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${plexSerif.variable} h-full antialiased`}
      // The reveal script adds attributes to <html> before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body className="min-h-full flex flex-col">
        <RevealController />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
