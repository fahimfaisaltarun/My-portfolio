import Script from "next/script";
import { siteConfig } from "@/config/site";
import { CONSENT_KEY } from "@/lib/analytics";

/**
 * Google tag (gtag.js) for Google Ads + GA4 with Consent Mode v2.
 * Everything starts "denied" (cookieless pings only) unless the visitor accepted earlier;
 * `<ConsentBanner />` updates it. Render only when `analyticsEnabled` is true.
 */
export function GoogleTag() {
  const { googleAdsId, ga4Id } = siteConfig.analytics;
  const ids = [googleAdsId, ga4Id].filter(Boolean);

  const init = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
var c = "denied";
try { if (localStorage.getItem(${JSON.stringify(CONSENT_KEY)}) === "granted") c = "granted"; } catch (e) {}
gtag("consent", "default", { ad_storage: c, ad_user_data: c, ad_personalization: c, analytics_storage: c, wait_for_update: 500 });
gtag("set", "ads_data_redaction", true);
gtag("js", new Date());
${ids.map((id) => `gtag("config", ${JSON.stringify(id)});`).join("\n")}
`;

  return (
    <>
      <Script id="gtag-init" strategy="afterInteractive">
        {init}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ids[0]}`}
        strategy="afterInteractive"
      />
    </>
  );
}
