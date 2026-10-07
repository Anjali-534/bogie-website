import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Zap, ShieldCheck, HeartHandshake, ArrowRight, MapPin, Globe } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import Footer from "../components/Footer";
import Services from "../components/Services";

export const metadata: Metadata = {
  title: "About Bogie | Meet Anjali Aggarwal & the Team",
  description:
    "Bogie AI Technologies is a Delhi NCR startup building mobility and logistics software. Meet the team, including co-founder and lead engineer Anjali Aggarwal.",
  alternates: { canonical: "https://bogie.in/about" },
};

const ORG_ID = "https://bogie.in/#organization";
const ANJALI_ID = "https://bogie.in/about#anjali-aggarwal";

const anjaliLinks = {
  linkedin: "https://www.linkedin.com/in/anjali-aggarwal-a32a84236/",
  github: "https://github.com/Anjali-534",
  portfolio: "https://my-portfolio-chi-sooty-11.vercel.app/",
};

const teamJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": ANJALI_ID,
      name: "Anjali Aggarwal",
      jobTitle: "Co-Founder & Lead Engineer",
      worksFor: { "@id": ORG_ID },
      url: anjaliLinks.portfolio,
      sameAs: [anjaliLinks.linkedin, anjaliLinks.github, anjaliLinks.portfolio],
      knowsAbout: [
        "Go",
        "Next.js",
        "React Native",
        "PostgreSQL",
        "Logistics software",
        "Mobility technology",
      ],
    },
    {
      "@type": "Organization",
      "@id": ORG_ID,
      founder: { "@id": ANJALI_ID },
    },
  ],
};

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

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
  {
    photo: "/ANJALI%20BOGIE.png",
    name: "Anjali Aggarwal",
    designation: "Co-Founder & Lead Engineer",
    featured: false,
    bio: "Co-founder and lead engineer at Bogie AI Technologies, building mobility and logistics software from Delhi NCR.",
    links: [
      { href: anjaliLinks.linkedin, label: "LinkedIn", icon: <LinkedInIcon /> },
      { href: anjaliLinks.github, label: "GitHub", icon: <GitHubIcon /> },
      { href: anjaliLinks.portfolio, label: "Portfolio", icon: <Globe size={16} aria-hidden="true" /> },
    ],
  },
  { photo: "/DHRITIBOGIE.png", name: "Dhriti Aggarwal", designation: "Co-Founder & CFO", featured: false },
  { photo: "/TUSHARBOGIE.png", name: "Tushar Aggarwal", designation: "Co-Founder", featured: false },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd) }}
      />
      <main>
        <section className="relative aspect-[3/2] w-full max-w-[100vw] overflow-hidden bg-neutral-100">
          <Image
            src="/aboutbogiehero.png"
            alt="Bogie on the road in Delhi NCR"
            fill
            priority
            className="object-contain"
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
                somewhere, trucks when you need to move a shipment, and ambulances when
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
                    Headquartered in Delhi NCR, India — Bogie AI Technologies is
                    building India&apos;s first startup to unify cab, truck, and
                    ambulance logistics in one app, now live across the region.
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

            <div className="mt-14 grid grid-cols-1 gap-6 sm:flex sm:flex-wrap sm:justify-center sm:[&>*]:w-[calc((100%-3rem)/3)] lg:grid lg:grid-cols-5 lg:[&>*]:w-auto">
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
                    {person.bio && (
                      <p className="mt-3 text-xs text-neutral-500">{person.bio}</p>
                    )}
                    {person.links && (
                      <div className="mt-4 flex items-center justify-center gap-2">
                        {person.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer me"
                            aria-label={link.label}
                            title={link.label}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-neutral-50 text-neutral-500 ring-1 ring-neutral-100 transition-colors hover:bg-primary-light hover:text-primary"
                          >
                            {link.icon}
                          </a>
                        ))}
                      </div>
                    )}
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

        <section className="py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <AnimatedSection>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-sm">
                  <Image
                    src="/Hamara_Book_Bank_Poster.jpg"
                    alt="Hamara Book Bank"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                  Giving back
                </p>
                <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
                 We feel proud to be a part of the noble cause

                </h2>
                <p className="mt-6 text-neutral-600">
                  Bogie&apos;s team is closely involved with Hamara Book Bank, an NGO
                  working to make books and learning resources accessible to students
                  who couldn&apos;t otherwise afford them. From collecting and
                  redistributing books to running the donation platform behind the
                  scenes, it&apos;s part of how we think about movement — not just of
                  people and packages, but of opportunity.
                </p>
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
