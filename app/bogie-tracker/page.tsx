import type { Metadata } from "next";
import Image from "next/image";
import {
  MapPin,
  Users,
  FileCheck,
  ShieldCheck,
  Bell,
  PenTool,
  ArrowRight,
  ClipboardCheck,
  Download,
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import Footer from "../components/Footer";
import TrackerHero from "./TrackerHero";
import TrackerPricing from "./TrackerPricing";
import Partners from "./Partners";
import { SITE_URL } from "../lib/serviceAreas";

export const metadata: Metadata = {
  title: "Bogie Tracker — Live Shipment Tracking for Business Fleets",
  description:
    "Bogie Tracker is a shipment tracking dashboard for companies running their own trucks — live GPS per delivery, shareable customer tracking links, e-way bill capture, and proof of delivery. Sign up and get approved to start tracking.",
};

const features = [
  {
    icon: MapPin,
    title: "Live GPS per shipment",
    text: "Once a shipment is on the road, its location updates in real time from your driver's phone — no separate hardware to install.",
  },
  {
    icon: Users,
    title: "Unlimited drivers",
    text: "Add every driver on your team to your account and manage them from one dashboard.",
  },
  {
    icon: ClipboardCheck,
    title: "Full shipment history",
    text: "Every order is logged from creation through delivery, with a status timeline you and your team can follow.",
  },
  {
    icon: FileCheck,
    title: "E-way bill & GSTIN capture",
    text: "Attach e-way bill numbers and documents, and capture consignee GSTIN details directly on the shipment.",
  },
  {
    icon: PenTool,
    title: "Proof of delivery",
    text: "Drivers capture a signature on delivery, and consignees can confirm goods received — all tied to the order record.",
  },
  {
    icon: Bell,
    title: "Shareable tracking links",
    text: "Send your customer a no-login tracking link for their shipment — they see live status without needing an account.",
  },
];

const steps = [
  {
    title: "Sign up your company",
    text: "Create an account with your company details — takes a couple of minutes.",
  },
  {
    title: "Get approved",
    text: "Our team reviews and approves new accounts before access is activated.",
  },
  {
    title: "Add drivers & shipment",
    text: "Add your drivers, create shipments, and start tracking them live.",
  },
];

export default function BogieTrackerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Fleet shipment tracking software",
    name: "Bogie Tracker",
    provider: {
      "@type": "Organization",
      name: "Aggarwal Publicity and Marketing Pvt. Ltd.",
      url: SITE_URL,
    },
    areaServed: "India",
    description: metadata.description,
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Companies operating their own delivery trucks",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
         
        <TrackerHero />
        <TrackerPricing />

        <section className="pb-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-center text-2xl font-extrabold tracking-tight text-neutral-900">
                Who it's for
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-center text-neutral-600">
                Any business with its own trucks and drivers making
                deliveries — and customers who want to know where their
                shipment is without calling to ask.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="bg-neutral-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-center text-2xl font-extrabold tracking-tight text-neutral-900">
                What you get
              </h2>
            </AnimatedSection>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <AnimatedSection key={f.title} delay={i * 0.08}>
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
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-center text-2xl font-extrabold tracking-tight text-neutral-900">
                How it works
              </h2>
            </AnimatedSection>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {steps.map((s, i) => (
                <AnimatedSection key={s.title} delay={i * 0.1}>
                  <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <h3 className="mt-4 font-bold text-neutral-900">{s.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{s.text}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-neutral-50 py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex flex-col items-center gap-6 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-neutral-100 sm:flex-row sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                    <Download size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold tracking-tight text-neutral-900">
                      Install it as an app
                    </h2>
                    <p className="mt-1 text-sm text-neutral-600">
                      Bogie Tracker works right in your browser — add it to
                      your home screen or desktop for one-tap access, no app
                      store needed.
                    </p>
                  </div>
                </div>
                <a
                  href="/bogie-tracker/login"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
                >
                  Open the dashboard
                  <ArrowRight size={16} />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-center text-2xl font-extrabold tracking-tight text-neutral-900">
                See it in action
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-center text-neutral-600">
                A quick look at what dispatch tracking looks like for your
                team and your customers.
              </p>
            </AnimatedSection>
            <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <AnimatedSection>
                <video
                  controls
                  preload="metadata"
                  className="w-full rounded-2xl bg-neutral-900 shadow-sm ring-1 ring-neutral-100"
                  src="/Bogie_Tracker_B2B_video_ad_202607172334.mp4"
                />
              </AnimatedSection>
              <AnimatedSection delay={0.08}>
                <video
                  controls
                  preload="metadata"
                  className="w-full rounded-2xl bg-neutral-900 shadow-sm ring-1 ring-neutral-100"
                  src="/bogietrackervideo.mp4"
                />
              </AnimatedSection>
            </div>
            <AnimatedSection delay={0.16}>
              <div className="mt-8">
                <Image
                  src="/storyboard.jpeg"
                  alt="Bogie Tracker ad storyboard: from 'Where's my delivery?' to live tracking, proof of delivery, and a shareable link for the customer"
                  width={2400}
                  height={1792}
                  className="w-full rounded-2xl ring-1 ring-neutral-100"
                />
              </div>
            </AnimatedSection>
          </div>
        </section>

        <Partners />

        <section className="bg-neutral-50 py-20">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
                <ShieldCheck size={24} />
              </div>
              <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                Ready to track your fleet?
              </h2>
              <p className="mt-3 text-neutral-600">
                Sign up your company below. Our team reviews new accounts
                before access is activated.
              </p>
              <a
                href="/bogie-tracker#pricing"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
              >
                Sign up your company
                <ArrowRight size={16} />
              </a>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
