import type { Metadata } from "next";
import AnimatedSection from "../components/AnimatedSection";
import Footer from "../components/Footer";
import ReviewForm from "./ReviewForm";

export const metadata: Metadata = {
  title: "Rate Bogie — Bogie",
  description: "Tell us what you think of Bogie — your review helps other riders decide.",
  robots: { index: false, follow: false },
};

export default function ReviewPage() {
  return (
    <>
      <main>
        <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary-dark">
                Rate Bogie
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
                How&apos;s Bogie working <span className="text-primary">for you?</span>
              </h1>
              <p className="mt-6 text-lg text-neutral-600">
                Your review is shown publicly to help other riders — we&apos;ll only show
                your first name.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <ReviewForm />
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
