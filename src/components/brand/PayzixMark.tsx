import { memo, type SVGProps } from "react";

/* ================================================================
   PAYZIX MARK — The "PZ" icon
   ================================================================
   Usage:
     <PayzixMark />                          // 48px, navy bg, default
     <PayzixMark size="lg" />                // 64px
     <PayzixMark size="sm" withBackground={false} />  // 32px, transparent
     <PayzixMark decorative />               // aria-hidden, no a11y tree
     <PayzixMark variant="gradient" />       // green→cyan gradient stroke
   ================================================================ */

type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Variant = "default" | "gradient" | "glow";

interface PayzixMarkProps extends SVGProps<SVGSVGElement> {
  /** Render the navy rounded-rect behind the mark */
  withBackground?: boolean;
  /** If true, hides from screen readers (decorative use) */
  decorative?: boolean;
  /** Controls rendered dimensions + stroke weight */
  size?: Size;
  /** Color variant for the primary stroke */
  variant?: Variant;
}

/* ── Size → pixel dimension + stroke width mapping ──
   Stroke widths scale inversely: smaller icons need
   thicker strokes to stay legible at low resolutions.
   Values are in viewBox units (104×104 coordinate space). */
const SIZE_MAP: Record<
  Size,
  { px: number; stroke: number; strokeSecondary: number; radius: number }
> = {
  xs: { px: 24, stroke: 10,   strokeSecondary: 9,   radius: 5  },
  sm: { px: 32, stroke: 9,    strokeSecondary: 8,   radius: 6  },
  md: { px: 48, stroke: 7.2,  strokeSecondary: 6.2, radius: 17 },
  lg: { px: 64, stroke: 6.6,  strokeSecondary: 5.6, radius: 17 },
  xl: { px: 96, stroke: 6,    strokeSecondary: 5,   radius: 17 },
};

/* ── Brand colors via CSS custom properties ──
   Falls back to hardcoded hex if vars aren't loaded
   (e.g., SSR, email, or standalone SVG export).
   In dark mode, --payzix-surface flips to dark,
   so the "white" stroke auto-adapts. */
const COLORS = {
  navy:   "var(--payzix-navy, #07111F)",
  green:  "var(--payzix-green, #27E39A)",
  cyan:   "var(--payzix-cyan, #28C7D9)",
  white:  "var(--payzix-surface, #FFFFFF)",
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
  const { px, stroke, strokeSecondary, radius } = SIZE_MAP[size];

  /* Gradient ID must be unique per instance to avoid
     collisions when multiple marks render on one page. */
  const gradientId = `payzix-mark-grad-${size}-${variant}`;
  const glowId = `payzix-mark-glow-${size}`;

  /* Determine primary stroke color/fill */
  const primaryStroke =
    variant === "gradient" ? `url(#${gradientId})` : COLORS.green;

  return (
    <svg
      /* ── Dimensions ── */
      width={px}
      height={px}
      viewBox="0 0 104 104"
      fill="none"

      /* ── Accessibility ── */
      role={decorative ? "presentation" : "img"}
      aria-label={decorative ? undefined : "Payzix"}
      aria-hidden={decorative ? true : undefined}
      focusable="false"

      /* ── Rendering ── */
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        flexShrink: 0,
        display: "block",
        ...style,
      }}
      {...props}
    >
      {/* ── Accessible title (only when not decorative) ── */}
      {!decorative && <title>Payzix</title>}

      {/* ── Gradient definition (only when needed) ── */}
      {variant === "gradient" && (
        <defs>
          <linearGradient
            id={gradientId}
            x1="31" y1="29"
            x2="73" y2="76"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor={COLORS.green} />
            <stop offset="100%" stopColor={COLORS.cyan} />
          </linearGradient>
        </defs>
      )}

      {/* ── Glow filter (only for glow variant) ── */}
      {variant === "glow" && (
        <defs>
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}

      {/* ── Background rounded rect ── */}
      {withBackground && (
        <rect
          width="104"
          height="104"
          rx={radius}
          fill={COLORS.navy}
        />
      )}

      {/* ── "P" stroke (primary brand curve) ── */}
      <path
        d="M31 76V29H52.5C64.9 29 73 36.9 73 48.7C73 60.4 64.8 68 52.5 68"
        stroke={primaryStroke}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={variant === "glow" ? `url(#${glowId})` : undefined}
      />

      {/* ── "Z" stroke (secondary accent) ── */}
      <path
        d="M43.5 66.5L58.5 51.5L58.5 81.5"
        stroke={COLORS.white}
        strokeWidth={strokeSecondary}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Memoize: the logo never changes based on parent state,
   so we prevent unnecessary re-renders in nav bars,
   sidebars, and headers that re-render frequently. */
export const PayzixMark = memo(PayzixMarkInner);
PayzixMark.displayName = "PayzixMark";