import type { Metadata } from "next";
import { PenSquare, Megaphone, CalendarClock } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import Footer from "../components/Footer";
import Contact from "../components/Contact";

export const metadata: Metadata = {
  title: "Careers at Bogie | Join India's First AI Logistics Startup",
  description:
    "Join Bogie AI Technologies, India's first AI-powered logistics startup — we're hiring Marketing & Social Media interns for our Delhi NCR mobility platform.",
};

const responsibilities = [
  {
    icon: PenSquare,
    text: "Content creation — posts, captions, short-form video for Bogie's social channels.",
  },
  {
    icon: Megaphone,
    text: "Campaign support — helping plan and run promos across cabs, trucks, and ambulances.",
  },
  {
    icon: CalendarClock,
    text: "Social scheduling — keeping our posting calendar consistent and on-brand.",
  },
];

export default function CareersPage() {
  return (
    <>
      <main>
        <section className="bg-cream pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary-dark">
                Careers
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
                Join Bogie as an Intern.
              </h1>
              <p className="mt-6 text-lg text-neutral-600">
                We&apos;re currently looking for interns in Marketing and Social
                Media to join us in Delhi NCR. It&apos;s hands-on work with Bogie AI
                Technologies, a small, fast-moving startup building ride-hailing and
                logistics tech — you&apos;ll see your work go live, not sit in a deck.
                If that sounds like your kind of internship, we&apos;d love to hear
                from you.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-lg font-bold text-neutral-900">
                What you&apos;d be doing
              </h2>
              <div className="mt-6 space-y-5">
                {responsibilities.map((item) => (
                  <div key={item.text} className="flex items-start gap-3.5">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                      <item.icon size={18} />
                    </div>
                    <p className="pt-2 text-sm text-neutral-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        <Contact
          recipient="careers@bogie.in"
          sectionId="apply"
          heading="Apply for the internship"
          successTitle="Application sent!"
          successMessage="We'll get back to you shortly."
        />
      </main>
      <Footer />
    </>
  );
}
