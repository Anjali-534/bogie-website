import Image from "next/image";
import AnimatedSection from "./AnimatedSection";

const DRIVER_APP_URL = "https://gogobackend-production.up.railway.app/driver-app";
const DRIVER_PARTNER_PAGE = "/driver-partner";

export default function DriverCta() {
  return (
    <section className="bg-cream-deep pb-24 pt-10 sm:pt-12">
      <AnimatedSection>
        <div className="overflow-hidden bg-white shadow-[0_20px_45px_-12px_rgba(154,52,18,0.28),0_8px_18px_-8px_rgba(154,52,18,0.18)] ring-1 ring-cream-line">
          <div className="relative h-72 sm:h-80 lg:h-[600px] w-full">
            <Image
              src="/bogiedriverpartner.png"
              alt="Become a Bogie driver partner — cabs, trucks, ambulances & parcel delivery, all in one app"
              fill
              priority
              className="object-cover object-top"
              sizes="100vw"
            />
          </div>

          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-5 py-6 sm:gap-4 sm:px-8">
            <span className="text-base font-semibold text-neutral-900">
              Download the App
            </span>
            <a
              href={DRIVER_APP_URL}
              aria-label="Get it on Google Play"
              className="inline-flex items-center transition-opacity hover:opacity-80"
            >
              <Image
                src="/google-play-badge.png"
                alt="Get it on Google Play"
                width={646}
                height={250}
                className="h-16 w-auto sm:h-20"
              />
            </a>
            <a
              href={DRIVER_PARTNER_PAGE}
              className="inline-flex items-center rounded-lg border border-neutral-300 px-6 py-2.5 text-sm font-semibold text-neutral-800 transition-colors hover:border-primary hover:text-primary sm:py-3 sm:text-base"
            >
              Become a Bogie Partner
            </a>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
