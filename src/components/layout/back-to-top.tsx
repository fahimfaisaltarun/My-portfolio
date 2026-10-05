"use client";

import { ArrowUp } from "lucide-react";
import { scrollToTarget } from "@/components/providers/smooth-scroll";
import { RollText } from "@/components/ui/roll-text";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        scrollToTarget(0);
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      className="group inline-flex items-center gap-2 text-small text-muted transition-colors hover:text-foreground"
    >
      <RollText>Back to top</RollText>
      <ArrowUp
        aria-hidden
        className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5"
      />
    </button>
  );
}
