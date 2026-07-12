import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  KeyRound,
  MapPin,
  FileCheck2,
  Share2,
  Phone,
  ArrowRight,
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Safety — bogie",
  description:
    "How bogie keeps every ride and ambulance trip safe: emergency SOS, driver OTP verification, live tracking, verified driver documents, and trip sharing.",
};

const emergencyNumbers = [
  { label: "Police", number: "112" },
  { label: "Ambulance", number: "108" },
  { label: "Women Helpline", number: "1091" },
  { label: "Child Helpline", number: "1098" },
];

const documentTypes = [
  "Aadhaar card",
  "Driving license",
  "Vehicle registration (RC)",
  "Insurance & PUC",
  "Permit / fitness certificate",
];

export default function SafetyPage() {
  return (
    <>
      <main>
        <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary-dark">
                Safety
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
                Your safety is our priority.
              </h1>
              <p className="mt-6 text-lg text-neutral-600">
                Every cab, truck, and ambulance ride on bogie is backed by the same
                safety net — emergency help, verified drivers, and live visibility into
                where you are, every time.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex flex-col gap-4 rounded-3xl bg-cream-deep ring-1 ring-cream-line p-8 text-neutral-800 sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
                  <ShieldCheck size={26} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-neutral-900">Emergency SOS</h2>
                  <p className="mt-2 text-neutral-600">
                    Every ride includes an SOS option, reachable in one tap from the
                    active-ride tracking screen or from Help &amp; Safety in the app. It
                    gives you four immediate actions: call Police (112) or Ambulance
                    (108) directly, share your live location with a saved emergency
                    contact or via any messaging app, or alert bogie support — which
                    instantly notifies our team with your location and ride details so
                    a real person follows up.
                  </p>
                  <p className="mt-3 text-sm text-neutral-500">
                    This page is informational — the live SOS button itself appears
                    on the active-ride tracking screen in the app, not here.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="bg-neutral-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Built into every ride
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900">
                Four layers of protection.
              </h2>
            </AnimatedSection>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <AnimatedSection delay={0}>
                <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                    <KeyRound size={22} />
                  </div>
                  <h3 className="mt-4 font-bold text-neutral-900">
                    Driver OTP verification
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600">
                    Before any ride starts, your driver enters a one-time OTP shown
                    only in your app. It confirms you&apos;re both matched to the
                    same booking before you ever get in the vehicle.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.08}>
                <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                    <MapPin size={22} />
                  </div>
                  <h3 className="mt-4 font-bold text-neutral-900">Live tracking</h3>
                  <p className="mt-2 text-sm text-neutral-600">
                    From the moment a driver is assigned until you&apos;re dropped
                    off, you can watch their live location and route directly on the
                    map in the app.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.16}>
                <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                    <FileCheck2 size={22} />
                  </div>
                  <h3 className="mt-4 font-bold text-neutral-900">
                    Verified driver documents
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600">
                    Every driver submits {documentTypes.slice(0, -1).join(", ")}, and{" "}
                    {documentTypes[documentTypes.length - 1]} — reviewed and verified
                    by our team before they&apos;re allowed to go online. Ambulance
                    crews additionally submit EMT certification.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.24}>
                <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                    <Share2 size={22} />
                  </div>
                  <h3 className="mt-4 font-bold text-neutral-900">
                    Share your trip
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600">
                    Save a trusted emergency contact in the app once, and you can
                    share your live location and ride details with them in a tap —
                    from the tracking screen or straight from an SOS alert.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Keep these handy
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900">
                Emergency numbers.
              </h2>
              <div className="mt-8 divide-y divide-neutral-100 overflow-hidden rounded-2xl bg-white ring-1 ring-neutral-100">
                {emergencyNumbers.map((e) => (
                  <a
                    key={e.label}
                    href={`tel:${e.number}`}
                    className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-primary-light"
                  >
                    <span className="flex items-center gap-3 text-sm font-semibold text-neutral-900">
                      <Phone size={16} className="text-primary" />
                      {e.label}
                    </span>
                    <span className="text-sm font-bold text-neutral-700">
                      {e.number}
                    </span>
                  </a>
                ))}
                <a
                  href="mailto:support@bogie.in"
                  className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-primary-light"
                >
                  <span className="flex items-center gap-3 text-sm font-semibold text-neutral-900">
                    <Phone size={16} className="text-primary" />
                    bogie Support
                  </span>
                  <span className="text-sm font-bold text-primary">
                    support@bogie.in
                  </span>
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="bg-neutral-50 py-20">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                Have a safety question we haven&apos;t covered?
              </h2>
              <p className="mt-3 text-neutral-600">
                Check our Help &amp; FAQ page, or reach out directly — a real person
                will get back to you.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/help"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
                >
                  Visit Help &amp; FAQ
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-7 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:border-primary hover:text-primary"
                >
                  Contact us
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
