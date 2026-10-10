import type { Metadata, Viewport } from "next";
import { analyticsEnabled, siteConfig } from "@/config/site";
import { fontVariables } from "@/lib/fonts";
import { agencyJsonLd, personJsonLd, professionalServiceJsonLd, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { ConsentBanner } from "@/components/analytics/consent-banner";
import { ConversionTracker } from "@/components/analytics/conversion-tracker";
import { GoogleTag } from "@/components/analytics/google-tag";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [...siteConfig.keywords],
  category: "portfolio",
  alternates: { canonical: "/" },
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle || undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  // TODO: add Search Console / Bing verification tokens after setting them up.
  // verification: { google: "", other: { "msvalidate.01": "" } },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" dir="ltr" className={fontVariables}>
      {/* Browser extensions (e.g. ColorZilla's cz-shortcut-listen) add attributes to <body>
          before React loads. This ignores mismatches on <body> itself only, not its children. */}
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:h-auto focus:w-auto focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <noscript>
          <style>{`.will-reveal{visibility:visible!important}`}</style>
        </noscript>
        <JsonLd
          data={[personJsonLd(), websiteJsonLd(), professionalServiceJsonLd(), agencyJsonLd()]}
        />
        <SmoothScroll>
          <SiteHeader />
          {children}
          <SiteFooter />
        </SmoothScroll>
        {analyticsEnabled && (
          <>
            <GoogleTag />
            <ConversionTracker
              googleAdsId={siteConfig.analytics.googleAdsId}
              ga4Id={siteConfig.analytics.ga4Id}
              labels={siteConfig.analytics.conversionLabels}
            />
            <ConsentBanner />
          </>
        )}
      </body>
    </html>
  );
}
