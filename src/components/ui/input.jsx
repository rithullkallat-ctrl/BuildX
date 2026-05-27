import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const Input = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-lg border border-accent/20 bg-bg px-3 py-2 text-sm text-white placeholder:text-gray-500",
        "focus:outline-none focus:ring-2 focus:ring-cta/30 focus:border-cta/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-colors",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";
