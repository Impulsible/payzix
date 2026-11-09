"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

/* ── Root ──────────────────────────────────────────────── */
export const Tabs = TabsPrimitive.Root;

/* ── List (the pill container) ─────────────────────────── */
export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1 overflow-x-auto rounded-xl",
      "border border-border bg-sunken p-1",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

/* ── Trigger (each tab) ────────────────────────────────── */
export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      /* layout */
      "inline-flex shrink-0 items-center justify-center gap-1.5",
      "whitespace-nowrap rounded-lg px-3.5 py-2",

      /* typography */
      "text-sm font-medium text-muted",

      /* interaction */
      "transition-all duration-200",
      "hover:text-text",

      /* active — brand green, not navy */
      "data-[state=active]:bg-green-500",
      "data-[state=active]:text-white",
      "data-[state=active]:shadow-sm",

      /* focus */
      "focus-visible:outline-none",
      "focus-visible:ring-2 focus-visible:ring-green-500/40",

      /* disabled */
      "disabled:pointer-events-none disabled:opacity-50",

      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

/* ── Content (panel) ───────────────────────────────────── */
export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("mt-4 focus-visible:outline-none", className)}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";