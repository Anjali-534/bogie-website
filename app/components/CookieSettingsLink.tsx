"use client";

import { useCookieConsent } from "../lib/CookieConsentContext";

// Isolated as its own client component so Footer itself can stay a server
// component — this is the only interactive bit in that list.
export default function CookieSettingsLink() {
  const { openSettings } = useCookieConsent();
  return (
    <button
      type="button"
      onClick={openSettings}
      className="text-sm transition-colors hover:text-primary"
    >
      Cookie Settings
    </button>
  );
}
