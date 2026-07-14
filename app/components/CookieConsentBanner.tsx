"use client";

import { useId, useState } from "react";
import { useCookieConsent } from "../lib/CookieConsentContext";
import { PRIVACY_POLICY_URL } from "../lib/policies";

export default function CookieConsentBanner() {
  const { bannerOpen, decide } = useCookieConsent();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const detailsId = useId();

  if (!bannerOpen) return null;

  return (
    <section
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-cream-line bg-cream px-4 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] sm:px-6"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <p className="text-sm text-neutral-700">
            We don&apos;t use analytics or advertising cookies. We use{" "}
            <strong className="font-semibold text-neutral-900">localStorage</strong>{" "}
            to keep you signed in, and third-party maps (Ola Maps) to power
            location search and live tracking — required for booking and not
            optional.{" "}
            <a
              href="/cookies"
              className="font-semibold text-primary underline underline-offset-2 hover:text-primary-dark"
            >
              Cookie Policy
            </a>{" "}
            &middot;{" "}
            <a
              href={PRIVACY_POLICY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline underline-offset-2 hover:text-primary-dark"
            >
              Privacy Policy
            </a>
          </p>

          <button
            type="button"
            onClick={() => setDetailsOpen((v) => !v)}
            aria-expanded={detailsOpen}
            aria-controls={detailsId}
            className="mt-2 text-xs font-semibold text-neutral-500 underline underline-offset-2 hover:text-neutral-700"
          >
            {detailsOpen ? "Hide details" : "What exactly do we use?"}
          </button>

          {detailsOpen && (
            <ul
              id={detailsId}
              className="mt-3 flex flex-col gap-1.5 rounded-2xl bg-white/60 p-3.5 text-xs leading-relaxed text-neutral-600 ring-1 ring-cream-line"
            >
              <li>
                <strong className="text-neutral-800">Necessary</strong> —
                localStorage for your login session (
                <code className="rounded bg-neutral-100 px-1 py-0.5">access_token</code>
                ). Not a cookie, but it&apos;s how you stay signed in. Can&apos;t
                be disabled without logging you out.
              </li>
              <li>
                <strong className="text-neutral-800">Functional</strong> — Ola
                Maps for pickup/drop search, routes, and live tracking maps.
                Required for booking to work; there&apos;s no toggle for this.
              </li>
              <li>
                <strong className="text-neutral-800">Analytics</strong> — none.
                We don&apos;t run Google Analytics or any other tracker on this
                site.
              </li>
              <li>
                <strong className="text-neutral-800">Marketing</strong> — none.
                No ad or remarketing pixels.
              </li>
            </ul>
          )}
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => decide("declined")}
            className="order-3 text-sm font-semibold text-neutral-500 underline underline-offset-2 transition-colors hover:text-neutral-700 sm:order-1 sm:no-underline sm:rounded-full sm:border sm:border-neutral-200 sm:px-5 sm:py-2.5 sm:hover:border-neutral-400 sm:hover:text-neutral-900"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => decide("necessary_only")}
            className="order-2 inline-flex items-center justify-center rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-primary hover:text-primary"
          >
            Necessary Only
          </button>
          <button
            type="button"
            onClick={() => decide("accepted_all")}
            className="order-1 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark sm:order-3"
          >
            Accept All
          </button>
        </div>
      </div>
    </section>
  );
}
