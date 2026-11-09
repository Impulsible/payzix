const EVERYDAY_FEATURES = [
  {
    icon: "⚡",
    title: "Send Money in Seconds",
    desc: "Transfer to any Nigerian bank in under 3 seconds. No waiting, no failed transactions, no excuses.",
    color: "bg-green-500/10 text-green-500",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
  },
  {
    icon: "💳",
    title: "Pay Bills Without Stress",
    desc: "Buy airtime, data, electricity, DSTV, and more — all in one tap. Get up to 5% cashback on every bill.",
    color: "bg-cyan-500/10 text-cyan-500",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&q=80",
  },
  {
    icon: "🛡️",
    title: "Your Money is Safe",
    desc: "Protected by face ID, PIN, and 24/7 fraud monitoring. Backed by NDIC insurance up to ₦5,000,000.",
    color: "bg-warning/10 text-warning",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
  },
];

export function FeaturesSection() {
  return (
    <section id="personal" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-label mb-3 text-green-600 dark:text-green-400">Why Payzix</p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            Built for <span className="text-gradient-brand">your everyday life.</span>
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            From your morning airtime top-up to sending rent to your landlord — we make it all effortless.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EVERYDAY_FEATURES.map((f) => (
            <div key={f.title} className="card card-interactive group overflow-hidden p-0">
              <div className="relative h-48 w-full overflow-hidden">
                <img src={f.image} alt={f.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/30 to-transparent" />
                <div className={`absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 text-xl backdrop-blur-md ${f.color}`}>
                  {f.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-text">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}