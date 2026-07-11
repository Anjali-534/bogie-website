"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { olaAutocomplete, olaPlaceDetails, type OlaSuggestion } from "../lib/olaMaps";

export type SelectedLocation = {
  description: string;
  lat: number;
  lng: number;
};

export default function LocationAutocomplete({
  label,
  placeholder,
  onSelect,
}: {
  label: string;
  placeholder: string;
  onSelect: (location: SelectedLocation) => void;
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<OlaSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      const results = await olaAutocomplete(query);
      setSuggestions(results);
      setLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [query]);

  async function handleSelect(s: OlaSuggestion) {
    setQuery(s.description);
    setOpen(false);
    setSuggestions([]);

    let lat = s.lat;
    let lng = s.lng;
    if (lat == null || lng == null) {
      const details = await olaPlaceDetails(s.place_id);
      if (!details) return;
      lat = details.lat;
      lng = details.lng;
    }
    onSelect({ description: s.description, lat, lng });
  }

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1.5">
      <span className="text-sm font-medium text-neutral-700">{label}</span>
      <div className="flex items-center rounded-xl border border-neutral-200 px-4 transition-colors focus-within:border-primary">
        <MapPin size={16} className="shrink-0 text-neutral-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full bg-transparent px-3 py-2.5 text-sm outline-none"
        />
        {loading && <Loader2 size={16} className="shrink-0 animate-spin text-neutral-400" />}
      </div>

      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 z-10 mt-1 w-full rounded-xl bg-white p-1.5 shadow-lg ring-1 ring-neutral-100">
          {suggestions.map((s) => (
            <button
              key={s.place_id}
              type="button"
              onClick={() => handleSelect(s)}
              className="flex w-full items-start gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm text-neutral-700 hover:bg-primary-light hover:text-primary"
            >
              <MapPin size={15} className="mt-0.5 shrink-0" />
              {s.description}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
