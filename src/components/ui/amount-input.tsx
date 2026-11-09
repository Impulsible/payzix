"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AmountInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (raw: string) => void;
  currency?: string;
}

export const AmountInput = React.forwardRef<HTMLInputElement, AmountInputProps>(
  ({ className, value, onChange, currency = "NGN", ...props }, ref) => {
    const symbol = currency === "NGN" ? "₦" : currency;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^0-9.]/g, "");

      // allow only one decimal point
      const dotIndex = raw.indexOf(".");
      const safe =
        dotIndex === -1
          ? raw
          : raw.slice(0, dotIndex + 1) + raw.slice(dotIndex + 1).replace(/\./g, "");

      // max 2 decimal places
      const trimmed =
        safe.includes(".")
          ? safe.slice(0, safe.indexOf(".") + 3)
          : safe;

      onChange(trimmed);
    };

    return (
      <div
        className={cn(
          "flex h-14 w-full items-center gap-2 rounded-xl",
          "border border-border bg-surface px-4 shadow-sm",
          "transition-colors",
          "focus-within:border-green-500",
          "focus-within:ring-2 focus-within:ring-green-500/30",
          className,
        )}
      >
        <span className="font-mono-data text-lg text-muted">{symbol}</span>
        <input
          ref={ref}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          className={cn(
            "w-full bg-transparent",
            "font-mono-data text-2xl font-semibold text-text",
            "outline-none",
            "placeholder:text-muted/40",
          )}
          placeholder="0.00"
          {...props}
        />
      </div>
    );
  },
);
AmountInput.displayName = "AmountInput";