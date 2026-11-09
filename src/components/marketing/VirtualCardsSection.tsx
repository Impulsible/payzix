import Link from "next/link";
import { PayzixMark } from "@/components/brand";

export function VirtualCardsSection() {
  return (
    <section className="overflow-hidden border-y border-border/50 bg-sunken/30 py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative order-2 flex min-h-100 items-center justify-center lg:order-1">
            <div className="absolute inset-0 bg-linear-to-br from-green-500/10 via-cyan-500/10 to-transparent blur-3xl" />

            <div className="virtual-card absolute z-0 -translate-x-7.5 translate-y-5 rotate-[-8deg] scale-95 opacity-60">
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <PayzixMark size="sm" withBackground={false} decorative />
                  <span className="text-xs font-medium uppercase tracking-widest text-white/50">Classic</span>
                </div>
                <p className="font-mono-data text-xl tracking-[0.15em] text-white/90">•••• •••• •••• 1245</p>
              </div>
            </div>

            <div className="virtual-card relative z-10 animate-float">
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <PayzixMark size="sm" withBackground={false} decorative />
                  <span className="text-xs font-medium uppercase tracking-widest text-white/50">Platinum</span>
                </div>
                <div className="h-8 w-10 rounded-md bg-linear-to-br from-yellow-300/80 to-yellow-500/60" />
                <p className="font-mono-data text-xl tracking-[0.15em] text-white/90">•••• •••• •••• 4829</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xs uppercase tracking-wider text-white/40">Card Holder</p>
                    <p className="text-sm font-semibold text-white">ADEOLA OKONKWO</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xs uppercase tracking-wider text-white/40">Expires</p>
                    <p className="text-sm font-semibold text-white">09/28</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-label mb-2 text-green-600 dark:text-green-400">Virtual Cards</p>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
              Shop online without worries.
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Create cards for Netflix, Spotify, Amazon, and more. Freeze with one tap, never expose your real account, and spend safely anywhere in the world.
            </p>
            <ul className="mt-6 space-y-3">
              {["Create instantly in your app", "Freeze or unfreeze in one tap", "Pay in Dollars or Naira", "Works on Netflix, Amazon, Spotify & more"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-text">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10 text-sm text-green-500">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <Link href="/signup" className="btn btn-primary">Create a Card</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}