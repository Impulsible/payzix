"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input } from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api-client";

function passwordScore(password: string) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

function ResetInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();
  const token = params.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const score = useMemo(() => passwordScore(password), [password]);
  const strengthLabel =
    score <= 1 ? "Weak" : score <= 3 ? "Good" : score >= 4 ? "Strong" : "Weak";
  const strengthColor =
    score <= 1
      ? "bg-red-500"
      : score <= 3
        ? "bg-amber-500"
        : "bg-green-500";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        variant: "error",
        title: "Passwords do not match",
        description: "Please check your password entries.",
      });
      return;
    }

    setLoading(true);
    const res = await apiFetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, password }),
    });
    setLoading(false);

    if (!res.ok) {
      toast({
        variant: "error",
        title: "Reset failed",
        description: res.error || "The reset link may have expired.",
      });
      return;
    }

    toast({
      variant: "success",
      title: "Password updated successfully",
      description: "You can now log in with your new credentials.",
    });
    router.push("/login");
  }

  if (!token) {
    return (
      <div className="overflow-hidden rounded-3xl border border-red-500/30 bg-surface p-8 shadow-2xl text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500 text-xl font-bold">
          !
        </div>
        <h2 className="font-heading mt-4 text-2xl font-bold text-text">
          Invalid or Expired Link
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-text-secondary max-w-sm mx-auto">
          This password reset token is missing or has expired. Please request a new recovery link.
        </p>
        <div className="mt-6">
          <Link
            href="/forgot-password"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-green-500 px-6 text-xs font-bold text-navy hover:bg-green-400"
          >
            Request New Reset Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border/60 bg-surface shadow-2xl">
      <div className="grid lg:grid-cols-12">
        
        {/* Left Visual Column */}
        <div className="relative hidden lg:col-span-5 lg:flex flex-col justify-between overflow-hidden bg-gradient-dark p-8 xl:p-10 text-white">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-green-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1000&q=80"
              alt="Secure account password reset"
              className="h-full w-full object-cover opacity-25 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/85 to-navy/40" />
          </div>

          <div className="relative z-10">
            <p className="tagline-script text-3xl text-green-300">
              <span className="tagline-flourish">More than payments.</span>
            </p>
            <p className="mt-1 text-xs text-white/70">
              Set your new account credentials.
            </p>
          </div>

          <div className="relative z-10 my-auto py-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3.5 py-1 text-xs font-semibold text-green-300">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Session Protection Active
            </div>

            <h2 className="font-heading mt-4 text-2xl xl:text-3xl font-extrabold leading-tight text-white">
              Create a fresh, strong password.
            </h2>

            <p className="mt-3 max-w-sm text-xs xl:text-sm leading-relaxed text-white/70">
              For your safety, setting a new password will automatically sign out all existing active sessions on other devices.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4 text-2xs text-white/60">
            <span>✓ CBN Licensed MMO</span>
            <span>✓ NDIC Protection</span>
            <span>✓ Encrypted Link</span>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="col-span-12 lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="mb-5">
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-green-500/25 bg-green-500/10 px-2.5 py-0.5 text-2xs font-semibold text-green-600 dark:text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span>Account Security</span>
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text">
                Set new password
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-text-secondary">
                Please enter a new password for your Payzix account below.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <div className="relative">
                  <Input
                    label="New Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 rounded-xl pr-10 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-8.5 right-3 cursor-pointer text-muted hover:text-text focus:outline-none"
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

                {password.length > 0 && (
                  <div className="mt-2 space-y-1.5">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((step) => (
                        <div
                          key={step}
                          className={`h-1 flex-1 rounded-full transition-colors ${
                            score >= step ? strengthColor : "bg-border"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-2xs text-muted">
                      Strength:{" "}
                      <span className="font-semibold text-text">{strengthLabel}</span>
                    </p>
                  </div>
                )}
              </div>

              <Input
                label="Confirm New Password"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11 rounded-xl text-sm"
              />

              <Button
                type="submit"
                loading={loading}
                className="mt-2 h-11 w-full cursor-pointer rounded-xl bg-green-500 font-bold text-navy hover:bg-green-400 focus-visible:ring-green-500"
              >
                {loading ? "Updating password..." : "Update Password"}
              </Button>
            </form>
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

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto h-130 w-full max-w-5xl animate-pulse rounded-3xl border border-border/60 bg-surface" />
      }
    >
      <ResetInner />
    </Suspense>
  );
}