import type { Metadata, Viewport } from "next";
import { Manrope, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/* ================================================================
   1. FONT CONFIGURATION
   - Variable fonts (Manrope, Inter) load the full weight range
     at near-zero extra cost — perfect for fintech UIs that use
     400→800 across headings, body, and amount displays.
   - IBM Plex Mono is NOT variable, so we cherry-pick weights.
   ================================================================ */

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
  // Variable font — covers weights 200–800 automatically
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  // Variable font — covers weights 100–900 automatically
});

const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
  preload: false, // loaded on-demand (data screens only)
});

/* ================================================================
   2. VIEWPORT (Next.js 14+ separate export)
   - viewportFit=cover enables safe-area insets for notch phones
   - themeColor matches your brand for mobile browser chrome
   ================================================================ */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#050d18" },
  ],
  colorScheme: "light dark",
};

/* ================================================================
   3. METADATA — SEO, Open Graph, Twitter, Icons, PWA
   ================================================================ */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://payzix.com";
const BRAND_NAME = "Payzix";
const DEFAULT_TITLE = "More than payments.";
const DEFAULT_DESCRIPTION =
  "A financial operating system for individuals, businesses, and developers. Send, receive, save, and spend — all in one app.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${BRAND_NAME} — ${DEFAULT_TITLE}`,
    template: `%s | ${BRAND_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,

  keywords: [
    "Payzix",
    "fintech",
    "mobile money",
    "payments",
    "transfers",
    "Nigeria",
    "Africa",
    "digital banking",
    "wallet",
    "USSD",
  ],

  authors: [{ name: BRAND_NAME, url: SITE_URL }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-NG": `${SITE_URL}/ng`,
      "en-GB": `${SITE_URL}/gb`,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: BRAND_NAME,
    title: `${BRAND_NAME} — ${DEFAULT_TITLE}`,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${BRAND_NAME} — Financial Operating System`,
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@payaborode",    // ← replace with your handle
    creator: "@payaborode",  // ← replace
    title: `${BRAND_NAME} — ${DEFAULT_TITLE}`,
    description: DEFAULT_DESCRIPTION,
    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  manifest: "/manifest.json",

  appleWebApp: {
    capable: true,
    title: BRAND_NAME,
    statusBarStyle: "black-translucent",
  },

  formatDetection: {
    telephone: false,  // prevent iOS auto-linking account numbers
    date: false,
    address: false,
    email: false,
  },

  other: {
    // Prevents iOS from auto-detecting numbers as phone links
    "format-detection": "telephone=no",
    // PWA splash screen color
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

/* ================================================================
   4. STRUCTURED DATA (JSON-LD)
   - Helps Google render rich results for your fintech app
   ================================================================ */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: DEFAULT_DESCRIPTION,
  sameAs: [
    "https://twitter.com/payzix",
    "https://instagram.com/payzix",
    "https://linkedin.com/company/payzix",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    availableLanguage: ["English"],
  },
  areaServed: {
    "@type": "Country",
    name: "Nigeria",
  },
};

/* ================================================================
   5. ROOT LAYOUT
   ================================================================ */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      // suppressHydrationWarning is REQUIRED if you add next-themes
      // or any client-side dark mode toggle later.
      suppressHydrationWarning
    >
      <head>
        {/* ── Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* ── Preconnect for external APIs (analytics, CDN) ── */}
        <link rel="preconnect" href="https://api.payzix.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* ── DNS Prefetch (non-critical third parties) ── */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://cdn.mixpanel.com" />

        {/* ── Prevent FOUC on dark mode ── */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('payzix-theme');
                  if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>

      <body
        className={`
          ${manrope.variable}
          ${inter.variable}
          ${mono.variable}
          antialiased
          selection:bg-[rgba(39,227,154,0.25)]
        `}
      >
        {/* ── Accessibility: Skip to main content ── */}
        <a
          href="#main-content"
          className="skip-link"
        >
          Skip to main content
        </a>

        {/*
          ── Providers (uncomment when you add them) ──
          Wrap with your providers in this order:

          <ThemeProvider>
            <QueryClientProvider>
              <ToasterProvider>
                {children}
              </ToasterProvider>
            </QueryClientProvider>
          </ThemeProvider>
        */}

        <main id="main-content" className="relative">
          {children}
        </main>

        {/* ── Toast / Notification Portal ── */}
        <div
          id="payzix-toast-root"
          aria-live="polite"
          aria-atomic="true"
          className="pointer-events-none fixed inset-0 z-700"
        />

        {/* ── Modal / Sheet Portal ── */}
        <div
          id="payzix-modal-root"
          className="fixed inset-0 z-500"
        />

        {/*
          ── Analytics (load deferred — non-blocking) ──
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `}
          </Script>
        */}
      </body>
    </html>
  );
}