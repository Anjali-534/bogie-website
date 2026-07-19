"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import {
  MapRouteSlide,
  DispatchGridSlide,
  WarehouseSlide,
  AnalyticsSlide,
} from "./TrackerHeroSlides";

// Each slide's `video` field is where a real clip drops in later —
// TrackerHero renders it in place of Background with no other changes.
type Slide = {
  id: string;
  label: string;
  video?: string;
  Background: React.ComponentType;
};

const slides: Slide[] = [
  { id: "route", label: "Live route tracking", Background: MapRouteSlide },
  { id: "grid", label: "Fleet network", Background: DispatchGridSlide },
  { id: "warehouse", label: "Dispatch & loading", Background: WarehouseSlide },
  { id: "analytics", label: "Reports & data", Background: AnalyticsSlide },
];

const ROTATE_MS = 5500;

export default function TrackerHero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      ROTATE_MS
    );
    return () => clearInterval(timer);
  }, [paused]);

  const Current = slides[active];

  return (
    <section
      className="relative isolate overflow-hidden bg-cream pt-32 pb-20 sm:pt-40 sm:pb-28"
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
            {Current.video ? (
              <video
                src={Current.video}
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <Current.Background />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/80 via-white/55 to-cream/85" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary-dark">
          Bogie Tracker · For Business
        </span>
        <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
          Know where every <span className="text-primary">dispatch</span> is, in real time.
        </h1>
        <p className="mt-6 text-lg text-neutral-600">
          Bogie Tracker is a shipment tracking dashboard built for
          companies that run their own trucks. Add your drivers, create
          a shipment, and follow it live — from loading to delivery.
        </p>
        
        <p className="mt-4 text-xs text-neutral-500">
          New accounts are reviewed before access is activated.
        </p>

        <div className="mt-10 flex items-center justify-center gap-2">
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
      </div>
    </section>
  );
}
