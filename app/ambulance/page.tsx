import type { Metadata } from "next";
import Link from "next/link";
import { HeartPulse, BadgeCheck, PhoneCall, ArrowRight } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import ServiceFareCard from "../components/ServiceFareCard";
import Footer from "../components/Footer";
import NearbyHospitals from "./NearbyHospitals";
import { getServices } from "../lib/api";
import { SITE_URL } from "../lib/serviceAreas";

export const metadata: Metadata = {
  title: "Ambulance Booking — Zero-Commission — bogie",
  description:
    "Book an ambulance in Delhi NCR through bogie — free rides via registered NGOs, or paid BLS/ALS via partner hospitals. Zero commission, always.",
};

export default async function AmbulancePage() {
  const services = await getServices();
  const ambulances = services.filter((s) => s.category === "ambulance");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Ambulance booking",
    name: "bogie Ambulance",
    provider: {
      "@type": "Organization",
      name: "Aggarwal Publicity and Marketing Pvt. Ltd.",
      url: SITE_URL,
    },
    areaServed: "Delhi NCR",
    description: metadata.description,
    ...(ambulances.length > 0 && {
      offers: ambulances.map((c) => ({
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
              <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white shadow-md">
                <BadgeCheck size={14} />
                0% commission
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
                Emergency care, <span className="text-primary">without</span> the
                price tag games.
              </h1>
              <p className="mt-6 text-lg text-neutral-600">
                Free ambulance rides via registered NGOs, or paid BLS/ALS transport
                via partner hospitals — bogie never takes a cut of either.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white">
                <PhoneCall size={16} className="text-primary" />
                Life-threatening emergency? Call{" "}
                <a href="tel:108" className="underline">
                  108
                </a>{" "}
                first.
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-neutral-100">
                <h2 className="text-lg font-bold text-neutral-900">
                  Free, via registered NGOs
                </h2>
                <p className="mt-3 text-sm text-neutral-600">
                  When you request an ambulance, we first check for a free ride
                  through our network of registered NGOs and sewa organisations
                  operating in your area. If one&apos;s available, that&apos;s what
                  you get — no charge, no catch. Response time isn&apos;t guaranteed
                  the way a paid ride is, since it depends on what&apos;s available
                  nearby.
                </p>
              </div>
              <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-neutral-100">
                <h2 className="text-lg font-bold text-neutral-900">
                  Paid BLS/ALS, via partner hospitals
                </h2>
                <p className="mt-3 text-sm text-neutral-600">
                  If no free ride is available, we connect you to BLS/ALS-equipped
                  ambulances dispatched directly by partner hospitals, billed by the
                  hospital. Either way, bogie&apos;s cut is exactly zero rupees — we
                  don&apos;t add a platform fee or convenience charge to emergency
                  transport, ever.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {ambulances.length > 0 && (
          <section className="bg-neutral-50 py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <AnimatedSection>
                <h2 className="text-center text-2xl font-extrabold tracking-tight text-neutral-900">
                  Paid ambulance options
                </h2>
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {ambulances.map((a) => (
                    <ServiceFareCard
                      key={a.id}
                      name={a.name}
                      capacity={a.capacity}
                      baseFare={a.base_fare}
                      perKmRate={a.per_km_rate}
                    />
                  ))}
                </div>
                <p className="mt-4 text-center text-xs text-neutral-500">
                  Fares apply to paid hospital-dispatched rides only. Fares shown are
                  starting prices; your exact fare is confirmed in the app before you
                  book.
                </p>
              </AnimatedSection>
            </div>
          </section>
        )}

        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <NearbyHospitals />
            </AnimatedSection>
          </div>
        </section>

        <section className="bg-neutral-950 py-16 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                <HeartPulse size={22} />
              </div>
              <h2 className="mt-5 text-2xl font-extrabold tracking-tight">
                Every crew is verified.
              </h2>
              <p className="mt-3 text-neutral-300">
                Ambulance crews on bogie go through the same document verification
                as every driver — plus EMT certification — before they&apos;re
                allowed to take a booking.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                Need an ambulance?
              </h2>
              <p className="mt-3 text-neutral-600">
                Full in-browser booking is on its way — for now, get in touch and
                we&apos;ll help you book directly.
              </p>
              <Link
                href="/#contact"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
              >
                Request an ambulance
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
