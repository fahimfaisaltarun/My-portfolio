import Script from "next/script";
import { siteConfig } from "@/config/site";
import { CONSENT_KEY } from "@/lib/analytics";

/**
 * Meta (Facebook/Instagram) Pixel for Meta Ads. Consent starts revoked (nothing is sent,
 * no cookies) unless the visitor accepted earlier; `<ConsentBanner />` grants it.
 * fbevents.js also fires PageView on client-side navigations (history.pushState), so there
 * is no route listener here; adding one would double-count. Render only when
 * `analyticsEnabled` is true and `metaPixelId` is set.
 */
export function MetaPixel() {
  const { metaPixelId } = siteConfig.analytics;

  const init = `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,"script","https://connect.facebook.net/en_US/fbevents.js");
var c = "revoke";
try { if (localStorage.getItem(${JSON.stringify(CONSENT_KEY)}) === "granted") c = "grant"; } catch (e) {}
fbq("consent", c);
fbq("init", ${JSON.stringify(metaPixelId)});
fbq("track", "PageView");
`;

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {init}
    </Script>
  );
}
