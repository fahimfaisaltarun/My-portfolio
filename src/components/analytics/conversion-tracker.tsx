"use client";

import { useEffect } from "react";
import { pushDataLayerEvent, sendGtagEvent, sendMetaEvent, sendXEvent } from "@/lib/analytics";

type Props = {
  googleAdsId: string;
  ga4Id: string;
  metaPixelId: string;
  labels: { upworkClick: string; emailClick: string; bookCallClick: string };
  /** X Pixel event IDs (`tw-…`); empty = skip. */
  xEvents: { upworkClick: string; emailClick: string; bookCallClick: string };
};

/**
 * One delegated listener for the whole site: any click on an Upwork link (hero, header,
 * footer, mobile menu, blog <HireMe />, reviews…), a Calendly link or a mailto: link counts
 * as a lead. (Contact form submissions are tracked by `<ContactForm />` on success.)
 * Sends a Google Ads conversion (when a label is set), a GA4 event (when GA4 is set), the same
 * event to the GTM dataLayer, a Meta standard event (when the pixel is set): Contact for
 * Upwork/email, Schedule for Calendly, and an X Pixel event (only fires after consent).
 */
export function ConversionTracker({ googleAdsId, ga4Id, metaPixelId, labels, xEvents }: Props) {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;

      type Lead = { label: string; event: string; metaEvent: string; xEvent: string };
      let lead: Lead | null = null;
      if (link.protocol === "mailto:") {
        lead = {
          label: labels.emailClick,
          event: "email_click",
          metaEvent: "Contact",
          xEvent: xEvents.emailClick,
        };
      } else if (/(^|\.)upwork\.com$/.test(link.hostname)) {
        lead = {
          label: labels.upworkClick,
          event: "hire_upwork_click",
          metaEvent: "Contact",
          xEvent: xEvents.upworkClick,
        };
      } else if (/(^|\.)calendly\.com$/.test(link.hostname)) {
        lead = {
          label: labels.bookCallClick,
          event: "book_call_click",
          metaEvent: "Schedule",
          xEvent: xEvents.bookCallClick,
        };
      }
      if (!lead) return;

      if (googleAdsId && lead.label) {
        sendGtagEvent("conversion", { send_to: `${googleAdsId}/${lead.label}` });
      }
      // Which CTA converted: section id (e.g. "contact" = footer) or header/article.
      const area = link.closest("header, footer, section, article");
      const params = {
        link_url: link.href,
        link_location: area?.id || area?.tagName.toLowerCase() || "page",
        page_path: location.pathname,
      };
      if (ga4Id) sendGtagEvent(lead.event, { send_to: ga4Id, ...params });
      pushDataLayerEvent(lead.event, params);
      if (metaPixelId) {
        sendMetaEvent(lead.metaEvent, { content_name: lead.event });
      }
      if (lead.xEvent) sendXEvent(lead.xEvent);
    }

    // auxclick catches middle-click "open in new tab".
    document.addEventListener("click", onClick);
    document.addEventListener("auxclick", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("auxclick", onClick);
    };
  }, [
    googleAdsId,
    ga4Id,
    metaPixelId,
    labels.upworkClick,
    labels.emailClick,
    labels.bookCallClick,
    xEvents.upworkClick,
    xEvents.emailClick,
    xEvents.bookCallClick,
  ]);

  return null;
}
