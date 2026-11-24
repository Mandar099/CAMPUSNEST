import { Property, Booking, CommunityEvent, SystemStats, BookingFormData } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '';

export async function fetchProperties(): Promise<Property[]> {
  const res = await fetch(`${API_BASE}/api/properties`);
  if (!res.ok) {
    throw new Error(`Failed to fetch properties: ${res.statusText}`);
  }
  const data = await res.json();
  return data.properties;
}

export async function fetchPropertyBySlug(slug: string): Promise<Property> {
  const res = await fetch(`${API_BASE}/api/properties/${slug}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch property ${slug}`);
  }
  const data = await res.json();
  return data.property;
}

export async function createBooking(payload: BookingFormData): Promise<{ success: boolean; booking: Booking; message: string }> {
  const res = await fetch(`${API_BASE}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || (data.issues ? data.issues.map((i: any) => i.message).join(', ') : 'Failed to create booking'));
  }

  return data;
}

export async function fetchBookings(adminKey: string = 'campus-admin-secret-2026', filters?: { status?: string; property_id?: number }): Promise<Booking[]> {
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

export async function updateBookingStatus(id: number, status: string, adminKey: string = 'campus-admin-secret-2026'): Promise<{ success: boolean }> {
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

export async function updateRoomAvailability(roomId: number, delta?: number, available_count?: number, adminKey: string = 'campus-admin-secret-2026'): Promise<any> {
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
  const res = await fetch(`${API_BASE}/api/events`);
  if (!res.ok) {
    throw new Error('Failed to fetch events');
  }
  const data = await res.json();
  return data.events;
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
