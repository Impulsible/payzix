"use client";

import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div
      id="payzix-toast-root"
      className="pointer-events-none fixed inset-0 z-700 flex flex-col items-center justify-start p-4 sm:p-6"
    >
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant = "default",
        open,
        onOpenChange,
      }) {
        if (!open) return null;

        const variantClasses: Record<string, string> = {
          default: "border-slate-800 bg-slate-900 text-slate-50 shadow-2xl shadow-black/60",
          success: "border-emerald-500/80 bg-slate-900 text-white shadow-2xl shadow-emerald-950/60",
          error: "border-red-500/80 bg-slate-900 text-white shadow-2xl shadow-red-950/60",
          info: "border-cyan-500/80 bg-slate-900 text-white shadow-2xl shadow-cyan-950/60",
        };

        const renderIcon = () => {
          if (variant === "success") return <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />;
          if (variant === "error") return <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />;
          if (variant === "info") return <Info className="h-5 w-5 shrink-0 text-cyan-400" />;
          return <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />;
        };

        return (
          <div
            key={id}
            className={`pointer-events-auto mb-3 flex w-full max-w-sm items-start justify-between gap-3 rounded-2xl border p-4 shadow-2xl transition-all animate-slide-down ${variantClasses[variant] ?? variantClasses.default}`}
          >
            <div className="flex items-start gap-3 min-w-0">
              {renderIcon()}
              <div className="flex min-w-0 flex-col gap-1">
                {title && (
                  <p className="text-sm font-semibold tracking-tight text-white">{title}</p>
                )}
                {description && (
                  <p className="text-xs leading-relaxed text-slate-300">{description}</p>
                )}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {action}
              <button
                onClick={() => onOpenChange(false)}
                className="rounded-lg p-1 text-slate-400 opacity-70 transition-opacity hover:bg-slate-800 hover:opacity-100 hover:text-white"
                aria-label="Dismiss"
              >
                <svg
                  className="size-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}