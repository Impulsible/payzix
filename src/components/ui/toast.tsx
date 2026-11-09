"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cn } from "@/lib/utils";

export const ToastProvider = ToastPrimitive.Provider;

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      "fixed bottom-4 right-4 z-700",
      "flex max-h-screen w-full max-w-sm flex-col gap-2",
      "outline-none",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  variant?: "default" | "success" | "error" | "info";
}

export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, variant = "default", ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    className={cn(
      "pointer-events-auto flex items-start gap-3",
      "rounded-2xl border bg-slate-900 p-4 text-white shadow-2xl",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-bottom-full",
      variant === "default" && "border-slate-800 bg-slate-900 text-slate-50",
      variant === "success" && "border-emerald-500/80 bg-slate-900 text-white shadow-emerald-950/60",
      variant === "error" && "border-red-500/80 bg-slate-900 text-white shadow-red-950/60",
      variant === "info" && "border-cyan-500/80 bg-slate-900 text-white shadow-cyan-950/60",
      className
    )}
    {...props}
  />
));
Toast.displayName = "Toast";

export const ToastTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("text-sm font-semibold tracking-tight text-white", className)}
    {...props}
  />
);

export const ToastDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-0.5 text-xs leading-relaxed text-slate-300", className)}
    {...props}
  />
);

export const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    className={cn(
      "rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white",
      className
    )}
    {...props}
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
  </ToastPrimitive.Close>
));
ToastClose.displayName = "ToastClose";