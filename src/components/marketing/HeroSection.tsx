import Link from "next/link";
import { PayzixMark } from "@/components/brand";

const TESTIMONIALS = [
  {
    name: "Adaeze",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
  },
  {
    name: "Tunde",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    name: "Chidinma",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-16 sm:pb-24 lg:pt-20">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-hero opacity-[0.04] dark:opacity-100" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-green-500)_0%,transparent_55%)] opacity-10" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          
          {/* Left Column: Copy & Actions */}
          <div>
            {/* Regulatory & Trust Pill */}
            <div className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-3.5 py-1.5 text-xs font-semibold text-green-600 dark:text-green-400">
              <span className="status-dot status-dot-success shrink-0" />
              <span>CBN Licensed &amp; NDIC Insured</span>
              <span className="text-muted/40">•</span>
              <span className="text-text-secondary font-medium">Over 2 Million Users</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-text sm:text-6xl lg:text-7xl">
              Money made <br />
              <span className="text-gradient-brand">simple.</span>
            </h1>

            {/* Tagline */}
            <p className="tagline-script mt-3 text-2xl text-muted sm:text-3xl">
              <span className="tagline-flourish">More than payments.</span>
            </p>

            {/* Subtitle */}
            <p className="mt-5 max-w-lg text-base leading-relaxed text-text-secondary sm:text-lg">
              Send money instantly, pay zero transfer fees, save smartly, and run your business payments without headaches.
            </p>

            {/* Call to Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/signup" className="btn btn-primary btn-lg w-full sm:w-auto">
                Create Free Account
              </Link>
              <Link
                href="/demo"
                className="btn btn-secondary btn-lg flex w-full items-center justify-center gap-2 sm:w-auto"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-green-500"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
                See How It Works
              </Link>
            </div>

            {/* Quick Benefits Bullet Bar */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-muted">
              <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                ✓ Free instant debit card
              </span>
              <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                ✓ 3-second bank transfers
              </span>
              <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                ✓ No monthly charges
              </span>
            </div>

            {/* Store Badges */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#"
                className="transition-transform hover:scale-105 focus-visible:outline-none"
                aria-label="Download on the App Store"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-10 sm:h-11"
                />
              </a>
              <a
                href="#"
                className="transition-transform hover:scale-105 focus-visible:outline-none"
                aria-label="Get it on Google Play"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-10 sm:h-11"
                />
              </a>
            </div>

            {/* User Rating & Avatars */}
            <div className="mt-6 flex items-center gap-3 border-t border-border/40 pt-5">
              <div className="flex -space-x-2 shrink-0">
                {TESTIMONIALS.map((t) => (
                  <img
                    key={t.name}
                    src={t.avatar}
                    alt={t.name}
                    className="h-8 w-8 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <div className="text-xs sm:text-sm">
                <div className="flex items-center gap-1 text-amber-500">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                  <span className="ml-1 font-bold text-text">4.9</span>
                </div>
                <p className="text-2xs sm:text-xs text-muted">Rated by 12,000+ daily users in Nigeria</p>
              </div>
            </div>
          </div>

          {/* Right Column: Mobile App Preview Visual */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* Ambient Background Glows */}
            <div className="absolute -right-6 -top-6 h-64 w-64 rounded-full bg-green-500/20 blur-3xl sm:h-80 sm:w-80" />
            <div className="absolute -bottom-6 -left-6 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl sm:h-80 sm:w-80" />

            {/* Main Visual Container */}
            <div className="relative z-10 overflow-hidden rounded-4xl border border-border/40 shadow-2xl sm:rounded-5xl">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&q=85"
                alt="Happy customer using Payzix"
                className="h-115 w-full object-cover object-center sm:h-140 lg:h-150"
              />
              <div className="absolute inset-x-0 bottom-0 h-44 bg-linear-to-t from-navy/90 via-navy/30 to-transparent" />
              
              {/* Glass Footer Card on Image */}
              <div className="absolute right-4 bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md sm:right-5 sm:bottom-5 sm:left-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500 text-navy">
                  <PayzixMark size="sm" withBackground={false} decorative />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-white">
                    Everyday banking for everyone
                  </p>
                  <p className="tagline-script text-xs sm:text-sm text-green-300">
                    fast, secure, and stress free
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Card 1: Balance (Top Left) */}
            <div className="absolute top-10 -left-2 z-20 w-48 sm:w-56 animate-slide-down rounded-2xl border border-border/50 bg-surface/95 p-3.5 shadow-2xl backdrop-blur-md sm:-left-8 sm:p-4">
              <p className="text-2xs font-semibold tracking-wider text-muted uppercase">
                Available Balance
              </p>
              <p className="font-heading mt-1 text-xl sm:text-2xl font-extrabold tracking-tight text-text">
                <span className="align-super text-xs text-muted">₦</span>
                1,247,830
                <span className="text-xs text-muted">.50</span>
              </p>
              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="rounded-md bg-green-500/15 px-1.5 py-0.5 text-2xs font-bold text-green-600 dark:text-green-400">
                  ↑ 12.4%
                </span>
                <span className="text-2xs text-muted">this month</span>
              </div>
            </div>

            {/* Floating Card 2: Transfer Alert (Right Center) */}
            <div
              className="absolute top-1/2 -right-2 z-20 flex animate-slide-down items-center gap-2.5 sm:gap-3 rounded-2xl border border-border/50 bg-surface/95 px-3 py-2.5 sm:px-4 sm:py-3 shadow-2xl backdrop-blur-md sm:-right-6"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-success flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-success/10 text-base sm:text-lg">
                ✓
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-text truncate">Transfer Sent</p>
                <p className="text-2xs text-muted">₦25,000 to Chidi M.</p>
              </div>
            </div>

            {/* Floating Card 3: Cashback (Bottom Left) */}
            <div
              className="absolute bottom-20 -left-2 z-20 flex animate-slide-down items-center gap-2.5 sm:gap-3 rounded-2xl border border-border/50 bg-surface/95 px-3 py-2.5 sm:px-4 sm:py-3 shadow-2xl backdrop-blur-md sm:-left-6"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-base sm:text-lg">
                🎁
              </div>
              <div>
                <p className="text-xs font-bold text-text">Cashback Earned</p>
                <p className="text-2xs text-muted">+₦1,250 instant reward</p>
              </div>
            </div>

            {/* Top Badge: Speed */}
            <div className="bg-gradient-brand absolute -top-3 right-6 z-20 flex animate-float items-center gap-1.5 rounded-full px-3.5 py-1.5 text-navy shadow-xl">
              <span className="text-sm">⚡</span>
              <span className="text-xs font-extrabold">Transfers in 3 seconds</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}