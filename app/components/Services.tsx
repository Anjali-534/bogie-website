import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BadgeCheck, Clock } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { CAB_COMING_SOON } from "../lib/featureFlags";

const services = [
  {
    image: "/bogietruck.png",
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
    comingSoon: false,
  },
  {
    image: "/bogieparcel.png",
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
    comingSoon: false,
  },
  {
    image: "/bogiecab.png",
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
    comingSoon: CAB_COMING_SOON,
  },
  {
    image: "/bogieambulance.png",
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
    comingSoon: false,
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-16 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Our services-Book Now
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            One app. Every kind of move.
          </h2>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <AnimatedSection key={service.name} delay={i * 0.12} className="h-full">
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-sm transition-all ${
                  service.comingSoon
                    ? "cursor-not-allowed"
                    : "hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
                }`}
              >
                {service.comingSoon && (
                  <span className="absolute right-5 top-5 z-10 inline-flex items-center gap-1 rounded-full bg-neutral-900 px-3 py-1 text-xs font-bold text-white shadow-md">
                    <Clock size={13} />
                    Coming Soon
                  </span>
                )}

                <div
                  className={`flex h-full flex-1 flex-col ${
                    service.comingSoon ? "pointer-events-none opacity-65" : ""
                  }`}
                >
                  {service.badge && (
                    <span className="absolute left-5 top-5 z-10 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-md">
                      <BadgeCheck size={13} />
                      {service.badge}
                    </span>
                  )}

                  <div className="relative h-44 w-full">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-7">
                    {service.comingSoon ? (
                      <h3 className="text-xl font-extrabold text-neutral-900">
                        {service.name}
                      </h3>
                    ) : (
                      <Link href={service.infoHref} className="inline-block w-fit">
                        <h3 className="text-xl font-extrabold text-neutral-900 transition-colors hover:text-primary">
                          {service.name}
                        </h3>
                      </Link>
                    )}
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
                      {service.comingSoon ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-500">
                          Book Now
                          <ArrowRight size={15} />
                        </span>
                      ) : (
                        <Link
                          href={service.bookHref}
                          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:shadow-md"
                        >
                          Book Now
                          <ArrowRight size={15} />
                        </Link>
                      )}
                      {service.comingSoon ? (
                        <span className="text-sm font-medium text-neutral-400">
                          Learn more
                        </span>
                      ) : (
                        <Link
                          href={service.infoHref}
                          className="text-sm font-medium text-neutral-500 transition-colors hover:text-primary"
                        >
                          Learn more
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
