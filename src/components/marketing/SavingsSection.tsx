export function SavingsSection() {
  return (
    <section id="save" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-label mb-2 text-cyan-600">Payzix Save</p>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
              Grow your money at <span className="text-gradient-brand">15% per year.</span>
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Save for school fees, your wedding, a new car, or a rainy day. Automate your savings and watch your money grow — all backed by NDIC insurance.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { label: "Interest Rate", value: "up to 15%" },
                { label: "Start From", value: "₦1,000" },
                { label: "Lock Period", value: "30–365 days" },
                { label: "Protected By", value: "NDIC Insurance" },
              ].map((b) => (
                <div key={b.label} className="rounded-xl border border-border bg-surface p-4">
                  <p className="text-xs text-muted">{b.label}</p>
                  <p className="mt-1 font-heading text-lg font-bold text-text">{b.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-linear-to-br from-green-500/10 to-cyan-500/10 blur-2xl" />
            <div className="relative rounded-2xl border border-border bg-surface p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted">Total Savings</p>
                  <p className="font-heading text-3xl font-extrabold text-text">
                    <span className="align-super text-sm text-muted">₦</span>2,847,500
                  </p>
                </div>
                <span className="badge badge-success">+₦42,100 earned</span>
              </div>
              <div className="relative mb-6 h-32 overflow-hidden rounded-xl bg-linear-to-t from-green-500/20 to-transparent">
                <svg viewBox="0 0 300 100" className="h-full w-full">
                  <path d="M 0 80 Q 50 70, 75 60 T 150 40 T 225 25 T 300 10" fill="none" stroke="url(#chartGrad)" strokeWidth="3" />
                  <path d="M 0 80 Q 50 70, 75 60 T 150 40 T 225 25 T 300 10 L 300 100 L 0 100 Z" fill="url(#chartFill)" opacity="0.3" />
                  <defs>
                    <linearGradient id="chartGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#27e39a" />
                      <stop offset="100%" stopColor="#28c7d9" />
                    </linearGradient>
                    <linearGradient id="chartFill" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#27e39a" />
                      <stop offset="100%" stopColor="#27e39a" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Vacation Fund", progress: 75, amount: "₦750,000", target: "₦1,000,000" },
                  { name: "Emergency Fund", progress: 90, amount: "₦900,000", target: "₦1,000,000" },
                ].map((s) => (
                  <div key={s.name}>
                    <div className="mb-1.5 flex justify-between">
                      <span className="text-sm font-semibold text-text">{s.name}</span>
                      <span className="text-xs text-muted">{s.amount} / {s.target}</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${s.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}