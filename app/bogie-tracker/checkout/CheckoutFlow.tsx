"use client";

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useTrackerAuth } from "../../lib/TrackerAuthContext";
import { createTrackerPlanOrder } from "../../lib/api";
import { getPriceBreakdown, formatINR } from "../../lib/trackerPlans";
import GSTInput, { isValidGSTIN } from "../GSTInput";

const inputClass =
  "rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary disabled:opacity-60";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-neutral-700">{label}</span>
      {children}
    </label>
  );
}

type Status = "idle" | "submitting" | "error" | "confirmed";

export default function CheckoutFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { company, token, isLoading } = useTrackerAuth();

  const planId = searchParams.get("plan") || "";
  const duration = searchParams.get("billing") || "monthly";

  const breakdown = useMemo(() => getPriceBreakdown(planId, duration), [planId, duration]);

  const [billingName, setBillingName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [gstin, setGstin] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!company || !token) {
      const redirect = `/bogie-tracker/checkout?${searchParams.toString()}`;
      router.replace(`/bogie-tracker/login?redirect=${encodeURIComponent(redirect)}`);
    }
  }, [isLoading, company, token, router, searchParams]);

  useEffect(() => {
    if (company?.name) setBillingName(company.name);
  }, [company]);

  if (isLoading || !company || !token) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={28} />
      </div>
    );
  }

  if (!breakdown) {
    return (
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-neutral-100">
        <h1 className="text-xl font-bold text-neutral-900">Plan not found</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Please pick a plan from the pricing page to continue.
        </p>
        <a
          href="/bogie-tracker"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          View plans
          <ArrowRight size={16} />
        </a>
      </div>
    );
  }

  if (status === "confirmed") {
    return (
      <div className="mx-auto max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-neutral-100 sm:p-10">
        <CheckCircle2 className="mx-auto text-primary" size={48} />
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-neutral-900">
          Order received
        </h1>
        <p className="mt-3 text-sm text-neutral-600">
          Thanks for your order{orderId ? ` (#${orderId.slice(0, 8)})` : ""}. We confirm
          payments manually — once we've received it, we'll email your GST invoice and
          activate your plan.
        </p>
        <a
          href="/bogie-tracker/orders"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          View my orders
          <ArrowRight size={16} />
        </a>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting" || !token) return;

    const trimmedGstin = gstin.trim().toUpperCase();
    if (trimmedGstin && !isValidGSTIN(trimmedGstin)) {
      setError("Enter a valid GSTIN, or leave that field blank.");
      setStatus("error");
      return;
    }
    if (!billingName.trim() || !address.trim() || !city.trim() || !state.trim() || !pincode.trim()) {
      setError("Please fill in all required billing fields.");
      setStatus("error");
      return;
    }
    if (!/^\d{6}$/.test(pincode.trim())) {
      setError("Enter a valid 6-digit pincode.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError("");
    try {
      const order = await createTrackerPlanOrder(token, {
        plan_id: planId,
        duration,
        billing_name: billingName.trim(),
        billing_address: address.trim(),
        billing_city: city.trim(),
        billing_state: state.trim(),
        billing_pincode: pincode.trim(),
        gstin: trimmedGstin || null,
      });
      setOrderId(order.id);
      setStatus("confirmed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't submit your order.");
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
      <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-neutral-100 sm:p-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
          Billing details
        </h1>
        <p className="mt-1 text-sm text-neutral-600">
          Tell us where to send your invoice.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" noValidate>
          <Field label="Billing name">
            <input
              required
              type="text"
              value={billingName}
              onChange={(e) => setBillingName(e.target.value)}
              placeholder="Company or contact name"
              disabled={status === "submitting"}
              className={inputClass}
            />
          </Field>

          <Field label="Address">
            <input
              required
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street address"
              disabled={status === "submitting"}
              className={inputClass}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="City">
              <input
                required
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={status === "submitting"}
                className={inputClass}
              />
            </Field>
            <Field label="State">
              <input
                required
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                disabled={status === "submitting"}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Pincode">
            <input
              required
              type="text"
              inputMode="numeric"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="110001"
              disabled={status === "submitting"}
              className={`${inputClass} max-w-[10rem]`}
            />
          </Field>

          <GSTInput value={gstin} onChange={setGstin} disabled={status === "submitting"} />

          {status === "error" && (
            <p className="text-sm font-medium text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
          >
            {status === "submitting" ? (
              <>
                Submitting...
                <Loader2 size={16} className="animate-spin" />
              </>
            ) : (
              <>
                Place order
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>

      <div className="h-fit rounded-3xl bg-white p-7 shadow-sm ring-1 ring-neutral-100 sm:p-8">
        <h2 className="text-lg font-bold text-neutral-900">Order summary</h2>
        <p className="mt-1 text-sm text-neutral-600">
          {breakdown.planName} · {breakdown.durationLabel}
        </p>

        <div className="mt-6 flex flex-col gap-3 border-t border-neutral-100 pt-6 text-sm">
          <div className="flex justify-between text-neutral-700">
            <span>Base amount</span>
            <span className="font-medium">{formatINR(breakdown.baseAmount)}</span>
          </div>
          <div className="flex justify-between text-neutral-700">
            <span>GST (18%)</span>
            <span className="font-medium">{formatINR(breakdown.gstAmount)}</span>
          </div>
          <div className="flex justify-between border-t border-neutral-100 pt-3 text-base font-bold text-neutral-900">
            <span>Total</span>
            <span>{formatINR(breakdown.totalAmount)}</span>
          </div>
        </div>

        <p className="mt-6 text-xs text-neutral-500">
          This is an estimate for your reference — the final amount is calculated when
          your order is submitted.
        </p>
      </div>
    </div>
  );
}
