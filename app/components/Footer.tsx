import { Smartphone, Star, X } from "lucide-react";
import { serviceAreas } from "../lib/serviceAreas";

const DRIVER_APP_URL =
  "https://gogobackend-production.up.railway.app/driver-app";
const POLICIES_BASE = "https://gogobackend-production.up.railway.app/policies";

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

function QrFinder({ x, y, cell }: { x: number; y: number; cell: number }) {
  return (
    <g transform={`translate(${x * cell} ${y * cell})`} fill="#0a0a0a">
      <rect width={cell * 7} height={cell * 7} />
      <rect x={cell} y={cell} width={cell * 5} height={cell * 5} fill="white" />
      <rect x={cell * 2} y={cell * 2} width={cell * 3} height={cell * 3} />
    </g>
  );
}

function QrPlaceholder() {
  const size = 21;
  const cell = 100 / size;
  const bits = [
    "010110100101101",
    "101001011010010",
    "011010100101011",
    "100101101010100",
    "010110010101101",
    "101011101010010",
    "011001010101101",
    "100110101010010",
    "010101011001011",
    "101010100110100",
    "011011010101101",
  ];
  return (
    <svg viewBox="0 0 100 100" className="h-14 w-14" aria-hidden="true">
      <rect width="100" height="100" fill="white" />
      {bits.map((row, y) =>
        row.split("").map((bit, x) =>
          bit === "1" ? (
            <rect
              key={`${x}-${y}`}
              x={(x + 7) * cell}
              y={(y + 7) * cell}
              width={cell}
              height={cell}
              fill="#0a0a0a"
            />
          ) : null
        )
      )}
      <QrFinder x={0} y={0} cell={cell} />
      <QrFinder x={size - 7} y={0} cell={cell} />
      <QrFinder x={0} y={size - 7} cell={cell} />
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
  { label: "Become a Driver", href: DRIVER_APP_URL },
  { label: "Refer & Earn", href: "/refer" },
];

const supportLinks = [
  { label: "Contact Us", href: "/#contact" },
  { label: "Help / FAQ", href: "/help" },
  { label: "Safety", href: "/safety" },
  { label: "Privacy Policy", href: `${POLICIES_BASE}/privacy-policy.pdf` },
  { label: "Terms of Service", href: `${POLICIES_BASE}/terms-and-conditions.pdf` },
  { label: "Zero Tolerance Policy", href: "#" },
];

const panelLinks = [
  "Admin Panel",
  "Driver Panel",
  "Hospital Panel",
  "NGO Panel",
  "Support Panel",
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[320px_1fr]">
          {/* Left block */}
          <div>
            <a
              href="/#home"
              className="inline-flex items-baseline text-4xl font-extrabold tracking-tight text-white"
            >
              bo<span className="text-primary">g</span>ie
            </a>
            <p className="mt-2 text-xs uppercase tracking-widest text-neutral-500">
              Delivering more than just parcels
            </p>

            <div className="mt-8 border-t border-dashed border-neutral-800 pt-8">
              <p className="text-sm font-semibold text-white">Follow us on</p>
              <div className="mt-4 flex items-center gap-3">
                {socialLinks.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    aria-label={`Follow bogie on ${name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-neutral-400 transition-colors hover:bg-primary hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-dashed border-neutral-800 pt-8">
              <p className="text-sm font-semibold text-white">
                Download our app now!
              </p>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                  <Smartphone size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-white">
                    <Star size={14} className="fill-primary text-primary" />
                    4.8
                  </div>
                  <p className="text-xs text-neutral-500">
                    Play Store &amp; App Store
                  </p>
                </div>
                <a
                  href={DRIVER_APP_URL}
                  aria-label="Scan the QR code to download the bogie app"
                  className="ml-auto shrink-0 overflow-hidden rounded-lg ring-1 ring-neutral-800"
                >
                  <QrPlaceholder />
                </a>
              </div>
              <a
                href={DRIVER_APP_URL}
                className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Get the App
              </a>
            </div>
          </div>

          {/* Right columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            <nav aria-label="Company">
              <h3 className="text-sm font-semibold text-white">Company</h3>
              <ul className="mt-4 space-y-2.5">
                {companyLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm transition-colors hover:text-primary"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Quick Links">
              <h3 className="text-sm font-semibold text-white">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-2.5">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm transition-colors hover:text-primary"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Support">
              <h3 className="text-sm font-semibold text-white">Support</h3>
              <ul className="mt-4 space-y-2.5">
                {supportLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm transition-colors hover:text-primary"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav
              aria-label="Areas we serve"
              className="col-span-2 sm:col-span-1"
            >
              <h3 className="text-sm font-semibold text-white">
                Areas We Serve
              </h3>
              <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5">
                {serviceAreas.map((area) => (
                  <li key={area.slug}>
                    <a
                      href={`/cab?area=${area.slug}`}
                      className="text-sm transition-colors hover:text-primary"
                    >
                      {area.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Partner / admin panels — de-emphasized */}
        <nav
          aria-label="Partner and admin panels"
          className="mt-14 border-t border-neutral-900 pt-6"
        >
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {panelLinks.map((l) => (
              <a
                key={l}
                href="#"
                className="text-[11px] text-neutral-500 transition-colors hover:text-primary"
              >
                {l}
              </a>
            ))}
          </div>
        </nav>

        {/* Copyright + NAP */}
        <div className="mt-8 flex flex-col gap-3 border-t border-neutral-900 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} Aggarwal Publicity and Marketing
            Pvt. Ltd. All rights reserved.
          </p>
          <address className="text-xs not-italic text-neutral-500">
            Delhi NCR, India &middot;{" "}
            <a href="tel:+9198XXXXXXXX" className="hover:text-primary">
              +91 98XXX XXXXX
            </a>{" "}
            &middot;{" "}
            <a href="mailto:support@bogie.in" className="hover:text-primary">
              support@bogie.in
            </a>
          </address>
        </div>
      </div>
    </footer>
  );
}
