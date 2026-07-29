"use client";

import { useEffect, useRef, useState } from "react";
import { useCookieConsent } from "../lib/CookieConsentContext";

const WHATSAPP_NUMBER = "917827194116";
const DEFAULT_MESSAGE = "Hi, I'd like to know more about Bogie";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

export default function WhatsAppButton() {
  const { bannerOpen } = useCookieConsent();
  const [nearFooter, setNearFooter] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  // Fades the button out while the footer is on screen so it doesn't sit on
  // top of footer links/text — the footer already surfaces a Contact Us link.
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      ref={ref}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Bogie on WhatsApp"
      aria-hidden={nearFooter}
      tabIndex={nearFooter ? -1 : 0}
      className={`fixed right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/20 transition-all duration-300 hover:scale-110 hover:shadow-xl animate-whatsapp-pulse ${
        bannerOpen ? "bottom-[calc(6rem+env(safe-area-inset-bottom))] sm:bottom-[calc(5.5rem+env(safe-area-inset-bottom))]" : "bottom-[calc(1.25rem+env(safe-area-inset-bottom))]"
      } ${nearFooter ? "translate-x-20 opacity-0 pointer-events-none" : "translate-x-0 opacity-100"}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="white"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.92 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2Zm0 18.17h-.01a8.24 8.24 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.4c0-4.55 3.71-8.26 8.27-8.26 2.21 0 4.28.86 5.84 2.42a8.2 8.2 0 0 1 2.42 5.85c0 4.55-3.71 8.25-8.27 8.25Zm4.53-6.19c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.24-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.04-.38-1.99-1.22-.73-.66-1.23-1.46-1.37-1.71-.14-.24-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.48-.01-.17 0-.44.06-.67.31-.23.24-.87.85-.87 2.08 0 1.22.89 2.4 1.01 2.57.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.16-.48-.28Z" />
      </svg>
    </a>
  );
}
