import Link from "next/link";
import { PayzixMark } from "@/components/brand";
import { AuthFooterYear } from "./auth-footer-year";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background selection:bg-green-500 selection:text-navy">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,var(--color-green-500)_0%,transparent_50%)] opacity-[0.05] dark:opacity-15" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-green-500/10 blur-3xl" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-surface/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Left: Same brand pattern as SiteHeader */}
          <div className="flex items-center gap-3.5">
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90 focus-visible:outline-none"
              aria-label="Payzix, More than payments"
            >
              <PayzixMark size="sm" />
              <span className="flex flex-col leading-none">
                <span className="font-heading text-lg font-extrabold tracking-tight text-text">
                  Payzix
                </span>
                <span className="tagline-script tagline-gradient -mt-0.5 text-[13px] sm:text-sm">
                  More than payments
                </span>
              </span>
            </Link>
          </div>

          {/* Center: CBN & NDIC Security Pill */}
          <div className="hidden md:inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/5 px-3.5 py-1 text-2xs font-semibold text-green-600 dark:text-green-400">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span>CBN Licensed MMO</span>
            <span className="text-muted/40">•</span>
            <span className="text-text-secondary font-medium">NDIC Insured</span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://wa.me/2348000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface-raised/50 px-3 py-1.5 text-xs font-semibold text-text-secondary transition-all hover:bg-surface-raised hover:text-text"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-500"
                aria-hidden="true"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span>Need Help?</span>
            </a>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-surface-raised px-3.5 py-1.5 text-xs font-semibold text-text transition-all hover:border-green-500/40 hover:bg-surface-hover focus-visible:outline-none"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted"
                aria-hidden="true"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Back to home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl">{children}</div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 bg-surface/60 py-5 text-center text-xs backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-2 text-2xs text-muted sm:text-xs">
            <span className="inline-flex items-center gap-1 font-semibold text-green-600 dark:text-green-400">
              ✓ 256 bit SSL Secured
            </span>
            <span className="text-muted/40">•</span>
            <span>Central Bank of Nigeria Licensed</span>
            <span className="text-muted/40">•</span>
            <span>NDIC Insured Deposits</span>
          </div>

          <p className="text-2xs text-muted sm:text-xs">
            © <AuthFooterYear /> Payzix Technologies Ltd. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}