"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bike,
  Car,
  CarFront,
  CarTaxiFront,
  Loader2,
  ArrowLeft,
  ArrowRight,
  MapPin,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import LocationAutocomplete, {
  type SelectedLocation,
} from "../../components/LocationAutocomplete";
import { useAuth } from "../../lib/AuthContext";
import {
  apiRiderProfile,
  getRoute,
  createBooking,
  type ServiceType,
} from "../../lib/api";

const VEHICLE_ICONS: Record<string, LucideIcon> = {
  cab_2w: Bike,
  cab_3w: CarTaxiFront,
  cab_4w: Car,
  cab_4w_suv: CarFront,
};

type Step = "location" | "vehicle" | "review";

type VehicleOption = {
  id: string;
  slug: string;
  name: string;
  capacity: number;
  fare: number;
};

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
  const steps: Step[] = ["location", "vehicle", "review"];
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
              className={`h-0.5 w-8 transition-colors ${
                steps.indexOf(step) > i ? "bg-primary" : "bg-neutral-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function CabBookingFlow({ services }: { services: ServiceType[] }) {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  const [step, setStep] = useState<Step>("location");
  const [pickup, setPickup] = useState<SelectedLocation | null>(null);
  const [drop, setDrop] = useState<SelectedLocation | null>(null);

  const [vehicles, setVehicles] = useState<VehicleOption[]>([]);
  const [distanceKm, setDistanceKm] = useState(0);
  const [durationMins, setDurationMins] = useState(0);
  const [routeApprox, setRouteApprox] = useState(false);
  const [loadingVehicles, setLoadingVehicles] = useState(false);
  const [vehicleError, setVehicleError] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const [booking, setBooking] = useState(false);
  const [bookingError, setBookingError] = useState("");

  // Auth gate — booking requires a logged-in rider.
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?redirect=/book/cab");
    }
  }, [authLoading, user, router]);

  // Fetch real route distance/duration once we enter the vehicle step.
  useEffect(() => {
    if (step !== "vehicle" || !pickup || !drop) return;

    let cancelled = false;
    setLoadingVehicles(true);
    setVehicleError("");

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
        // Route proxy degrades to 0 on failure — fall back to a straight-line
        // estimate so the flow still works, and flag it in the UI as approximate.
        km = haversineKm(pickup.lat, pickup.lng, drop.lat, drop.lng) * 1.3;
        approx = true;
      }

      if (cancelled) return;

      const rows: VehicleOption[] = services
        .map((s) => ({
          id: s.id,
          slug: s.slug,
          name: s.name,
          capacity: s.capacity,
          fare: Math.round((s.base_fare || 0) + km * (s.per_km_rate || 0)),
        }))
        .sort((a, b) => a.fare - b.fare);

      setDistanceKm(Math.round(km * 10) / 10);
      setDurationMins(mins);
      setRouteApprox(approx);
      setVehicles(rows);
      setSelectedId(rows[0]?.id || "");
      setLoadingVehicles(false);
    })().catch(() => {
      if (!cancelled) {
        setVehicleError("Couldn't load vehicle pricing. Please try again.");
        setLoadingVehicles(false);
      }
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const selected = vehicles.find((v) => v.id === selectedId) || null;

  async function handleConfirm() {
    if (!pickup || !drop || !selected) return;
    setBooking(true);
    setBookingError("");

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.replace("/login?redirect=/book/cab");
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

      const res = await createBooking(token, {
        rider_id: riderId,
        service_type_id: selected.id,
        pickup_lat: pickup.lat,
        pickup_lng: pickup.lng,
        pickup_address: pickup.description,
        drop_lat: drop.lat,
        drop_lng: drop.lng,
        drop_address: drop.description,
        estimated_fare: selected.fare,
        distance_km: distanceKm,
        source: "website",
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

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-2 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary-dark">
          Book a Cab
        </span>
      </div>
      <h1 className="mb-8 text-center text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
        {step === "location" && "Where are you headed?"}
        {step === "vehicle" && "Choose your ride"}
        {step === "review" && "Review & confirm"}
      </h1>

      <StepDots step={step} />

      {/* ── Step 1: Location ─────────────────────────────────────────── */}
      {step === "location" && (
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 sm:p-8">
          <div className="flex flex-col gap-4">
            <LocationAutocomplete
              label="Pickup location"
              placeholder="Enter pickup address"
              onSelect={setPickup}
            />
            <LocationAutocomplete
              label="Drop location"
              placeholder="Enter drop address"
              onSelect={setDrop}
            />
          </div>

          <button
            type="button"
            disabled={!pickup || !drop}
            onClick={() => setStep("vehicle")}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
          >
            Choose vehicle
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ── Step 2: Vehicle selection ────────────────────────────────── */}
      {step === "vehicle" && (
        <div>
          <button
            type="button"
            onClick={() => setStep("location")}
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-primary"
          >
            <ArrowLeft size={15} />
            Change locations
          </button>

          <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-neutral-100">
            <div className="flex items-start gap-2.5 text-sm text-neutral-700">
              <MapPin size={15} className="mt-0.5 shrink-0 text-emerald-500" />
              <span className="truncate">{pickup?.description}</span>
            </div>
            <div className="my-1.5 ml-[7px] h-3 w-px bg-neutral-200" />
            <div className="flex items-start gap-2.5 text-sm text-neutral-700">
              <MapPin size={15} className="mt-0.5 shrink-0 text-primary" />
              <span className="truncate">{drop?.description}</span>
            </div>
            {distanceKm > 0 && (
              <p className="mt-3 text-xs text-neutral-500">
                ~{distanceKm} km{durationMins > 0 ? ` · ${durationMins} min` : ""}
                {routeApprox ? " (approximate)" : ""}
              </p>
            )}
          </div>

          {loadingVehicles ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={26} className="animate-spin text-primary" />
            </div>
          ) : vehicleError ? (
            <p className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600">
              {vehicleError}
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {vehicles.map((v) => {
                const Icon = VEHICLE_ICONS[v.slug] || Car;
                const isSel = v.id === selectedId;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedId(v.id)}
                    className={`flex items-center gap-4 rounded-2xl border-2 bg-white p-4 text-left transition-colors ${
                      isSel
                        ? "border-primary bg-primary-light"
                        : "border-transparent ring-1 ring-neutral-100 hover:border-neutral-200"
                    }`}
                  >
                    <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-primary ring-1 ring-neutral-100">
                      <Icon size={22} />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-neutral-900">{v.name}</p>
                      <p className="text-xs text-neutral-500">Seats {v.capacity}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <p className="text-lg font-extrabold text-neutral-900">₹{v.fare}</p>
                      {isSel && <CheckCircle2 size={18} className="text-primary" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          <button
            type="button"
            disabled={!selected || loadingVehicles}
            onClick={() => setStep("review")}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
          >
            {selected ? `Review · ₹${selected.fare}` : "Select a vehicle"}
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ── Step 3: Review & confirm ─────────────────────────────────── */}
      {step === "review" && selected && (
        <div>
          <button
            type="button"
            onClick={() => setStep("vehicle")}
            disabled={booking}
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-primary disabled:opacity-40"
          >
            <ArrowLeft size={15} />
            Change vehicle
          </button>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 sm:p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-primary">
              Route
            </p>
            <div className="flex items-start gap-2.5 text-sm text-neutral-700">
              <MapPin size={15} className="mt-0.5 shrink-0 text-emerald-500" />
              <span>{pickup?.description}</span>
            </div>
            <div className="my-1.5 ml-[7px] h-3 w-px bg-neutral-200" />
            <div className="flex items-start gap-2.5 text-sm text-neutral-700">
              <MapPin size={15} className="mt-0.5 shrink-0 text-primary" />
              <span>{drop?.description}</span>
            </div>

            <div className="my-6 h-px bg-neutral-100" />

            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-primary">
              Fare breakdown
            </p>
            <div className="flex items-center justify-between py-1.5 text-sm">
              <span className="text-neutral-600">
                {selected.name} · {distanceKm} km
              </span>
              <span className="font-semibold text-neutral-900">₹{selected.fare}</span>
            </div>

            <div className="my-4 h-px bg-neutral-100" />

            <div className="flex items-center justify-between">
              <span className="text-base font-extrabold text-neutral-900">Total</span>
              <span className="text-2xl font-extrabold text-primary">₹{selected.fare}</span>
            </div>

            <p className="mt-4 text-center text-xs text-neutral-400">
              Cash payable to the driver at the end of your ride.
            </p>
          </div>

          {bookingError && (
            <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600">
              {bookingError}
            </p>
          )}

          <button
            type="button"
            disabled={booking}
            onClick={handleConfirm}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
          >
            {booking ? (
              <>
                Booking your ride...
                <Loader2 size={16} className="animate-spin" />
              </>
            ) : (
              <>Confirm booking · ₹{selected.fare}</>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
