"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  apiLogin,
  apiRiderProfile,
  apiRiderSignup,
  type AuthUser,
  type RiderProfile,
  type RiderSignupFields,
} from "./api";

const TOKEN_KEY = "access_token";
const USER_KEY = "user";

export type RiderSession = AuthUser & Partial<RiderProfile>;

type AuthResult = { success: boolean; error?: string };

type AuthContextValue = {
  user: RiderSession | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (fields: RiderSignupFields) => Promise<AuthResult>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function persistSession(token: string, user: AuthUser) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<RiderSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (!token || !storedUser) {
      setIsLoading(false);
      return;
    }

    let parsedUser: AuthUser;
    try {
      parsedUser = JSON.parse(storedUser);
    } catch {
      clearSession();
      setIsLoading(false);
      return;
    }

    setUser(parsedUser);

    apiRiderProfile(token)
      .then((profile) => {
        setUser((prev) => (prev ? { ...prev, ...profile } : prev));
      })
      .catch(() => {
        clearSession();
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  async function login(email: string, password: string): Promise<AuthResult> {
    try {
      const res = await apiLogin(email, password);
      persistSession(res.access_token, res.user);
      setUser(res.user);

      apiRiderProfile(res.access_token)
        .then((profile) => setUser((prev) => (prev ? { ...prev, ...profile } : prev)))
        .catch(() => {});

      return { success: true };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : "Login failed." };
    }
  }

  async function signup(fields: RiderSignupFields): Promise<AuthResult> {
    try {
      await apiRiderSignup(fields);
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : "Signup failed." };
    }
    return login(fields.email, fields.password);
  }

  function logout() {
    clearSession();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
