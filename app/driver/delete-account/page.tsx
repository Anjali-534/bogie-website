import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import AnimatedSection from "../../components/AnimatedSection";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Delete Account — Bogie Driver",
  description:
    "How to permanently delete your Bogie Driver account, what happens to your data, and how to reach driver support.",
  alternates: { canonical: "https://bogie.in/driver/delete-account" },
};

const DRIVER_SUPPORT_EMAIL = "driver-support@bogie.in";

function MailLink({ address }: { address: string }) {
  return (
    <a
      href={`mailto:${address}`}
      className="font-medium text-primary underline decoration-primary/30 underline-offset-2 hover:text-primary-dark"
    >
      {address}
    </a>
  );
}

export default function DriverDeleteAccountPage() {
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
                Delete your Bogie Driver account
              </h1>
              <p className="mt-6 text-lg text-neutral-600">
                This permanently deletes your driver account. Please read
                what happens below before continuing.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6">
              <AnimatedSection>
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 sm:p-8">
                  <h2 className="text-lg font-bold text-neutral-900 sm:text-xl">
                    In the app (recommended)
                  </h2>
                  <div className="mt-4 border-t border-neutral-100 pt-4 text-sm leading-relaxed text-neutral-700">
                    <p>
                      Open the Bogie Driver app and go to{" "}
                      <span className="font-semibold text-neutral-900">
                        Profile → Settings → Delete Account
                      </span>
                      . You&apos;ll be asked to confirm your password, and
                      we&apos;ll check that your account is eligible for
                      deletion — specifically:
                    </p>
                    <ul className="mt-3 list-disc space-y-1.5 pl-5">
                      <li>You have no active or in-progress trip</li>
                      <li>
                        You have no upcoming scheduled rides you&apos;ve
                        already accepted
                      </li>
                      <li>
                        Your wallet balance is exactly ₹0 (any pending
                        earnings owed to you, or any outstanding balance you
                        owe, must be settled first)
                      </li>
                      <li>
                        Your account is not currently blocked or under
                        review
                      </li>
                      <li>
                        You have no open complaint or payment dispute
                        pending resolution
                      </li>
                    </ul>
                    <p className="mt-3">
                      If any of these apply, the app will tell you exactly
                      what needs to be resolved first. Once you&apos;re
                      eligible, you&apos;ll confirm deletion by typing
                      &quot;DELETE&quot; — this is permanent and cannot be
                      undone.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.05}>
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 sm:p-8">
                  <h2 className="text-lg font-bold text-neutral-900 sm:text-xl">
                    Can&apos;t access the app?
                  </h2>
                  <div className="mt-4 border-t border-neutral-100 pt-4 text-sm leading-relaxed text-neutral-700">
                    <p>
                      Email us at{" "}
                      <MailLink address={DRIVER_SUPPORT_EMAIL} /> from your
                      registered email address, with the subject line
                      &quot;Driver Account Deletion Request,&quot; and
                      include your registered mobile number. We&apos;ll
                      verify your account meets the same eligibility
                      conditions above before processing your request
                      manually.
                    </p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 sm:p-8">
                  <h2 className="text-lg font-bold text-neutral-900 sm:text-xl">
                    What happens when your account is deleted
                  </h2>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-neutral-700">
                    <li>
                      Your account is deactivated immediately, and your
                      name, email, phone number, and profile photo are
                      removed from our systems.
                    </li>
                    <li>
                      <span className="font-semibold text-neutral-900">
                        Vehicle and KYC documents
                      </span>{" "}
                      (Aadhaar, PAN, Driving Licence, RC, insurance, and
                      related documents) are retained as required under RTO
                      regulations and the Motor Vehicles Act, even after
                      account deletion.
                    </li>
                    <li>
                      <span className="font-semibold text-neutral-900">
                        Earnings and trip records
                      </span>{" "}
                      are retained for 3 years as required for GST and tax
                      compliance.
                    </li>
                    <li>
                      <span className="font-semibold text-neutral-900">
                        Bank and UPI payout details
                      </span>{" "}
                      are retained alongside earnings records for the same
                      compliance period.
                    </li>
                    <li>
                      <span className="font-semibold text-neutral-900">
                        Location history
                      </span>{" "}
                      is permanently deleted within 30 days of your account
                      being deleted.
                    </li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 sm:p-8">
                  <h2 className="text-lg font-bold text-neutral-900 sm:text-xl">
                    Questions?
                  </h2>
                  <div className="mt-4 border-t border-neutral-100 pt-4 text-sm leading-relaxed text-neutral-700">
                    <p>
                      Contact us at <MailLink address={DRIVER_SUPPORT_EMAIL} />{" "}
                      and we&apos;ll respond within 7 working days.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <p className="mt-10 text-center text-xs text-neutral-500">
              Bogie is operated by Bogie AI Technologies Pvt. Ltd.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
