"use client";

import { useEffect } from "react";
import { sendGtagEvent } from "@/lib/analytics";

type Props = {
  googleAdsId: string;
  ga4Id: string;
  labels: { upworkClick: string; emailClick: string };
};

/**
 * One delegated listener for the whole site: any click on an Upwork link (hero, header,
 * footer, mobile menu, blog <HireMe />, reviews…) or a mailto: link counts as a lead.
 * Sends a Google Ads conversion (when a label is set) and a GA4 event (when GA4 is set).
 */
export function ConversionTracker({ googleAdsId, ga4Id, labels }: Props) {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;

      let lead: { label: string; event: string } | null = null;
      if (link.protocol === "mailto:") {
        lead = { label: labels.emailClick, event: "email_click" };
      } else if (/(^|\.)upwork\.com$/.test(link.hostname)) {
        lead = { label: labels.upworkClick, event: "hire_upwork_click" };
      }
      if (!lead) return;

      if (googleAdsId && lead.label) {
        sendGtagEvent("conversion", { send_to: `${googleAdsId}/${lead.label}` });
      }
      if (ga4Id) {
        // Which CTA converted: section id (e.g. "contact" = footer) or header/article.
        const area = link.closest("header, footer, section, article");
        sendGtagEvent(lead.event, {
          send_to: ga4Id,
          link_url: link.href,
          link_location: area?.id || area?.tagName.toLowerCase() || "page",
          page_path: location.pathname,
        });
      }
    }

    // auxclick catches middle-click "open in new tab".
    document.addEventListener("click", onClick);
    document.addEventListener("auxclick", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("auxclick", onClick);
    };
  }, [googleAdsId, ga4Id, labels.upworkClick, labels.emailClick]);

  return null;
}
