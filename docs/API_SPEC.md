# CAMPUSNEST — REST API SPECIFICATION & CONTRACTS

All endpoints sit under the `/api` prefix and return UTF-8 JSON.

---

## 1. Endpoints Overview

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/properties` | Fetch all 11 MITE/Moodbidri PGs ordered by `distance_km ASC` | No |
| `GET` | `/api/properties/:slug` | Fetch a single property by slug with room tiers | No |
| `PATCH` | `/api/properties/rooms/:id/availability` | Adjust available bed count & recalculate property totals | Yes (Admin) |
| `POST` | `/api/bookings` | Submit booking, video tour, or agent callback request | No |
| `GET` | `/api/bookings` | Retrieve agent lead queue with optional `status` / `property_id` filters | Yes (Admin) |
| `PATCH` | `/api/bookings/:id/status` | Transition agent lead status | Yes (Admin) |
| `GET` | `/api/events` | Retrieve student community events | No |
| `POST` | `/api/newsletter` | Register email for MITE bed vacancy alerts | No |
| `GET` | `/api/stats` | Retrieve live occupancy, bed counts & agent pipeline stats | No |

---

## 2. Authentication Contract
Protected `/admin` API routes expect a Bearer token:
```http
Authorization: Bearer campus-admin-secret-2026
```

---

## 3. Key Zod Validation Contracts

### 3.1 `POST /api/bookings`
```typescript
export const createBookingSchema = z.object({
  property_id: z.number().int().positive(),
  room_type_id: z.number().int().positive(),
  full_name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/),
  applicant_role: z.enum(['Student', 'Guardian', 'Other']),
  tour_type: z.enum(['On-Site', 'Virtual', 'Agent Callback']),
  preferred_move_in: z.string().min(1),
  notes: z.string().max(500).optional()
});
```
- Creates record with initial status `'New Lead'` and unique reference code `CN-2026-XXXX`.

### 3.2 `PATCH /api/bookings/:id/status`
```typescript
export const updateBookingStatusSchema = z.object({
  status: z.enum(['New Lead', 'Contacted Owner', 'Tour Scheduled', 'Confirmed', 'Cancelled'])
});
```

### 3.3 `PATCH /api/properties/rooms/:id/availability`
```typescript
export const updateRoomAvailabilitySchema = z.object({
  delta: z.number().int().min(-50).max(50).optional(),
  available_count: z.number().int().min(0).max(500).optional(),
}).refine(data => data.delta !== undefined || data.available_count !== undefined);
```
