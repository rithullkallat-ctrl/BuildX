import { cn } from "@/lib/utils";

export function Badge({ className, children, variant = "default" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-accent/20 text-cta": variant === "default",
          "border border-accent/20 text-gray-300": variant === "outline",
          "bg-cta text-bg": variant === "cta",
          "bg-green-500/20 text-green-400": variant === "success",
          "bg-yellow-500/20 text-yellow-400": variant === "warning",
          "bg-red-500/20 text-red-400": variant === "danger",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
