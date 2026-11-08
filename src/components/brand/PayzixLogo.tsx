import { memo, type SVGProps } from "react";

/* ================================================================
   PAYZIX LOGO — Mark + Wordmark (+ optional tagline)
   ================================================================
   Usage:
     <PayzixLogo />                              // horizontal, with tagline
     <PayzixLogo tagline={false} />              // horizontal, mark + word only
     <PayzixLogo layout="stacked" />             // centered vertical
     <PayzixLogo monochrome="light" />           // all white (dark bg)
     <PayzixLogo monochrome="dark" />            // all navy (light bg)
     <PayzixLogo className="h-10 w-auto" />      // Tailwind sizing override
   ================================================================ */

type Layout = "horizontal" | "stacked";
type Monochrome = "dark" | "light" | false;

interface PayzixLogoProps extends SVGProps<SVGSVGElement> {
  /** Show "More than payments." tagline beneath wordmark */
  tagline?: boolean;
  /** Horizontal (inline) or stacked (centered) layout */
  layout?: Layout;
  /** Force single-color rendering for dark/light backgrounds */
  monochrome?: Monochrome;
}

/* ── Color resolution ──
   When monochrome is false, we use CSS custom properties
   so the logo auto-adapts to dark mode.
   When monochrome is set, we use explicit hex values
   for guaranteed contrast on known backgrounds. */
function resolveColors(monochrome: Monochrome) {
  if (monochrome === "light") {
    return {
      bg:    "transparent",
      mark:  "#FFFFFF",
      accent: "#FFFFFF",
      text:  "#FFFFFF",
      tag:   "rgba(255,255,255,0.7)",
    };
  }
  if (monochrome === "dark") {
    return {
      bg:    "transparent",
      mark:  "#07111F",
      accent: "#07111F",
      text:  "#07111F",
      tag:   "rgba(7,17,31,0.6)",
    };
  }
  // Full-color mode — CSS vars for auto dark-mode
  return {
    bg:     "var(--payzix-navy, #07111F)",
    mark:   "var(--payzix-green, #27E39A)",
    accent: "var(--payzix-surface, #FFFFFF)",
    text:   "var(--payzix-text, #0F172A)",
    tag:    "var(--payzix-green, #27E39A)",
  };
}

/* ── Font stacks matching your next/font CSS variables ──
   SVG <text> supports CSS font-family including variables
   when rendered inline in the HTML document (which Next.js does). */
const FONT_HEADING = "var(--font-manrope, Manrope), Inter, system-ui, sans-serif";
const FONT_BODY    = "var(--font-inter, Inter), system-ui, sans-serif";

function PayzixLogoInner({
  tagline = true,
  layout = "horizontal",
  monochrome = false,
  className,
  style,
  ...props
}: PayzixLogoProps) {
  const c = resolveColors(monochrome);
  const showBg = !monochrome;

  const ariaLabel = tagline
    ? "Payzix — More than payments."
    : "Payzix";

  /* ── Shared mark paths (DRY) ── */
  const MarkPaths = ({ tx, ty }: { tx: number; ty: number }) => (
    <g transform={`translate(${tx} ${ty})`}>
      {showBg && (
        <rect width="104" height="104" rx="17" fill={c.bg} />
      )}
      {/* "P" */}
      <path
        d="M31 76V29H52.5C64.9 29 73 36.9 73 48.7C73 60.4 64.8 68 52.5 68"
        fill="none"
        stroke={c.mark}
        strokeWidth="7.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* "Z" */}
      <path
        d="M43.5 66.5L58.5 51.5L58.5 81.5"
        fill="none"
        stroke={c.accent}
        strokeWidth="6.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );

  /* ============================================================
     STACKED LAYOUT
     ============================================================ */
  if (layout === "stacked") {
    const vbHeight = tagline ? 196 : 160;
    return (
      <svg
        viewBox={`0 0 260 ${vbHeight}`}
        role="img"
        aria-label={ariaLabel}
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{
          display: "block",
          maxWidth: "100%",
          height: "auto",
          ...style,
        }}
        {...props}
      >
        <title>{ariaLabel}</title>

        {/* Mark centered */}
        <MarkPaths tx={78} ty={0} />

        {/* Wordmark */}
        <text
          x="130"
          y="132"
          textAnchor="middle"
          fill={c.text}
          fontFamily={FONT_HEADING}
          fontSize="28"
          fontWeight="700"
          letterSpacing="-0.8"
        >
          Payzix
        </text>

        {/* Tagline */}
        {tagline && (
          <text
            x="130"
            y="158"
            textAnchor="middle"
            fill={c.tag}
            fontFamily={FONT_BODY}
            fontSize="13"
            fontWeight="500"
            letterSpacing="0.2"
          >
            More than payments.
          </text>
        )}
      </svg>
    );
  }

  /* ============================================================
     HORIZONTAL LAYOUT (default)
     ============================================================ */
  const vbWidth = tagline ? 310 : 230;
  return (
    <svg
      viewBox={`0 0 ${vbWidth} 112`}
      role="img"
      aria-label={ariaLabel}
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        display: "block",
        maxWidth: "100%",
        height: "auto",
        ...style,
      }}
      {...props}
    >
      <title>{ariaLabel}</title>

      {/* Mark left-aligned */}
      <MarkPaths tx={0} ty={4} />

      {/* Wordmark */}
      <text
        x="118"
        y={tagline ? "48" : "60"}
        fill={c.text}
        fontFamily={FONT_HEADING}
        fontSize="28"
        fontWeight="700"
        letterSpacing="-0.8"
      >
        Payzix
      </text>

      {/* Tagline */}
      {tagline && (
        <text
          x="118"
          y="72"
          fill={c.tag}
          fontFamily={FONT_BODY}
          fontSize="13"
          fontWeight="500"
          letterSpacing="0.2"
        >
          More than payments.
        </text>
      )}
    </svg>
  );
}

export const PayzixLogo = memo(PayzixLogoInner);
PayzixLogo.displayName = "PayzixLogo";