"use client";

import { useRef } from "react";
import { Star } from "lucide-react";
import type { PlatformReview } from "../lib/api";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

export default function ReviewsCarousel({ reviews }: { reviews: PlatformReview[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ startX: number; startScroll: number; active: boolean }>({
    startX: 0,
    startScroll: 0,
    active: false,
  });

  function onPointerDown(e: React.PointerEvent) {
    const track = trackRef.current;
    if (!track) return;
    drag.current = { startX: e.clientX, startScroll: track.scrollLeft, active: true };
    track.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    const track = trackRef.current;
    if (!track || !drag.current.active) return;
    track.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  }

  function onPointerUp() {
    drag.current.active = false;
  }

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      className="flex cursor-grab gap-5 overflow-x-auto scroll-smooth px-4 pb-4 active:cursor-grabbing sm:px-6 lg:px-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      style={{ scrollSnapType: "x proximity" }}
    >
      {reviews.map((r, i) => (
        <div
          key={i}
          className="flex w-[280px] shrink-0 select-none flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 sm:w-[320px]"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                size={15}
                className={n <= r.rating ? "fill-amber-400 text-amber-400" : "fill-transparent text-neutral-200"}
              />
            ))}
          </div>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-700">
            &ldquo;{r.review_text}&rdquo;
          </p>
          <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
            <div>
              <p className="text-sm font-bold text-neutral-900">{r.display_name}</p>
              <p className="text-xs text-neutral-400">{formatDate(r.created_at)}</p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                r.user_type === "driver"
                  ? "bg-sky-50 text-sky-600"
                  : "bg-primary-light text-primary-dark"
              }`}
            >
              {r.user_type === "driver" ? "Driver" : "Rider"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
