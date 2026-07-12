"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "../lib/AuthContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Tab = "login" | "signup";
type Status = "idle" | "loading" | "error";

const inputClass =
  "rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary disabled:opacity-60";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-neutral-700">{label}</span>
      {children}
    </label>
  );
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, signup } = useAuth();
  const redirectTo = searchParams.get("redirect") || "/";

  const [tab, setTab] = useState<Tab>("login");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [referredByCode, setReferredByCode] = useState("");

  function switchTab(next: Tab) {
    if (status === "loading") return;
    setTab(next);
    setStatus("idle");
    setError("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    const trimmedEmail = email.trim().toLowerCase();

    if (tab === "login") {
      if (!trimmedEmail || !password) {
        setError("Please fill in all fields.");
        setStatus("error");
        return;
      }
      if (!EMAIL_REGEX.test(trimmedEmail)) {
        setError("Please enter a valid email address.");
        setStatus("error");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        setStatus("error");
        return;
      }

      setStatus("loading");
      setError("");
      const result = await login(trimmedEmail, password);
      if (!result.success) {
        setError(result.error || "Invalid email or password.");
        setStatus("error");
        return;
      }
      router.push(redirectTo);
      return;
    }

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedPhone || !trimmedEmail || !password) {
      setError("Please fill in all fields.");
      setStatus("error");
      return;
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    if (trimmedPhone.replace(/\D/g, "").length < 10) {
      setError("Enter a valid 10-digit phone number.");
      setStatus("error");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError("");
    const result = await signup({
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      password,
      referred_by_code: referredByCode.trim().toUpperCase() || undefined,
    });
    if (!result.success) {
      setError(result.error || "Something went wrong. Please try again.");
      setStatus("error");
      return;
    }
    router.push(redirectTo);
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          {tab === "login" ? "Welcome back" : "Join Bogie"}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900">
          {tab === "login" ? "Log in to your account" : "Create your account"}
        </h1>
      </div>

      <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-neutral-100 sm:p-8">
        <div className="mb-6 flex rounded-2xl bg-neutral-100 p-1">
          {(["login", "signup"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => switchTab(t)}
              className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition-colors ${
                tab === t
                  ? "bg-primary text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              {t === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {tab === "signup" && (
            <>
              <Field label="Full name">
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Priya Sharma"
                  disabled={status === "loading"}
                  className={inputClass}
                />
              </Field>
              <Field label="Phone">
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  disabled={status === "loading"}
                  className={inputClass}
                />
              </Field>
            </>
          )}

          <Field label="Email">
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={status === "loading"}
              className={inputClass}
              suppressHydrationWarning
            />
          </Field>

          <Field label="Password">
            <div className="flex items-center rounded-xl border border-neutral-200 transition-colors focus-within:border-primary">
              <input
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={tab === "signup" ? "Min 8 characters" : "Your password"}
                disabled={status === "loading"}
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none disabled:opacity-60"
                suppressHydrationWarning
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="px-3 text-neutral-400 hover:text-neutral-600"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </Field>

          {tab === "signup" && (
            <Field label="Referral code (optional)">
              <input
                type="text"
                value={referredByCode}
                onChange={(e) => setReferredByCode(e.target.value)}
                placeholder="e.g. GU7X2K9A"
                disabled={status === "loading"}
                className={`${inputClass} uppercase`}
              />
            </Field>
          )}

          {status === "error" && (
            <p className="text-sm font-medium text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
          >
            {status === "loading" ? (
              <>
                {tab === "login" ? "Logging in..." : "Creating account..."}
                <Loader2 size={16} className="animate-spin" />
              </>
            ) : (
              <>
                {tab === "login" ? "Log In" : "Create Account"}
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
