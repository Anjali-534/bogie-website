import type { Metadata } from "next";
import { Suspense } from "react";
import CheckoutFlow from "./CheckoutFlow";

export const metadata: Metadata = {
  title: "Checkout — Bogie Tracker",
  description: "Complete your Bogie Tracker plan purchase.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 pt-32 pb-20 sm:pt-40">
      <Suspense fallback={null}>
        <CheckoutFlow />
      </Suspense>
    </main>
  );
}
