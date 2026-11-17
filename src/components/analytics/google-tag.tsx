import Script from "next/script";
import { siteConfig } from "@/config/site";
import { CONSENT_KEY } from "@/lib/analytics";

/**
 * Google tags with Consent Mode v2: gtag.js for Google Ads + GA4, and the Google Tag Manager
 * container. One inline script sets the consent defaults first, then loads GTM, so every tag
 * in the container sees them. Everything starts "denied" (cookieless pings only) unless the
 * visitor accepted earlier; `<ConsentBanner />` updates it. Render only when `analyticsEnabled`.
 *
 * GTM's <noscript> iframe is left out on purpose: it would fire tags with no consent check.
 */
export function GoogleTag() {
  const { googleAdsId, ga4Id, gtmId } = siteConfig.analytics;
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
${
  gtmId
    ? `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src="https://www.googletagmanager.com/gtm.js?id="+i;f.parentNode.insertBefore(j,f);})(window,document,"script","dataLayer",${JSON.stringify(gtmId)});`
    : ""
}
`;

  return (
    <>
      <Script id="gtag-init" strategy="afterInteractive">
        {init}
      </Script>
      {ids.length > 0 && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${ids[0]}`}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
