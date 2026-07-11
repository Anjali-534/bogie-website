const OLA_KEY = process.env.NEXT_PUBLIC_OLA_MAPS_KEY || "";
const BASE = "https://api.olamaps.io";

export type OlaSuggestion = {
  description: string;
  place_id: string;
  lat: number | null;
  lng: number | null;
};

export async function olaAutocomplete(
  input: string,
  lat?: number,
  lng?: number
): Promise<OlaSuggestion[]> {
  if (!input.trim() || !OLA_KEY) return [];
  try {
    let url =
      `${BASE}/places/v1/autocomplete?input=${encodeURIComponent(input)}` +
      `&api_key=${OLA_KEY}`;
    if (lat && lng) url += `&location=${lat},${lng}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    const preds = data?.predictions || [];
    return preds
      .map((p: Record<string, unknown>) => {
        const structured = p?.structured_formatting as Record<string, unknown> | undefined;
        const geometry = p?.geometry as Record<string, unknown> | undefined;
        const location = geometry?.location as Record<string, unknown> | undefined;
        return {
          description: (p?.description as string) || (structured?.main_text as string) || "",
          place_id: (p?.place_id as string) || "",
          lat: (location?.lat as number) ?? null,
          lng: (location?.lng as number) ?? null,
        };
      })
      .filter((p: OlaSuggestion) => p.description);
  } catch {
    return [];
  }
}

export async function olaPlaceDetails(
  placeId: string
): Promise<{ lat: number; lng: number } | null> {
  if (!placeId || !OLA_KEY) return null;
  try {
    const res = await fetch(
      `${BASE}/places/v1/details?place_id=${placeId}&api_key=${OLA_KEY}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    const loc = data?.result?.geometry?.location;
    return loc ? { lat: loc.lat, lng: loc.lng } : null;
  } catch {
    return null;
  }
}
