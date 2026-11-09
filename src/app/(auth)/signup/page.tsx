"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input } from "@/components/ui";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { apiFetch } from "@/lib/api-client";

type SignupMethod = "phone" | "email";
type AccountType = "personal" | "business";

function passwordScore(password: string) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

function SignupInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();
  const { refresh } = useAuth();

  const [accountType, setAccountType] = useState<AccountType>("personal");
  const [signupMethod, setSignupMethod] = useState<SignupMethod>("phone");
  const [form, setForm] = useState({
    fullName: "",
    businessName: "",
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [issues, setIssues] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  const score = useMemo(() => passwordScore(form.password), [form.password]);
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

    if (!acceptedTerms) {
      toast({
        variant: "error",
        title: "Terms required",
        description: "Please accept the Terms of Service to continue.",
      });
      return;
    }

    setLoading(true);
    setIssues({});

    const res = await apiFetch<{ user: unknown }>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        fullName: form.fullName,
        businessName: accountType === "business" ? form.businessName : undefined,
        accountType,
        [signupMethod === "phone" ? "phone" : "email"]: form.identifier,
        password: form.password,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      setIssues(res.issues || {});
      toast({
        variant: "error",
        title: "Could not create account",
        description: res.error || "Please check your details and try again.",
      });
      return;
    }

    await refresh();
    toast({
      variant: "success",
      title: "Welcome to Payzix",
      description: "Your account is ready. Redirecting to your wallet.",
    });

    const next = params.get("next") || "/app";
    router.push(next);
    router.refresh();
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
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&q=85"
              alt="Happy Payzix customer opening an account"
              className="h-full w-full object-cover opacity-30 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-linear-to-t from-navy via-navy/85 to-navy/40" />
          </div>

          <div className="relative z-10">
            <p className="tagline-script text-3xl text-green-300">
              <span className="tagline-flourish">More than payments.</span>
            </p>
            <p className="mt-1 text-xs text-white/70">
              Open a free wallet in under 2 minutes.
            </p>
          </div>

          <div className="relative z-10 my-auto py-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3.5 py-1 text-xs font-semibold text-green-300">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              Free forever for personal accounts
            </div>

            <h2 className="font-heading mt-4 text-2xl xl:text-3xl font-extrabold leading-tight text-white">
              Banking that works for everyday life and growing shops.
            </h2>

            <p className="mt-3 max-w-sm text-xs xl:text-sm leading-relaxed text-white/70">
              Send money, pay bills, collect customer payments, and save toward your goals from one secure app.
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Instant account activation",
                "Zero monthly charges",
                "CBN licensed and NDIC protected",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-xs text-white/85">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-2xs font-bold text-green-300">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4 text-2xs text-white/60">
            <span>✓ 2M+ active users</span>
            <span>✓ Transfers in 3 seconds</span>
            <span>✓ 256 bit security</span>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
          <div>
            <div className="mb-5">
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-green-500/25 bg-green-500/10 px-2.5 py-0.5 text-2xs font-semibold text-green-600 dark:text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span>Create Free Account</span>
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text">
                Join Payzix today
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-text-secondary">
                Choose personal or business and start sending money in minutes.
              </p>
            </div>

            {/* Account type */}
            <div className="mb-4 flex rounded-xl border border-border/60 bg-surface-raised p-1">
              <button
                type="button"
                onClick={() => setAccountType("personal")}
                className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
                  accountType === "personal"
                    ? "border border-border/40 bg-surface text-text shadow-sm"
                    : "text-muted hover:text-text"
                }`}
              >
                Personal
              </button>
              <button
                type="button"
                onClick={() => setAccountType("business")}
                className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
                  accountType === "business"
                    ? "border border-border/40 bg-surface text-text shadow-sm"
                    : "text-muted hover:text-text"
                }`}
              >
                Business / Shop
              </button>
            </div>

            {/* Contact method */}
            <div className="mb-5 flex rounded-xl border border-border/60 bg-surface-raised p-1">
              <button
                type="button"
                onClick={() => {
                  setSignupMethod("phone");
                  setForm((f) => ({ ...f, identifier: "" }));
                }}
                className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
                  signupMethod === "phone"
                    ? "border border-border/40 bg-surface text-text shadow-sm"
                    : "text-muted hover:text-text"
                }`}
              >
                Phone Number
              </button>
              <button
                type="button"
                onClick={() => {
                  setSignupMethod("email");
                  setForm((f) => ({ ...f, identifier: "" }));
                }}
                className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all cursor-pointer ${
                  signupMethod === "email"
                    ? "border border-border/40 bg-surface text-text shadow-sm"
                    : "text-muted hover:text-text"
                }`}
              >
                Email Address
              </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                label="Full name"
                name="fullName"
                placeholder="Adaeze Nwosu"
                required
                value={form.fullName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, fullName: e.target.value }))
                }
                error={issues.fullName?.[0]}
                className="h-11 rounded-xl text-sm"
              />

              {accountType === "business" && (
                <Input
                  label="Business or shop name"
                  name="businessName"
                  placeholder="Ada Boutique"
                  required
                  value={form.businessName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, businessName: e.target.value }))
                  }
                  error={issues.businessName?.[0]}
                  className="h-11 rounded-xl text-sm"
                />
              )}

              {signupMethod === "email" ? (
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={form.identifier}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, identifier: e.target.value }))
                  }
                  error={issues.email?.[0] || issues.identifier?.[0]}
                  className="h-11 rounded-xl text-sm"
                />
              ) : (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text">Phone Number</label>
                  <div className="flex overflow-hidden rounded-xl border border-border/60 bg-surface focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500">
                    <div className="flex shrink-0 items-center gap-1.5 border-r border-border/60 bg-surface-raised px-3 text-xs font-bold text-text-secondary">
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
                  {(issues.phone?.[0] || issues.identifier?.[0]) && (
                    <p className="text-xs text-red-500">
                      {issues.phone?.[0] || issues.identifier?.[0]}
                    </p>
                  )}
                </div>
              )}

              <div>
                <div className="relative">
                  <Input
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    required
                    value={form.password}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, password: e.target.value }))
                    }
                    error={issues.password?.[0]}
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

                {form.password.length > 0 && (
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
                      Password strength:{" "}
                      <span className="font-semibold text-text">{strengthLabel}</span>
                      <span className="text-muted"> · Use 8+ characters with upper, lower, and a number</span>
                    </p>
                  </div>
                )}
              </div>

              <label className="flex items-start gap-2.5 pt-1 text-xs text-text-secondary cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border text-green-500 focus:ring-green-500"
                />
                <span>
                  I agree to the{" "}
                  <Link href="/terms" className="font-semibold text-green-600 dark:text-green-400 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="font-semibold text-green-600 dark:text-green-400 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              <Button
                type="submit"
                loading={loading}
                className="mt-1 h-11 w-full cursor-pointer rounded-xl bg-green-500 font-bold text-navy hover:bg-green-400 focus-visible:ring-green-500"
              >
                {loading ? "Creating account..." : "Create Free Account"}
              </Button>
            </form>
          </div>

          <div className="mt-6 border-t border-border/50 pt-5 text-center">
            <p className="text-2xs text-text-secondary">
              Already have a Payzix account?
            </p>
            <Link
              href="/login"
              className="mt-2 inline-flex h-10 w-full items-center justify-center rounded-xl border border-border/80 bg-surface-raised px-4 text-xs font-bold text-text transition-colors hover:border-green-500/40 hover:bg-surface-hover"
            >
              Sign In Instead
            </Link>

            <div className="mt-4 flex items-center justify-center gap-1.5 text-2xs text-muted">
              <span className="text-green-600 dark:text-green-400">✓</span>
              <span>Your data is protected with bank grade encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto h-160 w-full max-w-5xl animate-pulse rounded-3xl border border-border/60 bg-surface" />
      }
    >
      <SignupInner />
    </Suspense>
  );
}