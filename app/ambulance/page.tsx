import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  HeartPulse,
  BadgeCheck,
  PhoneCall,
  ArrowRight,
  Ambulance,
  Siren,
  ShieldCheck,
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import AmbulanceSpecCard from "../components/AmbulanceSpecCard";
import Footer from "../components/Footer";
import NearbyHospitals from "./NearbyHospitals";
import { getServices } from "../lib/api";
import { SITE_URL } from "../lib/serviceAreas";

export const metadata: Metadata = {
  title: "Ambulance Booking in Delhi NCR — 0% Commission — Bogie",
  description:
    "Book an emergency ambulance in Delhi NCR — free ambulance rides via registered NGOs, or paid BLS/ALS ambulances from partner hospitals. Zero commission, always.",
};

const heroBullets = [
  {
    icon: BadgeCheck,
    title: "Zero Commission",
    text: "No platform fee, ever",
  },
  {
    icon: Siren,
    title: "Fast Response",
    text: "NGO or hospital-dispatched",
  },
  {
    icon: ShieldCheck,
    title: "Verified Medical Staff",
    text: "EMT-certified crews",
  },
];

export default async function AmbulancePage() {
  const services = await getServices();
  const ambulances = services.filter((s) => s.category === "ambulance");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Ambulance booking",
    name: "Bogie Ambulance",
    provider: {
      "@type": "Organization",
      name: "Bogie AI Technologies Pvt Ltd",
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
        <section className="relative isolate flex min-h-[600px] flex-col justify-end overflow-hidden sm:min-h-[680px] lg:min-h-[760px]">
          <div className="absolute inset-0 -z-20">
            <Image
              src="/ambulance.png"
              alt="Bogie ambulance ready for emergency dispatch"
              fill
              priority
              className="object-contain object-right"
              sizes="100vw"
            />
          </div>

          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-cream/95 via-white/55 to-white/20" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/90 via-white/45 to-transparent" />

          <div className="relative px-4 pb-14 pt-32 sm:px-6 sm:pb-20 lg:px-8 lg:pr-16">
            <AnimatedSection className="max-w-xl text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary-dark">
                <Ambulance size={14} />
                AMBULANCE
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
                Emergency care, <span className="text-primary">zero commission</span>, every time.
              </h1>
              <p className="mt-6 text-lg text-neutral-600">
                Free ambulance rides via registered NGOs, or paid BLS/ALS
                transport from partner hospitals across Delhi NCR — Bogie
                never takes a cut of either.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary-light px-5 py-3 text-sm font-semibold text-neutral-900 ring-1 ring-primary/20">
                <PhoneCall size={16} className="text-primary" />
                Life-threatening emergency? Call{" "}
                <a href="tel:108" className="text-primary underline">
                  108
                </a>{" "}
                first.
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/book/ambulance"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
                >
                  Book Ambulance
                  <ArrowRight size={16} />
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
                  Paid ambulances — BLS, ALS, or Patient Transport
                </h2>
                <p className="mt-3 text-sm text-neutral-600">
                  If no free ride is available, we connect you to BLS/ALS-equipped
                  ambulances dispatched directly by partner hospitals, billed by the
                  hospital. For a stable patient who doesn&apos;t need medical support
                  en route — a discharge, a scheduled appointment, an inter-facility
                  move — a Patient Transport vehicle covers it instead. Either way,
                  Bogie&apos;s cut is exactly zero rupees — we don&apos;t add a
                  platform fee or convenience charge to ambulance transport, ever.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {ambulances.length > 0 && (
          <section className="bg-neutral-50 py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <AnimatedSection>
                <div className="text-center">
                  <h2 className="inline-block text-2xl font-extrabold tracking-tight text-neutral-900">
                    Paid ambulance options
                  </h2>
                  <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-primary" />
                </div>
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {ambulances.map((a) => (
                    <AmbulanceSpecCard
                      key={a.id}
                      name={a.name}
                      slug={a.slug}
                      capacity={a.capacity}
                    />
                  ))}
                </div>
                <p className="mt-4 text-center text-xs text-neutral-500">
                  Your exact fare — based on distance — is confirmed in the app
                  before you book.
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

        <section className="border-y border-cream-line bg-cream-deep py-16 text-neutral-900">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                <HeartPulse size={22} />
              </div>
              <h2 className="mt-5 text-2xl font-extrabold tracking-tight">
                Every crew is verified.
              </h2>
              <p className="mt-3 text-neutral-600">
                Ambulance crews on Bogie go through the same document verification
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
                Request an emergency BLS/ALS ambulance or a free NGO ambulance
                right here in your browser. For life-threatening emergencies,
                always call 108 first.
              </p>
              <Link
                href="/book/ambulance"
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
