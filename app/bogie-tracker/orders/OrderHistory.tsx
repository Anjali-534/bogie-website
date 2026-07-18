"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Download, Loader2 } from "lucide-react";
import { useTrackerAuth } from "../../lib/TrackerAuthContext";
import { downloadTrackerInvoice, getTrackerPlanOrders, type TrackerPlanOrder } from "../../lib/api";
import { findPlan, formatINR, LIFETIME_PLAN_NAME } from "../../lib/trackerPlans";

const STATUS_STYLES: Record<TrackerPlanOrder["status"], string> = {
  pending: "bg-amber-100 text-amber-700",
  paid: "bg-green-100 text-green-700",
  cancelled: "bg-neutral-100 text-neutral-500",
};

function planName(planId: string): string {
  if (planId === "lifetime") return LIFETIME_PLAN_NAME;
  return findPlan(planId)?.name || planId;
}

export default function OrderHistory() {
  const router = useRouter();
  const { company, token, isLoading: authLoading } = useTrackerAuth();

  const [orders, setOrders] = useState<TrackerPlanOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!company || !token) {
      router.replace(
        `/bogie-tracker/login?redirect=${encodeURIComponent("/bogie-tracker/orders")}`
      );
      return;
    }

    getTrackerPlanOrders(token)
      .then(setOrders)
      .catch((err) => setError(err instanceof Error ? err.message : "Couldn't load your orders."))
      .finally(() => setLoading(false));
  }, [authLoading, company, token, router]);

  async function handleDownload(orderId: string) {
    if (!token) return;
    setDownloadingId(orderId);
    try {
      await downloadTrackerInvoice(token, orderId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't download the invoice.");
    } finally {
      setDownloadingId(null);
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={28} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
          My orders
        </h1>
        <a
          href="/bogie-tracker"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark"
        >
          View plans
          <ArrowRight size={14} />
        </a>
      </div>

      {error && <p className="mb-4 text-sm font-medium text-red-600">{error}</p>}

      {orders.length === 0 ? (
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-neutral-100">
          <p className="text-sm text-neutral-600">You haven&apos;t placed any orders yet.</p>
          <a
            href="/bogie-tracker"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Browse plans
            <ArrowRight size={16} />
          </a>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-100 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-neutral-900">
                    {planName(order.plan_id)}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[order.status]}`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-neutral-600">
                  {formatINR(order.total_amount)} · Ordered{" "}
                  {new Date(order.created_at).toLocaleDateString("en-IN")}
                </p>
              </div>

              {order.status === "paid" && (
                <button
                  onClick={() => handleDownload(order.id)}
                  disabled={downloadingId === order.id}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:border-primary hover:text-primary disabled:opacity-60"
                >
                  {downloadingId === order.id ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <Download size={15} />
                  )}
                  Invoice
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
