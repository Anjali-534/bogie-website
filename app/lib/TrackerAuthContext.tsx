"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  apiTrackerCompanyProfile,
  apiTrackerLogin,
  apiTrackerSignup,
  type TrackerCompany,
  type TrackerSignupFields,
} from "./api";

const TOKEN_KEY = "tracker_access_token";
const COMPANY_KEY = "tracker_company";

type AuthResult = { success: boolean; error?: string; token?: string };

type TrackerAuthContextValue = {
  company: TrackerCompany | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (fields: TrackerSignupFields) => Promise<AuthResult>;
  logout: () => void;
};

const TrackerAuthContext = createContext<TrackerAuthContextValue | null>(null);

function persistSession(token: string, company: TrackerCompany) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(COMPANY_KEY, JSON.stringify(company));
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(COMPANY_KEY);
}

export function TrackerAuthProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<TrackerCompany | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedCompany = localStorage.getItem(COMPANY_KEY);

    if (!storedToken || !storedCompany) {
      setIsLoading(false);
      return;
    }

    let parsedCompany: TrackerCompany;
    try {
      parsedCompany = JSON.parse(storedCompany);
    } catch {
      clearSession();
      setIsLoading(false);
      return;
    }

    setCompany(parsedCompany);
    setToken(storedToken);

    // The stored token may be stale, expired, or (as happened during the
    // "undefined" token bug) never valid in the first place — verify it
    // against the server rather than trusting localStorage's mere presence,
    // mirroring AuthContext's apiRiderProfile check.
    apiTrackerCompanyProfile(storedToken)
      .then((profile) => setCompany(profile))
      .catch(() => {
        clearSession();
        setCompany(null);
        setToken(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  async function login(email: string, password: string): Promise<AuthResult> {
    try {
      const res = await apiTrackerLogin(email, password);
      persistSession(res.access_token, res.company);
      setCompany(res.company);
      setToken(res.access_token);
      return { success: true, token: res.access_token };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : "Login failed." };
    }
  }

  async function signup(fields: TrackerSignupFields): Promise<AuthResult> {
    try {
      await apiTrackerSignup(fields);
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : "Signup failed." };
    }
    return login(fields.email, fields.password);
  }

  function logout() {
    clearSession();
    setCompany(null);
    setToken(null);
  }

  return (
    <TrackerAuthContext.Provider value={{ company, token, isLoading, login, signup, logout }}>
      {children}
    </TrackerAuthContext.Provider>
  );
}

export function useTrackerAuth() {
  const ctx = useContext(TrackerAuthContext);
  if (!ctx) {
    throw new Error("useTrackerAuth must be used within a TrackerAuthProvider");
  }
  return ctx;
}
