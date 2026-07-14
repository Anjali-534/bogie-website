// Real policy PDFs served statically from the backend (gogoo /policies/*).
// Shared by Footer and the cookie consent banner so the base URL lives in
// one place.
export const POLICIES_BASE = "https://gogobackend-production.up.railway.app/policies";
export const PRIVACY_POLICY_URL = `${POLICIES_BASE}/privacy-policy.pdf`;
export const TERMS_URL = `${POLICIES_BASE}/terms-and-conditions.pdf`;
