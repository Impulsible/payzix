import { PayzixLogo, PayzixMark } from "@/components/brand";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="flex items-center gap-3">
          <PayzixMark className="h-10 w-10" decorative />
          <span className="font-heading text-xl font-semibold text-navy">Payzix</span>
        </div>

        <h1 className="mt-16 font-heading text-5xl font-bold text-navy">
          Foundation is live.
        </h1>
        <p className="mt-4 max-w-xl text-muted">
          Stage 01 is complete. The Next.js app, design tokens, database connection,
          auth foundation, and brand components are all in place.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {[
            "Next.js + TypeScript",
            "Tailwind with Payzix tokens",
            "MongoDB connection ready",
            "Auth dependencies installed",
            "Brand components ready",
            "Folder structure ready",
          ].map((item) => (
            <div
              key={item}
              className="rounded-card border border-border bg-white p-4 text-sm text-navy shadow-card"
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald" />
              {item}
            </div>
          ))}
        </div>

        <div className="mt-20 border-t border-border pt-12">
          <PayzixLogo tagline className="h-12 w-auto" />
        </div>
      </div>
    </main>
  );
}