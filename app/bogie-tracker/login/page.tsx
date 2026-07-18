import type { Metadata } from "next";
import { Suspense } from "react";
import TrackerLoginForm from "./TrackerLoginForm";

export const metadata: Metadata = {
  title: "Company Log In — Bogie Tracker",
  description: "Log in or create a Bogie Tracker company account to manage your fleet dispatch plan.",
  robots: { index: false, follow: false },
};

export default function TrackerLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 pt-32 pb-20 sm:pt-40">
      <Suspense fallback={null}>
        <TrackerLoginForm />
      </Suspense>
    </main>
  );
}
