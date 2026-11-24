# CAMPUSNEST — TECHNICAL ARCHITECTURE SPECIFICATION

## 1. System Topology & Monorepo Layout
CampusNest operates as a unified, zero-overhead monorepo. It features a standalone Express + SQLite backend service and a modern React 19 + Vite frontend application running concurrently via `npm run dev`.

```text
campus-nest/
├── docs/                       # Architectural specifications & PRDs
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN_SYSTEM.md
│   ├── API_SPEC.md
│   └── TASKS.md
├── client/                     # Frontend Application
│   ├── public/
│   │   └── favicon.svg         # Architectural brand mark
│   ├── src/
│   │   ├── components/
│   │   │   ├── Preloader.tsx           # Entrance brand reveal
│   │   │   ├── Navbar.tsx              # Sticky glassmorphic header + live bed counter + CTA
│   │   │   ├── Hero.tsx                # Kinetic split hero + interactive availability bar
│   │   │   ├── LocationsGrid.tsx       # Campus property cards with college distance metrics
│   │   │   ├── AmenitiesBento.tsx      # Filterable bento grid (Study, Security, Smart Living, Food)
│   │   │   ├── RoomCarousel.tsx        # Swiper room-tier & 2D floor-plan gallery with live beds
│   │   │   ├── CommunitySection.tsx    # Asymmetric community rhythm & campus events feed
│   │   │   ├── BookingDrawer.tsx       # Multi-step slide-over drawer (Property -> Info -> Tour -> Pass)
│   │   │   ├── ArchitecturalArt.tsx    # Custom zero-dependency SVG architectural illustrations
│   │   │   └── Footer.tsx              # Campus directory, FAQ accordion & newsletter
│   │   ├── pages/
│   │   │   ├── Home.tsx                # Public high-conversion landing page
│   │   │   └── AdminDashboard.tsx      # Operational management console
│   │   ├── lib/
│   │   │   ├── api.ts                  # Typed client with retry & standardized error envelope
│   │   │   └── motion.ts               # GSAP, ScrollTrigger & Lenis smooth scroll bridge
│   │   ├── types/index.ts              # Shared domain models & interfaces
│   │   ├── App.tsx                     # Layout wrapper & routing handler
│   │   ├── index.css                   # Tailwind v3 directives & custom editorial tokens
│   │   └── main.tsx                    # React DOM entrypoint
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
├── server/                     # Backend Application
│   ├── src/
│   │   ├── db/
│   │   │   ├── connection.ts           # better-sqlite3 singleton with WAL mode & PRAGMAs
│   │   │   ├── schema.sql              # Relational DDL definitions & foreign keys
│   │   │   └── seed.ts                 # Idempotent database seeder
│   │   ├── middleware/
│   │   │   ├── validate.ts             # Zod schema validation middleware
│   │   │   └── adminAuth.ts            # Basic/Bearer demo authentication middleware
│   │   ├── routes/
│   │   │   ├── properties.ts           # Property queries & room availability updates
│   │   │   ├── bookings.ts             # Booking creation, retrieval & status transitions
│   │   │   └── community.ts            # Events schedule & newsletter subscriptions
│   │   └── index.ts                    # Express bootstrap & HTTP server listen
│   ├── package.json
│   └── tsconfig.json
├── .env.example
├── package.json                # Root orchestration scripts
└── README.md
```

---

## 2. Relational Database Schema (SQLite via `better-sqlite3`)

### 2.1 Pragmas & Performance Configuration
- `PRAGMA journal_mode = WAL;` (Write-Ahead Logging ensures non-blocking concurrent reads during writes).
- `PRAGMA foreign_keys = ON;` (Ensures relational integrity between properties, rooms, and bookings).
- `PRAGMA busy_timeout = 5000;` (Graceful lock retry under write pressure).
- `PRAGMA synchronous = NORMAL;` (Optimal durability balance).

### 2.2 Relational Entity Schema (`schema.sql`)

```sql
-- 1. Properties
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

-- 2. Room Types
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

-- 3. Bookings
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

-- 4. Community Events
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT CHECK(category IN ('Hackathon Night', 'Wellness', 'Community Dinner', 'Career Talk')) NOT NULL,
  property_name TEXT NOT NULL,
  event_date TEXT NOT NULL,
  spots_remaining INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. Newsletter Subscribers
CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. Data Flow & State Lifecycle

```
[ User Interaction ] ──> [ React Client (Vite / Port 5173) ]
                               │
                      (Typed API Client)
                               │ HTTP / JSON
                               ▼
                   [ Express Server (Port 3001) ]
                               │
                   ├──> [ Zod Validation Middleware ]
                   ├──> [ Route Controllers (Properties/Bookings) ]
                   │            │
                   │            ▼
                   └──> [ better-sqlite3 WAL Database ]
                                │
                        (Auto-seeded data)
```

1. **Initial Hydration:**
   - Client requests `GET /api/properties` and `GET /api/events`.
   - SQLite queries aggregate property stats and room tier counts via relational joins.
   - Live bed count badge in the Navbar dynamically displays total available beds across all hubs.
2. **Interactive Filtering:**
   - Filter state (`city`, `tier`, `budget`) executes client-side over hydrated data for instant zero-latency visual feedback, smoothly scrolling to target property cards.
3. **Booking Submission:**
   - Client validates user payload using Zod before issuing `POST /api/bookings`.
   - Server re-validates payload with Zod middleware.
   - Server generates cryptographic collision-resistant `CN-2026-XXXX` reference code.
   - Inserts booking within a transaction and returns status `201 Created` with booking receipt pass.
4. **Admin Inventory Control:**
   - Admin triggers `PATCH /api/rooms/:id/availability`.
   - SQLite updates `room_types.available_count` and recalculates aggregate `properties.available_beds`.
   - Returns updated room object for live UI reflection.

---

## 4. Security & Error Handling Architecture
- **Admin Protection:** Simple, fail-safe bearer/token checking middleware (`adminAuth.ts`) verifying demo credentials (`Bearer campus-admin-secret-2026` or configured `.env`).
- **Input Sanitization & Validation:** All user inputs pass through strict Zod schemas ensuring email formatting, 10-digit Indian telephone matching (`^[6-9]\d{9}$`), and date conformity.
- **CORS & Environment:** Express configured with `cors({ origin: '*' })` during local development, customizable via `CLIENT_URL`.
- **Zero Asset Failures:** Illustrated visual architecture embedded directly into JSX/SVG components, eliminating third-party image hosting outages.
