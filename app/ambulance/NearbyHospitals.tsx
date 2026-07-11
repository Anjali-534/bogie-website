"use client";

import { useState } from "react";
import { MapPin, Phone, Loader2, LocateFixed } from "lucide-react";
import { getNearbyHospitals, type NearbyHospital } from "../lib/api";

type Status = "idle" | "loading" | "success" | "error" | "denied";

export default function NearbyHospitals() {
  const [status, setStatus] = useState<Status>("idle");
  const [hospitals, setHospitals] = useState<NearbyHospital[]>([]);
  const [error, setError] = useState("");

  function checkNearby() {
    if (!("geolocation" in navigator)) {
      setStatus("error");
      setError("Your browser doesn't support location access.");
      return;
    }

    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const results = await getNearbyHospitals(
            position.coords.latitude,
            position.coords.longitude
          );
          setHospitals(results);
          setStatus("success");
        } catch (err) {
          setError(err instanceof Error ? err.message : "Couldn't load nearby hospitals.");
          setStatus("error");
        }
      },
      (geoError) => {
        setStatus(geoError.code === geoError.PERMISSION_DENIED ? "denied" : "error");
        setError("We couldn't access your location.");
      },
      { timeout: 10000 }
    );
  }

  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-neutral-100 sm:p-8">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary">
          <MapPin size={22} />
        </div>
        <h3 className="mt-4 text-xl font-bold text-neutral-900">
          Check hospitals near you
        </h3>
        <p className="mt-2 max-w-md text-sm text-neutral-600">
          See partner hospitals closest to your location and their ambulance
          options — useful to know before you ever need one.
        </p>

        {status !== "success" && (
          <button
            type="button"
            onClick={checkNearby}
            disabled={status === "loading"}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
          >
            {status === "loading" ? (
              <>
                Finding hospitals...
                <Loader2 size={16} className="animate-spin" />
              </>
            ) : (
              <>
                Use my location
                <LocateFixed size={16} />
              </>
            )}
          </button>
        )}

        {(status === "error" || status === "denied") && (
          <p className="mt-4 max-w-md text-sm font-medium text-red-600">
            {status === "denied"
              ? "Location access was denied. You can enable it in your browser settings and try again — or call 108 directly for any emergency."
              : `${error} You can call 108 directly for any emergency.`}
          </p>
        )}
      </div>

      {status === "success" && (
        <div className="mt-6 flex flex-col gap-3">
          {hospitals.length === 0 ? (
            <p className="text-center text-sm text-neutral-500">
              No partner hospitals found near you yet. Call 108 directly for any
              emergency.
            </p>
          ) : (
            hospitals.slice(0, 5).map((h) => (
              <div
                key={h.id}
                className="flex flex-col gap-2 rounded-2xl border border-neutral-100 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-neutral-900">{h.name}</p>
                  <p className="text-xs text-neutral-500">
                    {h.area || h.address} &middot; {h.distance_km} km away
                  </p>
                </div>
                <a
                  href={`tel:${h.phone}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:border-primary hover:text-primary"
                >
                  <Phone size={14} />
                  Call
                </a>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
