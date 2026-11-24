-- CampusNest Relational Schema (SQLite)
PRAGMA foreign_keys = ON;

-- 1. Properties Table
CREATE TABLE IF NOT EXISTS properties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  distance_to_campus TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  starting_rent_inr INTEGER NOT NULL,
  total_beds INTEGER NOT NULL,
  available_beds INTEGER NOT NULL,
  accent_theme TEXT NOT NULL,
  amenities_json TEXT NOT NULL,
  highlights_json TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Room Types Table
CREATE TABLE IF NOT EXISTS room_types (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  property_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  area_sqft INTEGER NOT NULL,
  monthly_rent_inr INTEGER NOT NULL,
  deposit_inr INTEGER NOT NULL,
  available_count INTEGER NOT NULL,
  status TEXT CHECK(status IN ('Available', 'Filling Fast', 'Waitlist')) NOT NULL DEFAULT 'Available',
  features_json TEXT NOT NULL,
  floorplan_variant TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties (id) ON DELETE CASCADE
);

-- 3. Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference_code TEXT UNIQUE NOT NULL,
  property_id INTEGER NOT NULL,
  room_type_id INTEGER NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  applicant_role TEXT CHECK(applicant_role IN ('Student', 'Guardian', 'Other')) NOT NULL,
  tour_type TEXT CHECK(tour_type IN ('On-Site', 'Virtual')) NOT NULL,
  preferred_move_in TEXT NOT NULL,
  notes TEXT,
  status TEXT CHECK(status IN ('Pending', 'Confirmed', 'Visited', 'Cancelled')) NOT NULL DEFAULT 'Pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (property_id) REFERENCES properties (id) ON DELETE RESTRICT,
  FOREIGN KEY (room_type_id) REFERENCES room_types (id) ON DELETE RESTRICT
);

-- 4. Community Events Table
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT CHECK(category IN ('Hackathon Night', 'Wellness', 'Community Dinner', 'Career Talk')) NOT NULL,
  property_name TEXT NOT NULL,
  event_date TEXT NOT NULL,
  spots_remaining INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_room_types_property_id ON room_types(property_id);
CREATE INDEX IF NOT EXISTS idx_bookings_reference_code ON bookings(reference_code);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
