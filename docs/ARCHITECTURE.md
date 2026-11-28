# CAMPUSNEST — TECHNICAL ARCHITECTURE SPECIFICATION

## 1. System Topology & Repository Layout
CampusNest is a TypeScript monorepo combining a React 19 + Vite frontend (`client/`) and an Express + `node:sqlite` backend (`server/`), configured for multi-service deployment on Vercel (`vercel.json`).

```text
campus-nest/
├── docs/                       # Architectural specifications, PRD, & API contracts
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN_SYSTEM.md
│   ├── API_SPEC.md
│   └── TASKS.md
├── client/                     # React 19 + TypeScript + Tailwind v3 + Vite
│   ├── public/
│   │   ├── fonts/              # Self-hosted WOFF2 fonts (Inter, Plus Jakarta Sans, Space Grotesk)
│   │   ├── images/             # Curated local PG building, bedroom, study & mess photography
│   │   └── favicon.svg         # Brand mark
│   └── src/
│       ├── components/
│       │   ├── Preloader.tsx           # Entrance brand reveal with reduced-motion bypass
│       │   ├── Navbar.tsx              # Sticky glassmorphic header + live bed count + Admin toggle
│       │   ├── Hero.tsx                # Split hero + MITE commute map + availability filter bar
│       │   ├── AgentWorkflowStrip.tsx  # 3-step zero-brokerage agent coordination strip
│       │   ├── LocationsGrid.tsx       # 11-PG Moodbidri directory, filters, sort & compare bar
│       │   ├── PropertyDetailModal.tsx # 4-photo gallery, landmarks, rules & fee breakdown modal
│       │   ├── ComparisonModal.tsx     # Side-by-side comparison matrix (up to 3 stays)
│       │   ├── AmenitiesBento.tsx      # 4-pillar living verification grid
│       │   ├── RoomCarousel.tsx        # Room tiers, 2D floor plans & monthly cost/mess calculator
│       │   ├── CommunitySection.tsx    # MITE events & student orientation feed
│       │   ├── BookingDrawer.tsx       # 4-step slide-over booking drawer + CN-2026-XXXX pass
│       │   ├── ArchitecturalArt.tsx    # MITE corridor SVG map, CAD floor plans & SVG fallbacks
│       │   └── Footer.tsx              # Moodbidri zone directory, MITE FAQ accordion & newsletter
│       ├── data/
│       │   └── fallbackProperties.ts   # Synchronized 11-PG / 33-room static fallback dataset
│       ├── lib/
│       │   ├── api.ts                  # Typed API client with transparent serverless fallback
│       │   ├── whatsapp.ts             # Deep-link builders for Moodbidri agent WhatsApp & Maps pins
│       │   └── motion.ts               # GSAP, ScrollTrigger & Lenis smooth scroll helpers
│       ├── pages/
│       │   ├── Home.tsx                # Public directory landing page
│       │   └── AdminDashboard.tsx      # Agent lead pipeline & room bed inventory console
│       ├── types/index.ts              # Shared TypeScript interfaces
│       ├── App.tsx                     # Root view & booking drawer state coordinator
│       └── index.css                   # Self-hosted @font-face, Tailwind & @media print rules
├── server/                     # Express + TypeScript + node:sqlite API
│   └── src/
│       ├── db/
│       │   ├── connection.ts           # node:sqlite singleton (WAL mode + Vercel /tmp bootstrap)
│       │   ├── schema.sql              # Relational DDL for properties, rooms, bookings, events
│       │   └── seed.ts                 # Idempotent 11-PG Moodbidri/MITE database seeder
│       ├── middleware/
│       │   ├── validate.ts             # Zod body validation middleware
│       │   └── adminAuth.ts            # Bearer token authentication middleware
│       ├── routes/
│       │   ├── properties.ts           # Property queries & admin bed count transactions
│       │   ├── bookings.ts             # Agent booking/callback submission & status workflow
│       │   └── community.ts            # Events, newsletter, & occupancy telemetry
│       └── index.ts                    # Express server bootstrap
├── vercel.json                 # Multi-service Vercel deployment & SPA rewrite rules
└── package.json                # Root workspace scripts
```

---

## 2. Database Engine (`node:sqlite`)
- **WAL & Integrity Pragmas:** `PRAGMA foreign_keys = ON;`, `PRAGMA journal_mode = WAL;`, `PRAGMA busy_timeout = 5000;`, `PRAGMA synchronous = NORMAL;`
- **Serverless Cold-Start Copy:** When `process.env.VERCEL` is truthy, `connection.ts` copies the pre-seeded `server/data/campusnest.db` into `/tmp/campusnest.db` for ephemeral read/write operation.
- **Schema Evolution Guard:** `initDatabase()` checks for the Moodbidri directory columns (`distance_km`, `category`, `image_url`, `food_plan`) and agent workflow statuses (`New Lead`) and refreshes legacy schemas cleanly before seeding.

---

## 3. Asset & Offline Resilience Architecture
1. **Self-Hosted Fonts & Local Photography:** All WOFF2 fonts (`/fonts/*`) and PG/amenity photographs (`/images/*`) live locally in `client/public/` with zero external runtime CDN dependencies.
2. **SVG Fallback Layer:** Every `<img>` wraps an `onError` handler that seamlessly degrades to deterministic geometric illustrations in `ArchitecturalArt.tsx`.
3. **API Fallback:** `client/src/lib/api.ts` falls back to `FALLBACK_PROPERTIES` and `buildFallbackBookingResponse()` if the backend API is unreachable, preserving full interactive filtering, cost calculation, and booking pass generation.
