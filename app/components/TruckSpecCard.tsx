import {
  Truck,
  Container,
  Zap,
  Package,
  Bike,
  type LucideIcon,
} from "lucide-react";

function getTruckIcon(name: string, slug: string): LucideIcon {
  const key = `${slug} ${name}`.toLowerCase();
  if (key.includes("container") || key.includes("trailer")) return Container;
  if (key.includes("e-loader") || key.includes("eloader")) return Zap;
  if (key.includes("eeco")) return Package;
  if (key.includes("2 wheeler") || key.includes("2wheeler") || key.includes("bike"))
    return Bike;
  return Truck;
}

function formatFuelTypes(fuelTypes?: string[] | null): string | null {
  if (!fuelTypes || fuelTypes.length === 0) return null;
  return fuelTypes.join(" / ");
}

export default function TruckSpecCard({
  name,
  slug,
  scope,
  weightCapacityKg,
  heightM,
  widthM,
  lengthM,
  fuelTypes,
}: {
  name: string;
  slug: string;
  scope: string;
  weightCapacityKg?: number | null;
  heightM?: number | null;
  widthM?: number | null;
  lengthM?: number | null;
  fuelTypes?: string[] | null;
}) {
  const Icon = getTruckIcon(name, slug);
  const hasDimensions = lengthM && widthM && heightM;
  const fuel = formatFuelTypes(fuelTypes);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-100 transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
          <Icon size={22} />
        </div>
        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
          {scope === "outstation" ? "Outstation" : "City"}
        </span>
      </div>
      <p className="mt-3 font-bold text-neutral-900">{name}</p>
      {weightCapacityKg ? (
        <p className="mt-1 text-xs text-neutral-500">Up to {weightCapacityKg} kg</p>
      ) : null}
      {hasDimensions ? (
        <p className="mt-1 text-xs text-neutral-500">
          {lengthM}m × {widthM}m × {heightM}m
        </p>
      ) : null}
      {fuel ? <p className="mt-1 text-xs text-neutral-500">{fuel}</p> : null}
    </div>
  );
}
