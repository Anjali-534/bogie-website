"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Mail, MapPin, X } from "lucide-react";
import { serviceAreas } from "../lib/serviceAreas";
import { PRIVACY_POLICY_URL, TERMS_URL } from "../lib/policies";
import { WHATSAPP_URL } from "../lib/whatsapp";
import CookieSettingsLink from "./CookieSettingsLink";

const DRIVER_APP_URL =
  "https://gogobackend-production.up.railway.app/driver-app";
const DRIVER_PARTNER_PAGE = "/driver-partner";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.92 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2Zm0 18.17h-.01a8.24 8.24 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.4c0-4.55 3.71-8.26 8.27-8.26 2.21 0 4.28.86 5.84 2.42a8.2 8.2 0 0 1 2.42 5.85c0 4.55-3.71 8.25-8.27 8.25Zm4.53-6.19c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.24-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.04-.38-1.99-1.22-.73-.66-1.23-1.46-1.37-1.71-.14-.24-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.48-.01-.17 0-.44.06-.67.31-.23.24-.87.85-.87 2.08 0 1.22.89 2.4 1.01 2.57.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

const socialLinks = [
  { name: "Instagram", href: "#", Icon: InstagramIcon },
  { name: "Facebook", href: "#", Icon: FacebookIcon },
  { name: "X (Twitter)", href: "#", Icon: X },
  { name: "LinkedIn", href: "#", Icon: LinkedInIcon },
  { name: "YouTube", href: "#", Icon: YouTubeIcon },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/#contact" },
];

const quickLinks = [
  { label: "Cab", href: "/cab" },
  { label: "Truck", href: "/truck" },
  { label: "Parcel", href: "/truck" },
  { label: "Ambulance", href: "/ambulance" },
  { label: "Fare Estimator", href: "/fare-estimator" },
  { label: "Bogie Tracker", href: "/bogie-tracker" },
  { label: "Become a Driver", href: DRIVER_PARTNER_PAGE },
  { label: "Refer & Earn", href: "/refer" },
  { label: "Rate Bogie", href: "/review" },
];

const supportLinks = [
  { label: "Contact Us", href: "/#contact" },
  { label: "Help / FAQ", href: "/help" },
  { label: "Safety", href: "/safety" },
  { label: "Privacy Policy", href: PRIVACY_POLICY_URL },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Terms of Service", href: TERMS_URL },
  { label: "Zero Tolerance Policy", href: "#" },
];

const officeLocations = ["California", "Australia", "Germany", "India", "Canada"];

function FooterSection({
  title,
  ariaLabel,
  className = "",
  children,
}: {
  title: string;
  ariaLabel: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <nav
      aria-label={ariaLabel}
      className={`border-t border-cream-line lg:border-0 ${className}`}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex min-h-11 w-full items-center justify-between py-3 text-left lg:hidden"
      >
        <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
        <ChevronDown
          size={18}
          className={`text-neutral-400 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>
      <h3 className="hidden text-sm font-semibold text-neutral-900 lg:block">
        {title}
      </h3>
      <div className={`${expanded ? "block" : "hidden"} pb-3 lg:block lg:pb-0`}>
        {children}
      </div>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer
      id="site-footer"
      className="border-t border-cream-line bg-cream text-neutral-600"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[320px_1fr]">
          {/* Left block */}
          <div>
            <a href="/#home" className="inline-flex items-center">
              <Image
                src="/logo-mark.png"
                alt="Bogie"
                width={1024}
                height={308}
                className="h-10 w-auto"
              />
            </a>
            
            <p className="mt-1 text-xs uppercase font-semibold tracking-widest text-neutral-500">
              AI Technologies Pvt Ltd
            </p>

            <div className="mt-8 flex flex-col gap-3 border-t border-dashed border-cream-line pt-8 text-sm">
              <p className="flex items-start gap-2 text-neutral-600">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                16/534 Joshi Road, Karol Bagh, New Delhi-110005, India
              </p>
              <a
                href="mailto:support@bogie.in"
                className="flex items-center gap-2 text-neutral-600 transition-colors hover:text-primary"
              >
                <Mail size={16} className="flex-shrink-0" />
                support@bogie.in
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:scale-[1.03] hover:brightness-95 active:scale-[0.98]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right columns */}
          <div className="flex flex-col lg:grid lg:grid-cols-5 lg:gap-x-8 lg:gap-y-10">
            <FooterSection title="Company" ariaLabel="Company">
              <ul className="mt-2">
                {companyLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="block py-2 text-sm transition-colors hover:text-primary"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </FooterSection>

            <FooterSection title="Quick Links" ariaLabel="Quick Links">
              <ul className="mt-2">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="block py-2 text-sm transition-colors hover:text-primary"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </FooterSection>

            <FooterSection title="Support" ariaLabel="Support">
              <ul className="mt-2">
                {supportLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="block py-2 text-sm transition-colors hover:text-primary"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li className="py-2">
                  <CookieSettingsLink />
                </li>
              </ul>
            </FooterSection>

            <FooterSection title="Areas We Serve" ariaLabel="Areas we serve">
              <ul className="mt-2 grid grid-cols-2 gap-x-4">
                {serviceAreas.map((area) => (
                  <li key={area.slug}>
                    <a
                      href={`/cab?area=${area.slug}`}
                      className="block py-2 text-sm transition-colors hover:text-primary"
                    >
                      {area.name}
                    </a>
                  </li>
                ))}
              </ul>
            </FooterSection>

            <FooterSection title="Our Offices" ariaLabel="Our offices">
              <ul className="mt-2">
                {officeLocations.map((location) => (
                  <li
                    key={location}
                    className="block py-2 text-sm text-neutral-600"
                  >
                    {location}
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <p className="text-sm font-semibold text-neutral-900">
                  Download the app now!
                </p>
                <a
                  href={DRIVER_APP_URL}
                  aria-label="Get it on Google Play"
                  className="mt-4 -ml-[11.5px] inline-flex items-center transition-opacity hover:opacity-80"
                >
                  <Image
                    src="/google-play-badge.png"
                    alt="Get it on Google Play"
                    width={646}
                    height={250}
                    className="h-16 w-auto sm:h-20"
                  />
                </a>
              </div>
            </FooterSection>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col gap-4 border-t border-cream-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Bogie AI Technologies Pvt Ltd. All
            rights reserved.
          </p>

          <div className="flex items-center gap-2.5">
            {socialLinks.map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                aria-label={`Follow Bogie on ${name}`}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-neutral-600 ring-1 ring-cream-line transition-colors hover:bg-primary hover:text-white hover:ring-primary"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
