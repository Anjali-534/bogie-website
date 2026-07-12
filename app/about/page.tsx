import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  ShieldCheck,
  HeartHandshake,
  Car,
  Truck,
  Ambulance,
  ArrowRight,
  BadgeCheck,
  MapPin,
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "About Us — Bogie | Delhi NCR's Ride & Logistics App",
  description:
    "Bogie is Delhi NCR's ride hailing and logistics app — cab booking, truck logistics, and zero-commission ambulances, run by Aggarwal Publicity and Marketing Pvt. Ltd.",
};

const differentiators = [
  {
    icon: Zap,
    title: "Built for speed",
    text: "Most ride apps make you dig through five screens before you can book anything. We didn't. Open the app, pick a service, confirm a pickup — you're booked in under 30 seconds, every time.",
  },
  {
    icon: ShieldCheck,
    title: "Zero-commission ambulances",
    text: "Ambulance bookings are either free — routed through registered NGOs and sewa organisations — or paid directly through partner hospitals for BLS/ALS transport. We don't take a cut of either. Not a platform fee, not a convenience charge. Zero, always.",
  },
  {
    icon: HeartHandshake,
    title: "One account, everywhere",
    text: "The same login that books you a cab tonight moves a truckload of stock next week and calls an ambulance if you ever need one. No separate apps, no re-entering your details, no starting from scratch.",
  },
];

const services = [
  {
    icon: Car,
    name: "Cab",
    description: "2 wheeler, auto, mini, SUV, and hourly rentals — live tracking and upfront fares across Delhi NCR.",
    href: "/cab",
    badge: null,
  },
  {
    icon: Truck,
    name: "Truck",
    description: "Within-city and outstation logistics, loading/unloading add-ons, and delivery updates for the receiver.",
    href: "/truck",
    badge: null,
  },
  {
    icon: Ambulance,
    name: "Ambulance",
    description: "Free rides via registered NGOs, or paid BLS/ALS via partner hospitals — zero commission, either way.",
    href: "/ambulance",
    badge: "0% commission",
  },
];

export default function AboutPage() {
  return (
    <>
      <main>
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary-dark">
                About Bogie
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
                Built in Delhi NCR.
                <br />
                Made for how the city actually <span className="text-primary">moves.</span>
              </h1>
              <p className="mt-6 text-lg text-neutral-600">
                Bogie is an all-in-one ride and logistics app — cabs when you need to get
                somewhere, trucks when you need to move something, and ambulances when
                every second counts. One login, one app, three services that actually
                talk to each other.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex flex-col items-center gap-4 rounded-3xl bg-neutral-50 p-8 text-center ring-1 ring-neutral-100 sm:flex-row sm:text-left">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary">
                  <MapPin size={26} />
                </div>
                <div>
                  <p className="font-bold text-neutral-900">
                    Aggarwal Publicity and Marketing Pvt. Ltd.
                  </p>
                  <p className="mt-1 text-sm text-neutral-600">
                    Headquartered in Delhi NCR, India — and now live across the region,
                    with cabs, trucks, and ambulances running from the same app.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="bg-neutral-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Why Bogie
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
                Three things we do differently.
              </h2>
            </AnimatedSection>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {differentiators.map((d, i) => (
                <AnimatedSection key={d.title} delay={i * 0.1}>
                  <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 transition-all hover:-translate-y-1 hover:shadow-md">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                      <d.icon size={22} />
                    </div>
                    <h3 className="mt-4 font-bold text-neutral-900">{d.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600">{d.text}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Our services
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
                Three services. One app. Zero hassle.
              </h2>
            </AnimatedSection>

            <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {services.map((service, i) => (
                <AnimatedSection key={service.name} delay={i * 0.12} className="h-full">
                  <div className="group relative flex h-full flex-col rounded-3xl border border-neutral-100 bg-white p-7 shadow-sm transition-all hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
                    {service.badge && (
                      <span className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-md">
                        <BadgeCheck size={13} />
                        {service.badge}
                      </span>
                    )}
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <service.icon size={28} />
                    </div>
                    <h3 className="mt-5 text-xl font-extrabold text-neutral-900">
                      {service.name}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-neutral-600">
                      {service.description}
                    </p>
                    <Link
                      href={service.href}
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-transform group-hover:gap-2.5"
                    >
                      Explore {service.name}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-cream-line bg-cream-deep py-24 text-neutral-900">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                The ambulance difference
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
                Zero-commission ambulances, explained.
              </h2>
              <p className="mt-6 text-neutral-600">
                When you request an ambulance through Bogie, we first check for a free
                ride via our network of registered NGOs and sewa organisations operating
                in your area. If one's available, that's what you get — no charge, no
                catch.
              </p>
              <p className="mt-4 text-neutral-600">
                If none are free at that moment, we connect you to BLS/ALS ambulances via
                partner hospitals, billed directly by the hospital. Either way, Bogie's
                cut is exactly zero rupees — we don't add a platform fee or a convenience
                charge to emergency transport, ever.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                Questions about Bogie?
              </h2>
              <p className="mt-3 text-neutral-600">
                We&apos;re a small team based in Delhi NCR — reach out and a real person
                will get back to you.
              </p>
              <Link
                href="/#contact"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
              >
                Get in touch
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
