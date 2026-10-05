import { cn } from "@/lib/utils";

type Props = { children: string; className?: string };

/**
 * Text that rolls up to a duplicate on hover/focus of the nearest `group`
 * ancestor. CSS-only; the duplicate is hidden from assistive tech.
 */
export function RollText({ children, className }: Props) {
  return (
    <span className={cn("relative inline-flex overflow-hidden", className)}>
      <span className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none"
      >
        {children}
      </span>
    </span>
  );
}
