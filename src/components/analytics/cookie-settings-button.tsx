"use client";

import { consentCopy } from "@/data";
import { writeConsent } from "@/lib/analytics";
import { RollText } from "@/components/ui/roll-text";

/** Footer link that re-opens the cookie banner so visitors can change their choice. */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => writeConsent(null)}
      className="group inline-flex items-center transition-colors hover:text-foreground"
    >
      <RollText>{consentCopy.settings}</RollText>
    </button>
  );
}
