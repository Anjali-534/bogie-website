export type DurationKey = "monthly" | "quarterly" | "halfYearly" | "yearly";

export const DURATIONS: { key: DurationKey; label: string; months: number; save: string | null }[] = [
  { key: "monthly", label: "Monthly", months: 1, save: null },
  { key: "quarterly", label: "Quarterly", months: 3, save: "Save 25%" },
  { key: "halfYearly", label: "Half-Yearly", months: 6, save: "Save 30%" },
  { key: "yearly", label: "Yearly", months: 12, save: "Save 33%" },
];

export type PlanId = "single" | "2users" | "5users" | "mega" | "lifetime";

export type Plan = {
  id: PlanId;
  name: string;
  prices: Record<DurationKey, number>;
  recommended?: boolean;
  features: {
    panelLogins: string;
    dispatchesPerDay: string;
    ewayBill: boolean;
    dispatchHistory: string;
    support: string;
  };
};

export const PLANS: Plan[] = [
  {
    id: "single",
    name: "Single User",
    prices: { monthly: 500, quarterly: 375, halfYearly: 350, yearly: 335 },
    features: {
      panelLogins: "1",
      dispatchesPerDay: "5",
      ewayBill: false,
      dispatchHistory: "30 days",
      support: "Email",
    },
  },
  {
    id: "2users",
    name: "2 Users",
    prices: { monthly: 700, quarterly: 525, halfYearly: 490, yearly: 469 },
    features: {
      panelLogins: "2",
      dispatchesPerDay: "10",
      ewayBill: true,
      dispatchHistory: "30 days",
      support: "Email",
    },
  },
  {
    id: "5users",
    name: "5 Users",
    prices: { monthly: 1000, quarterly: 750, halfYearly: 700, yearly: 670 },
    recommended: true,
    features: {
      panelLogins: "5",
      dispatchesPerDay: "30",
      ewayBill: true,
      dispatchHistory: "90 days",
      support: "Priority email",
    },
  },
  {
    id: "mega",
    name: "Mega",
    prices: { monthly: 2000, quarterly: 1500, halfYearly: 1400, yearly: 1340 },
    features: {
      panelLogins: "Unlimited",
      dispatchesPerDay: "Unlimited",
      ewayBill: true,
      dispatchHistory: "Full history",
      support: "Priority + phone",
    },
  },
];

export const LIFETIME_PRICE = 20000;
export const LIFETIME_PLAN_NAME = "Lifetime";

export const GST_RATE = 0.18;

export function findPlan(planId: string): Plan | undefined {
  return PLANS.find((p) => p.id === planId);
}

export function isValidDuration(duration: string): duration is DurationKey {
  return DURATIONS.some((d) => d.key === duration);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export type PriceBreakdown = {
  planName: string;
  durationLabel: string;
  months: number;
  baseAmount: number;
  gstAmount: number;
  totalAmount: number;
};

export function getPriceBreakdown(planId: string, duration: string): PriceBreakdown | null {
  if (planId === "lifetime") {
    const baseAmount = round2(LIFETIME_PRICE);
    const gstAmount = round2(baseAmount * GST_RATE);
    return {
      planName: LIFETIME_PLAN_NAME,
      durationLabel: "One-time",
      months: 1,
      baseAmount,
      gstAmount,
      totalAmount: round2(baseAmount + gstAmount),
    };
  }

  const plan = findPlan(planId);
  if (!plan || !isValidDuration(duration)) return null;

  const durationInfo = DURATIONS.find((d) => d.key === duration)!;
  const baseAmount = round2(plan.prices[duration] * durationInfo.months);
  const gstAmount = round2(baseAmount * GST_RATE);

  return {
    planName: plan.name,
    durationLabel: durationInfo.label,
    months: durationInfo.months,
    baseAmount,
    gstAmount,
    totalAmount: round2(baseAmount + gstAmount),
  };
}

export function formatINR(n: number): string {
  return `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
