"use client";

import Script from "next/script";
import { useCookieConsent } from "../lib/CookieConsentContext";

const GA_ID = "G-KP6CDDGTDH";

export default function GoogleAnalytics() {
  const { consent } = useCookieConsent();

  if (consent?.choice !== "accepted_all") {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-gtag" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', { anonymize_ip: true });`}
      </Script>
    </>
  );
}
