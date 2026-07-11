export default function ServiceFareCard({
  name,
  capacity,
  baseFare,
  perKmRate,
}: {
  name: string;
  capacity: number;
  baseFare: number;
  perKmRate: number;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-neutral-100 transition-all hover:-translate-y-1 hover:shadow-md">
      <p className="font-bold text-neutral-900">{name}</p>
      <p className="mt-1 text-xs text-neutral-500">
        Seats {capacity}
      </p>
      <p className="mt-3 text-lg font-extrabold text-primary">
        ₹{baseFare}
        <span className="text-sm font-medium text-neutral-500"> base</span>
      </p>
      <p className="text-xs text-neutral-500">+ ₹{perKmRate}/km</p>
    </div>
  );
}
