"use client";

import { memo, type SVGProps } from "react";

/* ================================================================
   PAYZIX LOGO — Mark + Wordmark + Optional Tagline
   ================================================================ */

type Layout = "horizontal" | "stacked";
type Monochrome = "dark" | "light" | false;

interface PayzixLogoProps extends SVGProps<SVGSVGElement> {
  tagline?: boolean;
  layout?: Layout;
  monochrome?: Monochrome;
}

function resolveColors(m: Monochrome) {
  if (m === "light")
    return { bg: "transparent", mark: "#FFF", accent: "#FFF", text: "#FFF", tag: "rgba(255,255,255,0.7)" };
  if (m === "dark")
    return { bg: "transparent", mark: "#07111F", accent: "#07111F", text: "#07111F", tag: "rgba(7,17,31,0.6)" };
  return {
    bg:     "var(--payzix-navy, #07111F)",
    mark:   "var(--payzix-green, #27E39A)",
    accent: "var(--payzix-surface, #FFFFFF)",
    text:   "var(--payzix-text, #0F172A)",
    tag:    "var(--payzix-green, #27E39A)",
  };
}

const FH = "var(--font-manrope, Manrope), Inter, system-ui, sans-serif";
const FB = "var(--font-inter, Inter), system-ui, sans-serif";

function MarkPaths({ tx, ty, c, showBg }: { tx: number; ty: number; c: ReturnType<typeof resolveColors>; showBg: boolean }) {
  return (
    <g transform={`translate(${tx} ${ty})`}>
      {showBg && <rect width="104" height="104" rx="17" fill={c.bg} />}
      <path d="M31 76V29H52.5C64.9 29 73 36.9 73 48.7C73 60.4 64.8 68 52.5 68" fill="none" stroke={c.mark} strokeWidth="7.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M43.5 66.5L58.5 51.5L58.5 81.5" fill="none" stroke={c.accent} strokeWidth="6.2" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

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
  const label = tagline ? "Payzix — More than payments." : "Payzix";

  if (layout === "stacked") {
    return (
      <svg viewBox={`0 0 260 ${tagline ? 196 : 160}`} role="img" aria-label={label} focusable="false" xmlns="http://www.w3.org/2000/svg" className={className} style={{ display: "block", maxWidth: "100%", height: "auto", ...style }} {...props}>
        <title>{label}</title>
        <MarkPaths tx={78} ty={0} c={c} showBg={showBg} />
        <text x="130" y="132" textAnchor="middle" fill={c.text} fontFamily={FH} fontSize="28" fontWeight="700" letterSpacing="-0.8">Payzix</text>
        {tagline && <text x="130" y="158" textAnchor="middle" fill={c.tag} fontFamily={FB} fontSize="13" fontWeight="500" letterSpacing="0.2">More than payments.</text>}
      </svg>
    );
  }

  return (
    <svg viewBox={`0 0 ${tagline ? 310 : 230} 112`} role="img" aria-label={label} focusable="false" xmlns="http://www.w3.org/2000/svg" className={className} style={{ display: "block", maxWidth: "100%", height: "auto", ...style }} {...props}>
      <title>{label}</title>
      <MarkPaths tx={0} ty={4} c={c} showBg={showBg} />
      <text x="118" y={tagline ? "48" : "60"} fill={c.text} fontFamily={FH} fontSize="28" fontWeight="700" letterSpacing="-0.8">Payzix</text>
      {tagline && <text x="118" y="72" fill={c.tag} fontFamily={FB} fontSize="13" fontWeight="500" letterSpacing="0.2">More than payments.</text>}
    </svg>
  );
}

export const PayzixLogo = memo(PayzixLogoInner);
PayzixLogo.displayName = "PayzixLogo";