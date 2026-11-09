"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  Send,
  CreditCard,
  PiggyBank,
  BarChart3,
  Sparkles,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { PayzixMark } from "@/components/brand";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/app", label: "Overview", icon: LayoutDashboard },
  { href: "/app/wallet", label: "Wallet", icon: Wallet },
  { href: "/app/transfers", label: "Transfers", icon: Send },
  { href: "/app/cards", label: "Cards", icon: CreditCard },
  { href: "/app/savings", label: "Savings", icon: PiggyBank },
  { href: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/app/pulse", label: "Pulse", icon: Sparkles },
  { href: "/app/notifications", label: "Notifications", icon: Bell },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

const MOBILE_BOTTOM_NAV = [
  { href: "/app", label: "Overview", icon: LayoutDashboard },
  { href: "/app/wallet", label: "Wallet", icon: Wallet },
  { href: "/app/transfers", label: "Send", icon: Send },
  { href: "/app/cards", label: "Cards", icon: CreditCard },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

function getInitials(name?: string) {
  if (!name) return "PZ";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.substring(0, 2).toUpperCase();
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const initials = getInitials(user?.fullName);

  return (
    <div className="min-h-screen bg-background text-text selection:bg-green-500 selection:text-navy">
      
      {/* ================================================================
          1. DESKTOP SIDEBAR
          ================================================================ */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border/60 bg-surface/90 backdrop-blur-xl md:flex">
        
        {/* Brand Header */}
        <div className="flex h-18 items-center gap-3 border-b border-border/50 px-5">
          <Link href="/app" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
            <PayzixMark size="sm" />
            <div className="flex flex-col leading-none">
              <span className="font-heading text-lg font-extrabold tracking-tight text-text">
                Payzix
              </span>
              <span className="tagline-script tagline-gradient -mt-0.5 text-xs">
                More than payments
              </span>
            </div>
          </Link>
        </div>

        {/* Verification Status Pill */}
        <div className="px-4 pt-4">
          <div className="flex items-center gap-2 rounded-xl border border-green-500/25 bg-green-500/5 px-3 py-2 text-2xs font-semibold text-green-600 dark:text-green-400">
            <ShieldCheck className="h-4 w-4 shrink-0 text-green-500" />
            <div className="min-w-0">
              <p className="truncate font-bold text-text text-xs">Tier 3 Account</p>
              <p className="truncate text-2xs text-muted">CBN Verified Wallet</p>
            </div>
          </div>
        </div>

        {/* Main Navigation Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all duration-200",
                  active
                    ? "bg-green-500 text-navy shadow-md shadow-green-500/20"
                    : "text-text-secondary hover:bg-surface-raised hover:text-text"
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0 transition-transform group-hover:scale-110", active ? "text-navy" : "text-muted group-hover:text-text")} />
                <span className="truncate">{item.label}</span>
                {active && (
                  <span className="absolute right-2 h-1.5 w-1.5 rounded-full bg-navy" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Account Footer */}
        <div className="border-t border-border/50 p-3">
          <div className="mb-2 flex items-center gap-3 rounded-2xl border border-border/60 bg-surface-raised p-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-xs font-bold text-green-600 dark:text-green-400">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-text">
                {user?.fullName || "Valued Customer"}
              </p>
              <p className="truncate text-2xs text-muted">
                {user?.email || "Personal Wallet"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="flex h-10 w-full items-center justify-between rounded-xl border border-border/60 bg-surface px-3 text-xs font-bold text-text-secondary transition-colors hover:border-red-500/40 hover:bg-red-500/5 hover:text-red-500 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </span>
            <ChevronRight className="h-3.5 w-3.5 opacity-50" />
          </button>
        </div>
      </aside>

      {/* ================================================================
          2. MOBILE TOP HEADER
          ================================================================ */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/60 bg-surface/80 px-4 backdrop-blur-xl md:hidden">
        <Link href="/app" className="flex items-center gap-2">
          <PayzixMark size="xs" />
          <span className="font-heading text-base font-extrabold tracking-tight text-text">
            Payzix
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/app/notifications"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-surface-raised text-text-secondary hover:text-text"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-surface-raised text-text"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* ================================================================
          3. MOBILE DRAWER SHEET
          ================================================================ */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-navy/70 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col bg-surface shadow-2xl transition-transform duration-300 ease-out md:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border/60 px-5">
          <div className="flex items-center gap-2">
            <PayzixMark size="xs" />
            <span className="font-heading font-extrabold text-text">Payzix Menu</span>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-surface-raised text-muted hover:text-text"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* User Card inside Mobile Drawer */}
        <div className="border-b border-border/50 p-4">
          <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-surface-raised p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-navy">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-text">
                {user?.fullName || "Valued Customer"}
              </p>

              <div className="mt-0.5 flex items-center gap-1 text-2xs font-semibold text-green-600 dark:text-green-400">
                <ShieldCheck className="h-3 w-3" />
                <span>Tier 3 Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Links */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-bold transition-colors",
                  active
                    ? "bg-green-500 text-navy font-extrabold"
                    : "text-text-secondary hover:bg-surface-raised hover:text-text"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Drawer Footer */}
        <div className="border-t border-border/50 p-4">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              logout();
            }}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 text-xs font-bold text-red-500 hover:bg-red-500/20 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out of Payzix</span>
          </button>
        </div>
      </div>

      {/* ================================================================
          4. MAIN CONTENT VIEWPORT
          ================================================================ */}
      <div className="md:pl-64">
        <main className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
          {children}
        </main>
      </div>

      {/* ================================================================
          5. MOBILE BOTTOM NAVIGATION BAR
          ================================================================ */}
      <nav className="fixed bottom-0 inset-x-0 z-30 flex h-16 items-center justify-around border-t border-border/60 bg-surface/90 backdrop-blur-xl md:hidden">
        {MOBILE_BOTTOM_NAV.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 text-2xs font-bold transition-colors py-1 px-3",
                active ? "text-green-600 dark:text-green-400" : "text-muted hover:text-text"
              )}
            >
              <div className={cn("flex h-8 w-8 items-center justify-center rounded-xl transition-all", active ? "bg-green-500/15" : "")}>
                <Icon className={cn("h-4 w-4", active ? "text-green-600 dark:text-green-400" : "")} />
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

    </div>
  );
}