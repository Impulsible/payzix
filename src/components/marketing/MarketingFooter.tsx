import { connection } from "next/server";
import { Suspense } from "react";
import Link from "next/link";
import { PayzixMark } from "@/components/brand";

async function CurrentYear() {
  await connection();
  return <>{new Date().getFullYear()}</>;
}

const FOOTER_COLUMNS = [
  {
    title: "Personal",
    links: [
      { label: "Send Money", href: "/personal/send-money" },
      { label: "Pay Bills", href: "/personal/bills" },
      { label: "Virtual Cards", href: "/cards" },
      { label: "Save and Earn", href: "/savings" },
    ],
  },
  {
    title: "Business",
    links: [
      { label: "Merchant Account", href: "/business/merchant" },
      { label: "POS Terminals", href: "/business/pos" },
      { label: "Invoicing", href: "/business/invoicing" },
      { label: "Payment Links", href: "/business/payment-links" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Payzix", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Help Center", href: "/help" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Licenses", href: "/licenses" },
    ],
  },
] as const;

const SOCIALS = [
  {
    label: "X",
    href: "https://x.com/payzix",
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/payzix",
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/payzix",
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com/payzix",
    icon: (
      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
] as const;

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 pt-14 pb-10 sm:px-8 sm:pt-16 sm:pb-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Payzix, More than payments">
              <PayzixMark size="sm" />
              <span className="flex flex-col leading-none">
                <span className="font-heading text-xl font-extrabold tracking-tight text-text">
                  Payzix
                </span>
                <span className="tagline-script tagline-gradient -mt-0.5 text-base">
                  More than payments
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Money made simple for every Nigerian. Send, save, and spend from one beautiful app.
            </p>

            <p className="tagline-script mt-3 text-lg text-muted/80">
              More than payments.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-10 w-auto"
                />
              </a>
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-10 w-auto"
                />
              </a>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:border-green-500/40 hover:bg-green-500/5 hover:text-text"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 lg:gap-6">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-label text-text">{col.title}</p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-text"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-border bg-sunken/40 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex size-1.5 rounded-full bg-green-500" />
              <span className="text-xs font-medium text-text">Systems operational</span>
            </div>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span className="text-xs text-muted">Licensed by the Central Bank of Nigeria</span>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span className="text-xs text-muted">NDIC Insured up to ₦5,000,000</span>
          </div>
          <Link
            href="/status"
            className="text-xs font-semibold text-green-500 transition-colors hover:text-green-400"
          >
            Status page
          </Link>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-5 sm:flex-row sm:px-8">
          <p className="text-center text-xs text-muted sm:text-left">
            ©{" "}
            <Suspense fallback={<span>2025</span>}>
              <CurrentYear />
            </Suspense>{" "}
            Payzix Digital Services Limited. All rights reserved.
          </p>

          <p className="tagline-script text-sm text-muted/70">More than payments</p>

          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-muted transition-colors hover:text-text">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-muted transition-colors hover:text-text">
              Terms
            </Link>
            <Link href="/cookies" className="text-xs text-muted transition-colors hover:text-text">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}