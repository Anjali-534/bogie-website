import { Clock3, Wallet, MapPinned, ShieldCheck, FileCheck2 } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";

const categories = [
  {
    icon: Clock3,
    name: "Why Drive with Bogie",
    features: [
      "Go online or offline anytime — full control over your hours",
      "Transparent 20% commission — you keep 80% of every fare",
      "Withdraw earnings on demand, no fixed payout cycle",
      "In-app support, whenever you need it",
    ],
  },
  {
    icon: Wallet,
    name: "Earnings",
    features: [
      "Daily earnings tracker — see today's trips and totals at a glance",
      "Referral rewards — ₹50 for every driver you refer, ₹25 on their referrals",
    ],
  },
  {
    icon: MapPinned,
    name: "In the App",
    features: [
      "Live GPS navigation on every trip",
      "Fares calculated automatically, no manual entry",
      "Full trip history, always available",
    ],
  },
  {
    icon: ShieldCheck,
    name: "Safety",
    features: [
      "Emergency SOS button, one tap away",
      "Live trip tracking shared with support",
      "OTP-verified pickups on every ride",
    ],
  },
  {
    icon: FileCheck2,
    name: "Simple Registration",
    features: [
      "Aadhaar & PAN upload",
      "Driving licence & RC upload",
      "Vehicle insurance upload",
      "Photo ID upload",
      "Bank details on file",
    ],
  },
];

export default function DriverFeatures() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            What you get
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Built for drivers who want clarity, not surprises.
          </h2>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <AnimatedSection key={category.name} delay={i * 0.1} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-neutral-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
                  <category.icon size={28} />
                </div>

                <h3 className="mt-5 text-xl font-extrabold text-neutral-900">
                  {category.name}
                </h3>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {category.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-neutral-700">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
