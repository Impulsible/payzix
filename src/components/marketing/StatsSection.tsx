"use client";

import { useEffect, useRef, useState } from "react";

type StatItem = {
  numericValue: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  subtitle: string;
};

const STATS: StatItem[] = [
  {
    numericValue: 2.4,
    decimals: 1,
    suffix: "M+",
    label: "Happy Customers",
    subtitle: "Everyday Nigerians & merchants",
  },
  {
    numericValue: 850,
    prefix: "₦",
    suffix: "B+",
    label: "Processed Annually",
    subtitle: "Zero lost transactions",
  },
  {
    numericValue: 99.99,
    decimals: 2,
    suffix: "%",
    label: "Network Uptime",
    subtitle: "24/7 uninterrupted service",
  },
  {
    numericValue: 3,
    prefix: "<",
    suffix: "s",
    label: "Average Transfer Speed",
    subtitle: "Instant bank delivery",
  },
];

function AnimatedCounter({
  target,
  decimals = 0,
  prefix = "",
  suffix = "",
  isVisible,
}: {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds counting animation

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function: easeOutExpo for realistic fast-then-slow count
      const easeOutProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(easeOutProgress * target);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, target]);

  const formattedNumber = count.toFixed(decimals);

  return (
    <span className="tabular-nums">
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger animation once
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-dark py-16 sm:py-24"
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(39,227,154,0.12)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Live Ticker Pill */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-white/90">
              Live Platform Operations • All Systems Operational
            </span>
          </div>
        </div>

        {/* Live Animated Grid Cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-green-500/40 hover:bg-white/10"
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-linear-to-r from-transparent via-green-500/0 to-transparent transition-all duration-500 group-hover:via-green-500/60" />

              <p className="font-heading text-3xl font-extrabold tracking-tight text-green-400 sm:text-5xl">
                <AnimatedCounter
                  target={s.numericValue}
                  decimals={s.decimals}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  isVisible={isVisible}
                />
              </p>

              <p className="mt-3 text-sm sm:text-base font-bold text-white">
                {s.label}
              </p>

              <p className="mt-1 text-2xs sm:text-xs text-white/60">
                {s.subtitle}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Trust Micro Strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-2xs sm:text-xs text-white/50">
          <span className="flex items-center gap-1.5">
            <span className="text-green-400 font-bold">✓</span> Realtime Settlement Engine
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <span className="text-green-400 font-bold">✓</span> Bank Grade Encryption
          </span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="flex items-center gap-1.5">
            <span className="text-green-400 font-bold">✓</span> Direct CBN Switching Integration
          </span>
        </div>

      </div>
    </section>
  );
}