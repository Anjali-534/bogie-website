import Link from "next/link";
import { MapPin, ArrowRight, Truck, PhoneOff, LayoutGrid } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const highlights = [
  {
    title: "Your fleet, always visible.",
    text: "Track every vehicle you own, live on the map.",
    icon: MapPin,
  },
  {
    title: "Every shipment, accounted for.",
    text: "Once a transporter books, you see it move — pickup to delivery.",
    icon: Truck,
  },
  {
    title: "No more “where is it?” calls.",
    text: "Real-time location, not guesswork.",
    icon: PhoneOff,
  },
  {
    title: "One map. Every vehicle. Every shipment.",
    text: "See your whole operation at a glance.",
    icon: LayoutGrid,
  },
];

export default function TrackerCta() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            For businesses
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Bogie Tracker- India's first shipment tracking dashboard for companies that run their own trucks.
          </h2>
        </AnimatedSection>

        <AnimatedSection className="mt-14">
          <div className="relative overflow-hidden rounded-3xl ring-1 ring-cream-line px-8 py-14 sm:px-16 sm:py-16">
            <video
              src="/bogietrackerpanelvideo.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 -z-20 h-full w-full object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-cream/95 via-white/55 to-white/20" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/90 via-white/45 to-transparent" />
            <div className="relative flex flex-col items-center gap-10 text-center lg:flex-row lg:justify-between lg:text-left">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary-dark">
                  <MapPin size={13} />
                  Bogie Tracker · For Business
                </span>
                <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
                  Know where every dispatch is, in real time.
                </h2>
                <p className="mt-4 text-neutral-600">
                  Running a business with your own fleet? Bogie Tracker is a
                  shipment tracking dashboard built for companies that run
                  their own trucks — add your drivers, create a shipment,
                  and follow it live from loading to delivery.
                </p>
              </div>

              <Link
                href="/bogie-tracker"
                className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark hover:scale-[1.03] active:scale-[0.98]"
              >
                Know More
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-cream-line bg-white px-5 py-6 text-left"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-light text-primary-dark">
                    <Icon size={16} />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-neutral-600">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
