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
  category: string;
  city: string;
  neighborhood: string;
  distance_km: number;
  travel_time: string;
  distance_to_campus: string;
  address: string;
  phone: string | null;
  image_url: string;
  gallery_images?: string[];
  food_plan: string;
  curfew_timing: string;
  wifi_speed: string;
  power_backup: string;
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

export type BookingStatus =
  | 'New Lead'
  | 'Contacted Owner'
  | 'Tour Scheduled'
  | 'Confirmed'
  | 'Cancelled';

export type TourType = 'On-Site' | 'Virtual' | 'Agent Callback';

export interface Booking {
  id: number;
  reference_code: string;
  property_id: number;
  property_name: string;
  property_city: string;
  property_category?: string;
  property_distance_km?: number;
  property_travel_time?: string;
  property_address?: string;
  property_phone?: string | null;
  room_type_id: number;
  room_name: string;
  monthly_rent_inr?: number;
  full_name: string;
  email: string;
  phone: string;
  applicant_role: 'Student' | 'Guardian' | 'Other';
  tour_type: TourType;
  preferred_move_in: string;
  notes?: string;
  status: BookingStatus;
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
  new_leads: number;
  active_pipeline: number;
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
  tour_type: TourType;
  preferred_move_in: string;
  notes?: string;
}
