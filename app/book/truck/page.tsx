import type { Metadata } from "next";
import TruckBookingFlow from "./TruckBookingFlow";
import { getServices } from "../../lib/api";

export const metadata: Metadata = {
  title: "Book a Truck — Bogie",
  description: "Book a truck for city or outstation logistics with real-time fare estimates on Bogie.",
  robots: { index: false, follow: false },
};

export default async function BookTruckPage() {
  const services = await getServices();
  const trucks = services.filter((s) => s.category === "truck");

  return (
    <main className="min-h-screen bg-neutral-50 px-4 pt-24 pb-16 sm:px-6 sm:pt-28 lg:px-8">
      <TruckBookingFlow services={trucks} />
    </main>
  );
}
