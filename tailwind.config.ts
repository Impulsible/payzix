import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

/* ================================================================
   PAYZIX TAILWIND CONFIG — PRODUCTION GRADE v1.0
   ================================================================
   Architecture:
   • Brand colors → full hex shade scales (supports /opacity)
   • Semantic colors → CSS variable refs from globals.css
     (auto-switch in dark mode, no Tailwind dark: prefix needed)
   • Animations → mirror globals.css keyframes exactly
   • Spacing → fintech-specific tokens (nav height, card gaps)
   ================================================================ */

const config: Config & { safelist: string[] } = {
  /* ── Dark mode via class toggle (next-themes compatible) ── */
  darkMode: "class",

  /* ── Content paths (src/ directory convention) ── */
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
    "./src/hooks/**/*.{js,ts}",
  ],

  /* ── Safelist: dynamic classes generated at runtime ── */
  safelist: [
    // Transaction status badges
    "bg-success/10", "text-success", "bg-error/10", "text-error",
    "bg-warning/10", "text-warning", "bg-info/10", "text-info",
    "bg-pending/10", "text-pending",
    // Skeleton widths
    "w-1/2", "w-1/3", "w-2/3", "w-3/4", "w-full",
    // Dynamic grid cols
    "grid-cols-2", "grid-cols-3", "grid-cols-4",
  ],

  theme: {
    /* ── Responsive breakpoints ── */
    screens: {
      xs: "375px",   // iPhone SE / small Android
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      // Fintech-specific: mobile app shell breakpoint
      app: "480px",  // max-width of mobile app container
    },

    /* ── Container ── */
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        md: "1.5rem",
        lg: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
      },
    },

    extend: {
      /* ============================================================
         COLORS
         ============================================================
         Brand shades: hardcoded hex → supports bg-green-500/30 etc.
         Semantic tokens: CSS vars → auto dark-mode from globals.css
         ============================================================ */
      colors: {
        /* ── Brand: Navy (primary dark) ── */
        navy: {
          DEFAULT: "#07111F",
          50:  "#e8edf4",
          100: "#c5d0e3",
          200: "#9fb1d0",
          300: "#7892bd",
          400: "#5a7aae",
          500: "#3c639f",
          600: "#2d4f82",
          700: "#1e3a62",
          800: "#0F2035",
          900: "#0A1628",
          950: "#07111F",
        },

        /* ── Brand: Green (primary action / success) ── */
        green: {
          DEFAULT: "#27E39A",
          50:  "#edfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#5AEBAF",
          500: "#27E39A",
          600: "#1CC783",
          700: "#15a36b",
          800: "#118256",
          900: "#0d6142",
          950: "#073d29",
        },

        /* ── Brand: Cyan (accent / secondary) ── */
        cyan: {
          DEFAULT: "#28C7D9",
          50:  "#edf9fb",
          100: "#d1f0f5",
          200: "#a8e2eb",
          300: "#7dd4e1",
          400: "#5DD9E6",
          500: "#28C7D9",
          600: "#1BA8B8",
          700: "#158a98",
          800: "#116d78",
          900: "#0d5159",
          950: "#08353b",
        },

        /* ── Semantic: mapped to CSS vars (auto dark mode) ── */
        background:  "var(--payzix-bg)",
        surface:     "var(--payzix-surface)",
        "surface-hover": "var(--payzix-surface-hover)",
        elevated:    "var(--payzix-bg-elevated)",
        sunken:      "var(--payzix-bg-sunken)",

        /* ── Text ── */
        text: {
          DEFAULT:    "var(--payzix-text)",
          secondary:  "var(--payzix-text-secondary)",
        },
        muted: {
          DEFAULT:    "var(--payzix-muted)",
          light:      "var(--payzix-muted-light)",
        },

        /* ── Borders ── */
        border: {
          DEFAULT:    "var(--payzix-border)",
          light:      "var(--payzix-border-light)",
        },
        divider:     "var(--payzix-divider)",

        /* ── Status (fintech-critical) ── */
        success: {
          DEFAULT:    "var(--payzix-success)",
          bg:         "var(--payzix-success-bg)",
        },
        warning: {
          DEFAULT:    "var(--payzix-warning)",
          bg:         "var(--payzix-warning-bg)",
        },
        error: {
          DEFAULT:    "var(--payzix-error)",
          bg:         "var(--payzix-error-bg)",
        },
        info: {
          DEFAULT:    "var(--payzix-info)",
          bg:         "var(--payzix-info-bg)",
        },
        pending: {
          DEFAULT:    "var(--payzix-pending)",
          bg:         "var(--payzix-pending-bg)",
        },
      },

      /* ============================================================
         TYPOGRAPHY
         ============================================================ */
      fontFamily: {
        heading: [
          "var(--font-manrope)",
          "Manrope",
          ...defaultTheme.fontFamily.sans,
        ],
        body: [
          "var(--font-inter)",
          "Inter",
          ...defaultTheme.fontFamily.sans,
        ],
        mono: [
          "var(--font-mono)",
          "IBM Plex Mono",
          "JetBrains Mono",
          ...defaultTheme.fontFamily.mono,
        ],
      },

      /* Fluid type scale (clamp-based via CSS, but Tailwind
         fallbacks for non-fluid usage) */
      fontSize: {
        "2xs":  ["0.625rem",  { lineHeight: "0.875rem",  letterSpacing: "0.02em" }],  // 10px — labels
        xs:     ["0.75rem",   { lineHeight: "1rem",      letterSpacing: "0.01em" }],  // 12px — captions
        sm:     ["0.8125rem", { lineHeight: "1.25rem" }],                              // 13px — secondary
        base:   ["0.9375rem", { lineHeight: "1.5rem" }],                               // 15px — body (fintech standard)
        lg:     ["1.0625rem", { lineHeight: "1.625rem" }],                             // 17px — lead
        xl:     ["1.25rem",   { lineHeight: "1.75rem",   letterSpacing: "-0.01em" }],  // 20px
        "2xl":  ["1.5rem",    { lineHeight: "2rem",      letterSpacing: "-0.02em" }],  // 24px
        "3xl":  ["1.875rem",  { lineHeight: "2.25rem",   letterSpacing: "-0.025em" }], // 30px
        "4xl":  ["2.25rem",   { lineHeight: "2.5rem",    letterSpacing: "-0.03em" }],  // 36px — amounts
        "5xl":  ["3rem",      { lineHeight: "1",         letterSpacing: "-0.035em" }], // 48px — hero amounts
        "6xl":  ["3.75rem",   { lineHeight: "1",         letterSpacing: "-0.04em" }],  // 60px
        // Fintech-specific: balance display
        amount: ["clamp(2rem, 6vw, 3.5rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "amount-sm": ["clamp(1.5rem, 4vw, 2.25rem)", { lineHeight: "1", letterSpacing: "-0.025em" }],
      },

      fontWeight: {
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",  // Manrope 800 for amounts
        black: "900",
      },

      /* ============================================================
         SPACING (fintech-specific additions)
         ============================================================ */
      spacing: {
        "4.5":  "1.125rem",  // 18px — button padding sweet spot
        "13":   "3.25rem",   // 52px — quick action icon
        "15":   "3.75rem",   // 60px — avatar XL
        "18":   "4.5rem",    // 72px — bottom nav height
        "22":   "5.5rem",    // 88px — header + safe area
        "30":   "7.5rem",    // 120px — hero section
        "safe-t": "var(--safe-top)",
        "safe-b": "var(--safe-bottom)",
        "safe-l": "var(--safe-left)",
        "safe-r": "var(--safe-right)",
      },

      /* ============================================================
         BORDER RADIUS
         ============================================================ */
      borderRadius: {
        "4xl":  "2rem",      // 32px
        "5xl":  "2.5rem",    // 40px
        card:    "16px",
        "card-lg": "20px",
        button:  "12px",
        input:   "10px",
        sheet:   "24px 24px 0 0",  // bottom sheet top corners
      },

      /* ============================================================
         BOX SHADOWS (layered for depth — matches globals.css)
         ============================================================ */
      boxShadow: {
        xs:      "var(--shadow-xs)",
        sm:      "var(--shadow-sm)",
        md:      "var(--shadow-md)",
        lg:      "var(--shadow-lg)",
        xl:      "var(--shadow-xl)",
        "2xl":   "var(--shadow-2xl)",
        inner:   "var(--shadow-inner)",
        // Brand-tinted shadows (the "wow" factor)
        "brand":    "var(--shadow-brand)",
        "brand-lg": "var(--shadow-brand-lg)",
        "cyan":     "var(--shadow-cyan)",
        // Component-specific
        "card":     "var(--shadow-card)",
        "float":    "var(--shadow-float)",
        "nav":      "var(--shadow-nav)",
        // Fintech-specific: glow for active states
        "glow-green": "0 0 20px rgba(39,227,154,0.3), 0 0 60px rgba(39,227,154,0.1)",
        "glow-cyan":  "0 0 20px rgba(40,199,217,0.3), 0 0 60px rgba(40,199,217,0.1)",
      },

      /* ============================================================
         ANIMATIONS & KEYFRAMES (mirror globals.css)
         ============================================================ */
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to:   { opacity: "0" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)" },
          to:   { transform: "translateY(0)" },
        },
        "slide-down": {
          from: { transform: "translateY(-20px)", opacity: "0" },
          to:   { transform: "translateY(0)", opacity: "1" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to:   { transform: "translateX(0)" },
        },
        "scale-in": {
          from: { transform: "scale(0.9)", opacity: "0" },
          to:   { transform: "scale(1)", opacity: "1" },
        },
        "toast-in": {
          from: { transform: "translateX(-50%) translateY(-120%)" },
          to:   { transform: "translateX(-50%) translateY(0)" },
        },
        "shimmer": {
          "0%":   { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%":      { opacity: "0.5", transform: "scale(1.3)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-6px)" },
        },
        "count-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-3px)" },
        },
        "ripple": {
          "0%":   { transform: "scale(0)", opacity: "0.5" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        "success-check": {
          "0%":   { strokeDashoffset: "100" },
          "100%": { strokeDashoffset: "0" },
        },
      },

      animation: {
        "fade-in":       "fade-in 250ms cubic-bezier(0.4,0,0.2,1) both",
        "fade-out":      "fade-out 250ms cubic-bezier(0.4,0,0.2,1) both",
        "slide-up":      "slide-up 400ms cubic-bezier(0.16,1,0.3,1) both",
        "slide-down":    "slide-down 250ms cubic-bezier(0.16,1,0.3,1) both",
        "slide-in-right":"slide-in-right 400ms cubic-bezier(0.16,1,0.3,1) both",
        "scale-in":      "scale-in 250ms cubic-bezier(0.34,1.56,0.64,1) both",
        "toast-in":      "toast-in 400ms cubic-bezier(0.16,1,0.3,1) both",
        "shimmer":       "shimmer 1.8s ease-in-out infinite",
        "pulse-dot":     "pulse-dot 2s ease-in-out infinite",
        "float":         "float 3s ease-in-out infinite",
        "count-up":      "count-up 400ms cubic-bezier(0.16,1,0.3,1) both",
        "spin-slow":     "spin-slow 3s linear infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "ripple":        "ripple 600ms ease-out forwards",
        "success-check": "success-check 500ms ease-out forwards",
      },

      /* ============================================================
         TRANSITIONS (spring & expo curves — the "premium" feel)
         ============================================================ */
      transitionTimingFunction: {
        "out-expo":   "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart":  "cubic-bezier(0.25, 1, 0.5, 1)",
        "spring":     "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth":     "cubic-bezier(0.4, 0, 0.2, 1)",
        "snap":       "cubic-bezier(0.5, 0, 0.1, 1)",
      },

      transitionDuration: {
        "fast":   "150ms",
        "base":   "250ms",
        "slow":   "400ms",
        "slower": "600ms",
      },

      /* ============================================================
         Z-INDEX (layer system — prevents z-index wars)
         ============================================================ */
      zIndex: {
        base:     "1",
        dropdown: "100",
        sticky:   "200",
        nav:      "300",
        overlay:  "400",
        modal:    "500",
        popover:  "600",
        toast:    "700",
        tooltip:  "800",
      },

      /* ============================================================
         BACKDROP BLUR (glass morphism)
         ============================================================ */
      backdropBlur: {
        xs: "2px",
        nav: "12px",
        glass: "20px",
      },

      /* ============================================================
         BACKGROUND IMAGES (gradients as utilities)
         ============================================================ */
      backgroundImage: {
        "gradient-brand":     "linear-gradient(135deg, #27E39A 0%, #28C7D9 100%)",
        "gradient-brand-alt": "linear-gradient(135deg, #28C7D9 0%, #27E39A 100%)",
        "gradient-dark":      "linear-gradient(160deg, #07111F 0%, #0F2035 100%)",
        "gradient-card":      "linear-gradient(145deg, #0F2035 0%, #07111F 50%, #0A1628 100%)",
        "gradient-hero":      "linear-gradient(180deg, #07111F 0%, #0c1e33 60%, #F8FAFC 100%)",
        "gradient-glass":     "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
        "gradient-shimmer":   "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
        "gradient-radial-green": "radial-gradient(ellipse at 80% 20%, rgba(39,227,154,0.15) 0%, transparent 60%)",
        "gradient-radial-cyan":  "radial-gradient(ellipse at 20% 80%, rgba(40,199,217,0.1) 0%, transparent 50%)",
      },

      /* ============================================================
         ASPECT RATIO (virtual card = standard credit card)
         ============================================================ */
      aspectRatio: {
        card: "1.586 / 1",   // ISO/IEC 7810 ID-1 (standard card)
        "card-mini": "1.4 / 1",
      },

      /* ============================================================
         OPACITY (extra stops for overlays)
         ============================================================ */
      opacity: {
        "12": "0.12",
        "15": "0.15",
        "18": "0.18",
      },

      /* ============================================================
         WIDTH / MAX-WIDTH (app shell)
         ============================================================ */
      maxWidth: {
        app: "480px",       // mobile app container
        "app-wide": "560px",
        "card": "380px",    // virtual debit card
      },

      /* ============================================================
         MIN-HEIGHT (viewport-aware)
         ============================================================ */
      minHeight: {
        screen: "100dvh",
        "screen-fallback": "100vh",
      },
    },
  },

  /* ================================================================
     PLUGINS
     ================================================================
     Install with:
       npm i @tailwindcss/forms @tailwindcss/typography \
             @tailwindcss/container-queries tailwindcss-animate
     ================================================================ */
  plugins: [
    // Better form element defaults (inputs, selects, checkboxes)
    // → Eliminates the ugly default browser styles on mobile
    require("@tailwindcss/forms")({
      strategy: "class", // only apply when you add `form-*` classes
    }),

    // Rich text / prose styles (for T&Cs, help articles, blog)
    require("@tailwindcss/typography"),

    // Component-level responsive design (cards that adapt to container)
    require("@tailwindcss/container-queries"),

    // Animation utilities (used by shadcn/ui if you adopt it later)
    require("tailwindcss-animate"),
  ],
};

export default config;