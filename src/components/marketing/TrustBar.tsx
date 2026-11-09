"use client";

import { useEffect, useState } from "react";

type Partner = {
  id: string;
  name: string;
  category: string;
  basePing: number;
  status: "Operational" | "Optimal";
};

const PARTNERS: Partner[] = [
  { id: "nibss", name: "NIBSS", category: "Instant Transfer Switch", basePing: 12, status: "Operational" },
  { id: "interswitch", name: "Interswitch", category: "Card & POS Gateway", basePing: 18, status: "Optimal" },
  { id: "paystack", name: "Paystack", category: "Merchant Payments", basePing: 22, status: "Operational" },
  { id: "flutterwave", name: "Flutterwave", category: "Cross Border Switch", basePing: 25, status: "Optimal" },
  { id: "remita", name: "Remita", category: "Government Payments", basePing: 19, status: "Operational" },
  { id: "mastercard", name: "Mastercard", category: "Global Card Network", basePing: 15, status: "Operational" },
  { id: "visa", name: "Visa", category: "Global Payments", basePing: 14, status: "Optimal" },
  { id: "verve", name: "Verve", category: "Domestic Card Scheme", basePing: 11, status: "Operational" },
];

export function TrustBar() {
  const [hoveredPartner, setHoveredPartner] = useState<string | null>(null);
  const [pings, setPings] = useState<Record<string, number>>({});

  // Live real time latency simulation (fluctuates pings every 2.5s)
  useEffect(() => {
    const initialPings: Record<string, number> = {};
    PARTNERS.forEach((p) => {
      initialPings[p.id] = p.basePing;
    });
    setPings(initialPings);

    const interval = setInterval(() => {
      setPings((prev) => {
        const next = { ...prev };
        const randomPartner = PARTNERS[Math.floor(Math.random() * PARTNERS.length)];
        const variation = Math.floor(Math.random() * 5) - 2; // -2 to +2 variation
        next[randomPartner.id] = Math.max(8, randomPartner.basePing + variation);
        return next;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-surface/50 py-10 backdrop-blur-md">
      {/* Self-contained marquee keyframe animation */}
      <style jsx>{`
        @keyframes scrollMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-marquee {
          animation: scrollMarquee 28s linear infinite;
        }
        .animate-scroll-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--color-green-500)_0%,transparent_70%)] opacity-[0.03]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Regulatory Header with Live Pulse */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-500/25 bg-green-500/5 px-3.5 py-1 text-2xs font-semibold text-green-600 dark:text-green-400">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span>CBN Licensed Mobile Money Operator</span>
          </div>

          <span className="hidden text-muted/40 sm:inline">•</span>

          <span className="text-2xs font-bold tracking-wider text-muted uppercase">
            NDIC Insured Deposit Protection for all Wallets
          </span>
        </div>

        {/* Live Infinite Marquee Track */}
        <div className="relative overflow-hidden">
          {/* Left & Right Edge Gradient Fade Masks */}
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-24 bg-linear-to-r from-surface to-transparent" />
          <div className="pointer-events-none absolute top-0 bottom-0 right-0 z-10 w-24 bg-linear-to-l from-surface to-transparent" />

          {/* Continuous Ticker */}
          <div className="flex w-max animate-scroll-marquee items-center gap-6 sm:gap-8">
            {/* Duplicated array for smooth infinite loop */}
            {[...PARTNERS, ...PARTNERS].map((partner, idx) => {
              const currentPing = pings[partner.id] || partner.basePing;
              const itemKey = `${partner.id}-${idx}`;
              const isHovered = hoveredPartner === itemKey;

              return (
                <div
                  key={itemKey}
                  onMouseEnter={() => setHoveredPartner(itemKey)}
                  onMouseLeave={() => setHoveredPartner(null)}
                  className={`group relative flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-2.5 transition-all duration-300 ${
                    isHovered
                      ? "scale-105 border-green-500/40 bg-surface-raised shadow-lg shadow-green-500/10"
                      : "border-border/40 bg-surface-raised/50 hover:border-border hover:bg-surface-raised"
                  }`}
                >
                  {/* Status Indicator Dot */}
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>

                  {/* Partner Name & Live Ping */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-sm font-extrabold tracking-tight text-text">
                        {partner.name}
                      </span>
                      <span className="font-mono text-2xs font-bold text-green-600 dark:text-green-400 tabular-nums">
                        {currentPing}ms
                      </span>
                    </div>
                    <p className="text-2xs text-muted">
                      {partner.category}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Switch Infrastructure Status Strip */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/40 pt-4 text-2xs text-muted">
          <div className="flex items-center gap-2">
            <span className="status-dot status-dot-success shrink-0" />
            <span className="font-medium text-text-secondary">
              Direct NIBSS Settlement Engine Active
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono">
            <span>Transfer Latency: <strong className="text-text">1.2s</strong></span>
            <span>Card Auth: <strong className="text-text">99.98%</strong></span>
          </div>
        </div>

      </div>
    </section>
  );
}