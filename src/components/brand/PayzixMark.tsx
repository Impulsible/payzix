"use client";

import { memo, type SVGProps } from "react";

/* ================================================================
   PAYZIX MARK — "PZ" Monogram Icon
   ================================================================ */

type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Variant = "default" | "gradient" | "glow";

interface PayzixMarkProps extends SVGProps<SVGSVGElement> {
  withBackground?: boolean;
  decorative?: boolean;
  size?: Size;
  variant?: Variant;
}

const SIZE_MAP: Record<
  Size,
  { px: number; stroke: number; strokeAlt: number; radius: number }
> = {
  xs: { px: 24, stroke: 10,   strokeAlt: 9,   radius: 5  },
  sm: { px: 32, stroke: 9,    strokeAlt: 8,   radius: 6  },
  md: { px: 48, stroke: 7.2,  strokeAlt: 6.2, radius: 17 },
  lg: { px: 64, stroke: 6.6,  strokeAlt: 5.6, radius: 17 },
  xl: { px: 96, stroke: 6,    strokeAlt: 5,   radius: 17 },
};

const C = {
  navy:  "var(--payzix-navy, #07111F)",
  green: "var(--payzix-green, #27E39A)",
  cyan:  "var(--payzix-cyan, #28C7D9)",
  white: "var(--payzix-surface, #FFFFFF)",
} as const;

function PayzixMarkInner({
  withBackground = true,
  decorative = false,
  size = "md",
  variant = "default",
  className,
  style,
  ...props
}: PayzixMarkProps) {
  const { px, stroke, strokeAlt, radius } = SIZE_MAP[size];
  const gradId = `pz-mark-g-${size}`;
  const glowId = `pz-mark-f-${size}`;
  const primary = variant === "gradient" ? `url(#${gradId})` : C.green;

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 104 104"
      fill="none"
      role={decorative ? "presentation" : "img"}
      aria-label={decorative ? undefined : "Payzix"}
      aria-hidden={decorative ? true : undefined}
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ flexShrink: 0, display: "block", ...style }}
      {...props}
    >
      {!decorative && <title>Payzix</title>}

      {variant === "gradient" && (
        <defs>
          <linearGradient id={gradId} x1="31" y1="29" x2="73" y2="76" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={C.green} />
            <stop offset="100%" stopColor={C.cyan} />
          </linearGradient>
        </defs>
      )}

      {variant === "glow" && (
        <defs>
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
      )}

      {withBackground && <rect width="104" height="104" rx={radius} fill={C.navy} />}

      <path
        d="M31 76V29H52.5C64.9 29 73 36.9 73 48.7C73 60.4 64.8 68 52.5 68"
        stroke={primary}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={variant === "glow" ? `url(#${glowId})` : undefined}
      />
      <path
        d="M43.5 66.5L58.5 51.5L58.5 81.5"
        stroke={C.white}
        strokeWidth={strokeAlt}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const PayzixMark = memo(PayzixMarkInner);
PayzixMark.displayName = "PayzixMark";