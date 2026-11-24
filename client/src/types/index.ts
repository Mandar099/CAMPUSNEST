export interface RoomType {
  id: number;
  property_id: number;
  name: string;
  area_sqft: number;
  monthly_rent_inr: number;
  deposit_inr: number;
  available_count: number;
  status: 'Available' | 'Filling Fast' | 'Waitlist';
  features: string[];
  floorplan_variant: 'solo_studio' | 'twin_pod' | 'balcony_loft' | 'quad_suite' | 'mezzanine_loft' | 'triple_loft' | string;
}

export interface Property {
  id: number;
  slug: string;
  name: string;
  city: 'Moodbidri' | 'Mangaluru' | 'Manipal' | 'Bengaluru' | string;
  neighborhood: string;
  distance_to_campus: string;
  tagline: string;
  description: string;
  starting_rent_inr: number;
  total_beds: number;
  available_beds: number;
  accent_theme: 'emerald' | 'ocean' | 'terracotta' | 'obsidian' | string;
  amenities: string[];
  highlights: string[];
  room_types: RoomType[];
}

export interface Booking {
  id: number;
  reference_code: string;
  property_id: number;
  property_name: string;
  property_city: string;
  room_type_id: number;
  room_name: string;
  monthly_rent_inr?: number;
  full_name: string;
  email: string;
  phone: string;
  applicant_role: 'Student' | 'Guardian' | 'Other';
  tour_type: 'On-Site' | 'Virtual';
  preferred_move_in: string;
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Visited' | 'Cancelled';
  created_at: string;
}

export interface CommunityEvent {
  id: number;
  title: string;
  category: 'Hackathon Night' | 'Wellness' | 'Community Dinner' | 'Career Talk';
  property_name: string;
  event_date: string;
  spots_remaining: number;
}

export interface SystemStats {
  total_properties: number;
  total_beds: number;
  available_beds: number;
  occupied_beds: number;
  occupancy_rate_percent: number;
  total_bookings: number;
  pending_bookings: number;
  confirmed_bookings: number;
}

export interface BookingFormData {
  property_id: number;
  room_type_id: number;
  full_name: string;
  email: string;
  phone: string;
  applicant_role: 'Student' | 'Guardian' | 'Other';
  tour_type: 'On-Site' | 'Virtual';
  preferred_move_in: string;
  notes?: string;
}
