"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Ambulance,
  Loader2,
  ArrowLeft,
  ArrowRight,
  MapPin,
  CheckCircle2,
  User,
  Phone,
  Siren,
  Building2,
  Flower2,
  HeartPulse,
  Activity,
  HandHeart,
  BadgeCheck,
  Hospital,
  type LucideIcon,
} from "lucide-react";
import LocationAutocomplete, {
  type SelectedLocation,
} from "../../components/LocationAutocomplete";
import { useAuth } from "../../lib/AuthContext";
import {
  apiRiderProfile,
  getRoute,
  getNearbyHospitals,
  createBooking,
  type ServiceType,
  type NearbyHospital,
} from "../../lib/api";

type Step = "type" | "purpose" | "location" | "patient" | "review";
type Purpose = "" | "patient_transfer" | "emergency" | "dead_body";
type SubType = "" | "bls" | "als";

const MED_NOTES_MAX = 300;

const PURPOSES: {
  key: Exclude<Purpose, "">;
  icon: LucideIcon;
  label: string;
  sub: string;
}[] = [
  {
    key: "patient_transfer",
    icon: Building2,
    label: "Patient Transfer",
    sub: "Shifting a patient between hospitals or home",
  },
  {
    key: "emergency",
    icon: Siren,
    label: "Emergency",
    sub: "Immediate medical response needed",
  },
  {
    key: "dead_body",
    icon: Flower2,
    label: "Dead Body Transfer",
    sub: "Respectful transfer of the deceased",
  },
];

const PURPOSE_LABELS: Record<string, string> = {
  patient_transfer: "Patient Transfer",
  emergency: "Emergency",
  dead_body: "Dead Body Transfer",
};

const SUB_TYPES: {
  key: Exclude<SubType, "">;
  icon: LucideIcon;
  name: string;
  desc: string;
}[] = [
  {
    key: "bls",
    icon: HeartPulse,
    name: "Basic Life Support (BLS)",
    desc: "Oxygen, paramedic, first aid",
  },
  {
    key: "als",
    icon: Activity,
    name: "Advanced Life Support (ALS)",
    desc: "ICU on wheels, ventilator, doctor",
  },
];

const BOOKING_RULES = [
  "Ambulance will arrive within 15–30 minutes depending on traffic.",
  "For dead body transfer, proper documentation may be required.",
  "Free/NGO ambulance requests are confirmed by our team by phone — the standard fare shown applies until then.",
  "In case of emergency, also call 108 (National Ambulance Service).",
  "Bogie charges ZERO commission on ambulance services.",
];

function haversineKm(aLat: number, aLng: number, bLat: number, bLng: number) {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLng = ((bLng - aLng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((aLat * Math.PI) / 180) *
      Math.cos((bLat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function StepDots({ step }: { step: Step }) {
  const steps: Step[] = ["type", "purpose", "location", "patient", "review"];
  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full transition-colors ${
              steps.indexOf(step) >= i ? "bg-primary" : "bg-neutral-200"
            }`}
          />
          {i < steps.length - 1 && (
            <div
              className={`h-0.5 w-6 transition-colors ${
                steps.indexOf(step) > i ? "bg-primary" : "bg-neutral-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// Same acknowledgement the mobile app shows before a dead-body booking.
function DeadBodyModal({
  open,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dead-body-modal-title"
    >
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-xl">
        <Flower2 size={40} className="mx-auto text-neutral-500" />
        <h2
          id="dead-body-modal-title"
          className="mt-3 text-lg font-bold text-neutral-800"
        >
          Respectful Transfer Service
        </h2>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-neutral-600">
          We offer respectful and dignified transfer services. Our trained staff
          will handle the deceased with utmost care and sensitivity.
          {"\n\n"}
          Proper documentation (death certificate) may be required at pickup and
          drop locations.
        </p>
        <button
          type="button"
          onClick={onConfirm}
          className="mt-5 w-full rounded-2xl bg-neutral-700 py-3.5 text-sm font-bold text-white transition-colors hover:bg-neutral-800"
        >
          I Understand, Proceed
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="mt-2 w-full py-2.5 text-sm text-neutral-500 hover:text-neutral-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-4 border-b border-neutral-100 py-2.5 text-sm last:border-b-0">
      <span className="shrink-0 text-neutral-500">{label}</span>
      <span className="text-right font-semibold text-neutral-900">{value}</span>
    </div>
  );
}

export default function AmbulanceBookingFlow({
  services,
}: {
  services: ServiceType[];
}) {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  const [step, setStep] = useState<Step>("type");

  const [isFree, setIsFree] = useState<boolean | null>(null);

  const [purpose, setPurpose] = useState<Purpose>("");
  const [subType, setSubType] = useState<SubType>("");
  const [deadBodyModal, setDeadBodyModal] = useState(false);

  const [pickup, setPickup] = useState<SelectedLocation | null>(null);
  const [drop, setDrop] = useState<SelectedLocation | null>(null);
  const [hospitals, setHospitals] = useState<NearbyHospital[]>([]);
  const [hospitalsLoading, setHospitalsLoading] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<NearbyHospital | null>(null);

  const [patientName, setPatientName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [sameAsMe, setSameAsMe] = useState(false);
  const [medNotes, setMedNotes] = useState("");

  const [distanceKm, setDistanceKm] = useState(0);
  const [durationMins, setDurationMins] = useState(0);
  const [routeApprox, setRouteApprox] = useState(false);
  const [fareLoading, setFareLoading] = useState(false);

  const [rulesOpen, setRulesOpen] = useState(false);
  const [booking, setBooking] = useState(false);
  const [bookingError, setBookingError] = useState("");

  // Auth gate — booking requires a logged-in rider.
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?redirect=/book/ambulance");
    }
  }, [authLoading, user, router]);

  const myPhone = (user?.phone || "").replace(/\D/g, "").slice(-10);
  const isEmergency = purpose === "emergency";
  const needsSubType = purpose === "patient_transfer" || purpose === "emergency";

  // BLS/ALS drive pricing for transfers and emergencies; dead-body transfers
  // always go on the patient-transport vehicle.
  const service: ServiceType | null =
    purpose === "dead_body"
      ? services.find((s) => s.slug === "ambulance_transport") || services[0] || null
      : subType === "als"
        ? services.find((s) => s.slug === "ambulance_als") || services[0] || null
        : services.find((s) => s.slug === "ambulance_bls") || services[0] || null;

  function selectPurpose(key: Exclude<Purpose, "">) {
    if (key === "dead_body") {
      setDeadBodyModal(true);
    } else {
      setPurpose(key);
    }
  }

  function confirmDeadBody() {
    setPurpose("dead_body");
    setSubType("");
    setDeadBodyModal(false);
  }

  function toggleSameAsMe() {
    if (sameAsMe) {
      setSameAsMe(false);
      setContactPhone("");
    } else {
      setSameAsMe(true);
      setContactPhone(myPhone);
    }
  }

  function handlePhoneChange(v: string) {
    const cleaned = v.replace(/\D/g, "").slice(0, 10);
    setContactPhone(cleaned);
    if (sameAsMe && cleaned !== myPhone) setSameAsMe(false);
  }

  // Nearby hospitals become drop suggestions once we know the pickup point.
  useEffect(() => {
    if (!pickup) return;
    let cancelled = false;
    setHospitalsLoading(true);
    getNearbyHospitals(pickup.lat, pickup.lng)
      .then((results) => {
        if (!cancelled) setHospitals(results.slice(0, 5));
      })
      .catch(() => {
        if (!cancelled) setHospitals([]);
      })
      .finally(() => {
        if (!cancelled) setHospitalsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [pickup]);

  function selectDropHospital(h: NearbyHospital) {
    setDrop({
      description: h.address ? `${h.name}, ${h.address}` : h.name,
      lat: h.latitude,
      lng: h.longitude,
    });
    setSelectedHospital(h);
  }

  function selectDropPlace(loc: SelectedLocation) {
    setDrop(loc);
    setSelectedHospital(null);
  }

  // Real route distance → fare, recomputed on every entry to review.
  useEffect(() => {
    if (step !== "review" || !pickup || !drop) return;

    let cancelled = false;
    setFareLoading(true);

    (async () => {
      const token = localStorage.getItem("access_token");
      let km = 0;
      let mins = 0;
      let approx = false;

      if (token) {
        const route = await getRoute(
          token,
          { lat: pickup.lat, lng: pickup.lng },
          { lat: drop.lat, lng: drop.lng }
        );
        km = route.distance_km;
        mins = route.duration_mins;
      }

      if (!km) {
        km = haversineKm(pickup.lat, pickup.lng, drop.lat, drop.lng) * 1.3;
        approx = true;
      }

      if (cancelled) return;
      setDistanceKm(Math.round(km * 10) / 10);
      setDurationMins(mins);
      setRouteApprox(approx);
      setFareLoading(false);
    })().catch(() => {
      if (!cancelled) setFareLoading(false);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const baseFare = service?.base_fare || 0;
  const perKm = service?.per_km_rate || 0;
  const distCharge = Math.round(distanceKm * perKm);
  // Every ambulance booking is created as a normal paid booking — a "Free"
  // request doesn't zero the fare client-side. Our team confirms NGO/
  // government coverage after booking and waives the fare on the backend
  // if eligible; the rider sees and is charged the real fare until then.
  const totalFare = Math.round(baseFare + distCharge);

  const purposeValid = purpose !== "" && (!needsSubType || subType !== "");
  const patientValid = patientName.trim().length > 0 && contactPhone.length === 10;

  function changeLocations() {
    setStep("location");
    setDistanceKm(0);
    setDurationMins(0);
  }

  async function handleConfirm() {
    if (!pickup || !drop || !service || !purposeValid || !patientValid) return;
    setBooking(true);
    setBookingError("");

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.replace("/login?redirect=/book/ambulance");
        return;
      }

      let riderId = user?.rider_id || "";
      if (!riderId) {
        const profile = await apiRiderProfile(token);
        riderId = profile.rider_id;
      }
      if (!riderId) {
        setBookingError("Couldn't identify your rider account. Please log in again.");
        setBooking(false);
        return;
      }

      // The backend always creates ambulance bookings as paid and ignores
      // any client-sent free/NGO flag (see waive-ambulance-fare). We fold the
      // rider's free/NGO request into medical_notes — the one free-text field
      // that reaches staff — so it isn't silently lost.
      const notes = [
        isFree ? "Requested: Free/NGO ambulance (pending team confirmation)" : null,
        medNotes.trim() || null,
      ]
        .filter(Boolean)
        .join(" — ");

      const res = await createBooking(token, {
        rider_id: riderId,
        service_type_id: service.id,
        pickup_lat: pickup.lat,
        pickup_lng: pickup.lng,
        pickup_address: pickup.description,
        drop_lat: drop.lat,
        drop_lng: drop.lng,
        drop_address: drop.description,
        estimated_fare: totalFare,
        distance_km: distanceKm,
        source: "website",
        hospital_id: selectedHospital?.id || null,
        hospital_name: selectedHospital?.name || null,
        ambulance_sub_type: subType || null,
        purpose_type: purpose,
        patient_name: patientName.trim(),
        contact_phone: contactPhone,
        medical_notes: notes || null,
        promo_code: null,
      });

      router.push(`/book/track/${res.booking_id}`);
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : "Booking failed. Please try again.");
      setBooking(false);
    }
  }

  if (authLoading || !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 size={28} className="animate-spin text-primary" />
      </div>
    );
  }

  const primaryBtn =
    "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100";
  const backBtn =
    "mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-primary disabled:opacity-40";

  return (
    <div className="mx-auto max-w-2xl">
      <DeadBodyModal
        open={deadBodyModal}
        onConfirm={confirmDeadBody}
        onCancel={() => setDeadBodyModal(false)}
      />

      <div className="mb-2 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary-dark">
          Book an Ambulance
        </span>
      </div>
      <h1 className="mb-8 text-center text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
        {step === "type" && "Which ambulance service?"}
        {step === "purpose" && "What do you need it for?"}
        {step === "location" && "Pickup & drop location"}
        {step === "patient" && "Patient & contact details"}
        {step === "review" && "Review & confirm"}
      </h1>

      <StepDots step={step} />

      {/* ── Step 1: Free vs Paid ─────────────────────────────────────── */}
      {step === "type" && (
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 sm:p-8">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setIsFree(false)}
              className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-colors ${
                isFree === false
                  ? "border-primary bg-primary-light"
                  : "border-transparent ring-1 ring-neutral-100 hover:border-neutral-200"
              }`}
            >
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-primary ring-1 ring-neutral-100">
                <Ambulance size={22} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-neutral-900">Paid Ambulance</p>
                <p className="text-xs text-neutral-500">
                  BLS/ALS transport from partner hospitals. Pay the hospital
                  directly — Bogie charges zero commission.
                </p>
              </div>
              {isFree === false && (
                <CheckCircle2 size={18} className="shrink-0 text-primary" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsFree(true)}
              className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-colors ${
                isFree === true
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-transparent ring-1 ring-neutral-100 hover:border-neutral-200"
              }`}
            >
              <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 ring-1 ring-neutral-100">
                <HandHeart size={22} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-neutral-900">
                  Free Ambulance{" "}
                  <span className="ml-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                    NGO Request
                  </span>
                </p>
                <p className="text-xs text-neutral-500">
                  Request coverage via registered NGOs or government
                  resources. Subject to confirmation by our team — you&apos;ll
                  see the standard fare until it&apos;s approved.
                </p>
              </div>
              {isFree === true && (
                <CheckCircle2 size={18} className="shrink-0 text-emerald-500" />
              )}
            </button>
          </div>

          {isFree === true && (
            <p className="mt-4 rounded-2xl bg-amber-50 p-3.5 text-xs leading-relaxed text-amber-700">
              This is a request, not a guarantee. You&apos;ll see and be
              charged the standard fare unless our team confirms NGO/
              government coverage and waives it — we&apos;ll call you to
              confirm. For life-threatening emergencies, always call{" "}
              <a href="tel:108" className="font-bold underline">
                108
              </a>{" "}
              first.
            </p>
          )}

          <button
            type="button"
            disabled={isFree === null}
            onClick={() => setStep("purpose")}
            className={primaryBtn}
          >
            Purpose of ambulance
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ── Step 2: Purpose + BLS/ALS ────────────────────────────────── */}
      {step === "purpose" && (
        <div>
          <button type="button" onClick={() => setStep("type")} className={backBtn}>
            <ArrowLeft size={15} />
            Service type
          </button>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 sm:p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-primary">
              Purpose of ambulance
            </p>
            <div className="flex flex-col gap-3">
              {PURPOSES.map(({ key, icon: Icon, label, sub }) => {
                const isSel = purpose === key;
                const emergencySel = isSel && key === "emergency";
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => selectPurpose(key)}
                    className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-colors ${
                      emergencySel
                        ? "border-red-500 bg-red-50"
                        : isSel
                          ? "border-primary bg-primary-light"
                          : "border-transparent ring-1 ring-neutral-100 hover:border-neutral-200"
                    }`}
                  >
                    <div
                      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white ring-1 ring-neutral-100 ${
                        key === "emergency"
                          ? "text-red-500"
                          : key === "dead_body"
                            ? "text-neutral-500"
                            : "text-primary"
                      }`}
                    >
                      <Icon size={22} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-neutral-900">{label}</p>
                      <p className="text-xs text-neutral-500">{sub}</p>
                    </div>
                    {isSel && (
                      <CheckCircle2
                        size={18}
                        className={`shrink-0 ${emergencySel ? "text-red-500" : "text-primary"}`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {isEmergency && (
              <div className="mt-4 rounded-2xl border-2 border-red-500 bg-red-50 p-3.5 text-center">
                <p className="text-sm font-bold text-red-600">
                  EMERGENCY MODE — Priority dispatch activated
                </p>
                <p className="mt-1 text-xs text-red-600/80">
                  For life-threatening emergencies, also call{" "}
                  <a href="tel:108" className="font-bold underline">
                    108
                  </a>{" "}
                  (National Ambulance Service).
                </p>
              </div>
            )}

            {needsSubType && (
              <>
                <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-wide text-primary">
                  Ambulance type — required
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {SUB_TYPES.map(({ key, icon: Icon, name, desc }) => {
                    const isSel = subType === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSubType(key)}
                        className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 p-4 text-center transition-colors ${
                          isSel
                            ? "border-primary bg-primary-light"
                            : "border-transparent ring-1 ring-neutral-100 hover:border-neutral-200"
                        }`}
                      >
                        <Icon
                          size={22}
                          className={isSel ? "text-primary" : "text-neutral-400"}
                        />
                        <p className="text-sm font-bold text-neutral-900">{name}</p>
                        <p className="text-xs text-neutral-500">{desc}</p>
                        {isSel && <CheckCircle2 size={16} className="text-primary" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            <button
              type="button"
              disabled={!purposeValid}
              onClick={() => setStep("location")}
              className={primaryBtn}
            >
              Pickup & drop
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Pickup + drop (nearby hospitals as suggestions) ──── */}
      {step === "location" && (
        <div>
          <button type="button" onClick={() => setStep("purpose")} className={backBtn}>
            <ArrowLeft size={15} />
            Purpose
          </button>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 sm:p-8">
            <div className="flex flex-col gap-4">
              <LocationAutocomplete
                label="Pickup location"
                placeholder="Where should the ambulance come?"
                onSelect={(loc) => {
                  setPickup(loc);
                  setSelectedHospital(null);
                }}
              />
              <LocationAutocomplete
                label="Drop location"
                placeholder="Search a hospital or any address"
                onSelect={selectDropPlace}
              />
            </div>

            {pickup && (
              <div className="mt-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Nearby hospitals
                </p>
                {hospitalsLoading ? (
                  <div className="flex items-center gap-2 py-3 text-sm text-neutral-400">
                    <Loader2 size={15} className="animate-spin" />
                    Finding hospitals near your pickup…
                  </div>
                ) : hospitals.length === 0 ? (
                  <p className="py-2 text-sm text-neutral-400">
                    No partner hospitals found near your pickup. Use the drop
                    search above instead.
                  </p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {hospitals.map((h) => {
                      const isSel = selectedHospital?.id === h.id;
                      return (
                        <button
                          key={h.id}
                          type="button"
                          onClick={() => selectDropHospital(h)}
                          className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition-colors ${
                            isSel
                              ? "border-primary bg-primary-light"
                              : "border-transparent ring-1 ring-neutral-100 hover:border-neutral-200"
                          }`}
                        >
                          <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <Hospital size={18} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="flex items-center gap-1.5 truncate text-sm font-bold text-neutral-900">
                              {h.name}
                              {h.is_verified && (
                                <BadgeCheck size={14} className="shrink-0 text-emerald-500" />
                              )}
                            </p>
                            <p className="truncate text-xs text-neutral-500">
                              {h.distance_km > 0 ? `${h.distance_km} km · ` : ""}
                              {h.area || h.address}
                            </p>
                          </div>
                          {isSel && (
                            <CheckCircle2 size={16} className="shrink-0 text-primary" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {drop && (
              <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-neutral-50 p-3.5 text-sm text-neutral-700">
                <MapPin size={15} className="mt-0.5 shrink-0 text-primary" />
                <span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                    Drop:{" "}
                  </span>
                  {drop.description}
                </span>
              </div>
            )}

            <button
              type="button"
              disabled={!pickup || !drop}
              onClick={() => setStep("patient")}
              className={primaryBtn}
            >
              Patient details
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 4: Patient / contact / medical notes ────────────────── */}
      {step === "patient" && (
        <div>
          <button type="button" onClick={changeLocations} className={backBtn}>
            <ArrowLeft size={15} />
            Change locations
          </button>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 sm:p-8">
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="patient-name"
                  className="mb-1.5 block text-sm font-medium text-neutral-700"
                >
                  Patient name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                  <input
                    id="patient-name"
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder={
                      purpose === "dead_body" ? "Name of the deceased" : "Who is the patient?"
                    }
                    className="w-full rounded-2xl border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="mb-1.5 block text-sm font-medium text-neutral-700"
                >
                  Contact phone
                </label>
                <div className="relative">
                  <Phone
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                  <input
                    id="contact-phone"
                    type="tel"
                    inputMode="numeric"
                    value={contactPhone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full rounded-2xl border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                {contactPhone.length > 0 && contactPhone.length < 10 && (
                  <p className="mt-1.5 text-xs text-amber-600">
                    Enter a 10-digit mobile number.
                  </p>
                )}
              </div>

              {myPhone.length === 10 && (
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={sameAsMe}
                    onChange={toggleSameAsMe}
                    className="h-4 w-4 rounded border-neutral-300 accent-[var(--color-primary,#e11d48)]"
                  />
                  <span className="text-sm text-neutral-700">
                    Use my number ({myPhone})
                  </span>
                </label>
              )}

              <div>
                <label
                  htmlFor="medical-notes"
                  className="mb-1.5 block text-sm font-medium text-neutral-700"
                >
                  Medical notes <span className="text-neutral-400">(optional)</span>
                </label>
                <textarea
                  id="medical-notes"
                  value={medNotes}
                  onChange={(e) => setMedNotes(e.target.value.slice(0, MED_NOTES_MAX))}
                  maxLength={MED_NOTES_MAX}
                  rows={4}
                  placeholder="Any special requirements, medical conditions, oxygen need, wheelchair, etc."
                  className="w-full resize-none rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <p className="mt-1 text-right text-xs text-neutral-400">
                  {medNotes.length}/{MED_NOTES_MAX}
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={!patientValid}
              onClick={() => setStep("review")}
              className={primaryBtn}
            >
              Review booking
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 5: Review & confirm ─────────────────────────────────── */}
      {step === "review" && service && (
        <div>
          <button
            type="button"
            onClick={() => setStep("patient")}
            disabled={booking}
            className={backBtn}
          >
            <ArrowLeft size={15} />
            Patient details
          </button>

          <div className="mb-4 rounded-2xl bg-emerald-50 p-3.5 text-center text-sm font-semibold text-emerald-800 ring-1 ring-emerald-200">
            Zero platform commission on ambulance services
          </div>

          {isEmergency && (
            <div className="mb-4 rounded-2xl border border-red-300 bg-red-50 p-4 text-sm font-semibold leading-relaxed text-red-600">
              This is an emergency booking. We will dispatch the nearest
              available ambulance immediately. For life-threatening emergencies,
              also call{" "}
              <a href="tel:108" className="font-bold underline">
                108
              </a>
              .
            </div>
          )}

          {isFree && (
            <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-700">
              You&apos;ve requested a free/NGO ambulance. This isn&apos;t
              guaranteed yet — the fare below applies unless our team
              confirms NGO/government coverage and waives it. We&apos;ll call
              you to confirm.
            </div>
          )}

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 sm:p-8">
            {!isFree && selectedHospital && (
              <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Selected hospital
                </p>
                <p className="mt-1 flex items-center gap-1.5 font-bold text-neutral-900">
                  {selectedHospital.name}
                  {selectedHospital.is_verified && (
                    <BadgeCheck size={15} className="text-emerald-500" />
                  )}
                </p>
                {selectedHospital.phone && (
                  <p className="mt-0.5 text-sm text-neutral-600">
                    {selectedHospital.phone}
                  </p>
                )}
              </div>
            )}

            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">
              Booking summary
            </p>
            <SummaryRow
              label="Type"
              value={
                isFree
                  ? "Free Ambulance (Requested — pending confirmation)"
                  : "Paid Ambulance"
              }
            />
            <SummaryRow label="Purpose" value={PURPOSE_LABELS[purpose] || ""} />
            {subType && (
              <SummaryRow
                label="Ambulance type"
                value={
                  subType === "bls"
                    ? "Basic Life Support (BLS)"
                    : "Advanced Life Support (ALS)"
                }
              />
            )}
            <SummaryRow label="Pickup" value={pickup?.description || ""} />
            <SummaryRow label="Drop" value={drop?.description || ""} />
            <SummaryRow label="Patient" value={patientName.trim()} />
            <SummaryRow label="Contact" value={contactPhone} />
            {medNotes.trim() && <SummaryRow label="Notes" value={medNotes.trim()} />}

            <div className="my-6 h-px bg-neutral-100" />

            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-primary">
              Charges
            </p>
            {fareLoading ? (
              <div className="flex items-center gap-2 py-3 text-sm text-neutral-400">
                <Loader2 size={15} className="animate-spin" />
                Calculating fare…
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between py-1.5 text-sm">
                  <span className="text-neutral-600">
                    Base fare · {service.name}
                  </span>
                  <span className="font-semibold text-neutral-900">₹{Math.round(baseFare)}</span>
                </div>
                {distanceKm > 0 && (
                  <div className="flex items-center justify-between py-1.5 text-sm">
                    <span className="text-neutral-600">
                      Distance · {distanceKm} km
                      {durationMins > 0 ? ` · ${durationMins} min` : ""}
                      {routeApprox ? " (approximate)" : ""}
                    </span>
                    <span className="font-semibold text-neutral-900">₹{distCharge}</span>
                  </div>
                )}
                <div className="flex items-center justify-between py-1.5 text-sm">
                  <span className="text-neutral-600">Platform commission</span>
                  <span className="font-semibold text-emerald-600">₹0</span>
                </div>
                <div className="my-4 h-px bg-neutral-100" />
                <div className="flex items-center justify-between">
                  <span className="text-base font-extrabold text-neutral-900">Total</span>
                  <span className="text-2xl font-extrabold text-primary">~₹{totalFare}</span>
                </div>
                {isFree ? (
                  <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-xs leading-relaxed text-emerald-800">
                    If our team confirms NGO/government coverage, this fare
                    will be waived and you&apos;ll be notified — no action
                    needed from you. Until then, the fare above applies.
                  </p>
                ) : (
                  <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-xs leading-relaxed text-emerald-800">
                    Payment is made directly to{" "}
                    {selectedHospital?.name || "the ambulance provider"}. Bogie
                    charges zero commission on ambulance services.
                  </p>
                )}
              </>
            )}

            <button
              type="button"
              onClick={() => setRulesOpen((v) => !v)}
              className="mt-5 flex w-full items-center justify-between rounded-2xl bg-primary-light px-4 py-3 text-sm font-semibold text-primary-dark"
            >
              Read before booking
              <span className="text-xs">{rulesOpen ? "▲" : "▼"}</span>
            </button>
            {rulesOpen && (
              <ul className="mt-2 flex flex-col gap-2 rounded-2xl bg-primary-light/50 p-4">
                {BOOKING_RULES.map((rule) => (
                  <li key={rule} className="flex gap-2 text-xs leading-relaxed text-neutral-600">
                    <span className="text-primary">•</span>
                    {rule}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {bookingError && (
            <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600">
              {bookingError}
            </p>
          )}

          <button
            type="button"
            disabled={booking || fareLoading}
            onClick={handleConfirm}
            className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold text-white shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 ${
              isFree
                ? "bg-emerald-500 hover:bg-emerald-600"
                : isEmergency
                  ? "animate-pulse bg-red-600 hover:bg-red-700"
                  : "bg-primary hover:bg-primary-dark"
            }`}
          >
            {booking ? (
              <>
                Requesting your ambulance...
                <Loader2 size={16} className="animate-spin" />
              </>
            ) : isFree ? (
              <>Request Free Ambulance · ~₹{totalFare}</>
            ) : isEmergency ? (
              <>EMERGENCY REQUEST · ~₹{totalFare}</>
            ) : (
              <>
                Book {selectedHospital ? selectedHospital.name : "ambulance"} · ~₹
                {totalFare}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
