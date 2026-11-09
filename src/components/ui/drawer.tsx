"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export const Drawer = Dialog.Root;
export const DrawerTrigger = Dialog.Trigger;

interface DrawerContentProps extends Dialog.DialogContentProps {
  title: string;
  side?: "right" | "left";
}

export function DrawerContent({
  title,
  side = "right",
  className,
  children,
  ...props
}: DrawerContentProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <Dialog.Content
        className={cn(
          "fixed top-0 z-50 flex h-dvh w-[92vw] max-w-md flex-col",
          "border-border bg-surface shadow-2xl",
          "focus:outline-none",
          side === "right"
            ? "right-0 border-l data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
            : "left-0 border-r data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
          className,
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <Dialog.Title className="font-heading text-lg font-semibold text-text">
            {title}
          </Dialog.Title>
          <Dialog.Close className="rounded-lg p-1.5 text-muted transition-colors hover:bg-sunken hover:text-text">
            <svg
              className="size-4"
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
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}