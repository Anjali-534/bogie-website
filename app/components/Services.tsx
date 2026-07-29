import Link from "next/link";
import { Car, Truck, Ambulance, Package, ArrowRight, BadgeCheck } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const services = [
  {
    icon: Truck,
    name: "Truck",
    tagline: "Logistics that keep your business moving.",
    features: [
      "Within-city & outstation",
      "Add-ons for loading/unloading",
      "Receiver details & delivery updates",
    ],
    infoHref: "/truck",
    bookHref: "/book/truck",
    badge: null,
  },
  {
    icon: Package,
    name: "Parcel",
    tagline: "Small loads, sent fast.",
    features: [
      "Same-city & outstation",
      "Doorstep pickup & drop",
      "Live tracking, upfront fares",
    ],
    infoHref: "/truck",
    bookHref: "/book/truck",
    badge: null,
  },
  {
    icon: Car,
    name: "Cab",
    tagline: "Wherever you're headed, whenever you need it.",
    features: [
      "2 Wheeler, Auto, Mini, SUV",
      "Hourly rentals available",
      "Live tracking, upfront fares",
    ],
    infoHref: "/cab",
    bookHref: "/book/cab",
    badge: null,
  },
  {
    icon: Ambulance,
    name: "Ambulance",
    tagline: "Emergency care, without the price tag games.",
    features: [
      "Free via registered NGOs & sewa orgs",
      "Paid BLS/ALS via partner hospitals",
      "Zero commission — always",
    ],
    infoHref: "/ambulance",
    bookHref: "/book/ambulance",
    badge: "0% commission",
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-16 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Our services
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            One app. Every kind of move.
          </h2>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <AnimatedSection key={service.name} delay={i * 0.12} className="h-full">
              <div className="group relative flex h-full flex-col rounded-3xl border border-neutral-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
                {service.badge && (
                  <span className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-md">
                    <BadgeCheck size={13} />
                    {service.badge}
                  </span>
                )}

                <Link
                  href={service.infoHref}
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary transition-colors hover:bg-primary hover:text-white"
                  aria-label={`Learn more about ${service.name}`}
                >
                  <service.icon size={28} />
                </Link>

                <Link href={service.infoHref} className="mt-5 inline-block w-fit">
                  <h3 className="text-xl font-extrabold text-neutral-900 transition-colors hover:text-primary">
                    {service.name}
                  </h3>
                </Link>
                <p className="mt-1.5 text-sm text-neutral-600">
                  {service.tagline}
                </p>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-neutral-700">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <Link
                    href={service.bookHref}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:shadow-md"
                  >
                    Book Now
                    <ArrowRight size={15} />
                  </Link>
                  <Link
                    href={service.infoHref}
                    className="text-sm font-medium text-neutral-500 transition-colors hover:text-primary"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
