import Hero from "./components/Hero";
import About from "./components/About";
import Stats from "./components/Stats";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import DriverCta from "./components/DriverCta";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <About />
        <Stats />
        <Services />
        <HowItWorks />
        <DriverCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
