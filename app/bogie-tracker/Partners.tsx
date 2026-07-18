import { getTrackerPartners } from "../lib/api";

// "Our Partners" logo band for the Tracker marketing page. Server component,
// same hide-on-failure/hide-if-empty pattern as Stats.tsx/Reviews.tsx —
// renders nothing if there are no partner logos yet.
export default async function Partners() {
  const partners = await getTrackerPartners();
  if (partners.length === 0) return null;

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-neutral-900">
          Our partners
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-neutral-600">
          Fleets already tracking their dispatches with Bogie Tracker.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((partner) => (
            <div
              key={partner.company_name}
              title={partner.company_name}
              className="flex h-24 items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.logo_url}
                alt={partner.company_name}
                className="max-h-14 max-w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
