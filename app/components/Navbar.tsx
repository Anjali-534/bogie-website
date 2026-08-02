"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  Car,
  Truck,
  Ambulance,
  Package,
  Info,
  Briefcase,
  Newspaper,
  Calculator,
  type LucideIcon,
} from "lucide-react";
import { useAuth } from "../lib/AuthContext";

const DRIVER_APP_URL = "https://gogobackend-production.up.railway.app/driver-app";
const DRIVER_PARTNER_PAGE = "/driver-partner";

const links = [{ href: "/#home", label: "Home" }];

const companyLinks = [
  { href: "/about", label: "About", icon: Info },
  { href: "/careers", label: "Careers", icon: Briefcase },
  { href: "/blog", label: "Blog", icon: Newspaper },
];

const serviceLinks = [
  { href: "/cab", label: "Cab", icon: Car },
  { href: "/truck", label: "Truck", icon: Truck },
  { href: "/truck", label: "Parcel", icon: Package },
  { href: "/ambulance", label: "Ambulance", icon: Ambulance },
  { href: "/fare-estimator", label: "Fare Estimator", icon: Calculator },
];

const afterServicesLinks = [
  { href: "/refer", label: "Refer & Earn" },
  { href: "/#contact", label: "Contact" },
];

type DropdownLink = { href: string; label: string; icon: LucideIcon };

function NavDropdown({ label, items }: { label: string; items: DropdownLink[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, open, () => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-sm font-medium text-neutral-700 hover:text-primary transition-colors"
      >
        {label}
        <ChevronDown
          size={15}
          className={open ? "rotate-180 transition-transform" : "transition-transform"}
        />
      </button>
      {open && (
        <div className="absolute left-0 mt-3 w-48 rounded-2xl bg-white p-1.5 shadow-lg ring-1 ring-neutral-100">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-primary-light hover:text-primary"
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileAccordion({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: DropdownLink[];
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-t border-neutral-100 first:border-t-0">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="flex w-full min-h-11 items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold text-neutral-900"
      >
        {label}
        <ChevronDown
          size={18}
          className={`text-neutral-400 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>
      {expanded && (
        <div className="flex flex-col gap-0.5 pb-2">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className="flex min-h-11 items-center gap-2.5 rounded-lg px-3 py-3 text-sm font-medium text-neutral-700 hover:bg-primary-light hover:text-primary transition-colors"
            >
              <item.icon size={16} />
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  onOutside: () => void
) {
  useEffect(() => {
    if (!active) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onOutside();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [active, ref, onOutside]);
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const { user, isLoading, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useClickOutside(accountRef, accountOpen, () => setAccountOpen(false));

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <a href="/#home" className="flex items-center">
          <Image
            src="/logo-mark.png"
            alt="Bogie"
            width={1024}
            height={308}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-700 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}

          <NavDropdown label="Company" items={companyLinks} />
          <NavDropdown label="Services" items={serviceLinks} />

          {afterServicesLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-700 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/bogie-tracker"
            className="hidden lg:inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.03] active:scale-[0.98]"
          >
            Bogie Tracker
          </Link>

          <Link
            href={DRIVER_PARTNER_PAGE}
            className="hidden lg:inline-flex items-center rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-neutral-800 hover:scale-[1.03] active:scale-[0.98]"
          >
            Driver Partner
          </Link>

          <Link
            href="/book"
            className="hidden sm:inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.03] active:scale-[0.98]"
          >
            Book Now
          </Link>

          {!isLoading && !user && (
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-primary hover:text-primary"
            >
              Log In
            </Link>
          )}

          {!isLoading && user && (
            <div ref={accountRef} className="relative hidden sm:block">
              <button
                onClick={() => setAccountOpen((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-primary hover:text-primary"
              >
                Hi, {user.name.split(" ")[0]}
                <ChevronDown size={16} />
              </button>
              {accountOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-2xl bg-white p-1.5 shadow-lg ring-1 ring-neutral-100">
                  <button
                    onClick={() => {
                      logout();
                      setAccountOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-primary-light hover:text-primary"
                  >
                    <LogOut size={16} />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full text-neutral-700 hover:bg-neutral-100"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <>
          <div
            className="fixed inset-0 top-16 z-[60] bg-black/30 md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-x-0 top-16 z-[60] max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain bg-white border-t border-neutral-100 shadow-lg md:hidden">
            <div className="flex flex-col px-4 py-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-lg px-3 py-3 text-sm font-medium text-neutral-700 hover:bg-primary-light hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}

              <MobileAccordion label="Company" items={companyLinks} onNavigate={() => setOpen(false)} />
              <MobileAccordion label="Services" items={serviceLinks} onNavigate={() => setOpen(false)} />

              <div className="border-t border-neutral-100">
                {afterServicesLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-11 items-center rounded-lg px-3 py-3 text-sm font-medium text-neutral-700 hover:bg-primary-light hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ))}

                <Link
                  href="/bogie-tracker"
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-lg px-3 py-3 text-sm font-medium text-neutral-700 hover:bg-primary-light hover:text-primary transition-colors"
                >
                  Bogie Tracker
                </Link>

                <Link
                  href={DRIVER_PARTNER_PAGE}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-lg px-3 py-3 text-sm font-medium text-neutral-700 hover:bg-primary-light hover:text-primary transition-colors"
                >
                  Become a Driver
                </Link>
              </div>

              <div className="mt-3 flex flex-col gap-2 border-t border-neutral-100 pt-3 pb-3">
                <Link
                  href="/book"
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
                >
                  Book Now
                </Link>

                {!isLoading && !user && (
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-700"
                  >
                    Log In
                  </Link>
                )}

                {!isLoading && user && (
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                    }}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-700"
                  >
                    <LogOut size={16} />
                    Log Out ({user.name.split(" ")[0]})
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
