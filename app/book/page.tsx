import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Services from "../components/Services";

export const metadata: Metadata = {
  title: "Book a Ride — Bogie",
  description:
    "Book a cab, truck, or ambulance in your browser — live fares, live tracking, zero drama. Bogie moves Delhi NCR.",
};

export default function BookPage() {
  return (
    <>
      <main className="min-h-screen bg-neutral-50 pt-16">
        <Services />

        <p className="mx-auto max-w-5xl px-4 pb-20 text-center text-xs text-neutral-500 sm:px-6 lg:px-8">
          Not sure what your trip will cost? Try the{" "}
          <Link href="/fare-estimator" className="font-semibold text-primary hover:underline">
            fare estimator
          </Link>
          .
        </p>
      </main>
      <Footer />
    </>
  );
}
