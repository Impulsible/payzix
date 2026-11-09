const HOW_IT_WORKS = [
  { step: "1", title: "Download the App", desc: "Get Payzix free on your iPhone or Android. Takes less than 30 seconds.", icon: "📱" },
  { step: "2", title: "Create Your Account", desc: "Sign up with your BVN and phone number. Fully verified in under 2 minutes.", icon: "✍️" },
  { step: "3", title: "Start Enjoying", desc: "Send, receive, save, and pay bills. All from one simple, beautiful app.", icon: "🎉" },
];

export function HowItWorksSection() {
  return (
    <section id="help" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-label mb-3 text-green-600 dark:text-green-400">Get Started</p>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-text sm:text-4xl">
            Start in 3 simple steps.
          </h2>
          <p className="mt-4 text-base text-text-secondary">No long forms. No queues. No wahala.</p>
        </div>
        <div className="relative mt-14 grid gap-8 md:grid-cols-3">
          <div className="absolute left-[20%] right-[20%] top-16 hidden h-0.5 bg-linear-to-r from-green-500/20 via-cyan-500/20 to-green-500/20 md:block" />
          {HOW_IT_WORKS.map((s) => (
            <div key={s.step} className="relative text-center">
              <div className="relative mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full border border-border bg-linear-to-br from-green-500/20 via-cyan-500/20 to-transparent text-5xl">
                {s.icon}
                <div className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-brand text-sm font-extrabold text-navy shadow-lg">
                  {s.step}
                </div>
              </div>
              <h3 className="font-heading text-xl font-bold text-text">{s.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm text-text-secondary">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}