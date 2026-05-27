import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const Textarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[80px] w-full rounded-lg border border-accent/20 bg-bg px-3 py-2 text-sm text-white placeholder:text-gray-500",
        "focus:outline-none focus:ring-2 focus:ring-cta/30 focus:border-cta/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-colors resize-y",
        className
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
