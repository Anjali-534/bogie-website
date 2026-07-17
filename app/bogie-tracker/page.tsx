import type { Metadata } from "next";
import {
  MapPin,
  Users,
  FileCheck,
  ShieldCheck,
  Bell,
  PenTool,
  ArrowRight,
  ClipboardCheck,
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import Footer from "../components/Footer";
import { SITE_URL } from "../lib/serviceAreas";

const TRACKER_APP_URL = "https://bogie-tracker.bogie.in/";
const TRACKER_SIGNUP_URL = "https://bogie-tracker.bogie.in/signup";

export const metadata: Metadata = {
  title: "Bogie Tracker — Live Dispatch Tracking for Business Fleets",
  description:
    "Bogie Tracker is a dispatch tracking dashboard for companies running their own trucks — live GPS per delivery, shareable customer tracking links, e-way bill capture, and proof of delivery. Sign up and get approved to start tracking.",
};

const features = [
  {
    icon: MapPin,
    title: "Live GPS per dispatch",
    text: "Once a dispatch is on the road, its location updates in real time from your driver's phone — no separate hardware to install.",
  },
  {
    icon: Users,
    title: "Unlimited drivers",
    text: "Add every driver on your team to your account and manage them from one dashboard.",
  },
  {
    icon: ClipboardCheck,
    title: "Full dispatch history",
    text: "Every order is logged from creation through delivery, with a status timeline you and your team can follow.",
  },
  {
    icon: FileCheck,
    title: "E-way bill & GSTIN capture",
    text: "Attach e-way bill numbers and documents, and capture consignee GSTIN details directly on the dispatch.",
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
    title: "Add drivers & dispatch",
    text: "Add your drivers, create dispatches, and start tracking them live.",
  },
];

export default function BogieTrackerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Fleet dispatch tracking software",
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
        <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary-dark">
                Bogie Tracker · For Business
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
                Know where every <span className="text-primary">dispatch</span> is, in real time.
              </h1>
              <p className="mt-6 text-lg text-neutral-600">
                Bogie Tracker is a dispatch tracking dashboard built for
                companies that run their own trucks. Add your drivers, create
                a dispatch, and follow it live — from loading to delivery.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href={TRACKER_SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
                >
                  Sign up your company
                  <ArrowRight size={16} />
                </a>
                <a
                  href={TRACKER_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-7 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:border-primary hover:text-primary"
                >
                  Already signed up? Log in
                </a>
              </div>
              <p className="mt-4 text-xs text-neutral-500">
                New accounts are reviewed before access is activated.
              </p>
            </AnimatedSection>
          </div>
        </section>

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
                href={TRACKER_SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
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
