import { getPublicStats } from "../lib/api";
import StatCounter from "./StatCounter";

// Dark contrast band on the home page showing live aggregate platform numbers.
// Server component: fetches counts with hourly revalidation. Hide-on-failure —
// renders nothing if the fetch fails or every count is zero, so the marketing
// page never shows a broken or "0+" state.
export default async function Stats() {
  const stats = await getPublicStats();
  if (!stats) return null;

  const items = [
    { value: stats.total_riders, label: "Total Riders" },
    { value: stats.total_drivers, label: "Verified Drivers" },
    { value: stats.total_completed_rides, label: "Rides Completed" },
  ];

  // Nothing meaningful to show yet — hide rather than render all zeros.
  if (items.every((i) => i.value <= 0)) return null;

  return (
    <section className="border-y border-cream-line bg-cream-deep py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
          {items.map((item, i) => (
            <StatCounter
              key={item.label}
              value={item.value}
              label={item.label}
              delay={i * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
