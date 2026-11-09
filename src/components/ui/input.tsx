import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helper?: string;
  error?: string;
  /** Optional icon rendered inside the left edge */
  leftIcon?: React.ReactNode;
  /** Optional icon rendered inside the right edge (e.g. password toggle) */
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, helper, error, id, leftIcon, rightIcon, ...props },
    ref,
  ) => {
    const inputId = id || React.useId();
    const descriptionId = error
      ? `${inputId}-error`
      : helper
        ? `${inputId}-helper`
        : undefined;

    return (
      <div className="w-full">
        {/* ── Label ─────────────────────────────────────── */}
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-text"
          >
            {label}
          </label>
        )}

        {/* ── Input wrapper (holds icons) ───────────────── */}
        <div className="relative">
          {leftIcon && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            >
              {leftIcon}
            </span>
          )}

          <input
            id={inputId}
            ref={ref}
            aria-invalid={!!error}
            aria-describedby={descriptionId}
            className={cn(
              /* base */
              "flex h-11 w-full rounded-xl border border-border bg-surface",
              "px-3.5 py-2 text-sm text-text shadow-sm transition-colors",
              "placeholder:text-muted",

              /* focus */
              "focus-visible:outline-none",
              "focus-visible:border-green-500",
              "focus-visible:ring-2 focus-visible:ring-green-500/30",

              /* disabled */
              "disabled:cursor-not-allowed disabled:bg-sunken disabled:opacity-50",

              /* browser autofill override */
              "autofill:bg-surface autofill:text-text",

              /* icon padding */
              leftIcon && "pl-10",
              rightIcon && "pr-10",

              /* error state */
              error &&
                "border-error focus-visible:border-error focus-visible:ring-error/30",

              className,
            )}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted">
              {rightIcon}
            </span>
          )}
        </div>

        {/* ── Helper / Error text ───────────────────────── */}
        {error ? (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="mt-1.5 text-xs text-error"
          >
            {error}
          </p>
        ) : helper ? (
          <p id={`${inputId}-helper`} className="mt-1.5 text-xs text-muted">
            {helper}
          </p>
        ) : null}
      </div>
    );
  },
);
Input.displayName = "Input";