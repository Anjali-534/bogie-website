import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import ServiceFareCard from "../components/ServiceFareCard";
import Footer from "../components/Footer";
import { getServices } from "../lib/api";
import { SITE_URL } from "../lib/serviceAreas";

export const metadata: Metadata = {
  title: "Cab Booking in Delhi NCR — bogie",
  description:
    "Book a cab online in Delhi NCR with bogie — bike, auto, mini, and SUV rides plus hourly rentals, with live tracking and upfront fares.",
};

const features = [
  {
    icon: MapPin,
    title: "Live tracking, upfront fares",
    text: "See your driver on the map from pickup to drop-off, with the fare shown before you confirm — no surprises.",
  },
  {
    icon: Clock,
    title: "Hourly rentals available",
    text: "Need a cab for a few hours, not just a one-way trip? Book by the hour for errands, meetings, or a full day out.",
  },
  {
    icon: ShieldCheck,
    title: "Verified drivers, every ride",
    text: "Every driver's license, vehicle documents, and identity are verified before they can accept a single ride.",
  },
];

export default async function CabPage() {
  const services = await getServices();
  const cabs = services.filter((s) => s.category === "cab");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Cab booking",
    name: "bogie Cab",
    provider: {
      "@type": "Organization",
      name: "Aggarwal Publicity and Marketing Pvt. Ltd.",
      url: SITE_URL,
    },
    areaServed: "Delhi NCR",
    description: metadata.description,
    ...(cabs.length > 0 && {
      offers: cabs.map((c) => ({
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
                Cab
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
                Wherever you&apos;re headed, <span className="text-primary">whenever</span> you need it.
              </h1>
              <p className="mt-6 text-lg text-neutral-600">
                From a quick auto hop across town to an hourly SUV rental, bogie
                gets you moving across Delhi NCR with upfront fares and live
                tracking.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {cabs.length > 0 && (
          <section className="pb-20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <AnimatedSection>
                <h2 className="text-center text-2xl font-extrabold tracking-tight text-neutral-900">
                  Pick what fits
                </h2>
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {cabs.map((c) => (
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
                Ready to ride?
              </h2>
              <p className="mt-3 text-neutral-600">
                Book right here in your browser — upfront fares, live tracking,
                done in under a minute.
              </p>
              <Link
                href="/book/cab"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
              >
                Book a cab
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
