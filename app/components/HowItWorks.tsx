import { MousePointerClick, MapPin, Navigation } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const steps = [
  {
    icon: MousePointerClick,
    step: "01",
    title: "Pick a service",
    text: "Cab, truck, or ambulance — choose what you need in one tap.",
  },
  {
    icon: MapPin,
    step: "02",
    title: "Enter pickup & drop",
    text: "Tell us where you are and where you're headed. That's it.",
  },
  {
    icon: Navigation,
    step: "03",
    title: "Track it live",
    text: "Watch your ride arrive in real time, right up to your door.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-neutral-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            How it works
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Booked in three taps.
          </h2>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((s, i) => (
            <AnimatedSection key={s.step} delay={i * 0.12} className="relative">
              <div className="flex flex-col items-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-sm ring-1 ring-neutral-100 transition-transform hover:scale-105">
                  <s.icon size={26} />
                </div>
                <span className="mt-4 text-xs font-bold tracking-widest text-primary">
                  STEP {s.step}
                </span>
                <h3 className="mt-1 text-lg font-extrabold text-neutral-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">{s.text}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="absolute top-7 left-full hidden w-8 border-t-2 border-dashed border-neutral-300 sm:block" />
              )}
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
