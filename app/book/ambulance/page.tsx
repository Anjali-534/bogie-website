import type { Metadata } from "next";
import AmbulanceBookingFlow from "./AmbulanceBookingFlow";
import { getServices } from "../../lib/api";

export const metadata: Metadata = {
  title: "Book an Ambulance — Bogie",
  description:
    "Book a BLS/ALS ambulance or request a free NGO ambulance with zero platform commission on Bogie.",
  robots: { index: false, follow: false },
};

export default async function BookAmbulancePage() {
  const services = await getServices();
  const ambulances = services.filter((s) => s.category === "ambulance");

  return (
    <main className="min-h-screen bg-neutral-50 px-4 pt-24 pb-16 sm:px-6 sm:pt-28 lg:px-8">
      <AmbulanceBookingFlow services={ambulances} />
    </main>
  );
}
