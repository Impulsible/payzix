"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Copy,
  Plus,
  Send,
  Smartphone,
  Zap,
  Tv,
  ArrowUpRight,
  ArrowDownLeft,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  CreditCard,
  Gift,
  Building2,
  ChevronRight,
  Check,
} from "lucide-react";
import { Badge, Card, CardContent } from "@/components/ui";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const QUICK_SERVICES = [
  { label: "Airtime", href: "/app/bills?cat=airtime", icon: Smartphone, color: "text-blue-500 bg-blue-500/10" },
  { label: "Data Bundle", href: "/app/bills?cat=data", icon: Zap, color: "text-amber-500 bg-amber-500/10" },
  { label: "Electricity", href: "/app/bills?cat=electricity", icon: Zap, color: "text-green-500 bg-green-500/10" },
  { label: "Cable TV", href: "/app/bills?cat=tv", icon: Tv, color: "text-purple-500 bg-purple-500/10" },
  { label: "Virtual Card", href: "/app/cards", icon: CreditCard, color: "text-cyan-500 bg-cyan-500/10" },
];

const RECENT_TRANSACTIONS = [
  {
    id: "tx-1",
    title: "Transfer to Chidi Okonkwo",
    subtitle: "Kuda Bank · Today at 02:45 PM",
    amount: "₦25,000.00",
    type: "debit",
    status: "Successful",
  },
  {
    id: "tx-2",
    title: "POS Settlement from Ada Boutique",
    subtitle: "Balogun Terminal · Today at 11:12 AM",
    amount: "+₦85,000.00",
    type: "credit",
    status: "Successful",
  },
  {
    id: "tx-3",
    title: "MTN Data Subscription",
    subtitle: "10GB Monthly Plan · Yesterday at 08:30 PM",
    amount: "₦3,500.00",
    type: "debit",
    status: "Successful",
  },
  {
    id: "tx-4",
    title: "Wallet Topup via Bank Transfer",
    subtitle: "First Bank · Yesterday at 09:15 AM",
    amount: "+₦150,000.00",
    type: "credit",
    status: "Successful",
  },
];

export default function AppOverviewPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);

  const accountNumber = "9012345678";
  const bankName = "Payzix Microfinance Bank";

  function handleCopyAccount() {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    toast({
      variant: "success",
      title: "Account Number Copied",
      description: `${accountNumber} (${bankName}) copied to clipboard.`,
    });
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div className="space-y-6">
      
      {/* 1. Header Greeting Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-text sm:text-3xl">
              Welcome back, {user?.fullName?.split(" ")[0] || "Adaeze"} 👋
            </h1>
          </div>
          <p className="mt-1 text-xs text-text-secondary sm:text-sm">
            Here is your daily account overview and active wallet balance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="success" className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            Tier 3 Verified
          </Badge>
        </div>
      </div>

      {/* 2. Main Wallet Card */}
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-dark p-6 sm:p-8 shadow-2xl text-white">
        {/* Background Ambient Glows */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-green-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative z-10 grid gap-6 lg:grid-cols-12 lg:items-center">
          
          {/* Balance Display Column */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
              <span>Available Wallet Balance</span>
              <button
                type="button"
                onClick={() => setShowBalance(!showBalance)}
                className="text-white/60 hover:text-white transition-colors cursor-pointer"
                aria-label={showBalance ? "Hide balance" : "Show balance"}
              >
                {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-heading text-3xl font-extrabold tracking-tight sm:text-5xl text-white">
                {showBalance ? "₦1,247,830.50" : "₦ • • • • • • •"}
              </span>
            </div>

            {/* Account Details Box */}
            <div className="mt-4 inline-flex flex-wrap items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 backdrop-blur-md">
              <Building2 className="h-4 w-4 text-green-300 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-white">{accountNumber}</span>
                <span className="mx-1.5 text-white/40">•</span>
                <span className="text-white/80">{bankName}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyAccount}
                className="ml-2 flex h-6 w-6 items-center justify-center rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
                title="Copy account number"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-green-300" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          {/* Quick Action Buttons Column */}
          <div className="lg:col-span-5 flex flex-wrap gap-2.5 sm:gap-3">
            <Link
              href="/app/wallet"
              className="flex-1 min-w-30 flex items-center justify-center gap-2 rounded-xl bg-green-500 py-3 px-4 text-xs font-extrabold text-navy transition-transform hover:scale-105 shadow-md shadow-green-500/20"
            >
              <Plus className="h-4 w-4" />
              <span>Add Money</span>
            </Link>

            <Link
              href="/app/transfers"
              className="flex-1 min-w-30 flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 py-3 px-4 text-xs font-bold text-white hover:bg-white/20 transition-all"
            >
              <Send className="h-4 w-4 text-green-300" />
              <span>Send Money</span>
            </Link>
          </div>

        </div>
      </div>

      {/* 3. Financial Summary Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        
        {/* Savings Vault */}
        <Card className="border-border/60 bg-surface shadow-sm hover:border-green-500/30 transition-all">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10 text-green-600 dark:text-green-400">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <span>Target Savings Vault</span>
              </div>
              <Badge variant="success" className="text-2xs">15% p.a.</Badge>
            </div>
            <div className="mt-3 font-heading text-2xl font-extrabold text-text">
              {showBalance ? "₦450,000.00" : "₦ • • • • •"}
            </div>
            <div className="mt-2 flex items-center justify-between text-2xs text-muted">
              <span>Next interest payout: 1st of next month</span>
              <Link href="/app/savings" className="font-bold text-green-600 dark:text-green-400 hover:underline">
                Manage
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Cashback Rewards */}
        <Card className="border-border/60 bg-surface shadow-sm hover:border-green-500/30 transition-all">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                  <Gift className="h-4 w-4" />
                </div>
                <span>Cashback Earned</span>
              </div>
              <span className="text-2xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                Active Reward
              </span>
            </div>
            <div className="mt-3 font-heading text-2xl font-extrabold text-text">
              {showBalance ? "₦3,450.00" : "₦ • • •"}
            </div>
            <div className="mt-2 flex items-center justify-between text-2xs text-muted">
              <span>Earn 2% back on airtime &amp; bills</span>
              <button
                type="button"
                onClick={() => toast({ title: "Cashback Redeemed", description: "₦3,450 added to main balance." })}
                className="font-bold text-green-600 dark:text-green-400 hover:underline cursor-pointer"
              >
                Redeem
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Daily Transfer Limit */}
        <Card className="border-border/60 bg-surface shadow-sm sm:col-span-2 lg:col-span-1">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-text-secondary">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span>Daily Limit Usage</span>
              </div>
              <span className="text-2xs font-bold text-muted">Tier 3 Verified</span>
            </div>
            <div className="mt-3 font-heading text-xl font-extrabold text-text">
              ₦28,500 <span className="text-xs font-normal text-muted">/ ₦5,000,000.00</span>
            </div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-surface-raised overflow-hidden">
              <div className="h-full w-[2%] rounded-full bg-green-500" />
            </div>
          </CardContent>
        </Card>

      </div>

      {/* 4. Quick Services Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading text-base font-bold text-text">Quick Services</h2>
          <Link href="/app/bills" className="text-xs font-bold text-green-600 dark:text-green-400 hover:underline">
            View All Services
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {QUICK_SERVICES.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-surface p-4 text-center shadow-xs hover:border-green-500/40 hover:bg-surface-raised transition-all"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-text">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 5. Recent Transactions Feed */}
      <Card className="border-border/60 bg-surface shadow-sm">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
            <div>
              <h2 className="font-heading text-lg font-bold text-text">Recent Transactions</h2>
              <p className="text-2xs text-muted">Realtime activity on your Payzix account</p>
            </div>

            <Link
              href="/app/transfers"
              className="inline-flex items-center gap-1 text-xs font-bold text-green-600 dark:text-green-400 hover:underline"
            >
              <span>Full History</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {RECENT_TRANSACTIONS.map((tx) => {
              const isCredit = tx.type === "credit";
              return (
                <div
                  key={tx.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-border/40 bg-surface-raised/50 p-3.5 hover:bg-surface-raised transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        isCredit
                          ? "bg-green-500/10 text-green-600 dark:text-green-400"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {isCredit ? <ArrowDownLeft className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-text">{tx.title}</p>
                      <p className="truncate text-2xs text-muted mt-0.5">{tx.subtitle}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <p
                      className={`font-heading text-xs font-extrabold ${
                        isCredit ? "text-green-600 dark:text-green-400" : "text-text"
                      }`}
                    >
                      {showBalance ? tx.amount : "₦ • • •"}
                    </p>

                    <div className="mt-0.5 flex items-center justify-end gap-1 text-2xs font-semibold text-green-600 dark:text-green-400">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>{tx.status}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 6. Security Reassurance Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-green-500/20 bg-green-500/5 p-4 text-xs">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="h-5 w-5 text-green-500 shrink-0" />
          <div>
            <p className="font-bold text-text">Central Bank of Nigeria Regulated MMO</p>
            <p className="text-2xs text-muted">Your funds are protected by the NDIC up to ₦5,000,000.00.</p>
          </div>
        </div>

        <Link
          href="/app/settings"
          className="rounded-xl border border-border/60 bg-surface px-3 py-1.5 text-2xs font-bold text-text hover:bg-surface-raised transition-colors"
        >
          Security Settings
        </Link>
      </div>

    </div>
  );
}