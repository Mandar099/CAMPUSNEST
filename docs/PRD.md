# CAMPUSNEST — PRODUCT REQUIREMENTS DOCUMENT (PRD)

## 1. Executive Summary & Product Vision
**CampusNest** is an all-inclusive, design-led student accommodation and co-living platform built specifically for premier collegiate and tech hubs in South India: **Moodbidri** (near MITE), **Mangaluru** (Surathkal Tech Corridor), **Manipal** (Eshwar Nagar / MIT hub), and **Bengaluru** (Electronic City Phase 1).

Unlike fragmented hostel booking directories or generic rental portals, CampusNest delivers an editorial modern architectural hospitality experience. It pairs institutional-grade security and academic-focused amenities with a seamless digital journey—combining real-time bed inventory, transparent all-inclusive INR pricing, multi-channel booking, and an operational property management dashboard.

---

## 2. Target Personas & User Stories

### Persona 1: Prospective Student (Primary Consumer)
- **Profile:** 18–23-year-old undergraduate or postgraduate engineering/design/medical student relocating away from home.
- **Pain Points:** Hidden utility fees, unreliable Wi-Fi, cramped noisy rooms, lack of hygienic food, and unclear availability before travel.
- **User Stories:**
  - *As a student*, I want to filter residences by campus proximity, room tier (Solo Studio, Twin Pod, Balcony Loft), and maximum monthly budget in ₹, so that I find housing suited to my budget without cross-referencing maps.
  - *As a student*, I want to inspect 2D architectural floor plans, furnishing specifications, and bed availability before visiting.
  - *As a student*, I want to reserve a room or schedule an on-site/virtual tour online and receive an instant booking pass with a verifiable reference code.

### Persona 2: Guardian / Parent (Decision Maker & Trust Anchor)
- **Profile:** 42–55-year-old parent funding accommodation, deeply concerned with safety, nutritional quality, and academic discipline.
- **Pain Points:** Safety ambiguity, unauthorized guest policies, unhygienic kitchens, unvetted roommates, and opaque deposit refund terms.
- **User Stories:**
  - *As a guardian*, I want clear verification of 24/7 biometric security, continuous CCTV monitoring, on-premise warden presence, and power backup.
  - *As a guardian*, I want full visibility into all-inclusive costs (rent, high-speed Wi-Fi, housekeeping, laundry, chef-curated mess meals, security deposit) without hidden electricity surcharges.
  - *As a guardian*, I want the option to book a guided virtual or on-site tour before executing a financial commitment.

### Persona 3: Property Operations Admin (Internal Stakeholder)
- **Profile:** CampusNest residence manager overseeing occupancy, resident check-ins, room allocations, and maintenance.
- **Pain Points:** Spreadsheets going out of sync, double-booking rooms during peak admission weeks, and manual follow-ups on tour leads.
- **User Stories:**
  - *As a property manager*, I want an executive operational dashboard displaying live bed counts and applicant queues filtered by property and status.
  - *As a property manager*, I want to transition booking statuses (`Pending` → `Confirmed` → `Visited` → `Cancelled`) with instant persistence to SQLite.
  - *As a property manager*, I want to manually adjust room inventory and bed availability counters when walk-in allocations happen.

---

## 3. Scope & Feature Requirements

### 3.1 Public Guest Experience
1. **Interactive Hero Availability Bar:**
   - Multi-criteria filter: Campus/City selector, Room Tier, Max Monthly Budget (₹).
   - Instant smooth scroll to matching properties with automated room highlighting.
2. **Campus Properties Showcase:**
   - 4 foundational properties:
     - *CampusNest Parkside* (Moodbidri — 400m from MITE)
     - *CampusNest Harbor View* (Mangaluru — Surathkal Tech Corridor)
     - *CampusNest Scholar's Loft* (Manipal — Eshwar Nagar)
     - *CampusNest Innovation Hub* (Bengaluru — Electronic City Phase 1)
   - Metrics: Distance to campus (meters/km), starting rent, total vs. available beds, neighborhood badges.
3. **All-Inclusive Living Bento Grid:**
   - Categorized tabs: Academic & Wi-Fi (1 Gbps redundant line, acoustic study booths), 24/7 Security (biometric turnstiles, warden desk), Smart Living (app-driven laundry, 100% DG power backup), Food & Wellness (4-meal chef-crafted regional menu, fitness loft).
4. **Room Tier & Floor Plan Carousel:**
   - High-fidelity room cards with area (sq.ft), monthly rent (₹), deposit (₹), live inventory counter, and feature pills.
   - Interactive 2D architectural floor plan preview toggle per room tier.
   - All-Inclusive Pricing Modal detailing complete breakdown with zero surprise fees.
5. **Community Rhythm & Events Feed:**
   - Campus events feed (Hackathon nights, wellness yoga, community dinners, career talks) with live remaining spot indicators.
6. **Multi-Step Slide-Over Booking Drawer:**
   - Step 1: Property and room tier pre-selection.
   - Step 2: Personal information (Full name, student/guardian role, verified contact).
   - Step 3: Tour type selection (On-Site physical walk-through or 360° virtual live call) and move-in date.
   - Step 4: Submission with instant generation of format `CN-2026-XXXX`, printable/copyable confirmation pass.
7. **Newsletter & Community Subscription:**
   - Email subscription for campus admission alert updates.

### 3.2 Property Admin Experience
1. **Protected Dashboard Access (`/admin`):**
   - Streamlined authentication with pre-filled reviewer demo credentials (`admin@campusnest.in` / `campus2026`).
2. **Operations Summary Metrics:**
   - Real-time aggregate statistics: Total Properties, Total Bed Capacity, Occupancy Rate %, Pending Applications, Confirmed Bookings.
3. **Bookings Management Table:**
   - Sortable, searchable table displaying applicant details, property, room tier, tour preference, move-in target, and status badge.
   - Actionable status transitions (`Pending` -> `Confirmed` -> `Visited` -> `Cancelled`) via direct API calls.
4. **Room Inventory Control:**
   - Live increment/decrement controls for available beds per room tier with real-time database synchronisation.

---

## 4. Acceptance Criteria & Non-Functional Requirements

### 4.1 Functional Acceptance Criteria
- **AC-1:** Form validation rejects malformed email addresses, Indian phone numbers not conforming to 10 digits, and missing applicant roles using strict Zod schemas on both client and server.
- **AC-2:** Submitting a booking immediately persists a record in SQLite and returns a status 201 response containing a unique `CN-2026-XXXX` reference code.
- **AC-3:** Updating bed availability via Admin immediately reflects on the public landing page bed counters without requiring a server reboot.
- **AC-4:** Filter bar updates smoothly recalculate matched listings and scroll into view.

### 4.2 Non-Functional Criteria
- **Zero External Image Dependencies:** 100% custom SVG architectural illustrations and CSS geometric drawings to prevent external CDN/Unsplash 404s.
- **Performance:** Sub-200ms API response time on SQLite queries with WAL mode enabled.
- **Accessibility & Motion:** All animations must respect `prefers-reduced-motion: reduce`. Keyboard navigable inputs and full ARIA drawer states.
- **Data Integrity:** Foreign key enforcement in SQLite (`PRAGMA foreign_keys = ON`).

---

## 5. Edge Cases & Error Handling
1. **Zero Availability:** When available beds reach 0, the room tier displays a prominent `Waitlist Only` status badge and the booking drawer marks the selection as waitlist confirmation.
2. **Concurrent Booking Attempts:** SQLite WAL mode ensures transactional safety and thread-safe serial writes.
3. **Invalid Parameter Queries:** Properties and bookings endpoints return standardized JSON errors (`{ error: string, details?: any }`) with status codes 400, 404, or 500.
4. **Network Glitches / Offline:** Frontend API wrapper intercepts connection timeouts and displays user-friendly retry banners.
