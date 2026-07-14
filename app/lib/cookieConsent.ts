// Cookie/tracking consent — stored in localStorage, consistent with the
// site's existing auth pattern (no cookies are set by this site itself;
// see the audit in the cookie-banner PR for what's actually loaded).
export type ConsentChoice = "accepted_all" | "necessary_only" | "declined";

export type ConsentRecord = {
  choice: ConsentChoice;
  decidedAt: string; // ISO timestamp
};

const STORAGE_KEY = "cookie_consent";

export function getStoredConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.choice) return parsed as ConsentRecord;
    return null;
  } catch {
    return null;
  }
}

export function storeConsent(choice: ConsentChoice): ConsentRecord {
  const record: ConsentRecord = { choice, decidedAt: new Date().toISOString() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // localStorage unavailable (private mode / disabled) — consent still
    // applies for this page view, it just won't persist across visits.
  }
  return record;
}
