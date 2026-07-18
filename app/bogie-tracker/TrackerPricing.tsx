"use client";

import { useState } from "react";
import {
  Check,
  Minus,
  ArrowRight,
  MapPin,
  PenTool,
  Bell,
  Smartphone,
  ShieldCheck,
  Activity,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { DURATIONS, PLANS, LIFETIME_PRICE, type DurationKey } from "../lib/trackerPlans";
import { useTrackerAuth } from "../lib/TrackerAuthContext";

const LIFETIME_FEATURES = [
  "Unlimited panel logins",
  "Unlimited dispatches / day",
  "Live GPS tracking",
  "Proof of delivery",
  "Shareable tracking links",
  "E-way bill / GSTIN capture",
  "Full dispatch history",
  "Priority + phone support",
];

const COMMON_FEATURES = ["Live GPS tracking", "Proof of delivery", "Shareable tracking links"];

const INCLUDED_FEATURES = [
  { icon: MapPin, label: "Live GPS tracking" },
  { icon: PenTool, label: "Proof of delivery" },
  { icon: Bell, label: "Shareable customer tracking links" },
  { icon: Smartphone, label: "Mobile-friendly panel access" },
  { icon: ShieldCheck, label: "Secure data handling" },
  { icon: Activity, label: "Real-time status updates" },
];

function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function TrackerPricing() {
  const router = useRouter();
  const { company, isLoading } = useTrackerAuth();
  const [duration, setDuration] = useState<DurationKey>("monthly");
  const durationInfo = DURATIONS.find((d) => d.key === duration)!;

  function goToCheckout(planId: string, billing: string) {
    if (isLoading) return;
    const checkoutPath = `/bogie-tracker/checkout?plan=${planId}&billing=${billing}`;
    if (!company) {
      router.push(`/bogie-tracker/login?redirect=${encodeURIComponent(checkoutPath)}`);
      return;
    }
    router.push(checkoutPath);
  }

  return (
    <section id="pricing" className="bg-neutral-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-neutral-900">
          Simple pricing for every fleet
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-neutral-600">
          Pick the plan that fits your team. Prices are per month, billed by
          the duration you choose.
        </p>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-full bg-white p-1 ring-1 ring-neutral-200">
            {DURATIONS.map((d) => (
              <button
                key={d.key}
                onClick={() => setDuration(d.key)}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  duration === d.key
                    ? "bg-primary text-white"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {d.label}
                {d.save && (
                  <span
                    className={`ml-1.5 text-xs font-medium ${
                      duration === d.key ? "text-white/80" : "text-primary"
                    }`}
                  >
                    {d.save}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => {
            const price = plan.prices[duration];
            const discounted = duration !== "monthly";
            const total = price * durationInfo.months;

            return (
              <div
                key={plan.id}
                className={`relative flex h-full flex-col rounded-2xl p-6 ${
                  plan.recommended
                    ? "border-2 border-primary bg-white shadow-[0_10px_40px_-15px_rgba(255,107,43,0.45)]"
                    : "border border-neutral-200 bg-white shadow-sm"
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    Recommended
                  </span>
                )}

                <h3 className="text-lg font-bold text-neutral-900">{plan.name}</h3>

                <div className="mt-4">
                  {discounted && (
                    <span className="mr-2 text-sm text-neutral-400 line-through">
                      {formatINR(plan.prices.monthly)}
                    </span>
                  )}
                  <span className="text-3xl font-extrabold text-neutral-900">
                    {formatINR(price)}
                  </span>
                  <span className="text-sm text-neutral-500">/mo</span>
                </div>

                <button
                  onClick={() => goToCheckout(plan.id, duration)}
                  className={`mt-5 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] ${
                    plan.recommended
                      ? "bg-primary text-white hover:bg-primary-dark"
                      : "border border-neutral-200 text-neutral-700 hover:border-primary hover:text-primary"
                  }`}
                >
                  Get Started
                  <ArrowRight size={16} />
                </button>

                <p className="mt-3 text-xs text-neutral-500">
                  {duration === "monthly"
                    ? "Billed monthly"
                    : `Billed ${formatINR(total)} every ${durationInfo.months} months`}
                </p>

                <ul className="mt-6 space-y-3 text-sm">
                  <li className="flex items-center gap-2 text-neutral-700">
                    <Check size={16} className="shrink-0 text-primary" />
                    {plan.features.panelLogins} panel login{plan.features.panelLogins === "1" ? "" : "s"}
                  </li>
                  <li className="flex items-center gap-2 text-neutral-700">
                    <Check size={16} className="shrink-0 text-primary" />
                    {plan.features.dispatchesPerDay} dispatches / day
                  </li>
                  {COMMON_FEATURES.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-neutral-700">
                      <Check size={16} className="shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                  <li
                    className={`flex items-center gap-2 ${
                      plan.features.ewayBill ? "text-neutral-700" : "text-neutral-400"
                    }`}
                  >
                    {plan.features.ewayBill ? (
                      <Check size={16} className="shrink-0 text-primary" />
                    ) : (
                      <Minus size={16} className="shrink-0 text-neutral-300" />
                    )}
                    E-way bill / GSTIN capture
                  </li>
                  <li className="flex items-center gap-2 text-neutral-700">
                    <Check size={16} className="shrink-0 text-primary" />
                    {plan.features.dispatchHistory} history
                  </li>
                  <li className="flex items-center gap-2 text-neutral-700">
                    <Check size={16} className="shrink-0 text-primary" />
                    {plan.features.support} support
                  </li>
                </ul>
              </div>
            );
          })}
        </div>

        <div className="relative mt-10 overflow-hidden rounded-3xl border-2 border-primary bg-primary-light p-8 sm:p-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                <Sparkles size={13} />
                One-time offer
              </span>
              <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                Lifetime plan — pay once, use forever.
              </h3>
              <p className="mt-3 text-neutral-700">
                One-time payment — everything included, no renewals, no
                recurring billing.
              </p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-neutral-900">
                  {formatINR(LIFETIME_PRICE)}
                </span>
                <span className="text-sm font-medium text-neutral-600">one-time</span>
              </div>
              <button
                onClick={() => goToCheckout("lifetime", "monthly")}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Started
                <ArrowRight size={16} />
              </button>
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {LIFETIME_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm font-medium text-neutral-800">
                  <Check size={16} className="shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 items-center gap-8 rounded-3xl bg-primary-light p-8 sm:p-12 lg:grid-cols-2 lg:gap-12">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
              Enjoy all this.
              <br />
              At no extra cost.
            </h3>
            <p className="mt-3 text-neutral-600">
              Every Bogie Tracker plan includes these, no matter which tier
              you choose.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {INCLUDED_FEATURES.map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-primary">
                  <f.icon size={18} />
                </span>
                <span className="text-sm font-medium text-neutral-800">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xs text-neutral-500">
            Secure payments — multiple options available at checkout.
          </p>
          <p className="mx-auto mt-1 max-w-xl text-xs text-neutral-500">
            All plans are billed upfront for the selected duration. The
            per-month rate shown reflects the total plan price divided by
            the number of months.
          </p>
        </div>
      </div>
    </section>
  );
}
