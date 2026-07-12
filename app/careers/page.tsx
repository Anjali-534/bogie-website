import type { Metadata } from "next";
import Link from "next/link";
import { Hammer, ArrowRight, Mail } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Careers — Bogie",
  description:
    "Careers at Bogie is coming soon. Want to be part of the story early? Get in touch.",
  robots: { index: false, follow: true },
};

export default function CareersPage() {
  return (
    <>
      <main>
        <section className="relative flex min-h-[70vh] items-center overflow-hidden pt-32 pb-20 sm:pt-40">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light text-primary">
                <Hammer size={30} />
              </div>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary-dark">
                Coming soon
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
                We&apos;re building our careers page.
              </h1>
              <p className="mt-6 text-lg text-neutral-600">
                Bogie is a small, fast-growing team based in Delhi NCR — and we&apos;re
                not quite ready to list open roles yet. But if you want to be part of
                the Bogie story early, we&apos;d genuinely like to hear from you.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
                >
                  Get in touch
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="mailto:support@bogie.in"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-7 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:border-primary hover:text-primary"
                >
                  <Mail size={16} />
                  support@bogie.in
                </a>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
