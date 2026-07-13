"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Truck,
  Container,
  Loader2,
  ArrowLeft,
  ArrowRight,
  MapPin,
  CheckCircle2,
  User,
  Phone,
  PackageOpen,
  PackageCheck,
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
  truck_city_tata_ace: Truck,
  truck_city_14ft: Truck,
  truck_city_open: Truck,
  truck_city_container: Container,
  truck_os_14ft: Truck,
  truck_os_20ft: Truck,
  truck_os_container: Container,
  truck_os_trailer: Container,
};

const ADDON_PRICE = 200;

type Step = "location" | "receiver" | "vehicle" | "addons" | "review";

type VehicleOption = {
  id: string;
  slug: string;
  name: string;
  scope: string;
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
  const steps: Step[] = ["location", "receiver", "vehicle", "addons", "review"];
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

function VehicleGroup({
  title,
  options,
  selectedId,
  onSelect,
}: {
  title: string;
  options: VehicleOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  if (options.length === 0) return null;
  return (
    <div>
      <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide text-neutral-500 first:mt-0">
        {title}
      </p>
      <div className="flex flex-col gap-3">
        {options.map((v) => {
          const Icon = VEHICLE_ICONS[v.slug] || Truck;
          const isSel = v.id === selectedId;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelect(v.id)}
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
                <p className="text-xs text-neutral-500">
                  {v.capacity > 0 ? `Up to ${v.capacity} ton${v.capacity > 1 ? "s" : ""}` : "Goods transport"}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="text-lg font-extrabold text-neutral-900">₹{v.fare}</p>
                {isSel && <CheckCircle2 size={18} className="text-primary" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function TruckBookingFlow({ services }: { services: ServiceType[] }) {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  const [step, setStep] = useState<Step>("location");
  const [pickup, setPickup] = useState<SelectedLocation | null>(null);
  const [drop, setDrop] = useState<SelectedLocation | null>(null);

  const [receiverName, setReceiverName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [sameAsMe, setSameAsMe] = useState(false);

  const [vehicles, setVehicles] = useState<VehicleOption[]>([]);
  const [distanceKm, setDistanceKm] = useState(0);
  const [durationMins, setDurationMins] = useState(0);
  const [routeApprox, setRouteApprox] = useState(false);
  const [loadingVehicles, setLoadingVehicles] = useState(false);
  const [vehicleError, setVehicleError] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const [loadingService, setLoadingService] = useState(false);
  const [unloadingService, setUnloadingService] = useState(false);

  const [booking, setBooking] = useState(false);
  const [bookingError, setBookingError] = useState("");

  // Auth gate — booking requires a logged-in rider.
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login?redirect=/book/truck");
    }
  }, [authLoading, user, router]);

  const myPhone = (user?.phone || "").replace(/\D/g, "").slice(-10);

  function toggleSameAsMe() {
    if (sameAsMe) {
      setSameAsMe(false);
      setReceiverPhone("");
    } else {
      setSameAsMe(true);
      setReceiverPhone(myPhone);
    }
  }

  function handlePhoneChange(v: string) {
    const cleaned = v.replace(/\D/g, "").slice(0, 10);
    setReceiverPhone(cleaned);
    if (sameAsMe && cleaned !== myPhone) setSameAsMe(false);
  }

  // Fetch real route distance/duration once we enter the vehicle step.
  useEffect(() => {
    if (step !== "vehicle" || !pickup || !drop) return;
    if (vehicles.length > 0) return; // already computed for these locations

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
          scope: s.scope,
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
        setVehicleError("Couldn't load truck pricing. Please try again.");
        setLoadingVehicles(false);
      }
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const selected = vehicles.find((v) => v.id === selectedId) || null;
  const cityOptions = vehicles.filter((v) => v.scope === "city");
  const outstationOptions = vehicles.filter((v) => v.scope === "outstation");

  const addonAmount =
    (loadingService ? ADDON_PRICE : 0) + (unloadingService ? ADDON_PRICE : 0);
  const totalFare = (selected?.fare || 0) + addonAmount;

  const receiverValid = receiverName.trim().length > 0 && receiverPhone.length === 10;

  function changeLocations() {
    setStep("location");
    // Locations may change — recompute route and fares next time.
    setVehicles([]);
    setSelectedId("");
    setDistanceKm(0);
    setDurationMins(0);
  }

  async function handleConfirm() {
    if (!pickup || !drop || !selected || !receiverValid) return;
    setBooking(true);
    setBookingError("");

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.replace("/login?redirect=/book/truck");
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
        estimated_fare: totalFare,
        distance_km: distanceKm,
        source: "website",
        receiver_name: receiverName.trim(),
        receiver_phone: receiverPhone,
        loading_addon: loadingService,
        unloading_addon: unloadingService,
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
      <div className="mb-2 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-xs font-semibold text-primary-dark">
          Book a Truck
        </span>
      </div>
      <h1 className="mb-8 text-center text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
        {step === "location" && "Where are the goods going?"}
        {step === "receiver" && "Who receives the goods?"}
        {step === "vehicle" && "Choose your truck"}
        {step === "addons" && "Need a hand with loading?"}
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
            onClick={() => setStep("receiver")}
            className={primaryBtn}
          >
            Receiver details
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ── Step 2: Receiver info ────────────────────────────────────── */}
      {step === "receiver" && (
        <div>
          <button type="button" onClick={changeLocations} className={backBtn}>
            <ArrowLeft size={15} />
            Change locations
          </button>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 sm:p-8">
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="receiver-name"
                  className="mb-1.5 block text-sm font-medium text-neutral-700"
                >
                  Receiver name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                  <input
                    id="receiver-name"
                    type="text"
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    placeholder="Who will receive the goods?"
                    className="w-full rounded-2xl border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="receiver-phone"
                  className="mb-1.5 block text-sm font-medium text-neutral-700"
                >
                  Receiver phone
                </label>
                <div className="relative">
                  <Phone
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
                  <input
                    id="receiver-phone"
                    type="tel"
                    inputMode="numeric"
                    value={receiverPhone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full rounded-2xl border border-neutral-200 bg-white py-3 pl-11 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                {receiverPhone.length > 0 && receiverPhone.length < 10 && (
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
            </div>

            <button
              type="button"
              disabled={!receiverValid}
              onClick={() => setStep("vehicle")}
              className={primaryBtn}
            >
              Choose truck
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── Step 3: Vehicle selection ────────────────────────────────── */}
      {step === "vehicle" && (
        <div>
          <button type="button" onClick={() => setStep("receiver")} className={backBtn}>
            <ArrowLeft size={15} />
            Receiver details
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
            <div className="flex flex-col">
              <VehicleGroup
                title="Within the city"
                options={cityOptions}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
              <VehicleGroup
                title="Outstation"
                options={outstationOptions}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            </div>
          )}

          <button
            type="button"
            disabled={!selected || loadingVehicles}
            onClick={() => setStep("addons")}
            className={primaryBtn}
          >
            {selected ? `Add-ons · ₹${selected.fare}` : "Select a truck"}
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ── Step 4: Add-ons ──────────────────────────────────────────── */}
      {step === "addons" && selected && (
        <div>
          <button type="button" onClick={() => setStep("vehicle")} className={backBtn}>
            <ArrowLeft size={15} />
            Change truck
          </button>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 sm:p-8">
            <div className="flex flex-col gap-3">
              {(
                [
                  {
                    key: "loading" as const,
                    icon: PackageOpen,
                    title: "Loading service",
                    sub: "Helpers load your goods at pickup",
                    on: loadingService,
                    toggle: () => setLoadingService((v) => !v),
                  },
                  {
                    key: "unloading" as const,
                    icon: PackageCheck,
                    title: "Unloading service",
                    sub: "Helpers unload your goods at drop",
                    on: unloadingService,
                    toggle: () => setUnloadingService((v) => !v),
                  },
                ]
              ).map(({ key, icon: Icon, title, sub, on, toggle }) => (
                <button
                  key={key}
                  type="button"
                  onClick={toggle}
                  aria-pressed={on}
                  className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-colors ${
                    on
                      ? "border-primary bg-primary-light"
                      : "border-transparent ring-1 ring-neutral-100 hover:border-neutral-200"
                  }`}
                >
                  <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-primary ring-1 ring-neutral-100">
                    <Icon size={22} />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-neutral-900">{title}</p>
                    <p className="text-xs text-neutral-500">{sub}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p className="text-sm font-extrabold text-neutral-900">+₹{ADDON_PRICE}</p>
                    {on && <CheckCircle2 size={18} className="text-primary" />}
                  </div>
                </button>
              ))}
            </div>

            <p className="mt-4 text-center text-xs text-neutral-400">
              Optional — skip if you&apos;ll handle loading yourself.
            </p>
          </div>

          <button type="button" onClick={() => setStep("review")} className={primaryBtn}>
            Review · ₹{totalFare}
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* ── Step 5: Review & confirm ─────────────────────────────────── */}
      {step === "review" && selected && (
        <div>
          <button
            type="button"
            onClick={() => setStep("addons")}
            disabled={booking}
            className={backBtn}
          >
            <ArrowLeft size={15} />
            Change add-ons
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
              Receiver
            </p>
            <div className="flex items-center gap-2.5 text-sm text-neutral-700">
              <User size={15} className="shrink-0 text-neutral-400" />
              <span className="font-medium text-neutral-900">{receiverName.trim()}</span>
            </div>
            <div className="mt-1.5 flex items-center gap-2.5 text-sm text-neutral-700">
              <Phone size={15} className="shrink-0 text-neutral-400" />
              <span>{receiverPhone}</span>
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
            {loadingService && (
              <div className="flex items-center justify-between py-1.5 text-sm">
                <span className="text-neutral-600">Loading service</span>
                <span className="font-semibold text-neutral-900">₹{ADDON_PRICE}</span>
              </div>
            )}
            {unloadingService && (
              <div className="flex items-center justify-between py-1.5 text-sm">
                <span className="text-neutral-600">Unloading service</span>
                <span className="font-semibold text-neutral-900">₹{ADDON_PRICE}</span>
              </div>
            )}

            <div className="my-4 h-px bg-neutral-100" />

            <div className="flex items-center justify-between">
              <span className="text-base font-extrabold text-neutral-900">Total</span>
              <span className="text-2xl font-extrabold text-primary">₹{totalFare}</span>
            </div>

            <p className="mt-4 text-center text-xs text-neutral-400">
              Cash payable to the driver on delivery.
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
                Booking your truck...
                <Loader2 size={16} className="animate-spin" />
              </>
            ) : (
              <>Confirm booking · ₹{totalFare}</>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
