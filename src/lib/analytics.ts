/**
 * Tracking helpers: consent state (Google Consent Mode v2 + Meta Pixel consent) and event sending.
 * The tags are loaded by `<GoogleTag />` (gtag.js + GTM) and `<MetaPixel />`; IDs live in
 * `siteConfig.analytics`.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export type Consent = "granted" | "denied";

/** localStorage key. The inline scripts in `<GoogleTag />` and `<MetaPixel />` read it too. */
export const CONSENT_KEY = "ff-consent";
const CHANGE_EVENT = "ff-consent-change";

/** Fallback when storage is blocked (private mode), so the banner can still be dismissed. */
let memoryConsent: Consent | null = null;

/** Consent Mode v2 signals for a single yes/no choice. */
export function consentSignals(consent: Consent) {
  return {
    ad_storage: consent,
    ad_user_data: consent,
    ad_personalization: consent,
    analytics_storage: consent,
  };
}

export function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return memoryConsent;
  }
}

/** Save the visitor's choice and tell the Google tag + Meta Pixel. `null` re-opens the banner. */
export function writeConsent(consent: Consent | null) {
  memoryConsent = consent;
  try {
    if (consent) localStorage.setItem(CONSENT_KEY, consent);
    else localStorage.removeItem(CONSENT_KEY);
  } catch {
    // Storage blocked: memoryConsent covers this page view.
  }
  if (consent) {
    window.gtag?.("consent", "update", consentSignals(consent));
    window.fbq?.("consent", consent === "granted" ? "grant" : "revoke");
    // GTM trigger for non-Google tags that should start only after the visitor accepts.
    pushDataLayerEvent("consent_update", { consent });
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** For `useSyncExternalStore`: fires on changes in this tab and in other tabs. */
export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Send a gtag event. No-op when the tag isn't loaded (dev, previews, missing IDs). */
export function sendGtagEvent(name: string, params: Record<string, unknown>) {
  window.gtag?.("event", name, params);
}

/**
 * Push a Google Tag Manager event (`{ event, ...params }`), usable as a "Custom Event" trigger
 * in GTM. No-op when no Google tag is loaded.
 */
export function pushDataLayerEvent(name: string, params: Record<string, unknown> = {}) {
  window.dataLayer?.push({ event: name, ...params });
}

/**
 * Send a Meta Pixel standard event (Lead, Contact, Schedule…). No-op when the pixel isn't
 * loaded. While consent is revoked the pixel holds events and sends nothing.
 */
export function sendMetaEvent(name: string, params?: Record<string, unknown>) {
  window.fbq?.("track", name, params);
}
