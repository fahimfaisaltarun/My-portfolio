/**
 * Google tag helpers: Consent Mode v2 state + event sending.
 * The tag itself is loaded by `<GoogleTag />`; IDs live in `siteConfig.analytics`.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export type Consent = "granted" | "denied";

/** localStorage key. `<GoogleTag />`'s inline script reads it too, so keep the two in sync. */
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

/** Save the visitor's choice and tell the Google tag. `null` re-opens the banner. */
export function writeConsent(consent: Consent | null) {
  memoryConsent = consent;
  try {
    if (consent) localStorage.setItem(CONSENT_KEY, consent);
    else localStorage.removeItem(CONSENT_KEY);
  } catch {
    // Storage blocked: memoryConsent covers this page view.
  }
  if (consent) window.gtag?.("consent", "update", consentSignals(consent));
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
