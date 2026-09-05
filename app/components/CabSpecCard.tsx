import { Bike, CarFront, CarTaxiFront, Caravan, type LucideIcon } from "lucide-react";

function getCabIcon(name: string, slug: string): LucideIcon {
  const key = `${slug} ${name}`.toLowerCase();
  if (key.includes("2w") || key.includes("2 wheeler")) return Bike;
  if (key.includes("3w") || key.includes("auto")) return CarFront;
  if (key.includes("suv")) return Caravan;
  return CarTaxiFront;
}

export default function CabSpecCard({
  name,
  slug,
  capacity,
}: {
  name: string;
  slug: string;
  capacity: number;
}) {
  const Icon = getCabIcon(name, slug);

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-100 transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
          <Icon size={22} />
        </div>
        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
          Ride
        </span>
      </div>
      <p className="mt-3 font-bold text-neutral-900">{name}</p>
      <p className="mt-2 text-base font-bold text-primary">Seats {capacity}</p>
    </div>
  );
}
