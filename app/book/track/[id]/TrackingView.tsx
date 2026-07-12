"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Loader2,
  MapPin,
  Phone,
  Star,
  KeyRound,
  CheckCircle2,
  XCircle,
  Search,
} from "lucide-react";
import { useAuth } from "../../../lib/AuthContext";
import { getBooking, type BookingDetails } from "../../../lib/api";
import { olaDirections, decodePolyline } from "../../../lib/olaMaps";

// maplibre-gl touches window at init — keep it out of the server render.
const TrackingMap = dynamic(() => import("./TrackingMap"), { ssr: false });

const POLL_MS = 4000;
const TERMINAL_STATUSES = ["completed", "cancelled"];

const STATUS_COPY: Record<string, { title: string; sub: string }> = {
  searching: { title: "Finding your driver", sub: "Matching you with a nearby driver…" },
  accepted: { title: "Driver assigned", sub: "Your driver is getting ready to head your way." },
  arriving: { title: "Driver arriving", sub: "Your driver is on the way to your pickup." },
  in_progress: { title: "On the way", sub: "Enjoy your ride!" },
  completed: { title: "Ride completed", sub: "Thanks for riding with bogie." },
  cancelled: { title: "Ride cancelled", sub: "This ride was cancelled." },
  scheduled: { title: "Ride scheduled", sub: "We'll find your driver closer to pickup time." },
};

// "Enjoy your ride!" is the wrong register for a medical trip.
const AMBULANCE_STATUS_COPY: Record<string, { title: string; sub: string }> = {
  searching: {
    title: "Finding your ambulance",
    sub: "Contacting nearby ambulance providers…",
  },
  accepted: { title: "Ambulance assigned", sub: "Your ambulance is getting ready to leave." },
  arriving: { title: "Ambulance arriving", sub: "Your ambulance is on the way to the pickup." },
  in_progress: { title: "En route", sub: "The ambulance is on its way to the destination." },
  completed: { title: "Trip completed", sub: "We hope everything went okay. Take care." },
  cancelled: { title: "Booking cancelled", sub: "This ambulance booking was cancelled." },
};

const PURPOSE_LABELS: Record<string, string> = {
  patient_transfer: "Patient Transfer",
  emergency: "Emergency",
  dead_body: "Dead Body Transfer",
};

const SUB_TYPE_LABELS: Record<string, string> = {
  bls: "Basic Life Support (BLS)",
  als: "Advanced Life Support (ALS)",
};

const BEFORE_PICKUP_STATUSES = ["accepted", "arriving"];

function haversineKm(aLat: number, aLng: number, bLat: number, bLng: number) {
  const R = 6371,
    dLat = ((bLat - aLat) * Math.PI) / 180,
    dLng = ((bLng - aLng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((aLat * Math.PI) / 180) * Math.cos((bLat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function fmtDist(km: number) {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

function formatScheduled(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function TrackingView({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [routeCoords, setRouteCoords] = useState<{ lat: number; lng: number }[]>([]);
  const [routeDistText, setRouteDistText] = useState("");
  const [routeDurText, setRouteDurText] = useState("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastRouteKeyRef = useRef("");

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace(`/login?redirect=/book/track/${bookingId}`);
    }
  }, [authLoading, user, router, bookingId]);

  useEffect(() => {
    if (authLoading || !user) return;

    let cancelled = false;
    const token = localStorage.getItem("access_token");
    if (!token) return;

    async function fetchBooking() {
      try {
        const data = await getBooking(token as string, bookingId);
        if (cancelled) return;
        setBooking(data);
        setError("");
        setLoading(false);
        if (TERMINAL_STATUSES.includes(data.status) && pollRef.current) {
          clearInterval(pollRef.current);
          pollRef.current = null;
        }
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Couldn't load this booking.");
        setLoading(false);
      }
    }

    fetchBooking();
    pollRef.current = setInterval(fetchBooking, POLL_MS);

    return () => {
      cancelled = true;
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [authLoading, user, bookingId]);

  // Route polyline — mirrors the mobile app: driver→pickup while the driver
  // is heading over (dashed), pickup→drop otherwise. Deduped by origin
  // rounded to ~100m so we only re-ask Ola when the driver actually moves.
  const bDriverLat = booking?.driver?.lat;
  const bDriverLng = booking?.driver?.lng;
  const bStatus = booking?.status;
  useEffect(() => {
    if (!booking) return;
    const bp = BEFORE_PICKUP_STATUSES.includes(booking.status);
    let origin: { lat: number; lng: number } | null = null;
    let dest: { lat: number; lng: number } | null = null;
    if (bp && booking.driver?.lat && booking.driver?.lng && booking.pickup) {
      origin = { lat: booking.driver.lat, lng: booking.driver.lng };
      dest = { lat: booking.pickup.lat, lng: booking.pickup.lng };
    } else if (!bp && booking.pickup && booking.drop) {
      origin = { lat: booking.pickup.lat, lng: booking.pickup.lng };
      dest = { lat: booking.drop.lat, lng: booking.drop.lng };
    }
    if (!origin || !dest) return;
    const key = `${origin.lat.toFixed(3)},${origin.lng.toFixed(3)}-${dest.lat},${dest.lng}-${booking.status}`;
    if (key === lastRouteKeyRef.current) return;
    lastRouteKeyRef.current = key;
    const o = origin;
    const d = dest;
    olaDirections(o.lat, o.lng, d.lat, d.lng).then((r) => {
      if (r && r.polyline) {
        setRouteCoords(decodePolyline(r.polyline));
        setRouteDistText(fmtDist(r.distanceKm));
        setRouteDurText(`${r.durationMins} mins`);
      } else {
        // Straight line fallback so the map still shows the connection.
        setRouteCoords([o, d]);
        setRouteDistText("");
        setRouteDurText("");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bDriverLat, bDriverLng, bStatus]);

  if (authLoading || !user || (loading && !booking && !error)) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 size={28} className="animate-spin text-primary" />
      </div>
    );
  }

  if (error && !booking) {
    return (
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-neutral-100">
        <XCircle size={32} className="mx-auto text-red-500" />
        <p className="mt-3 text-sm font-medium text-neutral-700">{error}</p>
      </div>
    );
  }

  if (!booking) return null;

  const isAmbulance = booking.vehicle_category === "ambulance";
  const copy =
    (isAmbulance ? AMBULANCE_STATUS_COPY[booking.status] : undefined) ||
    STATUS_COPY[booking.status] ||
    STATUS_COPY.searching;
  const displayFare = Math.round(booking.final_fare ?? booking.estimated_fare ?? 0);
  const showOtp = booking.status === "arriving" && booking.ride_otp;
  const isTerminal = TERMINAL_STATUSES.includes(booking.status);

  const beforePickup = BEFORE_PICKUP_STATUSES.includes(booking.status);
  const driverPos =
    booking.driver?.lat && booking.driver?.lng
      ? { lat: booking.driver.lat, lng: booking.driver.lng, heading: booking.driver.heading }
      : null;
  const mapCategory =
    booking.vehicle_category === "truck" || booking.vehicle_category === "ambulance"
      ? booking.vehicle_category
      : "cab";

  let distLabel = "";
  if (routeDistText) distLabel = routeDistText + (routeDurText ? ` · ${routeDurText}` : "");
  else if (driverPos && booking.pickup) {
    const target = beforePickup ? booking.pickup : booking.drop ?? booking.pickup;
    distLabel = fmtDist(haversineKm(driverPos.lat, driverPos.lng, target.lat, target.lng));
  }
  const showDistPill = Boolean(driverPos && distLabel && !isTerminal);

  return (
    <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start">
      <div className="relative overflow-hidden rounded-3xl shadow-sm ring-1 ring-neutral-100">
        <TrackingMap
          pickup={booking.pickup}
          drop={booking.drop}
          driver={driverPos}
          routeCoords={routeCoords}
          beforePickup={beforePickup}
          category={mapCategory}
          className="h-[320px] w-full sm:h-[420px] lg:h-[560px]"
        />
        {showDistPill && (
          <div
            className={`absolute left-1/2 top-4 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-md ${
              beforePickup ? "bg-emerald-500" : "bg-primary"
            }`}
          >
            {beforePickup ? `Driver is ${distLabel} away` : `${distLabel} to destination`}
          </div>
        )}
        {booking.status === "searching" && (
          <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-neutral-900/75 px-4 py-1.5 text-xs font-semibold text-white shadow-md">
            Looking for nearby drivers…
          </div>
        )}
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 sm:p-8">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h1 className="text-xl font-extrabold text-neutral-900">{copy.title}</h1>
            <p className="mt-1 text-sm text-neutral-500">{copy.sub}</p>
          </div>
          {booking.status === "searching" && (
            <Loader2 size={22} className="mt-1 shrink-0 animate-spin text-primary" />
          )}
          {booking.status === "completed" && (
            <CheckCircle2 size={22} className="mt-1 shrink-0 text-emerald-500" />
          )}
          {booking.status === "cancelled" && (
            <XCircle size={22} className="mt-1 shrink-0 text-red-500" />
          )}
        </div>

        {booking.status === "scheduled" && booking.scheduled_at && (
          <div className="mt-5 rounded-2xl bg-primary-light p-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary-dark">
              Scheduled pickup
            </p>
            <p className="mt-1 text-lg font-extrabold text-neutral-900">
              {formatScheduled(booking.scheduled_at)}
            </p>
          </div>
        )}

        {booking.status === "searching" && (
          <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-neutral-50 py-6 text-neutral-500">
            <Search size={16} />
            <span className="text-sm font-medium">Looking for nearby drivers…</span>
          </div>
        )}

        {booking.driver && booking.status !== "searching" && (
          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-neutral-50 p-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              {(booking.driver.name || "D")[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-neutral-900">
                {booking.driver.name || "Driver"}
              </p>
              <p className="text-xs text-neutral-500">
                {booking.driver.vehicle_model || "Vehicle"} · {booking.driver.vehicle_number || "—"}
                {booking.driver.rating ? (
                  <span className="ml-1 inline-flex items-center gap-0.5">
                    <Star size={11} className="fill-amber-400 text-amber-400" />
                    {booking.driver.rating.toFixed(1)}
                  </span>
                ) : null}
              </p>
            </div>
            {booking.driver.phone && !isTerminal && (
              <a
                href={`tel:${booking.driver.phone}`}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white"
                aria-label="Call driver"
              >
                <Phone size={17} />
              </a>
            )}
          </div>
        )}

        {showOtp && (
          <div className="mt-5 rounded-2xl border-2 border-primary p-4 text-center">
            <p className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
              <KeyRound size={13} />
              Share this OTP with your driver
            </p>
            <p className="mt-2 text-3xl font-extrabold tracking-[0.3em] text-primary">
              {booking.ride_otp}
            </p>
          </div>
        )}

        <div className="my-5 h-px bg-neutral-100" />

        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">Route</p>
        <div className="flex items-start gap-2.5 text-sm text-neutral-700">
          <MapPin size={15} className="mt-0.5 shrink-0 text-emerald-500" />
          <span>{booking.pickup.address}</span>
        </div>
        <div className="my-1.5 ml-[7px] h-3 w-px bg-neutral-200" />
        <div className="flex items-start gap-2.5 text-sm text-neutral-700">
          <MapPin size={15} className="mt-0.5 shrink-0 text-primary" />
          <span>{booking.drop.address}</span>
        </div>

        {isAmbulance && (
          <>
            <div className="my-5 h-px bg-neutral-100" />
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
              Ambulance details
            </p>
            <div className="flex flex-col gap-1.5 text-sm text-neutral-700">
              {booking.purpose_type && (
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Purpose</span>
                  <span className="font-semibold">
                    {PURPOSE_LABELS[booking.purpose_type] || booking.purpose_type}
                  </span>
                </div>
              )}
              {booking.ambulance_sub_type && (
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Type</span>
                  <span className="font-semibold">
                    {SUB_TYPE_LABELS[booking.ambulance_sub_type] ||
                      booking.ambulance_sub_type.toUpperCase()}
                  </span>
                </div>
              )}
              {booking.patient_name && (
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Patient</span>
                  <span className="font-semibold">{booking.patient_name}</span>
                </div>
              )}
              {booking.hospital_name && (
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500">Hospital</span>
                  <span className="font-semibold">{booking.hospital_name}</span>
                </div>
              )}
            </div>
            {booking.purpose_type === "emergency" && !isTerminal && (
              <p className="mt-3 rounded-xl bg-red-50 p-3 text-xs font-medium text-red-600">
                For life-threatening emergencies, also call{" "}
                <a href="tel:108" className="font-bold underline">
                  108
                </a>{" "}
                (National Ambulance Service).
              </p>
            )}
          </>
        )}

        <div className="my-5 h-px bg-neutral-100" />

        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-500">
            {booking.status === "completed" ? "Fare paid" : "Estimated fare"}
          </span>
          {isAmbulance && booking.is_free_ambulance ? (
            <span className="text-xl font-extrabold text-emerald-600">FREE</span>
          ) : (
            <span className="text-xl font-extrabold text-neutral-900">₹{displayFare}</span>
          )}
        </div>

        {booking.status === "cancelled" && booking.cancellation_fee > 0 && (
          <p className="mt-3 rounded-xl bg-amber-50 p-3 text-xs text-amber-700">
            A cancellation fee of ₹{Math.round(booking.cancellation_fee)} has been added to your
            next ride.
          </p>
        )}
      </div>
    </div>
  );
}
