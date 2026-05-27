import { cn } from "@/lib/utils";

export function Avatar({ className, children, fallback }) {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-accent/30 items-center justify-center text-sm font-medium text-cta",
        className
      )}
    >
      {children || fallback}
    </div>
  );
}
