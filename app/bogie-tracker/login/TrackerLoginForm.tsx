"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { useTrackerAuth } from "../../lib/TrackerAuthContext";
import { apiTrackerResendOtp, apiTrackerVerifyEmail } from "../../lib/api";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_COOLDOWN_SECONDS = 30;

type Tab = "login" | "signup";
type Step = "form" | "otp";
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

export default function TrackerLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, signup } = useTrackerAuth();
  const redirectTo = searchParams.get("redirect") || "/bogie-tracker/orders";

  const [tab, setTab] = useState<Tab>("login");
  const [step, setStep] = useState<Step>("form");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [pendingEmail, setPendingEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpStatus, setOtpStatus] = useState<Status>("idle");
  const [otpError, setOtpError] = useState("");
  const [resendStatus, setResendStatus] = useState<Status>("idle");
  const [resendNotice, setResendNotice] = useState("");
  const [resendCooldown, setResendCooldown] = useState(RESEND_COOLDOWN_SECONDS);

  useEffect(() => {
    if (step !== "otp") return;
    const t = setInterval(() => {
      setResendCooldown((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, [step]);

  function switchTab(next: Tab) {
    if (status === "loading") return;
    setTab(next);
    setStatus("idle");
    setError("");
    setNotice("");
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

    const trimmedCompanyName = companyName.trim();

    if (!trimmedCompanyName || !trimmedEmail || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      setStatus("error");
      return;
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setStatus("error");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setError("");
    const result = await signup({
      company_name: trimmedCompanyName,
      email: trimmedEmail,
      contact_email: trimmedEmail,
      password,
    });
    if (!result.success) {
      setError(result.error || "Something went wrong. Please try again.");
      setStatus("error");
      return;
    }

    // Account exists but isn't usable until the OTP just emailed to
    // trimmedEmail is verified — login would 403 right now, so show the
    // verification step instead of redirecting.
    setPendingEmail(trimmedEmail);
    setOtpCode("");
    setOtpError("");
    setOtpStatus("idle");
    setResendNotice("");
    setResendCooldown(RESEND_COOLDOWN_SECONDS);
    setStatus("idle");
    setStep("otp");
  }

  async function handleVerify(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (otpStatus === "loading") return;
    if (otpCode.length !== 6) {
      setOtpError("Enter the 6-digit code.");
      setOtpStatus("error");
      return;
    }

    setOtpStatus("loading");
    setOtpError("");
    try {
      await apiTrackerVerifyEmail(pendingEmail, otpCode);
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : "Verification failed. Please try again.");
      setOtpStatus("error");
      return;
    }

    setStep("form");
    setTab("login");
    setEmail(pendingEmail);
    setPassword("");
    setConfirmPassword("");
    setCompanyName("");
    setOtpCode("");
    setOtpStatus("idle");
    setNotice("Email verified — you can now log in.");
  }

  async function handleResend() {
    if (resendStatus === "loading" || resendCooldown > 0) return;
    setResendStatus("loading");
    setResendNotice("");
    try {
      await apiTrackerResendOtp(pendingEmail);
      setResendNotice("A new code has been sent.");
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (err) {
      const status = (err as { status?: number } | undefined)?.status;
      if (status === 429) {
        setResendNotice("You can request a new code in a few seconds.");
        setResendCooldown(RESEND_COOLDOWN_SECONDS);
      } else {
        setResendNotice(err instanceof Error ? err.message : "Could not resend code. Please try again.");
      }
    } finally {
      setResendStatus("idle");
    }
  }

  function backToSignup() {
    setStep("form");
    setTab("signup");
    setOtpCode("");
    setOtpError("");
    setOtpStatus("idle");
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          {step === "otp" ? "One more step" : tab === "login" ? "Welcome back" : "Get your fleet dispatching"}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900">
          {step === "otp"
            ? "Verify your email"
            : tab === "login"
              ? "Log in to Bogie Tracker"
              : "Create your company account"}
        </h1>
      </div>

      <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-neutral-100 sm:p-8">
        {step === "otp" ? (
          <>
            <p className="mb-6 text-sm text-neutral-600">
              We&apos;ve sent a 6-digit code to{" "}
              <span className="font-semibold text-neutral-900">{pendingEmail}</span>. Enter it below to
              verify your email.
            </p>

            <form onSubmit={handleVerify} className="flex flex-col gap-4" noValidate>
              <Field label="Verification code">
                <input
                  required
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="123456"
                  disabled={otpStatus === "loading"}
                  className={`${inputClass} text-center text-lg font-semibold tracking-[0.3em]`}
                />
              </Field>

              {otpStatus === "error" && (
                <p className="text-sm font-medium text-red-600">{otpError}</p>
              )}

              <button
                type="submit"
                disabled={otpStatus === "loading" || otpCode.length !== 6}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
              >
                {otpStatus === "loading" ? (
                  <>
                    Verifying...
                    <Loader2 size={16} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Verify
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 text-center text-sm">
              {resendCooldown > 0 ? (
                <p className="text-neutral-400">Resend code in {resendCooldown}s</p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendStatus === "loading"}
                  className="font-semibold text-primary hover:underline disabled:opacity-60"
                >
                  {resendStatus === "loading" ? "Resending..." : "Resend code"}
                </button>
              )}
              {resendNotice && <p className="mt-1.5 text-xs text-neutral-400">{resendNotice}</p>}
            </div>

            <div className="mt-4 border-t border-neutral-100 pt-4 text-center">
              <button
                type="button"
                onClick={backToSignup}
                className="text-xs font-medium text-neutral-400 hover:text-neutral-600"
              >
                Wrong email? Go back
              </button>
            </div>
          </>
        ) : (
          <>
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

            {notice && tab === "login" && (
              <p className="mb-4 rounded-xl bg-green-50 px-4 py-2.5 text-sm font-medium text-green-700">
                {notice}
              </p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              {tab === "signup" && (
                <Field label="Company name">
                  <input
                    required
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Acme Logistics Pvt Ltd"
                    disabled={status === "loading"}
                    className={inputClass}
                  />
                </Field>
              )}

              <Field label="Email">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
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
                <Field label="Confirm password">
                  <div className="flex items-center rounded-xl border border-neutral-200 transition-colors focus-within:border-primary">
                    <input
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      disabled={status === "loading"}
                      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none disabled:opacity-60"
                      suppressHydrationWarning
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      className="px-3 text-neutral-400 hover:text-neutral-600"
                      tabIndex={-1}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
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
          </>
        )}
      </div>
    </div>
  );
}
