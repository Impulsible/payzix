"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PayzixMark } from "@/components/brand";

/* ── Types ─────────────────────────────────────────────── */
interface DropdownItem {
  title: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
}

interface NavLinkWithDropdown {
  label: string;
  href?: string;
  dropdown: DropdownItem[];
}

interface NavLinkSimple {
  label: string;
  href: string;
  dropdown?: never;
}

type NavLink = NavLinkWithDropdown | NavLinkSimple;

/* ── Nav data ──────────────────────────────────────────── */
const NAV_LINKS: NavLink[] = [
  {
    label: "Personal",
    href: "/personal",
    dropdown: [
      {
        title: "Send Money",
        desc: "Free transfers in under 3 seconds",
        href: "/personal/send-money",
        icon: (
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-15L21 6m0 0L16.5 10.5M21 6H7.5" />
          </svg>
        ),
      },
      {
        title: "Pay Bills",
        desc: "Airtime, data, electricity, DSTV",
        href: "/personal/bills",
        icon: (
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
          </svg>
        ),
      },
      {
        title: "Save & Earn",
        desc: "Up to 15% yearly interest from ₦1,000",
        href: "/savings",
        icon: (
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
      {
        title: "Virtual Cards",
        desc: "Shop online safely anywhere",
        href: "/cards",
        icon: (
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "Business",
    href: "/business",
    dropdown: [
      {
        title: "Merchant Account",
        desc: "Get paid instantly by anyone",
        href: "/business/merchant",
        icon: (
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.999 2.999 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.999 2.999 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
          </svg>
        ),
      },
      {
        title: "POS Terminals",
        desc: "Accept card and transfer payments",
        href: "/business/pos",
        icon: (
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        ),
      },
    ],
  },
  {
    label: "Company",
    href: "/company",
    dropdown: [
      {
        title: "About Payzix",
        desc: "Our mission and story",
        href: "/about",
        icon: (
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
        ),
      },
      {
        title: "Help Center",
        desc: "24/7 support and FAQs",
        href: "/help",
        icon: (
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        ),
      },
    ],
  },
  { label: "Careers", href: "/careers" },
];

/* ── Component ─────────────────────────────────────────── */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  
  // FIX: State to track if component has mounted on the client
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted to true as soon as the client renders
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Swap this for your real auth hook later (e.g. useSession / useUser)
  const isAuthenticated = false;
  const user = {
    name: "Adaeze Nwosu",
    email: "adaeze@payzix.com",
    initials: "AN",
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggleSection = (label: string) => {
    setExpanded((prev) => (prev === label ? null : label));
  };

  const closeMenu = () => {
    setOpen(false);
    setExpanded(null);
  };

  return (
    <>
      {/* ══════════════════════════════════════════════════
          STICKY HEADER
          ══════════════════════════════════════════════════ */}
      <header
        className={`sticky top-0 z-300 border-b bg-background/80 backdrop-blur-nav transition-all duration-300 ${
          scrolled ? "border-border/60 shadow-sm" : "border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          {/* Left: logo + desktop nav */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link
              href="/"
              className="group flex shrink-0 items-center gap-2.5"
              aria-label="Payzix, More than payments"
            >
              <PayzixMark size="sm" />
              <span className="flex flex-col leading-none">
                <span className="font-heading text-lg font-extrabold tracking-tight text-text">
                  Payzix
                </span>
                <span className="tagline-script tagline-gradient -mt-0.5 text-[13px] sm:text-sm">
                  More than payments
                </span>
              </span>
            </Link>

            {/* Desktop mega-menu */}
            <div className="hidden items-center gap-1 md:flex lg:gap-2">
              {NAV_LINKS.map((link) =>
                link.dropdown ? (
                  <div key={link.label} className="group relative">
                    <Link
                      href={link.href ?? "#"}
                      className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-text/80 transition-colors hover:bg-sunken hover:text-text lg:px-4"
                    >
                      {link.label}
                      <svg
                        className="size-3.5 opacity-60 transition-transform duration-200 group-hover:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </Link>

                    <div className="pointer-events-none absolute left-0 top-full z-50 pt-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                      <div className="w-85 rounded-2xl border border-border bg-surface p-2.5 shadow-2xl">
                        {link.dropdown.map((drop) => (
                          <Link
                            key={drop.title}
                            href={drop.href}
                            className="group/item flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-sunken"
                          >
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-sunken text-muted transition-colors group-hover/item:bg-green-500/10 group-hover/item:text-green-500">
                              {drop.icon}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-semibold text-text">{drop.title}</span>
                              <span className="text-xs text-muted group-hover/item:text-text/70">
                                {drop.desc}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="rounded-full px-3 py-2 text-sm font-semibold text-text/80 transition-colors hover:bg-sunken hover:text-text lg:px-4"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          </div>

          {/* Right: auth actions + hamburger */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="hidden items-center gap-2 rounded-full border border-border bg-surface py-1.5 pl-1.5 pr-3 transition-colors hover:bg-sunken sm:flex"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-green-500/15 text-2xs font-bold text-green-500">
                  {user.initials}
                </span>
                <span className="text-sm font-semibold text-text">Dashboard</span>
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hidden text-sm font-semibold text-text transition-colors hover:text-green-500 sm:block"
                >
                  Log in
                </Link>
                <Link href="/signup" className="btn btn-primary btn-sm hidden sm:inline-flex">
                  Get Started
                </Link>
              </>
            )}

            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex size-10 items-center justify-center rounded-xl text-text transition-colors hover:bg-sunken md:hidden"
              aria-label="Open menu"
            >
              <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* ══════════════════════════════════════════════════
          MOBILE MENU — production grade
          ══════════════════════════════════════════════════ */}

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-400 bg-navy/70 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-y-0 right-0 z-500 flex w-full max-w-md flex-col bg-surface shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ── Top bar ─────────────────────────────────── */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <Link href="/" onClick={closeMenu} className="flex items-center gap-2.5">
            <PayzixMark size="sm" />
            <span className="flex flex-col leading-none">
              <span className="font-heading text-base font-extrabold text-text">Payzix</span>
              <span className="tagline-script tagline-gradient -mt-0.5 text-xs">
                More than payments
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            className="flex size-10 items-center justify-center rounded-xl text-muted transition-colors hover:bg-sunken hover:text-text"
            aria-label="Close menu"
          >
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ── Auth card (context-aware) ───────────────── */}
        <div className="border-b border-border px-5 py-4">
          {isAuthenticated ? (
            <Link
              href="/dashboard"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-2xl border border-border bg-sunken/50 p-3 transition-colors hover:bg-sunken"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-navy">
                {user.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-text">{user.name}</span>
                <span className="block truncate text-xs text-muted">{user.email}</span>
              </span>
              <span className="rounded-lg bg-green-500/10 px-2.5 py-1 text-2xs font-semibold text-green-500">
                Dashboard
              </span>
            </Link>
          ) : (
            <div className="rounded-2xl border border-border bg-sunken/40 p-4">
              <p className="text-sm font-semibold text-text">Welcome to Payzix</p>
              <p className="mt-0.5 text-xs text-muted">
                Send, save, and pay bills from one app.
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="flex h-10 items-center justify-center rounded-xl border border-border bg-surface text-sm font-semibold text-text transition-colors hover:bg-sunken"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={closeMenu}
                  className="flex h-10 items-center justify-center rounded-xl bg-green-500 text-sm font-semibold text-navy transition-colors hover:bg-green-400"
                >
                  Sign up free
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* ── Nav sections ────────────────────────────── */}
        <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => {
              const isOpen = expanded === link.label;

              if (!link.dropdown) {
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="flex items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold text-text transition-colors hover:bg-sunken"
                    >
                      {link.label}
                      <svg className="size-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  </li>
                );
              }

              return (
                <li key={link.label} className="rounded-xl">
                  <button
                    type="button"
                    onClick={() => toggleSection(link.label)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left text-[15px] font-semibold text-text transition-colors hover:bg-sunken"
                  >
                    {link.label}
                    <svg
                      className={`size-4 text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="space-y-0.5 pb-2 pl-2">
                        {link.href && (
                          <li>
                            <Link
                              href={link.href}
                              onClick={closeMenu}
                              className="mb-1 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wide text-green-500 hover:bg-green-500/5"
                            >
                              View all {link.label}
                              <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                              </svg>
                            </Link>
                          </li>
                        )}
                        {link.dropdown.map((drop) => (
                          <li key={drop.title}>
                            <Link
                              href={drop.href}
                              onClick={closeMenu}
                              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-sunken"
                            >
                              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sunken text-muted transition-colors group-hover:bg-green-500/10 group-hover:text-green-500">
                                {drop.icon}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-sm font-semibold text-text">{drop.title}</span>
                                <span className="block truncate text-xs text-muted">{drop.desc}</span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Quick links */}
          <div className="mt-6 border-t border-border pt-4">
            <p className="mb-2 px-3 text-2xs font-semibold uppercase tracking-wider text-muted">
              Quick links
            </p>
            <ul className="space-y-0.5">
              {[
                { label: "Help Center", href: "/help" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-sunken hover:text-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* ── Footer ──────────────────────────────────── */}
        <div className="border-t border-border px-5 py-4">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={closeMenu}
              className="flex h-11 w-full items-center justify-center rounded-xl border border-border text-sm font-semibold text-text transition-colors hover:bg-sunken"
            >
              Log out
            </button>
          ) : (
            <div className="space-y-2 text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="inline-flex size-1.5 rounded-full bg-green-500" />
                <p className="text-2xs font-medium text-muted">
                  Licensed by the CBN · NDIC Insured up to ₦5,000,000
                </p>
              </div>
              
              {/* FIXED: Safely render dynamic year only after mounting */}
              <p className="text-2xs text-muted/70">
                © {isMounted ? new Date().getFullYear() : 2025} Payzix Digital Services Limited.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}