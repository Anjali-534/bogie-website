"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Mail, MapPin, Phone, X } from "lucide-react";
import { serviceAreas } from "../lib/serviceAreas";
import { PRIVACY_POLICY_URL, TERMS_URL } from "../lib/policies";
import CookieSettingsLink from "./CookieSettingsLink";

const DRIVER_APP_URL =
  "https://gogobackend-production.up.railway.app/driver-app";
const DRIVER_PARTNER_PAGE = "/driver-partner";

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
            <p className="mt-2 text-xs uppercase tracking-widest text-neutral-500">
              Delivering more than just parcels
            </p>

            <div className="mt-8 border-t border-dashed border-cream-line pt-8">
              <p className="text-sm font-semibold text-neutral-900">Follow us on</p>
              <div className="mt-4 flex items-center gap-3">
                {socialLinks.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    aria-label={`Follow Bogie on ${name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-600 ring-1 ring-cream-line transition-colors hover:bg-primary hover:text-white hover:ring-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-dashed border-cream-line pt-8">
              <p className="text-sm font-semibold text-neutral-900">
                Download our app now!
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
            </FooterSection>
          </div>
        </div>

        {/* Copyright + NAP */}
        <div className="mt-8 flex flex-col gap-4 border-t border-cream-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Bogie Technologies Pvt. Ltd. All
            rights reserved.
          </p>

          <div className="flex flex-col gap-2 text-xs text-neutral-500 sm:flex-row sm:items-center sm:gap-5">
            <a
              href="mailto:support@bogie.in"
              className="flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              <Mail size={14} />
              support@bogie.in
            </a>
            <a
              href="tel:+917827194116"
              className="flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              <Phone size={14} />
              +91 7827194116
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="flex-shrink-0" />
              16/534 Joshi Road, Karol Bagh, New Delhi-110005, India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
