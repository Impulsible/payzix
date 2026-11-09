"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api-client";

type RecoveryMethod = "email" | "phone";

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [method, setMethod] = useState<RecoveryMethod>("email");
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await apiFetch("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({
        [method === "phone" ? "phone" : "email"]: identifier,
      }),
    });

    setLoading(false);
    setSent(true);
    toast({
      variant: "success",
      title: "Verification link sent",
      description: "Please check your inbox or mobile device for instructions.",
    });
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border/60 bg-surface shadow-2xl">
      <div className="grid lg:grid-cols-12">
        
        {/* Left Visual Column */}
        <div className="relative hidden lg:col-span-5 lg:flex flex-col justify-between overflow-hidden bg-gradient-dark p-8 xl:p-10 text-white">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-green-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

          {/* Background Real Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1000&q=80"
              alt="Account protection and security"
              className="h-full w-full object-cover opacity-25 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/85 to-navy/40" />
          </div>

          <div className="relative z-10">
            <p className="tagline-script text-3xl text-green-300">
              <span className="tagline-flourish">More than payments.</span>
            </p>
            <p className="mt-1 text-xs text-white/70">
              Quick and secure account recovery.
            </p>
          </div>

          <div className="relative z-10 my-auto py-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3.5 py-1 text-xs font-semibold text-green-300">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              256 bit Encryption Guaranteed
            </div>

            <h2 className="font-heading mt-4 text-2xl xl:text-3xl font-extrabold leading-tight text-white">
              Your security and privacy come first.
            </h2>

            <p className="mt-3 max-w-sm text-xs xl:text-sm leading-relaxed text-white/70">
              We send one time verification codes directly to your registered email or phone to keep unauthorized users out.
            </p>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-md max-w-sm">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-500 text-navy font-extrabold text-base">
                🛡️
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white">Instant Account Protection</p>
                <p className="text-2xs text-green-300">Monitored 24 hours every day</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4 text-2xs text-white/60">
            <span>✓ CBN Licensed</span>
            <span>✓ NDIC Insured</span>
            <span>✓ Verified Recovery</span>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="col-span-12 lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="mb-5">
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-green-500/25 bg-green-500/10 px-2.5 py-0.5 text-2xs font-semibold text-green-600 dark:text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span>Password Recovery</span>
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text">
                Reset your password
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-text-secondary">
                Enter your registered details below and we will send you instructions to regain access.
              </p>
            </div>

            {sent ? (
              <div className="my-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-5 text-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500 text-navy text-lg font-bold">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-text text-base">
                      Instructions Sent
                    </h3>
                    <p className="text-xs text-text-secondary mt-0.5">
                      If an account exists for <strong className="text-text">{identifier}</strong>, you will receive a reset notification shortly.
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-green-500/20 pt-4 text-xs text-muted flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span>Did not receive a message?</span>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="font-bold text-green-600 dark:text-green-400 hover:underline cursor-pointer"
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Method Tabs */}
                <div className="mb-5 flex rounded-xl border border-border/60 bg-surface-raised p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMethod("email");
                      setIdentifier("");
                    }}
                    className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
                      method === "email"
                        ? "border border-border/40 bg-surface text-text shadow-sm"
                        : "text-muted hover:text-text"
                    }`}
                  >
                    Email Address
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMethod("phone");
                      setIdentifier("");
                    }}
                    className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
                      method === "phone"
                        ? "border border-border/40 bg-surface text-text shadow-sm"
                        : "text-muted hover:text-text"
                    }`}
                  >
                    Phone Number
                  </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                  {method === "email" ? (
                    <Input
                      label="Registered Email Address"
                      name="email"
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="h-11 rounded-xl text-sm"
                    />
                  ) : (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-text">
                        Registered Phone Number
                      </label>
                      <div className="flex overflow-hidden rounded-xl border border-border/60 bg-surface focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500">
                        <div className="flex shrink-0 items-center gap-1.5 border-r border-border/60 bg-surface-raised px-3 text-xs font-bold text-text-secondary">
                          <span className="text-sm">🇳🇬</span>
                          <span>+234</span>
                        </div>
                        <input
                          type="tel"
                          required
                          placeholder="801 234 5678"
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          className="h-11 w-full bg-transparent px-3 text-sm text-text placeholder:text-muted focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    loading={loading}
                    className="mt-2 h-11 w-full cursor-pointer rounded-xl bg-green-500 font-bold text-navy hover:bg-green-400 focus-visible:ring-green-500"
                  >
                    {loading ? "Sending link..." : "Send Reset Link"}
                  </Button>
                </form>
              </>
            )}
          </div>

          <div className="mt-8 border-t border-border/50 pt-5 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 dark:text-green-400 hover:underline"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Back to Sign In</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}