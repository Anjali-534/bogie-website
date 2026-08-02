import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Zap, ShieldCheck, HeartHandshake, ArrowRight, MapPin } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import Footer from "../components/Footer";
import Services from "../components/Services";

export const metadata: Metadata = {
  title: "About Us — Bogie | Delhi NCR's Ride & Logistics App",
  description:
    "Bogie is Delhi NCR's ride hailing and logistics app — cab booking, truck logistics, and zero-commission ambulances, run by Bogie AI Technologies Pvt Ltd.",
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

const teamPeople = [
  { photo: "/ANILBOGIE.png", name: "Anil Garg", designation: "Director", featured: true },
  { photo: "/MADHUBOGIE.png", name: "Madhu Garg", designation: "Director", featured: true },
  { photo: "/ANJALI%20BOGIE.png", name: "Anjali Aggarwal", designation: "Co-Founder & Engineer", featured: false },
  { photo: "/DHRITIBOGIE.png", name: "Dhriti Aggarwal", designation: "CFO", featured: false },
  { photo: "/TUSHARBOGIE.png", name: "Tushar Aggarwal", designation: "PEON Head", featured: false },
  { photo: "/ANUJBOGIE.png", name: "kunal Garg", designation: "Mareting Head", featured: false },  
];

export default function AboutPage() {
  return (
    <>
      <main>
        <section className="relative aspect-[3/2] w-full">
          <Image
            src="/aboutbogiehero.png"
            alt="Bogie on the road in Delhi NCR"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </section>

        <section className="bg-cream pt-16 pb-20 sm:pt-20 sm:pb-24">
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
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                What drives us
              </p>
            </AnimatedSection>

            <AnimatedSection className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-neutral-100">
                <h2 className="text-lg font-bold text-neutral-900">Our Mission</h2>
                <p className="mt-3 text-sm text-neutral-600">
                  To make every kind of movement — a daily commute, an emergency, a
                  business shipment — simple, transparent, and fair for the people who
                  need it and the drivers who deliver it.
                </p>
              </div>
              <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-neutral-100">
                <h2 className="text-lg font-bold text-neutral-900">Our Vision</h2>
                <p className="mt-3 text-sm text-neutral-600">
                  To become India&apos;s most trusted movement platform, where one app
                  connects cabs, trucks, parcels, and ambulances — built on live
                  tracking, upfront pricing, and zero unfair commissions.
                </p>
              </div>
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
                    Bogie AI Technologies Pvt Ltd
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
                Our team
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
                The people behind Bogie.
              </h2>
            </AnimatedSection>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {teamPeople.map((person, i) => (
                <AnimatedSection key={person.name} delay={i * 0.1}>
                  <div
                    className={`flex h-full flex-col items-center rounded-3xl border p-7 text-center shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10 ${
                      person.featured
                        ? "border-primary/20 border-t-4 bg-white"
                        : "border-neutral-100 hover:border-primary/30 bg-white"
                    }`}
                  >
                    {/* <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                        person.featured
                          ? "bg-primary text-white"
                          : "invisible"
                      }`}
                    >
                      Director
                    </span> */}
                    <div className="relative mt-4 h-24 w-24 overflow-hidden rounded-full ring-4 ring-neutral-50 shadow-sm">
                      <Image
                        src={person.photo}
                        alt={person.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-extrabold text-neutral-900">
                      {person.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-neutral-600">
                      {person.designation || " "}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <Services />

        <section className="border-y border-cream-line bg-cream-deep py-24 text-neutral-900">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <AnimatedSection className="order-2 lg:order-1">
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

              <AnimatedSection className="order-1 lg:order-2">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-sm">
                  <Image
                    src="/bogieambulance.png"
                    alt="Bogie ambulance"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              </AnimatedSection>
            </div>
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
