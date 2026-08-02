import { SITE_URL } from "./lib/serviceAreas";
import Hero from "./components/Hero";
import About from "./components/About";
import Stats from "./components/Stats";
import Reviews from "./components/Reviews";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import DriverCta from "./components/DriverCta";
import TrackerCta from "./components/TrackerCta";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bogie",
  legalName: "Bogie AI Technologies Pvt Ltd",
  url: SITE_URL,
  description:
    "Ride hailing and logistics app for Delhi NCR — cab booking, truck logistics, and zero-commission ambulance booking in one app.",
  areaServed: "Delhi NCR",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <main className="flex-1">
        <Hero />
        <Services />
        <DriverCta />
        <TrackerCta />
        <About />
        <Stats />
        <Reviews />
        <HowItWorks />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
