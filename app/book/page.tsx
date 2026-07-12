import type { Metadata } from "next";
import Link from "next/link";
import { Car, Truck, Ambulance, ArrowRight, BadgeCheck, type LucideIcon } from "lucide-react";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Book a Ride — Bogie",
  description:
    "Book a cab, truck, or ambulance in your browser — live fares, live tracking, zero drama. Bogie moves Delhi NCR.",
};

type BookOption = {
  icon: LucideIcon;
  name: string;
  tagline: string;
  features: string[];
  href: string;
  cta: string;
  badge: string | null;
};

const options: BookOption[] = [
  {
    icon: Car,
    name: "Cab",
    tagline: "Wherever you're headed, whenever you need it.",
    features: ["2 Wheeler, Auto, Mini, SUV", "Upfront fare before you book", "Live tracking & OTP pickup"],
    href: "/book/cab",
    cta: "Book a cab",
    badge: null,
  },
  {
    icon: Truck,
    name: "Truck",
    tagline: "Logistics that keep your business moving.",
    features: ["Within-city & outstation", "Loading/unloading add-ons", "Receiver details & delivery updates"],
    href: "/book/truck",
    cta: "Book a truck",
    badge: null,
  },
  {
    icon: Ambulance,
    name: "Ambulance",
    tagline: "Emergency care, without the price tag games.",
    features: ["Paid BLS/ALS via partner hospitals", "Free via registered NGOs", "Zero commission — always"],
    href: "/book/ambulance",
    cta: "Request an ambulance",
    badge: "0% commission",
  },
];

export default function BookPage() {
  return (
    <>
      <main className="min-h-screen bg-neutral-50 px-4 pt-28 pb-20 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Book online
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              What do you need to move today?
            </h1>
            <p className="mt-4 text-neutral-600">
              Pick a service to book right here in your browser — booked in
              seconds, tracked live.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {options.map((option) => (
              <Link
                key={option.name}
                href={option.href}
                className="group relative flex h-full flex-col rounded-3xl border border-neutral-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
              >
                {option.badge && (
                  <span className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-md">
                    <BadgeCheck size={13} />
                    {option.badge}
                  </span>
                )}

                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <option.icon size={28} />
                </div>

                <h2 className="mt-5 text-xl font-extrabold text-neutral-900">
                  {option.name}
                </h2>
                <p className="mt-1.5 text-sm text-neutral-600">{option.tagline}</p>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {option.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-neutral-700">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>

                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-transform group-hover:gap-2.5">
                  {option.cta}
                  <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-neutral-500">
            Not sure what your trip will cost? Try the{" "}
            <Link href="/fare-estimator" className="font-semibold text-primary hover:underline">
              fare estimator
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
