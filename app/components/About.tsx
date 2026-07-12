import { ShieldCheck, Zap, HeartHandshakeIcon } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const points = [
  {
    icon: Zap,
    title: "Built for speed",
    text: "Book a cab, truck, or ambulance in under 30 seconds — no clutter, no confusion.",
  },
  {
    icon: ShieldCheck,
    title: "Zero-commission ambulances",
    text: "Free rides via registered NGOs, paid BLS/ALS via partner hospitals — we never take a cut, ever.",
  },
  {
    icon: HeartHandshakeIcon,
    title: "One account, everywhere",
    text: "The same login works across our app, this website, and every service we run.",
  },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-16 bg-neutral-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            About Bogie
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Delhi NCR&apos;s ride hailing &amp; logistics app, built to actually help.
          </h2>
          <p className="mt-5 text-lg text-neutral-600">
            Bogie is run by <strong>Aggarwal Publicity and Marketing Pvt.
            Ltd.</strong>, based in Delhi NCR. We bring cabs, truck logistics,
            and ambulance access together in one place — because switching
            between five apps for five different rides makes no sense.
          </p>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {points.map((point, i) => (
            <AnimatedSection key={point.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <point.icon size={22} />
                </div>
                <h3 className="mt-4 font-bold text-neutral-900">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600">{point.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
