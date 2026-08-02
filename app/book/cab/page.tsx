import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Car, Clock } from "lucide-react";
import CabBookingFlow from "./CabBookingFlow";
import { getServices } from "../../lib/api";
import { CAB_COMING_SOON } from "../../lib/featureFlags";

export const metadata: Metadata = {
  title: "Book a Cab — Bogie",
  description: "Book a cab ride with real-time fare estimates on Bogie.",
  robots: { index: false, follow: false },
};

function CabComingSoon() {
  return (
    <main className="relative flex min-h-[70vh] items-center overflow-hidden bg-neutral-50 px-4 pt-24 pb-16 sm:px-6 sm:pt-28 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary">
          <Car size={30} />
        </div>
        <span className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-1.5 text-xs font-bold text-white shadow-md">
          <Clock size={13} />
          Coming Soon
        </span>
        <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
          Cab booking isn&apos;t open yet.
        </h1>
        <p className="mt-6 text-lg text-neutral-600">
          We&apos;re putting the finishing touches on cab booking. Check back
          soon — meanwhile, Truck and Ambulance are live and ready to book.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
          >
            Back to Home
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}

export default async function BookCabPage() {
  if (CAB_COMING_SOON) {
    return <CabComingSoon />;
  }

  const services = await getServices();
  const cabs = services.filter((s) => s.category === "cab");

  return (
    <main className="min-h-screen bg-neutral-50 px-4 pt-24 pb-16 sm:px-6 sm:pt-28 lg:px-8">
      <CabBookingFlow services={cabs} />
    </main>
  );
}
