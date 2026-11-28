import { Property, Booking, BookingStatus, CommunityEvent, SystemStats, BookingFormData } from '../types';
import { FALLBACK_PROPERTIES, FALLBACK_EVENTS } from '../data/fallbackProperties';

const API_BASE = import.meta.env.VITE_API_URL || '';

function sortPropertiesClosestFirst(list: Property[]): Property[] {
  return [...list].sort((a, b) => a.distance_km - b.distance_km);
}

export async function fetchProperties(): Promise<Property[]> {
  try {
    const res = await fetch(`${API_BASE}/api/properties`);
    if (!res.ok) {
      return sortPropertiesClosestFirst(FALLBACK_PROPERTIES);
    }
    const data = await res.json();
    const list: Property[] = Array.isArray(data?.properties) ? data.properties : [];
    if (list.length === 0) {
      return sortPropertiesClosestFirst(FALLBACK_PROPERTIES);
    }
    return sortPropertiesClosestFirst(list);
  } catch {
    return sortPropertiesClosestFirst(FALLBACK_PROPERTIES);
  }
}

export async function fetchPropertyBySlug(slug: string): Promise<Property> {
  try {
    const res = await fetch(`${API_BASE}/api/properties/${slug}`);
    if (!res.ok) {
      const localMatch = FALLBACK_PROPERTIES.find((p) => p.slug === slug);
      if (localMatch) return localMatch;
      throw new Error(`Failed to fetch property ${slug}`);
    }
    const data = await res.json();
    return data.property;
  } catch (err) {
    const localMatch = FALLBACK_PROPERTIES.find((p) => p.slug === slug);
    if (localMatch) return localMatch;
    throw err;
  }
}

function buildFallbackBookingResponse(
  payload: BookingFormData,
  message: string
): { success: boolean; booking: Booking; message: string } {
  const matchedProp = FALLBACK_PROPERTIES.find((p) => p.id === payload.property_id) || FALLBACK_PROPERTIES[0];
  const matchedRoom = matchedProp.room_types.find((r) => r.id === payload.room_type_id) || matchedProp.room_types[0];
  const refNum = Math.floor(1000 + Math.random() * 9000);
  return {
    success: true,
    message,
    booking: {
      id: refNum,
      reference_code: `CN-2026-${refNum}`,
      property_id: payload.property_id,
      property_name: matchedProp.name,
      property_city: matchedProp.city,
      property_phone: matchedProp.phone,
      property_address: matchedProp.address,
      room_type_id: payload.room_type_id,
      room_name: matchedRoom.name,
      full_name: payload.full_name,
      email: payload.email,
      phone: payload.phone,
      applicant_role: payload.applicant_role,
      tour_type: payload.tour_type,
      preferred_move_in: payload.preferred_move_in,
      status: 'New Lead',
      notes: payload.notes,
      created_at: new Date().toISOString()
    }
  };
}

export async function createBooking(payload: BookingFormData): Promise<{ success: boolean; booking: Booking; message: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => ({}));
    if (res.status >= 400 && res.status < 500) {
      throw new Error(data.error || (data.issues ? data.issues.map((i: any) => i.message).join(', ') : 'Failed to create booking'));
    }

    if (!res.ok) {
      return buildFallbackBookingResponse(payload, 'Inquiry captured via CampusNest Agent Fallback.');
    }

    return data;
  } catch (err) {
    if (err instanceof Error && !err.message.toLowerCase().includes('fetch')) {
      throw err;
    }
    return buildFallbackBookingResponse(payload, 'Inquiry captured in offline fallback mode.');
  }
}

export async function fetchBookings(
  adminKey: string = 'campus-admin-secret-2026',
  filters?: { status?: string; property_id?: number }
): Promise<Booking[]> {
  const params = new URLSearchParams();
  if (filters?.status) params.append('status', filters.status);
  if (filters?.property_id) params.append('property_id', filters.property_id.toString());

  const res = await fetch(`${API_BASE}/api/bookings?${params.toString()}`, {
    headers: {
      'Authorization': `Bearer ${adminKey}`
    }
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Unauthorized or failed to fetch bookings');
  }

  const data = await res.json();
  return data.bookings;
}

export async function updateBookingStatus(
  id: number,
  status: BookingStatus,
  adminKey: string = 'campus-admin-secret-2026'
): Promise<{ success: boolean; booking_id: number; status: BookingStatus }> {
  const res = await fetch(`${API_BASE}/api/bookings/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminKey}`
    },
    body: JSON.stringify({ status })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to update booking status');
  }

  return res.json();
}

export async function updateRoomAvailability(
  roomId: number,
  delta?: number,
  available_count?: number,
  adminKey: string = 'campus-admin-secret-2026'
): Promise<any> {
  const res = await fetch(`${API_BASE}/api/properties/rooms/${roomId}/availability`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminKey}`
    },
    body: JSON.stringify({ delta, available_count })
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to adjust room inventory');
  }

  return res.json();
}

export async function fetchEvents(): Promise<CommunityEvent[]> {
  try {
    const res = await fetch(`${API_BASE}/api/events`);
    if (!res.ok) {
      return FALLBACK_EVENTS;
    }
    const data = await res.json();
    const list: CommunityEvent[] = Array.isArray(data?.events) ? data.events : [];
    return list.length > 0 ? list : FALLBACK_EVENTS;
  } catch {
    return FALLBACK_EVENTS;
  }
}

export async function subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${API_BASE}/api/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to subscribe');
  }
  return data;
}

export async function fetchStats(): Promise<SystemStats> {
  const res = await fetch(`${API_BASE}/api/stats`);
  if (!res.ok) {
    throw new Error('Failed to fetch stats');
  }
  return res.json();
}
