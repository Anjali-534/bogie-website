import type { Metadata } from "next";
import AnimatedSection from "../components/AnimatedSection";
import Footer from "../components/Footer";
import FareEstimatorForm from "./FareEstimatorForm";
import { getServices } from "../lib/api";
import { SITE_URL } from "../lib/serviceAreas";

export const metadata: Metadata = {
  title: "Fare Estimator — bogie",
  description:
    "Estimate your bogie cab fare in Delhi NCR — enter your pickup and drop location and compare base pricing across 2 wheeler, auto, car, and SUV.",
};

export default async function FareEstimatorPage() {
  const services = await getServices();
  const cabs = services.filter((s) => s.category === "cab");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "bogie Fare Estimator",
    url: `${SITE_URL}/fare-estimator`,
    description: metadata.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary-dark">
                Fare Estimator
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
                Know before <span className="text-primary">you go.</span>
              </h1>
              <p className="mt-6 text-lg text-neutral-600">
                Enter your pickup and drop to compare cab pricing across every vehicle
                type bogie offers in Delhi NCR.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <FareEstimatorForm services={cabs} />
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
