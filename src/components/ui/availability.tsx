import { profile } from "@/data";
import { cn } from "@/lib/utils";

/** Pulsing ember dot + availability line from profile data. */
export function Availability({ className }: { className?: string }) {
  if (!profile.availability) return null;
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-small text-muted", className)}>
      <span aria-hidden className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-accent" />
      </span>
      {profile.availability}
    </span>
  );
}
