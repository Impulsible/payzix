"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ── Variant styles ────────────────────────────────────── */
const alertVariants = cva(
  "relative flex w-full gap-3 rounded-xl border p-4 text-sm",
  {
    variants: {
      variant: {
        default: "border-border bg-surface",
        success: "border-success/30 bg-success/5",
        error: "border-error/30 bg-error/5",
        warning: "border-warning/30 bg-warning/5",
        info: "border-cyan-500/30 bg-cyan-500/5",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

/* ── Default icons per variant ─────────────────────────── */
const variantIcons: Record<string, React.ReactNode> = {
  default: (
    <svg className="size-5 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  ),
  success: (
    <svg className="size-5 shrink-0 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
    <svg className="size-5 shrink-0 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
  ),
  warning: (
    <svg className="size-5 shrink-0 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
  info: (
    <svg className="size-5 shrink-0 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  ),
};

/* ── Types ─────────────────────────────────────────────── */
interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  /** Replace the default variant icon */
  icon?: React.ReactNode;
  /** Hide the icon entirely */
  noIcon?: boolean;
  /** Show a dismiss (×) button — fires this callback on click */
  onDismiss?: () => void;
}

/* ── Component ─────────────────────────────────────────── */
export function Alert({
  className,
  variant = "default",
  title,
  icon,
  noIcon = false,
  onDismiss,
  children,
  ...props
}: AlertProps) {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) return null;

  const resolvedIcon = noIcon ? null : icon ?? variantIcons[variant ?? "default"];

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {/* Icon column */}
      {resolvedIcon && (
        <span className="mt-0.5" aria-hidden="true">
          {resolvedIcon}
        </span>
      )}

      {/* Text column */}
      <div className="min-w-0 flex-1">
        {title && (
          <div className="mb-0.5 font-semibold text-text">{title}</div>
        )}
        <div className={cn("text-text/70", title && "mt-0.5")}>
          {children}
        </div>
      </div>

      {/* Dismiss button */}
      {onDismiss && (
        <button
          type="button"
          onClick={() => {
            setDismissed(true);
            onDismiss();
          }}
          className="-mr-1 -mt-1 shrink-0 rounded-lg p-1 text-muted transition-colors hover:bg-white/5 hover:text-text"
          aria-label="Dismiss"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}