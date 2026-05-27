import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const Button = forwardRef(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-cta/50",
          "disabled:opacity-50 disabled:pointer-events-none",
          "active:scale-[0.98]",
          {
            "bg-cta text-bg hover:bg-cta-hover": variant === "primary",
            "bg-surface text-white border border-accent/20 hover:border-accent/40 hover:bg-surface/80":
              variant === "secondary",
            "text-gray-400 hover:text-white hover:bg-white/5":
              variant === "ghost",
            "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20":
              variant === "danger",
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-4 text-sm": size === "md",
            "h-12 px-6 text-base": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
