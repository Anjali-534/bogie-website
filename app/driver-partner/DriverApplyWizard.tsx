"use client";

import { useMemo, useState, type LucideIcon, type ReactNode } from "react";
import {
  Car,
  Truck,
  Ambulance,
  CheckCircle2,
  Loader2,
  X,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { apiDriverSignup, apiLogin, uploadDriverDocument } from "../lib/api";

type Step = "personal" | "vehicle" | "documents" | "bank" | "success";
const STEPS: Step[] = ["personal", "vehicle", "documents", "bank"];

type Category = {
  id: "cab" | "truck" | "ambulance";
  label: string;
  icon: LucideIcon;
  subtypes: { slug: string; label: string }[];
};

const CATEGORIES: Category[] = [
  {
    id: "cab",
    label: "Cab",
    icon: Car,
    subtypes: [
      { slug: "cab_2w", label: "2 Wheeler (Bike/Scooter)" },
      { slug: "cab_3w", label: "3 Wheeler (Auto)" },
      { slug: "cab_4w", label: "4 Wheeler (Car)" },
      { slug: "cab_4w_suv", label: "4 Wheeler (SUV)" },
    ],
  },
  {
    id: "truck",
    label: "Truck",
    icon: Truck,
    subtypes: [
      { slug: "truck_city_tata_ace", label: "Tata Ace / Mini Truck (City)" },
      { slug: "truck_city_14ft", label: "14ft Truck (City)" },
      { slug: "truck_city_open", label: "Open Body Truck (City)" },
      { slug: "truck_city_container", label: "Container Truck (City)" },
      { slug: "truck_os_14ft", label: "14ft Truck (Outstation)" },
      { slug: "truck_os_20ft", label: "20ft Truck (Outstation)" },
      { slug: "truck_os_container", label: "Container (Outstation)" },
      { slug: "truck_os_trailer", label: "Trailer (Outstation)" },
    ],
  },
  {
    id: "ambulance",
    label: "Ambulance",
    icon: Ambulance,
    subtypes: [
      { slug: "ambulance_bls", label: "Basic Life Support (BLS)" },
      { slug: "ambulance_als", label: "Advanced Life Support (ALS)" },
      { slug: "ambulance_transport", label: "Patient Transport" },
    ],
  },
];

type DocSpec = {
  id: string;
  label: string;
  required: boolean;
  hasNumber?: boolean;
  hasExpiry?: boolean;
  numberLabel?: string;
  numberPlaceholder?: string;
};

const COMMON_DOCS: DocSpec[] = [
  { id: "passport_photo", label: "Passport-size photo", required: true },
  {
    id: "aadhaar",
    label: "Aadhaar card",
    required: true,
    hasNumber: true,
    numberLabel: "Aadhaar number",
    numberPlaceholder: "XXXX XXXX XXXX",
  },
  {
    id: "pan_card",
    label: "PAN card",
    required: true,
    hasNumber: true,
    numberLabel: "PAN number",
    numberPlaceholder: "ABCDE1234F",
  },
  {
    id: "driving_license",
    label: "Driving licence",
    required: true,
    hasNumber: true,
    hasExpiry: true,
    numberLabel: "Licence number",
    numberPlaceholder: "DL-1234567890",
  },
  {
    id: "bank_passbook",
    label: "Bank passbook / cancelled cheque",
    required: true,
    hasNumber: true,
    numberLabel: "Account number",
    numberPlaceholder: "XXXXXXXXXXXXXXXX",
  },
  { id: "police_clearance", label: "Police clearance certificate", required: true },
];

const VEHICLE_DOCS: Record<string, DocSpec[]> = {
  two_wheeler: [
    {
      id: "rc",
      label: "Registration certificate (RC)",
      required: true,
      hasNumber: true,
      hasExpiry: true,
      numberPlaceholder: "DL01AB1234567",
    },
    {
      id: "insurance",
      label: "Insurance certificate",
      required: true,
      hasNumber: true,
      hasExpiry: true,
      numberPlaceholder: "INS-XXXXXXXXXX",
    },
    {
      id: "puc",
      label: "Pollution certificate (PUC)",
      required: false,
      hasNumber: true,
      hasExpiry: true,
      numberPlaceholder: "PUC-XXXXXXXXXX",
    },
    { id: "vehicle_photo", label: "Vehicle photo", required: true },
  ],
  truck: [
    {
      id: "rc",
      label: "Registration certificate (RC)",
      required: true,
      hasNumber: true,
      hasExpiry: true,
      numberPlaceholder: "DL01AB1234567",
    },
    {
      id: "insurance",
      label: "Insurance certificate",
      required: true,
      hasNumber: true,
      hasExpiry: true,
      numberPlaceholder: "INS-XXXXXXXXXX",
    },
    {
      id: "puc",
      label: "Pollution certificate (PUC)",
      required: true,
      hasNumber: true,
      hasExpiry: true,
      numberPlaceholder: "PUC-XXXXXXXXXX",
    },
    {
      id: "fitness",
      label: "Fitness certificate",
      required: true,
      hasNumber: true,
      hasExpiry: true,
      numberPlaceholder: "FIT-XXXXXXXXXX",
    },
    {
      id: "permit",
      label: "Vehicle permit",
      required: true,
      hasNumber: true,
      hasExpiry: true,
      numberPlaceholder: "PERMIT-XXXXXXXX",
    },
    { id: "vehicle_photo", label: "Vehicle photo (front)", required: true },
    { id: "vehicle_photo_side", label: "Vehicle photo (side)", required: true },
  ],
  ambulance: [
    {
      id: "rc",
      label: "Registration certificate (RC)",
      required: true,
      hasNumber: true,
      hasExpiry: true,
      numberPlaceholder: "DL01AB1234567",
    },
    {
      id: "insurance",
      label: "Insurance certificate",
      required: true,
      hasNumber: true,
      hasExpiry: true,
      numberPlaceholder: "INS-XXXXXXXXXX",
    },
    {
      id: "emt_cert",
      label: "EMT / paramedic certificate",
      required: true,
      hasNumber: true,
      hasExpiry: true,
      numberPlaceholder: "EMT-XXXXXXXXXX",
    },
    { id: "vehicle_photo", label: "Vehicle photo (front)", required: true },
    { id: "vehicle_photo_side", label: "Vehicle photo (side)", required: true },
  ],
};

function getDocKey(vehicleType: string): keyof typeof VEHICLE_DOCS | null {
  if (vehicleType.startsWith("truck_")) return "truck";
  if (vehicleType.startsWith("ambulance")) return "ambulance";
  if (vehicleType === "cab_2w") return "two_wheeler";
  return null;
}

function StepDots({ step }: { step: Step }) {
  if (step === "success") return null;
  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      {STEPS.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full transition-colors ${
              STEPS.indexOf(step) >= i ? "bg-primary" : "bg-neutral-200"
            }`}
          />
          {i < STEPS.length - 1 && (
            <div
              className={`h-0.5 w-6 transition-colors ${
                STEPS.indexOf(step) > i ? "bg-primary" : "bg-neutral-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-primary";

export default function DriverApplyWizard({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("personal");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [uploadStatus, setUploadStatus] = useState({ uploaded: 0, failed: 0 });

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");

  const [categoryId, setCategoryId] = useState<Category["id"] | "">("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");

  const [docFiles, setDocFiles] = useState<Record<string, File | null>>({});
  const [docNumbers, setDocNumbers] = useState<Record<string, string>>({});
  const [docExpiries, setDocExpiries] = useState<Record<string, string>>({});

  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [bankName, setBankName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedMvag, setAgreedMvag] = useState(false);

  const docKey = getDocKey(vehicleType);
  const allDocs = useMemo(
    () => [...COMMON_DOCS, ...(docKey ? VEHICLE_DOCS[docKey] : [])],
    [docKey]
  );

  function reset() {
    setStep("personal");
    setError("");
    setUploadStatus({ uploaded: 0, failed: 0 });
    setName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setDob("");
    setAddress("");
    setCategoryId("");
    setVehicleType("");
    setVehicleNumber("");
    setVehicleModel("");
    setDocFiles({});
    setDocNumbers({});
    setDocExpiries({});
    setAccountHolder("");
    setAccountNumber("");
    setIfsc("");
    setBankName("");
    setUpiId("");
    setAgreedTerms(false);
    setAgreedMvag(false);
  }

  function close() {
    setOpen(false);
    if (step === "success") reset();
  }

  function validatePersonal(): string {
    if (!name || !phone || !email || !password) return "Please fill in all required fields.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (!/^\d{10}$/.test(phone.replace(/\D/g, ""))) return "Enter a valid 10-digit phone number.";
    return "";
  }

  function validateVehicle(): string {
    if (!categoryId || !vehicleType) return "Please select a vehicle category and type.";
    if (!vehicleNumber || !vehicleModel) return "Vehicle number and model are required.";
    return "";
  }

  function validateDocuments(): string {
    const missing = allDocs.filter((d) => d.required && !docFiles[d.id]);
    if (missing.length > 0) return `Please upload: ${missing.map((d) => d.label).join(", ")}.`;
    return "";
  }

  function validateBank(): string {
    if (!accountHolder || !accountNumber || !ifsc || !bankName)
      return "Please fill in all bank details.";
    if (!agreedTerms || !agreedMvag) return "Please accept the terms to continue.";
    return "";
  }

  function goNext() {
    let err = "";
    if (step === "personal") err = validatePersonal();
    else if (step === "vehicle") err = validateVehicle();
    else if (step === "documents") err = validateDocuments();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    const idx = STEPS.indexOf(step);
    setStep(STEPS[idx + 1]);
  }

  function goBack() {
    setError("");
    const idx = STEPS.indexOf(step);
    if (idx > 0) setStep(STEPS[idx - 1]);
  }

  async function handleSubmit() {
    const err = validateBank();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const signup = await apiDriverSignup({
        email,
        name,
        password,
        phone,
        vehicle_type: vehicleType,
        vehicle_category: categoryId,
        vehicle_number: vehicleNumber,
        vehicle_model: vehicleModel,
        bank_account_holder: accountHolder,
        bank_account_number: accountNumber,
        bank_ifsc: ifsc,
        bank_name: bankName,
        upi_id: upiId || undefined,
        mvag_declaration_accepted: agreedMvag,
        date_of_birth: dob || undefined,
        address: address || undefined,
      });

      const auth = await apiLogin(email, password);

      const docsToUpload = allDocs.filter((d) => docFiles[d.id]);
      let uploaded = 0;
      let failed = 0;
      for (const d of docsToUpload) {
        try {
          await uploadDriverDocument(
            auth.access_token,
            signup.driver_id,
            d.id,
            docFiles[d.id]!,
            docNumbers[d.id],
            docExpiries[d.id]
          );
          uploaded++;
        } catch {
          failed++;
        }
      }
      setUploadStatus({ uploaded, failed });
      setStep("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children ?? label}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-neutral-900/60 px-4 py-8">
          <div className="relative w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 text-neutral-400 transition-colors hover:text-neutral-700"
            >
              <X size={20} />
            </button>

            <StepDots step={step} />

            {step === "personal" && (
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold text-neutral-900">Your details</h2>
                <input
                  className={inputClass}
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className={inputClass}
                  placeholder="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                />
                <input
                  className={inputClass}
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className={inputClass}
                  type="password"
                  placeholder="Password (min 8 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    className={inputClass}
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                  <input
                    className={inputClass}
                    placeholder="Address (optional)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            )}

            {step === "vehicle" && (
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold text-neutral-900">Your vehicle</h2>
                <div className="grid grid-cols-3 gap-3">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isSel = cat.id === categoryId;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setCategoryId(cat.id);
                          setVehicleType("");
                        }}
                        className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-sm font-semibold transition-colors ${
                          isSel
                            ? "border-primary bg-primary-light text-primary"
                            : "border-neutral-100 text-neutral-600 hover:border-neutral-200"
                        }`}
                      >
                        <Icon size={22} />
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                {categoryId && (
                  <select
                    className={inputClass}
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  >
                    <option value="">Select vehicle type</option>
                    {CATEGORIES.find((c) => c.id === categoryId)!.subtypes.map((s) => (
                      <option key={s.slug} value={s.slug}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                )}

                <input
                  className={inputClass}
                  placeholder="Vehicle number"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                />
                <input
                  className={inputClass}
                  placeholder="Vehicle model"
                  value={vehicleModel}
                  onChange={(e) => setVehicleModel(e.target.value)}
                />
              </div>
            )}

            {step === "documents" && (
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold text-neutral-900">Upload documents</h2>
                <p className="text-sm text-neutral-500">
                  Documents are reviewed by our team within 24–48 hours.
                </p>
                <div className="max-h-[50vh] space-y-4 overflow-y-auto pr-1">
                  {allDocs.map((d) => (
                    <div key={d.id} className="rounded-2xl border border-neutral-100 p-4">
                      <p className="text-sm font-semibold text-neutral-900">
                        {d.label}
                        {d.required && <span className="text-primary"> *</span>}
                      </p>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        className="mt-2 w-full text-xs text-neutral-500"
                        onChange={(e) =>
                          setDocFiles((prev) => ({
                            ...prev,
                            [d.id]: e.target.files?.[0] || null,
                          }))
                        }
                      />
                      {(d.hasNumber || d.hasExpiry) && (
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {d.hasNumber && (
                            <input
                              className={inputClass}
                              placeholder={d.numberLabel || "Document number"}
                              value={docNumbers[d.id] || ""}
                              onChange={(e) =>
                                setDocNumbers((prev) => ({ ...prev, [d.id]: e.target.value }))
                              }
                            />
                          )}
                          {d.hasExpiry && (
                            <input
                              className={inputClass}
                              type="date"
                              value={docExpiries[d.id] || ""}
                              onChange={(e) =>
                                setDocExpiries((prev) => ({ ...prev, [d.id]: e.target.value }))
                              }
                            />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === "bank" && (
              <div className="space-y-4">
                <h2 className="text-xl font-extrabold text-neutral-900">Bank details</h2>
                <input
                  className={inputClass}
                  placeholder="Account holder name"
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                />
                <input
                  className={inputClass}
                  placeholder="Account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    className={inputClass}
                    placeholder="IFSC code"
                    value={ifsc}
                    onChange={(e) => setIfsc(e.target.value.toUpperCase())}
                  />
                  <input
                    className={inputClass}
                    placeholder="Bank name"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                </div>
                <input
                  className={inputClass}
                  placeholder="UPI ID (optional)"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />

                <label className="flex items-start gap-2 text-sm text-neutral-600">
                  <input
                    type="checkbox"
                    className="mt-0.5"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                  />
                  I agree to Bogie&apos;s driver partner terms and conditions.
                </label>
                <label className="flex items-start gap-2 text-sm text-neutral-600">
                  <input
                    type="checkbox"
                    className="mt-0.5"
                    checked={agreedMvag}
                    onChange={(e) => setAgreedMvag(e.target.checked)}
                  />
                  I declare that the vehicle and documents provided comply with Motor Vehicle
                  Aggregator Guidelines (MVAG).
                </label>
              </div>
            )}

            {step === "success" && (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
                  <CheckCircle2 size={30} />
                </div>
                <h2 className="text-xl font-extrabold text-neutral-900">
                  Registration submitted!
                </h2>
                <p className="max-w-sm text-sm leading-6 text-neutral-600">
                  Your account and documents are under review. Verification typically takes
                  24–48 hours.
                  {uploadStatus.failed > 0 && (
                    <>
                      {" "}
                      {uploadStatus.uploaded} document(s) uploaded, {uploadStatus.failed} failed —
                      you can re-upload these once your account is verified.
                    </>
                  )}
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-dark"
                >
                  Done
                </button>
              </div>
            )}

            {error && step !== "success" && (
              <p className="mt-4 text-sm font-medium text-red-600">{error}</p>
            )}

            {step !== "success" && (
              <div className="mt-6 flex items-center justify-between gap-3">
                {step !== "personal" ? (
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:border-primary hover:text-primary"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>
                ) : (
                  <span />
                )}

                {step === "bank" ? (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark disabled:opacity-60"
                  >
                    {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
                    {submitting ? "Submitting…" : "Submit application"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark"
                  >
                    Next
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
