import Link from "next/link";
import { profile } from "@/data";
import { cn } from "@/lib/utils";

type Props = { className?: string; onClick?: () => void };

/** Wordmark: short name + ember dot. Links home. */
export function Logo({ className, onClick }: Props) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${profile.fullName} — home`}
      className={cn(
        "group inline-flex items-end gap-1 text-xl font-extrabold tracking-tight",
        className,
      )}
    >
      <span>{profile.shortName}</span>
      <span
        aria-hidden
        className="mb-[0.3em] size-2 rounded-full bg-accent transition-transform duration-500 ease-out-expo group-hover:scale-150 motion-reduce:transition-none"
      />
    </Link>
  );
}
