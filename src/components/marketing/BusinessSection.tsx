export function BusinessSection() {
  return (
    <section id="business" className="border-y border-border/50 bg-sunken/30 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-label mb-2 text-cyan-500">Payzix for Business</p>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
              Running a shop? <span className="text-gradient-brand">Get paid faster.</span>
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Perfect for market traders, salon owners, boutiques, pharmacies, and restaurants. Accept payments from customers anywhere — and get your money the same second.
            </p>
            <ul className="mt-6 space-y-3">
              {["Accept cards, transfers & USSD", "POS terminals delivered in 48 hours", "Money hits your account instantly", "Track every sale in one simple dashboard"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-text">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/10 text-sm text-cyan-500">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/business" className="btn btn-primary">Open Business Account</a>
              <a href="#" className="btn btn-secondary">Get a POS →</a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-linear-to-br from-cyan-500/10 to-green-500/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
              <div className="relative h-40 w-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=900&q=80" alt="Shop owner" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/50 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-green-400 to-cyan-400 text-sm font-bold text-navy">AB</div>
                  <div>
                    <p className="text-sm font-bold text-text">Ada's Boutique</p>
                    <p className="text-2xs text-muted">Merchant · Lagos</p>
                  </div>
                </div>
                <span className="badge badge-success absolute right-4 top-4">Open</span>
              </div>
              <div className="bg-linear-to-br from-green-500/5 to-transparent p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">Today's Sales</p>
                <p className="mt-1 font-heading text-3xl font-extrabold text-text">
                  <span className="align-super text-sm text-muted">₦</span>284,500
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs font-bold text-green-600">↑ 23.5%</span>
                  <span className="text-xs text-muted">vs yesterday</span>
                </div>
              </div>
              <div className="grid grid-cols-3 border-y border-border">
                {[{ label: "Orders", value: "47" }, { label: "Customers", value: "32" }, { label: "Avg. Sale", value: "₦6,053" }].map((s) => (
                  <div key={s.label} className="border-r border-border p-4 text-center last:border-r-0">
                    <p className="font-heading text-lg font-bold text-text">{s.value}</p>
                    <p className="mt-0.5 text-2xs text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wide text-text">Recent Payments</p>
                  <span className="text-2xs font-semibold text-green-600">View all</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "Chidi Okafor", method: "Card · Verve", amount: "+12,500", time: "2 min ago" },
                    { name: "Fatima Ibrahim", method: "Transfer · GTB", amount: "+8,200", time: "15 min ago" },
                    { name: "Ola Benson", method: "POS · Visa", amount: "+45,000", time: "1 hr ago" },
                  ].map((t, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-sunken/50">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-green-500/20 to-cyan-500/20 text-sm font-bold text-text">
                        {t.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-text">{t.name}</p>
                        <p className="text-2xs text-muted">{t.method} · {t.time}</p>
                      </div>
                      <p className="font-mono-data text-sm font-bold text-green-600">₦{t.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}