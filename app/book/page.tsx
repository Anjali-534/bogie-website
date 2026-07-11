import type { Metadata } from "next";
import Link from "next/link";
import { Wrench, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Booking — bogie",
  description: "In-browser booking is on its way.",
  robots: { index: false, follow: false },
};

export default function BookPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-4 pt-32 pb-20 text-center sm:pt-40">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
        <Wrench size={26} />
      </div>
      <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-neutral-900">
        In-browser booking is on its way
      </h1>
      <p className="mt-3 max-w-md text-sm text-neutral-600">
        We&apos;re still building the full booking flow. In the meantime, get in
        touch and we&apos;ll help you book directly, or download the app.
      </p>
      <Link
        href="/#contact"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
      >
        Contact us
        <ArrowRight size={16} />
      </Link>
    </main>
  );
}
