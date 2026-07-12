import { ArrowRight, Wallet, Clock3 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

export default function DriverCta() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl bg-cream-deep ring-1 ring-cream-line px-8 py-14 sm:px-16 sm:py-16">
            <div className="pointer-events-none absolute -top-16 -right-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                  Become a driver
                </p>
                <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
                  Drive with Bogie. Earn on your terms.
                </h2>
                <div className="mt-6 flex flex-wrap gap-6 text-sm text-neutral-600">
                  <span className="flex items-center gap-2">
                    <Wallet size={16} className="text-primary" />
                    Daily payouts
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock3 size={16} className="text-primary" />
                    Flexible hours
                  </span>
                </div>
              </div>

              <a
                href="https://gogobackend-production.up.railway.app/driver-app"
                className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:scale-[1.03] active:scale-[0.98]"
              >
                Start driving
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
