import { cn } from "@/lib/utils";

export function Switch({ checked, onCheckedChange, label, description }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        {label && <p className="text-sm font-medium text-white">{label}</p>}
        {description && <p className="text-xs text-gray-500 mt-0.5">{description}</p>}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
          checked ? "bg-cta" : "bg-accent/30"
        )}
      >
        <span
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}
