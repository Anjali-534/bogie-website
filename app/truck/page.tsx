import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  PackagePlus,
  Bell,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
  Truck as TruckIcon,
  Radar,
  Clock,
  MapPin,
  Package,
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import TruckSpecCard from "../components/TruckSpecCard";
import Footer from "../components/Footer";
import { getServices } from "../lib/api";
import { SITE_URL } from "../lib/serviceAreas";

export const metadata: Metadata = {
  title: "Truck Booking & Logistics in Delhi NCR — Bogie",
  description:
    "Book a truck in Delhi NCR with Bogie — mini trucks to containers for parcel delivery and logistics, within-city or outstation, with loading add-ons.",
};

const features = [
  {
    icon: PackagePlus,
    title: "Add-ons for loading & unloading",
    text: "Need help getting goods on and off the truck? Add loading and unloading support directly at booking.",
  },
  {
    icon: Bell,
    title: "Receiver details & delivery updates",
    text: "Add the receiver's details up front so they're notified as your shipment moves and arrives.",
  },
  {
    icon: ShieldCheck,
    title: "Verified drivers, every trip",
    text: "Every driver's license, vehicle registration, and identity are verified before they can accept a booking.",
  },
];

const heroBullets = [
  {
    icon: ShieldCheck,
    title: "Verified Partners",
    text: "Trusted & background verified",
  },
  {
    icon: Radar,
    title: "Real-time Tracking",
    text: "Live updates, every step",
  },
  {
    icon: Clock,
    title: "On-time Delivery",
    text: "Because time matters",
  },
];

export default async function TruckPage() {
  const services = await getServices();
  const trucks = services.filter((s) => s.category === "truck");
  const city = trucks.filter((s) => s.scope === "city");
  const outstation = trucks.filter((s) => s.scope === "outstation");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Truck logistics booking",
    name: "Bogie Truck",
    provider: {
      "@type": "Organization",
      name: "Bogie AI Technologies Pvt Ltd",
      url: SITE_URL,
    },
    areaServed: "Delhi NCR",
    description: metadata.description,
    ...(trucks.length > 0 && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Truck categories",
        itemListElement: trucks.map((c) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: c.name },
        })),
      },
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pb-24">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <AnimatedSection>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary-dark">
                  <TruckIcon size={14} />
                  TRUCK
                </span>
                <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
                  Logistics that keep your <span className="text-primary">business</span> moving.
                </h1>
                <p className="mt-6 max-w-xl text-lg text-neutral-600">
                  From a mini truck for a parcel across town to an outstation
                  container, Bogie moves your goods with the right vehicle for
                  the job and real delivery updates.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/book/truck"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Book Now
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/bogie-tracker"
                    className="inline-flex items-center gap-2 rounded-full border border-primary px-7 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary-light"
                  >
                    Track Your Shipment
                    <ArrowUpRight size={16} />
                  </Link>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {heroBullets.map((b) => (
                    <div key={b.title} className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                        <b.icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">{b.title}</p>
                        <p className="text-xs text-neutral-500">{b.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1} className="relative">
                <div className="relative aspect-[1200/747] w-full">
                  <Image
                    src="/hero-truck.png"
                    alt="Bogie delivery truck on the road with a city skyline behind it"
                    fill
                    priority
                    className="object-contain"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>

                <div className="absolute right-2 top-2 flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-md ring-1 ring-cream-line sm:right-6 sm:top-6">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-light text-primary">
                    <MapPin size={14} />
                  </span>
                  <span className="text-xs font-semibold text-neutral-900">Live Tracking</span>
                </div>

                <div className="absolute bottom-6 left-2 flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-md ring-1 ring-cream-line sm:bottom-10 sm:left-6">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-light text-primary">
                    <Package size={14} />
                  </span>
                  <span className="text-xs font-semibold text-neutral-900">On the way</span>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {city.length > 0 && (
          <section className="pb-12">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <AnimatedSection>
                <div className="text-center">
                  <h2 className="inline-block text-2xl font-extrabold tracking-tight text-neutral-900">
                    Within the city
                  </h2>
                  <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-primary" />
                </div>
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {city.map((c) => (
                    <TruckSpecCard
                      key={c.id}
                      name={c.name}
                      slug={c.slug}
                      scope={c.scope}
                      weightCapacityKg={c.weight_capacity_kg}
                      heightM={c.height_m}
                      widthM={c.width_m}
                      lengthM={c.length_m}
                      fuelTypes={c.fuel_types}
                    />
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </section>
        )}

        {outstation.length > 0 && (
          <section className="pb-20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <AnimatedSection>
                <h2 className="text-center text-2xl font-extrabold tracking-tight text-neutral-900">
                  Outstation
                </h2>
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {outstation.map((c) => (
                    <TruckSpecCard
                      key={c.id}
                      name={c.name}
                      slug={c.slug}
                      scope={c.scope}
                      weightCapacityKg={c.weight_capacity_kg}
                      heightM={c.height_m}
                      widthM={c.width_m}
                      lengthM={c.length_m}
                      fuelTypes={c.fuel_types}
                    />
                  ))}
                </div>
                <p className="mt-4 text-center text-xs text-neutral-500">
                  Your exact fare is confirmed in the app before you book.
                </p>
              </AnimatedSection>
            </div>
          </section>
        )}

        <section className="bg-neutral-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {features.map((f, i) => (
                <AnimatedSection key={f.title} delay={i * 0.1}>
                  <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                      <f.icon size={22} />
                    </div>
                    <h3 className="mt-4 font-bold text-neutral-900">{f.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{f.text}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                Ready to move something?
              </h2>
              <p className="mt-3 text-neutral-600">
                Book right here in your browser — set your route, add receiver
                details, and track the delivery live.
              </p>
              <Link
                href="/book/truck"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
              >
                Book a truck
                <ArrowRight size={16} />
              </Link>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
