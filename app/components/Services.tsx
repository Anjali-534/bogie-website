import { Car, Truck, Ambulance, ArrowRight, BadgeCheck } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const services = [
  {
    icon: Car,
    name: "Cab",
    tagline: "Wherever you're headed, whenever you need it.",
    features: [
      "2 Wheeler, Auto, Mini, SUV",
      "Hourly rentals available",
      "Live tracking, upfront fares",
    ],
    href: "/cab",
    badge: null,
  },
  {
    icon: Truck,
    name: "Truck",
    tagline: "Logistics that keep your business moving.",
    features: [
      "Within-city & outstation",
      "Add-ons for loading/unloading",
      "Receiver details & delivery updates",
    ],
    href: "/truck",
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
    href: "/ambulance",
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
            Three services. One app. Zero hassle.
          </h2>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <AnimatedSection key={service.name} delay={i * 0.12} className="h-full">
              <div className="group relative flex h-full flex-col rounded-3xl border border-neutral-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
                {service.badge && (
                  <span className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-md">
                    <BadgeCheck size={13} />
                    {service.badge}
                  </span>
                )}

                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <service.icon size={28} />
                </div>

                <h3 className="mt-5 text-xl font-extrabold text-neutral-900">
                  {service.name}
                </h3>
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

                <a
                  href={service.href}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-transform group-hover:gap-2.5"
                >
                  Explore {service.name}
                  <ArrowRight size={16} />
                </a>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
