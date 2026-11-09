"use client";

import { useState } from "react";
import Link from "next/link";

type TestimonialCategory = "all" | "business" | "personal" | "freelance";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  location: string;
  category: "business" | "personal" | "freelance";
  quote: string;
  avatar: string;
  metricValue: string;
  metricLabel: string;
  badge: string;
  liveTag: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "adaeze",
    name: "Adaeze Nwosu",
    role: "Owner, Ada Boutique",
    location: "Balogun Market, Lagos",
    category: "business",
    quote:
      "I get paid by customers instantly now. No more waiting two days for money to show up in my account. Payzix changed my daily shop sales completely.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80",
    metricValue: "₦850,000+",
    metricLabel: "Weekly Collections",
    badge: "Verified Merchant",
    liveTag: "POS Settlement Received • 2s ago",
  },
  {
    id: "emeka",
    name: "Emeka Okonkwo",
    role: "Supermarket Manager",
    location: "Onitsha, Anambra",
    category: "business",
    quote:
      "Our store handles hundreds of payments during evening rush hours. The Payzix POS machine never drops network, so customer lines move fast every single day.",
    avatar:
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=300&q=80",
    metricValue: "99.99%",
    metricLabel: "POS Network Uptime",
    badge: "Retail Partner",
    liveTag: "Store POS Terminal Active",
  },
  {
    id: "tunde",
    name: "Tunde Bakare",
    role: "Student & Creator",
    location: "UNILAG, Yaba",
    category: "personal",
    quote:
      "My mum sends my allowance on Payzix and it reflects immediately. The zero transfer fees and instant airtime cashback are super helpful for students.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    metricValue: "Under 3s",
    metricLabel: "Transfer Speed",
    badge: "Daily Wallet User",
    liveTag: "Allowance Received • Instant",
  },
  {
    id: "chidinma",
    name: "Chidinma Eze",
    role: "Digital Designer",
    location: "Abuja, FCT",
    category: "freelance",
    quote:
      "I pay my rent, buy data, and save toward my new laptop all from one single app. It just works. I do not need five different banking apps anymore.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80",
    metricValue: "₦140,000",
    metricLabel: "Target Savings Automated",
    badge: "Smart Saver",
    liveTag: "Automated Vault Funded",
  },
];

const CATEGORIES: { id: TestimonialCategory; label: string }[] = [
  { id: "all", label: "All Stories" },
  { id: "business", label: "Shop Owners & POS" },
  { id: "personal", label: "Everyday Banking" },
  { id: "freelance", label: "Freelancers & Creators" },
];

export function TestimonialsSection() {
  const [activeCategory, setActiveCategory] =
    useState<TestimonialCategory>("all");

  const filtered =
    activeCategory === "all"
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.category === activeCategory);

  const featured = filtered[0] || TESTIMONIALS[0];
  const secondary = filtered.slice(1);

  return (
    <section className="relative overflow-hidden bg-surface py-20 sm:py-28">
      {/* Background Accent Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--color-green-500)_0%,transparent_40%)] opacity-[0.05]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-cyan-500)_0%,transparent_35%)] opacity-[0.04]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-4 py-1.5 text-xs font-semibold text-green-600 dark:text-green-400">
            <span className="status-dot status-dot-success shrink-0" />
            <span>Real Stories from Real People</span>
          </div>

          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-text sm:text-5xl">
            Trusted by everyday Nigerians <br className="hidden sm:block" />
            and thriving businesses.
          </h2>

          <p className="tagline-script mt-3 text-2xl text-muted sm:text-3xl">
            <span className="tagline-flourish">More than payments.</span>
          </p>

          {/* Social Proof Stats Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-border/60 bg-surface-raised/80 px-6 py-3.5 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="text-amber-500 font-bold text-base sm:text-lg">★ 4.9/5</span>
              <span className="text-xs text-muted">Rating from 12,000+ reviews</span>
            </div>
            <div className="hidden h-4 w-px bg-border/80 sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-text font-bold text-sm sm:text-base">2M+</span>
              <span className="text-xs text-muted">Active Users</span>
            </div>
            <div className="hidden h-4 w-px bg-border/80 sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-green-600 dark:text-green-400 font-bold text-sm sm:text-base">99.9%</span>
              <span className="text-xs text-muted">Network Success Rate</span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-green-500 text-navy shadow-md shadow-green-500/20 scale-105"
                      : "bg-surface-raised text-text-secondary hover:bg-surface-hover hover:text-text border border-border/50"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Testimonial Grid */}
        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          
          {/* Featured Hero Card (Spans 7 columns on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-border/60 bg-linear-to-br from-surface-raised via-surface to-green-500/5 p-6 sm:p-8 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 h-48 w-48 rounded-full bg-green-500/10 blur-3xl group-hover:bg-green-500/20 transition-all duration-500" />

            <div>
              {/* Header Badge & Live Alert Pill */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-2xs font-bold text-green-600 dark:text-green-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  {featured.badge}
                </span>
                
                <span className="text-2xs font-mono font-medium text-muted bg-surface/80 border border-border/50 px-3 py-1 rounded-full">
                  {featured.liveTag}
                </span>
              </div>

              {/* Quote in Large Display Font */}
              <blockquote className="text-lg sm:text-2xl font-medium leading-relaxed text-text tracking-tight">
                "{featured.quote}"
              </blockquote>
            </div>

            {/* Featured Card Footer with User Info & Metric Pill */}
            <div className="mt-8 pt-6 border-t border-border/50 flex flex-wrap items-end justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative">
                  <img
                    src={featured.avatar}
                    alt={featured.name}
                    className="h-14 w-14 rounded-full border-2 border-green-500/40 object-cover shadow-sm"
                  />
                  <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-navy text-2xs font-extrabold">
                    ✓
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-text text-base sm:text-lg">
                    {featured.name}
                  </h3>
                  <p className="text-xs text-text-secondary">{featured.role}</p>
                  <p className="text-2xs text-muted mt-0.5">{featured.location}</p>
                </div>
              </div>

              {/* Stat Highlight Card */}
              <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-2.5 text-right">
                <p className="font-heading text-xl font-extrabold text-green-600 dark:text-green-400">
                  {featured.metricValue}
                </p>
                <p className="text-2xs font-semibold text-muted uppercase tracking-wider">
                  {featured.metricLabel}
                </p>
              </div>
            </div>
          </div>

          {/* Secondary Bento Column (Spans 5 columns on desktop) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondary.map((t) => (
              <div
                key={t.id}
                className="flex flex-col justify-between rounded-3xl border border-border/60 bg-surface-raised p-6 shadow-md hover:border-green-500/30 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-2xs font-bold text-green-600 dark:text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 rounded-full">
                      {t.badge}
                    </span>
                    <span className="text-2xs text-muted">{t.location}</span>
                  </div>

                  <p className="text-sm leading-relaxed text-text-secondary group-hover:text-text transition-colors">
                    "{t.quote}"
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-10 w-10 rounded-full border border-border object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-xs text-text">{t.name}</h4>
                      <p className="text-2xs text-muted">{t.role}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-xs text-text block">
                      {t.metricValue}
                    </span>
                    <span className="text-2xs text-muted block">
                      {t.metricLabel}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Call to Action Strip */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 rounded-3xl border border-border/60 bg-surface-raised/90 px-6 py-4 shadow-lg backdrop-blur-md">
            <div className="text-left">
              <p className="text-sm font-bold text-text">
                Ready to experience stress free banking?
              </p>
              <p className="text-xs text-muted">
                Open a free personal or business account in less than 2 minutes.
              </p>
            </div>
            <Link
              href="/signup"
              className="btn btn-primary btn-md whitespace-nowrap w-full sm:w-auto text-center"
            >
              Get Started Now
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}