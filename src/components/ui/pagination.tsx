"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  page,
  totalPages,
  onChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => {
      if (totalPages <= 7) return true;
      if (p === 1 || p === totalPages) return true;
      if (Math.abs(p - page) <= 1) return true;
      return false;
    },
  );

  return (
    <nav
      className={cn("flex items-center gap-1", className)}
      aria-label="Pagination"
    >
      {/* Previous */}
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className={cn(
          "flex size-9 items-center justify-center rounded-lg",
          "border border-border bg-surface text-text",
          "transition-colors hover:bg-sunken",
          "disabled:pointer-events-none disabled:opacity-40",
        )}
        aria-label="Previous page"
      >
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
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      {/* Pages */}
      {pages.map((p, i) => {
        const prev = pages[i - 1];
        const showGap = prev !== undefined && p - prev > 1;
        return (
          <React.Fragment key={p}>
            {showGap && (
              <span className="flex size-9 items-center justify-center text-sm text-muted">
                …
              </span>
            )}
            <button
              onClick={() => onChange(p)}
              aria-current={p === page ? "page" : undefined}
              className={cn(
                "flex size-9 items-center justify-center rounded-lg",
                "text-sm font-medium transition-colors",
                p === page
                  ? "bg-green-500 text-navy shadow-sm"
                  : "border border-border bg-surface text-text hover:bg-sunken",
              )}
            >
              {p}
            </button>
          </React.Fragment>
        );
      })}

      {/* Next */}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className={cn(
          "flex size-9 items-center justify-center rounded-lg",
          "border border-border bg-surface text-text",
          "transition-colors hover:bg-sunken",
          "disabled:pointer-events-none disabled:opacity-40",
        )}
        aria-label="Next page"
      >
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
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </nav>
  );
}