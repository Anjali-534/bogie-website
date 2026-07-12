"use client";

import { useEffect, useRef, useState } from "react";

// Counts up from 0 to `value` once the number scrolls into view. Uses a plain
// IntersectionObserver (fires once) to trigger a requestAnimationFrame count-up,
// matching the site's scroll-triggered reveal convention.
export default function StatCounter({
  value,
  label,
  delay = 0,
}: {
  value: number;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    let raf = 0;
    let start: number | null = null;
    const startDelay = delay * 1000;

    const tick = (now: number) => {
      if (start === null) start = now;
      const elapsed = now - start - startDelay;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(elapsed / duration, 1);
      // easeOutCubic — fast start, gentle settle
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, delay]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-extrabold tracking-tight text-primary sm:text-6xl">
        {display.toLocaleString("en-IN")}
        <span aria-hidden="true">+</span>
      </div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-neutral-600 sm:text-sm">
        {label}
      </p>
    </div>
  );
}
