import { HeartHandshake, HeartPulse, Activity, CheckCircle2, type LucideIcon } from "lucide-react";

// Description/feature data confirmed from the codebase — not invented:
// - Patient Transport: description + equipment list from the (unwired)
//   mobile screen user-app/app/(app)/ambulance/vehicles.tsx (AMBU_META).
// - BLS: the fuller FAQ wording (app/help/data.ts), mechanically split
//   into its own comma-separated items — no rewording.
// - ALS: the only description that exists anywhere in the codebase
//   (AmbulanceBookingFlow.tsx SUB_TYPES), mechanically split the same way.
const TIER_META: Record<
  string,
  { icon: LucideIcon; description?: string; features: string[] }
> = {
  ambulance_transport: {
    icon: HeartHandshake,
    description: "Non-emergency patient transfer, comfortable and safe",
    features: ["Wheelchair", "Stretcher", "Attendant"],
  },
  ambulance_bls: {
    icon: HeartPulse,
    features: [
      "Trained paramedic",
      "Oxygen cylinder",
      "First aid kit",
      "Stretcher",
      "Basic patient monitoring equipment",
    ],
  },
  ambulance_als: {
    icon: Activity,
    features: ["ICU on wheels", "Ventilator", "Doctor"],
  },
};

export default function AmbulanceSpecCard({
  name,
  slug,
  capacity,
}: {
  name: string;
  slug: string;
  capacity: number;
}) {
  const meta = TIER_META[slug] || TIER_META["ambulance_bls"];
  const Icon = meta.icon;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-100 transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
        <Icon size={22} />
      </div>
      <p className="mt-3 font-bold text-neutral-900">{name}</p>
      <p className="mt-1 text-xs text-neutral-500">Seats {capacity}</p>
      {meta.description && (
        <p className="mt-3 text-xs text-neutral-600">{meta.description}</p>
      )}
      <ul className="mt-3 flex flex-col gap-1.5">
        {meta.features.map((feature) => (
          <li key={feature} className="flex items-start gap-1.5 text-xs text-neutral-600">
            <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-primary" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
