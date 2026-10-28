import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/ui";
import { SITE_URL, site } from "@/content/site";
import { organizationLd, websiteLd } from "@/lib/seo";

const montserrat = Montserrat({ subsets: ["latin", "latin-ext"], weight: ["600", "700", "800"], variable: "--font-montserrat", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin", "latin-ext"], weight: ["300", "400"], style: ["normal", "italic"], variable: "--font-fraunces", display: "swap" });
const manrope = Manrope({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600", "700"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Kosmex Plywood — Film Faced, Furniture & Packing Plywood from Vietnam", template: "%s | Kosmex Plywood" },
  description: site.description,
  applicationName: "Kosmex Plywood",
  formatDetection: { telephone: false },
  icons: { icon: [{ url: "/favicon-kosmex.ico", sizes: "48x48" }, { url: "/kosmex-icon.svg", type: "image/svg+xml" }], shortcut: "/favicon-kosmex.ico", apple: "/apple-touch-icon-kosmex.png" },
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
  // Search Console / Bing Webmaster verification: add tokens when issued.
  // verification: { google: "…", other: { "msvalidate.01": "…" } },
};

export const viewport: Viewport = { themeColor: "#153a32", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" id="top" className={`${montserrat.variable} ${manrope.variable} ${fraunces.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-forest focus:px-4 focus:py-3 focus:text-white">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}
