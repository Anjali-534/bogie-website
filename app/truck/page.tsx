import type { Metadata } from "next";
import Link from "next/link";
import { PackagePlus, Bell, ShieldCheck, ArrowRight } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import ServiceFareCard from "../components/ServiceFareCard";
import Footer from "../components/Footer";
import { getServices } from "../lib/api";
import { SITE_URL } from "../lib/serviceAreas";

export const metadata: Metadata = {
  title: "Truck & Logistics Booking — bogie",
  description:
    "Book a truck for within-city or outstation logistics with bogie — mini trucks to containers, with loading add-ons and delivery updates.",
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

export default async function TruckPage() {
  const services = await getServices();
  const trucks = services.filter((s) => s.category === "truck");
  const city = trucks.filter((s) => s.scope === "city");
  const outstation = trucks.filter((s) => s.scope === "outstation");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Truck logistics booking",
    name: "bogie Truck",
    provider: {
      "@type": "Organization",
      name: "Aggarwal Publicity and Marketing Pvt. Ltd.",
      url: SITE_URL,
    },
    areaServed: "Delhi NCR",
    description: metadata.description,
    ...(trucks.length > 0 && {
      offers: trucks.map((c) => ({
        "@type": "Offer",
        name: c.name,
        priceCurrency: "INR",
        price: c.base_fare,
      })),
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary-dark">
                Truck
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
                Logistics that keep your <span className="text-primary">business</span> moving.
              </h1>
              <p className="mt-6 text-lg text-neutral-600">
                From a mini truck across town to an outstation container, bogie
                moves your goods with upfront pricing and real delivery updates.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {city.length > 0 && (
          <section className="pb-12">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <AnimatedSection>
                <h2 className="text-center text-2xl font-extrabold tracking-tight text-neutral-900">
                  Within the city
                </h2>
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {city.map((c) => (
                    <ServiceFareCard
                      key={c.id}
                      name={c.name}
                      capacity={c.capacity}
                      baseFare={c.base_fare}
                      perKmRate={c.per_km_rate}
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
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {outstation.map((c) => (
                    <ServiceFareCard
                      key={c.id}
                      name={c.name}
                      capacity={c.capacity}
                      baseFare={c.base_fare}
                      perKmRate={c.per_km_rate}
                    />
                  ))}
                </div>
                <p className="mt-4 text-center text-xs text-neutral-500">
                  Fares shown are starting prices; your exact fare is confirmed in the
                  app before you book.
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
