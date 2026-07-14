"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  getStoredConsent,
  storeConsent,
  type ConsentChoice,
  type ConsentRecord,
} from "./cookieConsent";

type CookieConsentContextValue = {
  consent: ConsentRecord | null;
  bannerOpen: boolean;
  decide: (choice: ConsentChoice) => void;
  openSettings: () => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentRecord | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);

  // Runs once on mount, client-side only — avoids a hydration mismatch and
  // means the banner never blocks/flashes on the very first paint.
  useEffect(() => {
    const stored = getStoredConsent();
    setConsent(stored);
    setBannerOpen(!stored);
  }, []);

  function decide(choice: ConsentChoice) {
    setConsent(storeConsent(choice));
    setBannerOpen(false);
  }

  function openSettings() {
    setBannerOpen(true);
  }

  return (
    <CookieConsentContext.Provider value={{ consent, bannerOpen, decide, openSettings }}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return ctx;
}
