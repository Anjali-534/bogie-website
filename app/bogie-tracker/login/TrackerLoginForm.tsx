"use client";

import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, ArrowRight, ImagePlus, Loader2 } from "lucide-react";
import { useTrackerAuth } from "../../lib/TrackerAuthContext";
import { uploadTrackerLogo } from "../../lib/api";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LOGO_BYTES = 2 * 1024 * 1024;

type Tab = "login" | "signup";
type Step = "form" | "logo";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [pendingToken, setPendingToken] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoError, setLogoError] = useState("");
  const [logoStatus, setLogoStatus] = useState<Status>("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    // Logo upload needs an authenticated company, which only exists after
    // signup + auto-login succeed — so this has to be a step here, not part
    // of the signup form itself.
    setPendingToken(result.token || null);
    setStatus("idle");
    setStep("logo");
  }

  function handleLogoSelect(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoError("");
    if (!file.type.startsWith("image/")) {
      setLogoError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_LOGO_BYTES) {
      setLogoError("Image must be under 2MB.");
      return;
    }
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  }

  async function handleLogoUpload() {
    if (!pendingToken || !logoFile) return;
    setLogoStatus("loading");
    setLogoError("");
    try {
      await uploadTrackerLogo(pendingToken, logoFile);
      router.push(redirectTo);
    } catch (err) {
      setLogoError(err instanceof Error ? err.message : "Couldn't upload your logo.");
      setLogoStatus("error");
    }
  }

  function skipLogo() {
    router.push(redirectTo);
  }

  if (step === "logo") {
    return (
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Almost there
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900">
            Add your company logo
          </h1>
          <p className="mt-2 text-sm text-neutral-600">
            Optional — shown on your tracking pages and, if you&apos;d like, on our
            partners page. You can add or change this anytime later.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-neutral-100 sm:p-8">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoSelect}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-neutral-200 py-10 text-neutral-500 transition-colors hover:border-primary hover:text-primary"
          >
            {logoPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoPreview}
                alt="Logo preview"
                className="h-20 w-20 rounded-xl object-contain"
              />
            ) : (
              <ImagePlus size={28} />
            )}
            <span className="text-sm font-medium">
              {logoFile ? "Choose a different image" : "Choose an image"}
            </span>
            <span className="text-xs text-neutral-400">PNG or JPG, up to 2MB</span>
          </button>

          {logoError && <p className="mt-3 text-sm font-medium text-red-600">{logoError}</p>}

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={handleLogoUpload}
              disabled={!logoFile || logoStatus === "loading"}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
            >
              {logoStatus === "loading" ? (
                <>
                  Uploading...
                  <Loader2 size={16} className="animate-spin" />
                </>
              ) : (
                <>
                  Upload logo
                  <ArrowRight size={16} />
                </>
              )}
            </button>
            <button
              type="button"
              onClick={skipLogo}
              disabled={logoStatus === "loading"}
              className="text-sm font-medium text-neutral-500 hover:text-neutral-700 disabled:opacity-60"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          {tab === "login" ? "Welcome back" : "Get your fleet dispatching"}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900">
          {tab === "login" ? "Log in to Bogie Tracker" : "Create your company account"}
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
      </div>
    </div>
  );
}
