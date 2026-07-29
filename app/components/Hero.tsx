"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Download } from "lucide-react";

// Each entry is one clip in the rotation. Drop additional cab/truck/ambulance
// footage in here as it becomes available — the carousel and dots adapt
// automatically to however many slides are present.
type Slide = {
  id: string;
  label: string;
  video: string;
};

const slides: Slide[] = [
  { id: "home", label: "Bogie on the road", video: "/hero-home.mp4" },
];

const ROTATE_MS = 5500;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const timer = setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      ROTATE_MS
    );
    return () => clearInterval(timer);
  }, [paused]);

  const Current = slides[active];

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[600px] scroll-mt-16 flex-col justify-end overflow-hidden sm:min-h-[680px] lg:min-h-[760px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 -z-20">
        <AnimatePresence>
          <motion.div
            key={Current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <video
              src={Current.video}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/hero-cab.jpg"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stronger overlay on the left/bottom where text sits, so contrast
          holds regardless of what's playing behind it at any given moment. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-cream/95 via-white/55 to-white/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/90 via-white/45 to-transparent" />

      <div className="relative max-w-xl px-4 pb-14 pt-32 text-left sm:px-6 sm:pb-20 lg:px-8">
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
          zero drama. Bogie moves Delhi NCR, one ride at a time.
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
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white/70 px-7 py-3.5 text-base font-semibold text-neutral-800 backdrop-blur-sm transition-all hover:border-primary hover:text-primary hover:scale-[1.03] active:scale-[0.98]"
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
            <p className="text-2xl font-extrabold text-neutral-900">4-in-1</p>
            <p>cab, truck &amp; ambulance</p>
          </div>
        </div>

        {slides.length > 1 && (
          <div className="mt-10 flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                aria-label={`Show ${s.label}`}
                aria-current={i === active}
                className={`h-2 rounded-full transition-all ${
                  i === active ? "w-6 bg-primary" : "w-2 bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
