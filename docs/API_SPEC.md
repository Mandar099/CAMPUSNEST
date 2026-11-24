# CAMPUSNEST — REST API SPECIFICATION & CONTRACTS

All API endpoints reside under the `/api` route prefix. All payloads and responses are formatted as standard UTF-8 JSON.

---

## 1. Endpoints Overview

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/properties` | Fetch all properties with room types & aggregated live counts | No |
| `GET` | `/api/properties/:slug` | Fetch a single property by slug with room tiers | No |
| `PATCH` | `/api/rooms/:id/availability` | Adjust available bed count for a room tier | Yes (Admin) |
| `POST` | `/api/bookings` | Submit a prospective student/guardian booking or tour | No |
| `GET` | `/api/bookings` | Retrieve bookings with optional status/property filters | Yes (Admin) |
| `PATCH` | `/api/bookings/:id/status` | Update booking lifecycle status | Yes (Admin) |
| `GET` | `/api/events` | Retrieve campus community events schedule | No |
| `POST` | `/api/newsletter` | Register email for admission alerts & campus updates | No |
| `GET` | `/api/stats` | Retrieve operational stats (occupancy %, beds, counts) | No / Public |

---

## 2. Authentication Contract
Protected admin endpoints accept an Authorization header:
```http
Authorization: Bearer campus-admin-secret-2026
```
Or for reviewer testing convenience, standard query parameter or demo bypass is supported in non-production mode.

---

## 3. Data Contracts & Zod Schemas

### 3.1 Properties & Rooms

#### `GET /api/properties`
- **Response `200 OK`**:
```json
{
  "properties": [
    {
      "id": 1,
      "slug": "campusnest-parkside-moodbidri",
      "name": "CampusNest Parkside",
      "city": "Moodbidri",
      "neighborhood": "MITE Campus West Gate",
      "distance_to_campus": "400m from MITE Campus",
      "tagline": "Acoustic Serenity & Forest Canopy Walk",
      "description": "Nestled opposite the tranquil greenery of Moodbidri...",
      "starting_rent_inr": 8500,
      "total_beds": 120,
      "available_beds": 14,
      "accent_theme": "emerald",
      "amenities": ["1 Gbps Fiber", "Silent Study Pods", "Shuttle Service", "Chef Mess"],
      "highlights": ["Zero Commute to MITE", "Biometric Turnstiles", "100% Solar & DG Backup"],
      "room_types": [
        {
          "id": 1,
          "property_id": 1,
          "name": "Solo Studio Suite",
          "area_sqft": 240,
          "monthly_rent_inr": 14500,
          "deposit_inr": 25000,
          "available_count": 3,
          "status": "Filling Fast",
          "features": ["Private Ensuite Bath", "Ergonomic Herman Miller Desk", "Private Balcony"],
          "floorplan_variant": "solo_studio"
        }
      ]
    }
  ]
}
```

#### `PATCH /api/rooms/:id/availability`
- **Zod Schema:**
```typescript
import { z } from 'zod';

export const updateRoomAvailabilitySchema = z.object({
  delta: z.number().int().min(-20).max(20).optional(),
  available_count: z.number().int().min(0).max(500).optional(),
}).refine(data => data.delta !== undefined || data.available_count !== undefined, {
  message: "Either delta or available_count must be provided"
});
```
- **Response `200 OK`:**
```json
{
  "success": true,
  "room": {
    "id": 1,
    "name": "Solo Studio Suite",
    "available_count": 4,
    "status": "Available"
  },
  "property_available_beds": 15
}
```

---

### 3.2 Bookings

#### `POST /api/bookings`
- **Zod Schema:**
```typescript
export const createBookingSchema = z.object({
  property_id: z.number().int().positive({ message: "Valid property is required" }),
  room_type_id: z.number().int().positive({ message: "Valid room tier is required" }),
  full_name: z.string().trim().min(2, { message: "Full name must be at least 2 characters" }).max(80),
  email: z.string().trim().email({ message: "Valid email address is required" }),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, { message: "Valid 10-digit Indian phone number required" }),
  applicant_role: z.enum(['Student', 'Guardian', 'Other']),
  tour_type: z.enum(['On-Site', 'Virtual']),
  preferred_move_in: z.string().min(1, { message: "Preferred move-in date is required" }),
  notes: z.string().max(500).optional()
});
```
- **Request Body Example:**
```json
{
  "property_id": 1,
  "room_type_id": 1,
  "full_name": "Aditya Rao",
  "email": "aditya.rao@example.com",
  "phone": "9876543210",
  "applicant_role": "Student",
  "tour_type": "On-Site",
  "preferred_move_in": "2026-08-01",
  "notes": "Interested in corner quiet wing."
}
```
- **Response `201 Created`:**
```json
{
  "success": true,
  "message": "Booking reservation pass generated successfully",
  "booking": {
    "id": 12,
    "reference_code": "CN-2026-7842",
    "property_name": "CampusNest Parkside",
    "room_name": "Solo Studio Suite",
    "full_name": "Aditya Rao",
    "email": "aditya.rao@example.com",
    "phone": "9876543210",
    "applicant_role": "Student",
    "tour_type": "On-Site",
    "preferred_move_in": "2026-08-01",
    "status": "Pending",
    "created_at": "2026-11-24T21:05:00.000Z"
  }
}
```

#### `GET /api/bookings`
- **Query Parameters:**
  - `status` (optional): `Pending | Confirmed | Visited | Cancelled`
  - `property_id` (optional): `number`
- **Response `200 OK`:**
```json
{
  "bookings": [
    {
      "id": 1,
      "reference_code": "CN-2026-8492",
      "property_id": 1,
      "property_name": "CampusNest Parkside",
      "property_city": "Moodbidri",
      "room_type_id": 1,
      "room_name": "Solo Studio Suite",
      "full_name": "Ananya Shenoy",
      "email": "ananya.s@mite.edu.in",
      "phone": "9845123456",
      "applicant_role": "Student",
      "tour_type": "On-Site",
      "preferred_move_in": "2026-07-15",
      "notes": "Prefers ground floor room",
      "status": "Confirmed",
      "created_at": "2026-11-20T10:15:30.000Z"
    }
  ]
}
```

#### `PATCH /api/bookings/:id/status`
- **Zod Schema:**
```typescript
export const updateBookingStatusSchema = z.object({
  status: z.enum(['Pending', 'Confirmed', 'Visited', 'Cancelled'])
});
```
- **Response `200 OK`:**
```json
{
  "success": true,
  "booking_id": 1,
  "status": "Confirmed"
}
```

---

### 3.3 Community & Newsletter

#### `GET /api/events`
- **Response `200 OK`:**
```json
{
  "events": [
    {
      "id": 1,
      "title": "All-Night AI & Web3 Hackathon",
      "category": "Hackathon Night",
      "property_name": "CampusNest Innovation Hub (Bengaluru)",
      "event_date": "2026-12-05",
      "spots_remaining": 18
    }
  ]
}
```

#### `POST /api/newsletter`
- **Zod Schema:**
```typescript
export const newsletterSchema = z.object({
  email: z.string().trim().email({ message: "Valid email address required" })
});
```
- **Response `201 Created`:**
```json
{
  "success": true,
  "message": "Subscribed to CampusNest admission alerts successfully"
}
```

---

### 3.4 Operational Statistics

#### `GET /api/stats`
- **Response `200 OK`:**
```json
{
  "total_properties": 4,
  "total_beds": 520,
  "available_beds": 58,
  "occupancy_rate_percent": 88.8,
  "total_bookings": 24,
  "pending_bookings": 6
}
```
