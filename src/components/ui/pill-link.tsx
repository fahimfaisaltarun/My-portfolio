import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { RollText } from "./roll-text";

type Props = {
  href: string;
  children: string;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
};

const variants = {
  primary: "bg-accent text-accent-foreground hover:bg-accent-hover",
  outline: "border border-border-strong text-foreground hover:border-foreground",
} as const;

const sizes = {
  sm: "h-10 gap-2 pl-4 pr-1.5 text-small",
  md: "h-12 gap-3 pl-6 pr-2 text-body",
  lg: "h-14 gap-3 pl-7 pr-2 text-lead",
} as const;

const iconSizes = { sm: "size-7", md: "size-8", lg: "size-10" } as const;

/**
 * Pill-shaped call-to-action link with rolling label and arrow chip.
 * External URLs open in a new tab automatically.
 */
export function PillLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
}: Props) {
  const external = /^https?:\/\//.test(href);
  const classes = cn(
    "group inline-flex shrink-0 items-center rounded-full font-medium whitespace-nowrap transition-colors duration-300",
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      <RollText>{children}</RollText>
      <span
        aria-hidden
        className={cn(
          "grid place-items-center rounded-full transition-transform duration-500 ease-out-expo group-hover:rotate-45 motion-reduce:transition-none",
          variant === "primary"
            ? "bg-accent-foreground text-accent"
            : "bg-foreground text-background",
          iconSizes[size],
        )}
      >
        <ArrowUpRight className="size-[55%]" strokeWidth={2.25} />
      </span>
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {content}
    </Link>
  );
}
