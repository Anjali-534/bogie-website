"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowRight, Download, MapPin } from "lucide-react";

const heroCards = [
  {
    src: "/hero-cab.jpg",
    alt: "Cab ride through Delhi NCR city traffic",
    caption: "City Rides & Cabs",
    position: "sm:absolute sm:top-0 sm:left-0",
    bob: { y: [0, -12, 0], duration: 4, delay: 0 },
  },
  {
    src: "/hero-truck.jpg",
    alt: "Truck carrying freight for logistics booking",
    caption: "Logistics & Freight",
    position: "sm:absolute sm:top-0 sm:right-0",
    bob: { y: [0, 10, 0], duration: 4.5, delay: 0.4 },
  },
  {
    src: "/hero-ambulance.jpg",
    alt: "Ambulance responding to an emergency",
    caption: "Emergency Medical",
    position: "sm:absolute sm:bottom-0 sm:left-0",
    bob: { y: [0, -10, 0], duration: 3.5, delay: 0.8 },
  },
  {
    src: "/hero-delivery.jpg",
    alt: "Delivery van moving parcels via bogie truck booking",
    caption: "Parcel Delivery",
    position: "sm:absolute sm:bottom-0 sm:right-0",
    bob: { y: [0, 12, 0], duration: 5, delay: 1.2 },
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative scroll-mt-16 overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      {/* background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary-dark">
            Now live across Delhi NCR
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
            One app.
            <br />
            Every ride you <span className="text-primary">need.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg text-neutral-600">
            Cabs, trucks, and ambulances — booked in seconds, tracked live,
            zero drama. bogie moves Delhi NCR, one ride at a time.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="/book"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark hover:scale-[1.03] active:scale-[0.98]"
            >
              Book a ride
              <ArrowRight size={18} />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 px-7 py-3.5 text-base font-semibold text-neutral-800 transition-all hover:border-primary hover:text-primary hover:scale-[1.03] active:scale-[0.98]"
            >
              <Download size={18} />
              Download the app
            </a>
          </div>

          <div className="mt-10 flex items-center gap-8 text-sm text-neutral-500">
            <div>
              <p className="text-2xl font-extrabold text-neutral-900">0%</p>
              <p>commission on ambulances</p>
            </div>
            <div className="h-8 w-px bg-neutral-200" />
            <div>
              <p className="text-2xl font-extrabold text-neutral-900">3-in-1</p>
              <p>cab, truck &amp; ambulance</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-4 sm:block sm:h-[30rem] sm:max-w-lg"
        >
          {/* dotted connector lines, center pin → each card (hidden on mobile) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 512 480"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
          >
            {[
              "M256 240 Q 180 200 118 118",
              "M256 240 Q 332 200 394 118",
              "M256 240 Q 180 280 118 362",
              "M256 240 Q 332 280 394 362",
            ].map((d) => (
              <path
                key={d}
                d={d}
                fill="none"
                stroke="#FF6B2B"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeDasharray="1 10"
                opacity={0.55}
              />
            ))}
          </svg>

          {heroCards.map((card) => (
            <motion.div
              key={card.caption}
              animate={{ y: card.bob.y }}
              transition={{
                duration: card.bob.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: card.bob.delay,
              }}
              className={`w-full sm:w-44 ${card.position}`}
            >
              <div className="overflow-hidden rounded-2xl bg-white p-1.5 shadow-xl shadow-neutral-900/10 ring-1 ring-neutral-100">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 640px) 45vw, 176px"
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="mt-2 text-center text-[11px] font-extrabold uppercase tracking-widest text-neutral-800">
                {card.caption}
              </p>
            </motion.div>
          ))}

          {/* center pin (hidden on mobile) */}
          <div className="absolute top-1/2 left-1/2 hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-2xl shadow-primary/40 ring-8 ring-white sm:flex sm:h-28 sm:w-28">
            <MapPin size={44} strokeWidth={2.25} className="text-white" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
