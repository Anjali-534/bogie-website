import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  MapPin,
  ShieldCheck,
  Radar,
  ReceiptIndianRupee,
  ArrowRight,
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import Footer from "../components/Footer";
import { SITE_URL } from "../lib/serviceAreas";

export const metadata: Metadata = {
  title: "Parcel Delivery in Delhi NCR — Bogie",
  description:
    "Send a parcel across Delhi NCR with Bogie — doorstep pickup and drop on a two-wheeler, with live tracking and an upfront fare.",
};

const features = [
  {
    icon: Package,
    title: "Doorstep pickup & drop",
    text: "We pick up from your door and drop right at theirs — no drop-off counters, no waiting in line.",
  },
  {
    icon: MapPin,
    title: "Live tracking, upfront fares",
    text: "See your rider on the map from pickup to drop-off, with the fare shown before you confirm — no surprises.",
  },
  {
    icon: ShieldCheck,
    title: "Verified riders, every delivery",
    text: "Every rider's license, vehicle documents, and identity are verified before they can accept a delivery.",
  },
];

const heroBullets = [
  {
    icon: ShieldCheck,
    title: "Verified Riders",
    text: "Trusted & background verified",
  },
  {
    icon: Radar,
    title: "Live Tracking",
    text: "See your parcel, every step",
  },
  {
    icon: ReceiptIndianRupee,
    title: "Upfront Fares",
    text: "The fare before you confirm",
  },
];

export default function ParcelPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Parcel delivery",
    name: "Bogie Parcel",
    provider: {
      "@type": "Organization",
      name: "Bogie AI Technologies Pvt Ltd",
      url: SITE_URL,
    },
    areaServed: "Delhi NCR",
    description: metadata.description,
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
              src="/parcel.png"
              alt="Bogie delivery rider on a scooter with a parcel"
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
                <Package size={14} />
                PARCEL
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
                Small parcels, delivered <span className="text-primary">fast</span>.
              </h1>
              <p className="mt-6 text-lg text-neutral-600">
                Doorstep pickup to doorstep drop — Bogie sends parcels up to
                20kg across Delhi NCR on a two-wheeler, with live tracking and
                an upfront fare.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/book/truck"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
                >
                  Book Now
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
                Ready to send something?
              </h2>
              <p className="mt-3 text-neutral-600">
                Book right here in your browser — upfront fares, live
                tracking, done in under a minute.
              </p>
              <Link
                href="/book/truck"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
              >
                Send a parcel
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
