"use client";

import { motion } from "motion/react";
import { Car, Truck, Ambulance, ArrowRight, Download, MapPin } from "lucide-react";

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
          className="relative mx-auto flex h-80 w-full max-w-md items-center justify-center sm:h-96"
        >
          <div className="absolute h-64 w-64 rounded-[2.5rem] bg-primary/15 sm:h-80 sm:w-80" />

          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-2 left-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-xl sm:h-24 sm:w-24"
          >
            <Car className="text-primary" size={36} />
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="absolute bottom-4 right-2 flex h-24 w-24 items-center justify-center rounded-2xl bg-white shadow-xl sm:h-28 sm:w-28"
          >
            <Truck className="text-primary" size={42} />
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="absolute bottom-16 left-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xl sm:h-20 sm:w-20"
          >
            <Ambulance className="text-primary" size={28} />
          </motion.div>

          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary text-white shadow-2xl shadow-primary/40 sm:h-32 sm:w-32">
            <MapPin size={44} strokeWidth={2.25} className="text-white" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
