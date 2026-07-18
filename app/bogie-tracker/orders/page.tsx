import type { Metadata } from "next";
import { Suspense } from "react";
import OrderHistory from "./OrderHistory";

export const metadata: Metadata = {
  title: "My Orders — Bogie Tracker",
  description: "View your Bogie Tracker plan orders and download invoices.",
  robots: { index: false, follow: false },
};

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 pt-32 pb-20 sm:pt-40">
      <Suspense fallback={null}>
        <OrderHistory />
      </Suspense>
    </main>
  );
}
