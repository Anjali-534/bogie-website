import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock3, ShieldCheck, Wallet } from "lucide-react";
import DriverFeatures from "./DriverFeatures";
import DriverApplyWizard from "./DriverApplyWizard";

const DRIVER_APP_URL = "https://gogobackend-production.up.railway.app/driver-app";
const HERO_VIDEO = "/bogiedriverpartnervideo.mp4";

export const metadata: Metadata = {
  title: "Become a Driver Partner with Bogie",
  description:
    "Join Bogie as a driver partner, earn on your own schedule, and grow with trusted ride and logistics bookings in Delhi NCR.",
};

const benefits = [
  {
    title: "Flexible earning",
    text: "Choose your own hours and take trips that fit your routine.",
    icon: Clock3,
  },
  {
    title: "Fast payouts",
    text: "Receive reliable payouts with transparent earnings and simple daily tracking.",
    icon: Wallet,
  },
  {
    title: "Verified support",
    text: "Work with a trusted platform, clear trip details, and 24/7 support for partner needs.",
    icon: ShieldCheck,
  },
];

export default function DriverPartnerPage() {
  return (
    <main className="min-h-screen bg-cream pt-24">
      <section className="relative isolate flex min-h-[600px] flex-col justify-center overflow-hidden sm:min-h-[680px] lg:min-h-[760px]">
        <div className="absolute inset-0 -z-20">
          <video
            src={HERO_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-cream/95 via-white/55 to-white/20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/90 via-white/45 to-transparent" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              Driver Partner Program
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
              Drive with Bogie and grow your income on your own terms.
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-600">
              Join Bogie as a verified driver partner and access ride and logistics opportunities across Delhi NCR with clear earnings, support, and flexible scheduling.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <DriverApplyWizard
                label="Start your application"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:scale-[1.02]"
              >
                Start your application
                <ArrowRight size={18} />
              </DriverApplyWizard>
              <Link
                href="/"
                className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-6 py-3.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-primary hover:text-primary"
              >
                Back to home
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-cream-line bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BadgeCheck size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  Why partners choose Bogie
                </p>
                <h2 className="text-xl font-semibold text-neutral-900">
                  Trusted platform. Better opportunities.
                </h2>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div key={benefit.title} className="rounded-2xl border border-neutral-100 bg-cream p-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-neutral-900">{benefit.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-neutral-600">{benefit.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        </div>
      </section>

      <DriverFeatures />

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-neutral-900 px-8 py-10 text-white sm:px-10 lg:px-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-light">
                Ready to join?
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Sign up today and become a Bogie driver partner.
              </h2>
              <p className="mt-4 text-base leading-7 text-neutral-300">
                Complete the partner signup form and our team will guide you through the next steps.
              </p>
            </div>
            <a
              href={DRIVER_APP_URL}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-100"
            >
              Open partner signup
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
