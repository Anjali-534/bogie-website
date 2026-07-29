"use client";

const HERO_VIDEO = "/bogietrackervideo.mp4";

export default function TrackerHero() {
  return (
    <section className="relative isolate flex min-h-[600px] flex-col justify-end overflow-hidden bg-cream sm:min-h-[680px] lg:min-h-[760px]">
      <div className="absolute inset-0 -z-20">
        <video
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Stronger overlay on the left/bottom where text sits, so contrast
          holds regardless of what's playing behind it at any given moment. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-cream/95 via-white/55 to-white/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/90 via-white/45 to-transparent" />

      <div className="relative max-w-xl px-6 pb-14 pt-32 text-left sm:px-10 sm:pb-20 lg:px-16">
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
      </div>
    </section>
  );
}
