import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import Footer from "../components/Footer";
import DeleteAccountFlow from "./DeleteAccountFlow";

export const metadata: Metadata = {
  title: "Delete Account — Bogie",
  description:
    "Permanently delete your Bogie rider account. Log in to your existing account to request deletion.",
  alternates: { canonical: "https://bogie.in/delete-account" },
};

export default function DeleteAccountPage() {
  return (
    <>
      <main>
        <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-red-500/10 blur-3xl" />
            <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-red-500/5 blur-3xl" />
          </div>

          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-1.5 text-xs font-semibold text-red-700">
                <AlertTriangle size={14} />
                Delete Account
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
                Delete your Bogie account
              </h1>
              <p className="mt-6 text-lg text-neutral-600">
                This permanently deletes your rider account. Please read
                what happens below before continuing.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 sm:p-8">
                <h2 className="text-lg font-bold text-neutral-900 sm:text-xl">
                  What happens when you delete your account
                </h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-700">
                  <li>Your account is permanently deleted and cannot be undone.</li>
                  <li>
                    Your saved addresses and location history are deleted.
                  </li>
                  <li>
                    Booking history is retained only as required for GST/tax
                    compliance (3 years), as described in our{" "}
                    <a
                      href="/privacy-policy"
                      className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:text-primary-dark"
                    >
                      Privacy Policy
                    </a>
                    .
                  </li>
                  <li>
                    If your wallet has a non-zero balance, deletion will be
                    blocked until it&apos;s settled — you&apos;ll see a
                    message if that applies to you.
                  </li>
                </ul>

                <div className="mt-6 border-t border-neutral-100 pt-6">
                  <DeleteAccountFlow />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
