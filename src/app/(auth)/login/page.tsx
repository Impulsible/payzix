"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input } from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { apiFetch } from "@/lib/api-client";

type LoginMethod = "phone" | "email";

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();
  const { refresh } = useAuth();

  const [loginMethod, setLoginMethod] = useState<LoginMethod>("email");
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        [loginMethod === "phone" ? "phone" : "email"]: form.identifier,
        password: form.password,
        rememberMe,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      toast({
        variant: "error",
        title: "Sign in failed",
        description: res.error || "Please check your details and try again.",
      });
      return;
    }

    await refresh();
    toast({
      variant: "success",
      title: "Welcome back to Payzix",
    });

    const next = params.get("next") || "/app";
    router.push(next);
    router.refresh();
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border/60 bg-surface shadow-2xl">
      <div className="grid lg:grid-cols-12">
        
        {/* Left Visual Column */}
        <div className="relative hidden lg:col-span-6 lg:flex flex-col justify-between overflow-hidden bg-gradient-dark p-8 xl:p-10 text-white">
          {/* Background Ambient Glows */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-green-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

          {/* Background Real Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1000&q=85"
              alt="Shop owner taking payments"
              className="h-full w-full object-cover opacity-25 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/85 to-navy/40" />
          </div>

          {/* Top Tagline */}
          <div className="relative z-10">
            <p className="tagline-script text-3xl text-green-300">
              <span className="tagline-flourish">More than payments.</span>
            </p>
            <p className="text-xs text-white/70 mt-1">
              Everyday banking made simple for everyone.
            </p>
          </div>

          {/* Main Showcase */}
          <div className="relative z-10 my-auto py-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3.5 py-1 text-xs font-semibold text-green-300">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Trusted by 2 Million+ Nigerians
            </div>

            <h2 className="font-heading mt-4 text-2xl xl:text-3xl font-extrabold leading-tight text-white">
              Simpler banking for your daily transactions.
            </h2>

            <p className="mt-3 text-xs xl:text-sm text-white/70 leading-relaxed max-w-sm">
              Send money in 3 seconds, manage shop payments, collect transfers, and earn cashback every day.
            </p>

            {/* Live Transaction Proof Chip */}
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md max-w-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-500 text-navy font-extrabold text-base">
                ✓
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white">Payment Received</p>
                <p className="text-2xs text-green-300">₦85,000 from Balogun Market POS</p>
              </div>
            </div>
          </div>

          {/* Bottom Security Badges */}
          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4 text-2xs text-white/60">
            <span>✓ CBN Licensed MMO</span>
            <span>✓ NDIC Insured Deposits</span>
            <span>✓ 256 bit Encryption</span>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="col-span-12 lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            {/* Title */}
            <div className="mb-5">
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-green-500/25 bg-green-500/10 px-2.5 py-0.5 text-2xs font-semibold text-green-600 dark:text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span>Secure Sign In</span>
              </div>
              
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
                Sign in to Payzix
              </h1>
              <p className="mt-1 text-xs text-text-secondary">
                Enter your registered details to access your account.
              </p>
            </div>

            {/* Switcher Tabs (Email vs Phone) */}
            <div className="flex rounded-xl border border-border/60 bg-surface-raised p-1">
              <button
                type="button"
                onClick={() => {
                  setLoginMethod("email");
                  setForm((f) => ({ ...f, identifier: "" }));
                }}
                className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
                  loginMethod === "email"
                    ? "bg-surface text-text shadow-sm border border-border/40"
                    : "text-muted hover:text-text"
                }`}
              >
                Email Address
              </button>

              <button
                type="button"
                onClick={() => {
                  setLoginMethod("phone");
                  setForm((f) => ({ ...f, identifier: "" }));
                }}
                className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
                  loginMethod === "phone"
                    ? "bg-surface text-text shadow-sm border border-border/40"
                    : "text-muted hover:text-text"
                }`}
              >
                Phone Number
              </button>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              <div>
                {loginMethod === "email" ? (
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={form.identifier}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, identifier: e.target.value }))
                    }
                    className="h-11 rounded-xl text-sm"
                  />
                ) : (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text">Phone Number</label>
                    <div className="flex rounded-xl border border-border/60 bg-surface focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 overflow-hidden">
                      <div className="flex items-center gap-1.5 bg-surface-raised px-3 border-r border-border/60 text-xs font-bold text-text-secondary shrink-0">
                        <span className="text-sm">🇳🇬</span>
                        <span>+234</span>
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="801 234 5678"
                        value={form.identifier}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, identifier: e.target.value }))
                        }
                        className="h-11 w-full bg-transparent px-3 text-sm text-text placeholder:text-muted focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="relative">
                  <Input
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, password: e.target.value }))
                    }
                    className="h-11 rounded-xl pr-10 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-8.5 text-muted hover:text-text focus:outline-none cursor-pointer"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-text-secondary hover:text-text select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-border text-green-500 focus:ring-green-500"
                  />
                  <span>Remember this device</span>
                </label>

                <Link
                  href="/forgot-password"
                  className="font-semibold text-green-600 dark:text-green-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                loading={loading}
                className="mt-2 h-11 w-full rounded-xl bg-green-500 font-bold text-navy hover:bg-green-400 focus-visible:ring-green-500 cursor-pointer"
              >
                {loading ? "Signing in..." : "Sign In to Payzix"}
              </Button>
            </form>
          </div>

          {/* Footer Link */}
          <div className="mt-6 pt-5 border-t border-border/50 text-center">
            <p className="text-2xs text-text-secondary">
              Don't have a Payzix account yet?
            </p>
            <Link
              href="/signup"
              className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-xl border border-border/80 bg-surface-raised px-4 text-xs font-bold text-text transition-colors hover:border-green-500/40 hover:bg-surface-hover"
            >
              Create Free Account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto h-130 w-full max-w-5xl rounded-3xl border border-border/60 bg-surface animate-pulse" />
      }
    >
      <LoginInner />
    </Suspense>
  );
}