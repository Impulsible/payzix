import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-4xl bg-gradient-dark px-6 py-14 text-center shadow-2xl sm:rounded-5xl sm:px-16 sm:py-24">
          
          {/* Ambient Glow Effects */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-green-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Your money, your way.
            </h2>

            <p className="tagline-script mt-3 text-2xl text-green-300 sm:text-3xl">
              <span className="tagline-flourish">More than payments.</span>
            </p>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              Join 2 million+ Nigerians enjoying faster, safer, simpler money.
              Download Payzix today and see the difference.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link href="/signup" className="btn btn-primary btn-lg w-full sm:w-auto">
                Open Free Account
              </Link>
              <Link
                href="/contact"
                className="btn btn-lg w-full border border-white/20 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
              >
                Talk to Us
              </Link>
            </div>

            {/* Store Badges */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href="#"
                className="transition-transform hover:scale-105 focus-visible:outline-none"
                aria-label="Download on the App Store"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-10 sm:h-11"
                />
              </a>
              <a
                href="#"
                className="transition-transform hover:scale-105 focus-visible:outline-none"
                aria-label="Get it on Google Play"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-10 sm:h-11"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}