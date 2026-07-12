export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://gogobackend-production.up.railway.app";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  avatar_url?: string | null;
};

export type AuthResponse = {
  user: AuthUser;
  access_token: string;
  refresh_token?: string;
  expires_in: number;
};

export type RiderProfile = {
  rider_id: string;
  phone: string;
  rating: number;
  total_rides: number;
  wallet_balance: number;
};

export type RiderSignupFields = {
  name: string;
  email: string;
  phone: string;
  password: string;
  referred_by_code?: string;
};

export type RiderSignupResponse = {
  user_id: string;
  rider_id: string;
  message: string;
};

async function parseJsonSafe(res: Response): Promise<Record<string, unknown> | null> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function apiLogin(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const body = await parseJsonSafe(res);
  if (!res.ok) {
    throw new Error((body?.error as string) || "Invalid email or password.");
  }
  return body as unknown as AuthResponse;
}

export async function apiRiderSignup(
  fields: RiderSignupFields
): Promise<RiderSignupResponse> {
  const res = await fetch(`${API_BASE}/gogoo/rider/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fields),
  });
  const body = await parseJsonSafe(res);
  if (!res.ok) {
    throw new Error((body?.error as string) || "Something went wrong. Please try again.");
  }
  return body as unknown as RiderSignupResponse;
}

export async function apiRiderProfile(token: string): Promise<RiderProfile> {
  const res = await fetch(`${API_BASE}/gogoo/rider/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await parseJsonSafe(res);
  if (!res.ok) {
    throw new Error((body?.error as string) || "Failed to load rider profile.");
  }
  return body as unknown as RiderProfile;
}

export type ServiceType = {
  id: string;
  name: string;
  slug: string;
  vehicle_type: string;
  category: string;
  scope: string;
  base_fare: number;
  per_km_rate: number;
  surge_multiplier: number;
  capacity: number;
};

export async function getServices(): Promise<ServiceType[]> {
  const res = await fetch(`${API_BASE}/gogoo/services`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  return (await res.json()) as ServiceType[];
}

export type NearbyHospital = {
  id: string;
  name: string;
  type: string;
  phone: string;
  address: string;
  area: string;
  ambulance_types: string[];
  vehicle_count: number;
  base_fare: number;
  per_km_rate: number;
  latitude: number;
  longitude: number;
  rating: number;
  is_verified: boolean;
  distance_km: number;
};

export async function getNearbyHospitals(
  lat: number,
  lng: number
): Promise<NearbyHospital[]> {
  const res = await fetch(
    `${API_BASE}/gogoo/ambulance/hospitals/nearby?lat=${lat}&lng=${lng}`
  );
  const body = await parseJsonSafe(res);
  if (!res.ok) {
    throw new Error((body?.error as string) || "Couldn't load nearby hospitals.");
  }
  return (body?.hospitals as NearbyHospital[]) ?? [];
}

export type PublicStats = {
  total_riders: number;
  total_drivers: number;
  total_completed_rides: number;
};

// Aggregate platform counts for the public marketing site. Server-fetched with
// hourly revalidation; returns null on any failure so the caller can hide the
// section rather than render a broken/zero state.
export async function getPublicStats(): Promise<PublicStats | null> {
  try {
    const res = await fetch(`${API_BASE}/gogoo/stats/public`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const body = await parseJsonSafe(res);
    if (!body) return null;
    return {
      total_riders: Number(body.total_riders) || 0,
      total_drivers: Number(body.total_drivers) || 0,
      total_completed_rides: Number(body.total_completed_rides) || 0,
    };
  } catch {
    return null;
  }
}

export type ReferralInfo = {
  referral_code: string;
  share_link: string;
  total_referred: number;
  total_earned: number;
  pending_rewards: number;
};

export async function getMyReferralCode(token: string): Promise<ReferralInfo> {
  const res = await fetch(`${API_BASE}/gogoo/referral/my-code`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await parseJsonSafe(res);
  if (!res.ok) {
    throw new Error((body?.error as string) || "Couldn't load your referral code.");
  }
  return body as unknown as ReferralInfo;
}

export type ReferralEntry = {
  name: string;
  level: number;
  amount: number;
  status: "pending" | "credited";
  joined_date: string;
  credited_at: string | null;
};

export async function getMyReferrals(token: string): Promise<ReferralEntry[]> {
  const res = await fetch(`${API_BASE}/gogoo/referral/my-referrals`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return [];
  return (await res.json()) as ReferralEntry[];
}

export type RouteInfo = {
  polyline: string;
  distance_km: number;
  duration_mins: number;
};

// Server-side proxy to Ola directions — always returns 200, degrading to
// distance_km: 0 on failure so callers can fall back to a straight-line
// estimate instead of treating this as an error.
export async function getRoute(
  token: string,
  from: { lat: number; lng: number },
  to: { lat: number; lng: number }
): Promise<RouteInfo> {
  try {
    const res = await fetch(
      `${API_BASE}/gogoo/route?from=${from.lat},${from.lng}&to=${to.lat},${to.lng}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!res.ok) return { polyline: "", distance_km: 0, duration_mins: 0 };
    return (await res.json()) as RouteInfo;
  } catch {
    return { polyline: "", distance_km: 0, duration_mins: 0 };
  }
}

export type CreateBookingFields = {
  rider_id: string;
  service_type_id: string;
  pickup_lat: number;
  pickup_lng: number;
  pickup_address: string;
  drop_lat: number;
  drop_lng: number;
  drop_address: string;
  estimated_fare: number;
  distance_km: number;
  source: "website";
  receiver_name?: string;
  receiver_phone?: string;
  // Ambulance-specific
  hospital_id?: string | null;
  hospital_name?: string | null;
  ambulance_sub_type?: string | null;
  is_free_ambulance?: boolean;
  purpose_type?: string | null;
  patient_name?: string | null;
  contact_phone?: string | null;
  medical_notes?: string | null;
  promo_code?: string | null;
};

export type CreateBookingResponse = {
  booking_id: string;
  status: string;
  is_scheduled: boolean;
};

export async function createBooking(
  token: string,
  fields: CreateBookingFields
): Promise<CreateBookingResponse> {
  const res = await fetch(`${API_BASE}/gogoo/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(fields),
  });
  const body = await parseJsonSafe(res);
  if (!res.ok) {
    throw new Error((body?.error as string) || "Booking failed. Please try again.");
  }
  return body as unknown as CreateBookingResponse;
}

export type BookingDriver = {
  id: string;
  name?: string;
  phone?: string;
  vehicle_number?: string;
  vehicle_model?: string;
  rating?: number;
  lat?: number;
  lng?: number;
  heading?: number;
  updated_at?: string;
};

export type BookingDetails = {
  id: string;
  status: string;
  pickup: { lat: number; lng: number; address: string };
  drop: { lat: number; lng: number; address: string };
  estimated_fare: number;
  distance_km: number;
  service_name: string;
  final_fare: number | null;
  ride_otp?: string;
  driver?: BookingDriver;
  vehicle_category: string;
  is_scheduled: boolean;
  scheduled_at: string | null;
  cancellation_fee: number;
  cancelled_by: string;
  cancel_reason: string;
  unread_message_count: number;
  hospital_name: string | null;
  ambulance_sub_type: string | null;
  is_free_ambulance: boolean;
  purpose_type: string | null;
  patient_name: string | null;
};

export async function getBooking(token: string, id: string): Promise<BookingDetails> {
  const res = await fetch(`${API_BASE}/gogoo/bookings/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await parseJsonSafe(res);
  if (!res.ok) {
    throw new Error((body?.error as string) || "Booking not found.");
  }
  return body as unknown as BookingDetails;
}
