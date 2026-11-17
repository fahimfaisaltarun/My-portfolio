"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";
import { readConsent, subscribeConsent } from "@/lib/analytics";

/**
 * X (Twitter) Pixel for X Ads. Unlike gtag.js and the Meta Pixel, uwt.js has no consent API,
 * so it isn't loaded at all until the visitor clicks Accept (also on later visits, while the
 * choice is stored). Rejecting later stops it from loading on the next page view.
 * The base code fires the pixel's page-view on load. Render only when `analyticsEnabled` is
 * true and `xPixelId` is set.
 */
export function XPixel({ pixelId }: { pixelId: string }) {
  // Server snapshot "pending" keeps it out of the HTML: nothing loads before hydration.
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => "pending" as const);
  if (consent !== "granted") return null;

  const init = `
!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
},s.version="1.1",s.queue=[],u=t.createElement(n),u.async=!0,u.src="https://static.ads-twitter.com/uwt.js",
a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,"script");
twq("config", ${JSON.stringify(pixelId)});
`;

  return (
    <Script id="x-pixel" strategy="afterInteractive">
      {init}
    </Script>
  );
}
