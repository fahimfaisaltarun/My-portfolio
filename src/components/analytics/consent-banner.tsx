"use client";

import { useSyncExternalStore } from "react";
import { consentCopy } from "@/data";
import { readConsent, subscribeConsent, writeConsent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const buttonClass =
  "inline-flex h-10 flex-1 items-center justify-center rounded-full px-5 text-small font-medium transition-colors duration-300 sm:flex-none";

/**
 * Cookie consent card (Consent Mode v2). Shows until the visitor picks Accept or Reject;
 * the footer's "Cookie settings" re-opens it. Both choices get equal weight (GDPR).
 */
export function ConsentBanner() {
  // Server snapshot "pending" keeps it out of the HTML, so there's no flash or hydration mismatch.
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => "pending" as const);
  if (consent !== null) return null;

  return (
    <section
      aria-labelledby="consent-title"
      className="fixed inset-x-4 bottom-4 z-40 max-w-md rounded-2xl border border-border bg-surface p-5 shadow-2xl transition-[opacity,translate] duration-500 ease-out-expo motion-reduce:transition-none sm:right-auto sm:bottom-6 sm:left-6 starting:translate-y-4 starting:opacity-0"
    >
      <h2 id="consent-title" className="text-body font-bold">
        {consentCopy.title}
      </h2>
      <p className="mt-2 text-small text-foreground/80">{consentCopy.body}</p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => writeConsent("granted")}
          className={cn(buttonClass, "bg-accent text-accent-foreground hover:bg-accent-hover")}
        >
          {consentCopy.accept}
        </button>
        <button
          type="button"
          onClick={() => writeConsent("denied")}
          className={cn(
            buttonClass,
            "border border-border-strong text-foreground hover:border-foreground",
          )}
        >
          {consentCopy.reject}
        </button>
      </div>
    </section>
  );
}
