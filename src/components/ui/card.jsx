import { cn } from "@/lib/utils";

export function Card({ className, children }) {
  return (
    <div
      className={cn(
        "bg-surface rounded-xl border border-accent/10 overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
