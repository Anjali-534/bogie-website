import type { Metadata } from "next";
import Link from "next/link";
import {
  Cookie,
  Building2,
  Globe2,
  Clock,
  CalendarClock,
  Lock,
  EyeOff,
  Ghost,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";
import Footer from "../components/Footer";
import { PRIVACY_POLICY_URL } from "../lib/policies";

export const metadata: Metadata = {
  title: "Cookie Policy — Bogie",
  description:
    "How Bogie actually uses cookies and browser storage — first-party, third-party, session, persistent, secure, HTTP-only, and zombie cookies, explained honestly.",
  alternates: { canonical: "https://bogie.in/cookies" },
};

type Category = {
  icon: LucideIcon;
  title: string;
  definition: string;
  disclosure: string[];
  used: "not-used" | "partial" | "used";
};

const CATEGORIES: Category[] = [
  {
    icon: Building2,
    title: "First-Party Cookies",
    definition:
      "Cookies or similar storage set directly by the website you're visiting — in this case, bogie.in itself.",
    disclosure: [
      "We don't set any first-party cookies. Instead, we use your browser's localStorage to keep you signed in — it holds your login token and basic profile info, and never leaves your device except when sent to our own API over HTTPS.",
      "localStorage isn't technically a cookie, but it does the same job here, so we're disclosing it as one for full transparency.",
    ],
    used: "partial",
  },
  {
    icon: Globe2,
    title: "Third-Party Cookies",
    definition:
      "Cookies set by a domain other than the one you're visiting — usually from embedded services, widgets, or ad networks on the page.",
    disclosure: [
      "Ola Maps, our location and mapping provider, powers pickup/drop search, route calculation, and the live tracking map. It's required for booking to work and isn't optional.",
      "Today, the way we call Ola Maps (plain requests, no credentialed cookie exchange) means no cookies are actually being set on your browser by them. But Ola Maps is still a third party that receives your search text, coordinates, and IP address on each request — we're disclosing that here even though no cookie is currently attached to it.",
      "We don't use Ola Maps, or any other third party, to track you across other websites.",
    ],
    used: "partial",
  },
  {
    icon: Clock,
    title: "Session Cookies",
    definition:
      "Temporary cookies that are automatically deleted when you close your browser.",
    disclosure: [
      "We don't use session cookies. Our sign-in uses persistent localStorage instead, described below.",
    ],
    used: "not-used",
  },
  {
    icon: CalendarClock,
    title: "Persistent Cookies",
    definition:
      "Cookies that remain on your device after you close your browser, until they expire or you delete them.",
    disclosure: [
      "We don't use persistent cookies, but our localStorage-based sign-in behaves the same way in practice: it stays on your device across visits so you don't have to log in every time, until you log out or clear your browser's site data.",
    ],
    used: "partial",
  },
  {
    icon: Lock,
    title: "Secure Cookies",
    definition:
      "Cookies marked to be sent only over an encrypted HTTPS connection, never over plain HTTP.",
    disclosure: [
      "bogie.in and our backend API are served exclusively over HTTPS. We don't have any cookies in use, secure or otherwise — but everything we do store or transmit (your login token included) only ever travels over an encrypted connection.",
    ],
    used: "not-used",
  },
  {
    icon: EyeOff,
    title: "HTTP-Only Cookies",
    definition:
      "Cookies flagged so they're inaccessible to JavaScript on the page — a security measure that limits what a malicious script could steal.",
    disclosure: [
      "We don't use HTTP-only cookies for sign-in. We use localStorage instead, which is deliberately different: our web and mobile apps call our backend API cross-origin, and that API authenticates with a bearer token rather than a browser-managed session cookie — so there's no cookie for an HTTP-only flag to protect in the first place.",
      "The honest tradeoff: this means your login token is technically readable by any JavaScript that runs on this page. We limit that risk by keeping our third-party script surface deliberately small — Ola Maps is the only third-party script we load, and we run no ad networks, trackers, or analytics scripts of any kind. We don't currently have a formal Content-Security-Policy configured; that's a hardening step we're aware of and evaluating for later, not something we want to imply we already have.",
    ],
    used: "used",
  },
  {
    icon: Ghost,
    title: "Zombie Cookies",
    definition:
      "A deceptive tracking technique where identifiers are designed to “respawn” after being deleted, using mechanisms like Flash storage, ETags, or cache-based fingerprinting to defeat a user's attempt to clear their cookies.",
    disclosure: [
      "We do not use zombie cookies, or any respawning or fingerprinting mechanism, in any form. If you clear your browser's site data for bogie.in, everything — including your signed-in session — is genuinely gone, not silently restored.",
    ],
    used: "not-used",
  },
];

const badgeStyles: Record<Category["used"], string> = {
  "not-used": "bg-emerald-100 text-emerald-700",
  partial: "bg-amber-100 text-amber-700",
  used: "bg-neutral-200 text-neutral-700",
};

const badgeLabels: Record<Category["used"], string> = {
  "not-used": "Not used",
  partial: "Used, but not as a cookie",
  used: "Used (see tradeoff)",
};

export default function CookiesPage() {
  return (
    <>
      <main>
        <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute top-1/2 -left-32 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary-dark">
                <Cookie size={14} />
                Cookie Policy
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-[1.05]">
                What we actually use — and don&apos;t.
              </h1>
              <p className="mt-6 text-lg text-neutral-600">
                Most cookie policies list every category a lawyer can think of,
                whether or not the site uses it. This one is different: below is
                every standard cookie category, explained in plain language,
                followed by exactly what Bogie does — including the categories
                we genuinely don&apos;t use at all.
              </p>
            </AnimatedSection>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6">
              {CATEGORIES.map((cat, i) => (
                <AnimatedSection key={cat.title} delay={i * 0.04}>
                  <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 sm:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                          <cat.icon size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-neutral-900 sm:text-xl">
                          {cat.title}
                        </h2>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${badgeStyles[cat.used]}`}
                      >
                        {badgeLabels[cat.used]}
                      </span>
                    </div>

                    <p className="mt-4 text-sm italic text-neutral-500">
                      {cat.definition}
                    </p>

                    <div className="mt-4 flex flex-col gap-3 border-t border-neutral-100 pt-4">
                      {cat.disclosure.map((para, j) => (
                        <p key={j} className="text-sm leading-relaxed text-neutral-700">
                          {para}
                        </p>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-neutral-50 py-20">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                Want the full picture?
              </h2>
              <p className="mt-3 text-neutral-600">
                This page covers cookies and browser storage specifically. For
                how we handle your data more broadly, see our full Privacy
                Policy.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={PRIVACY_POLICY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
                >
                  Read Privacy Policy
                  <ArrowRight size={16} />
                </a>
                <Link
                  href="/help"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 px-7 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:border-primary hover:text-primary"
                >
                  Visit Help &amp; FAQ
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
