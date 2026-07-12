import type { Metadata } from "next";
import { Share2, UserPlus, Wallet } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import Footer from "../components/Footer";
import ReferralHub from "./ReferralHub";

export const metadata: Metadata = {
  title: "Refer & Earn — bogie",
  description:
    "Invite friends to bogie, Delhi NCR's cab, truck & ambulance app — earn ₹50 when they take their first ride, plus ₹25 more when they refer someone too.",
};

const steps = [
  {
    icon: Share2,
    title: "Share your code",
    text: "Every bogie account gets a unique referral code — GU for riders, GD for drivers. Share it with friends any way you like.",
  },
  {
    icon: UserPlus,
    title: "They sign up & ride",
    text: "Your friend creates a bogie account using your code and completes their first ride or trip.",
  },
  {
    icon: Wallet,
    title: "You both win",
    text: "You earn ₹50 the moment their first ride is done — and another ₹25 if they go on to refer someone else too.",
  },
];

export default function ReferPage() {
  return (
    <>
      <main>
        <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary-dark">
                Refer &amp; Earn
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
                Invite friends, earn <span className="text-primary">₹50.</span>
              </h1>
              <p className="mt-6 text-lg text-neutral-600">
                You get ₹50 the moment a friend you refer takes their first ride —
                plus ₹25 more if they go on to refer someone too.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="pb-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {steps.map((s, i) => (
                <AnimatedSection key={s.title} delay={i * 0.1}>
                  <div className="h-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                      <s.icon size={22} />
                    </div>
                    <h2 className="mt-4 font-bold text-neutral-900">{s.title}</h2>
                    <p className="mt-2 text-sm text-neutral-600">{s.text}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-neutral-50 py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <ReferralHub />
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
