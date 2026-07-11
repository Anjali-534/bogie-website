"use client";

import { useState } from "react";
import Link from "next/link";
import { Bike, Car, CarFront, CarTaxiFront, ArrowRight, Sparkles, type LucideIcon } from "lucide-react";
import LocationAutocomplete, { type SelectedLocation } from "../components/LocationAutocomplete";
import { useAuth } from "../lib/AuthContext";
import type { ServiceType } from "../lib/api";

const VEHICLE_ICONS: Record<string, LucideIcon> = {
  cab_2w: Bike,
  cab_3w: CarTaxiFront,
  cab_4w: Car,
  cab_4w_suv: CarFront,
};

export default function FareEstimatorForm({ services }: { services: ServiceType[] }) {
  const { user } = useAuth();
  const [pickup, setPickup] = useState<SelectedLocation | null>(null);
  const [drop, setDrop] = useState<SelectedLocation | null>(null);

  const bothSelected = Boolean(pickup && drop);
  const bookHref = user ? "/book" : "/login?redirect=/book";

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 sm:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

        {bothSelected && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-primary-light p-4">
            <Sparkles size={18} className="mt-0.5 shrink-0 text-primary" />
            <p className="text-sm text-primary-dark">
              Route-based fare estimates for your exact trip are coming soon.
              Meanwhile, here&apos;s the base pricing for each vehicle type below —
              your final fare depends on the actual distance travelled.
            </p>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-neutral-900">
          {bothSelected ? "Base pricing by vehicle" : "Pick a vehicle type to see pricing"}
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-500">
          This is an estimate — actual fare may vary based on traffic, route, and demand.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = VEHICLE_ICONS[s.slug] || Car;
            return (
              <div
                key={s.id}
                className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-neutral-100 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Icon size={22} />
                </div>
                <p className="mt-4 font-bold text-neutral-900">{s.name}</p>
                <p className="mt-1 text-xs text-neutral-500">Seats {s.capacity}</p>
                <p className="mt-3 text-lg font-extrabold text-primary">
                  ₹{s.base_fare}
                  <span className="text-sm font-medium text-neutral-500"> base</span>
                </p>
                <p className="text-xs text-neutral-500">+ ₹{s.per_km_rate}/km</p>

                <Link
                  href={bookHref}
                  className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  Book this
                  <ArrowRight size={15} />
                </Link>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-neutral-500">
          Fares shown are starting prices; your exact fare is confirmed in the app before you book.
        </p>
      </div>
    </div>
  );
}
