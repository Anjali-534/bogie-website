import type { Metadata } from "next";
import CabBookingFlow from "./CabBookingFlow";
import { getServices } from "../../lib/api";

export const metadata: Metadata = {
  title: "Book a Cab — Bogie",
  description: "Book a cab ride with real-time fare estimates on Bogie.",
  robots: { index: false, follow: false },
};

export default async function BookCabPage() {
  const services = await getServices();
  const cabs = services.filter((s) => s.category === "cab");

  return (
    <main className="min-h-screen bg-neutral-50 px-4 pt-24 pb-16 sm:px-6 sm:pt-28 lg:px-8">
      <CabBookingFlow services={cabs} />
    </main>
  );
}
