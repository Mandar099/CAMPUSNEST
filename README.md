# CampusNest — Smart Student Housing & Co-Living Platform

![Status](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-38b2ac)
![GSAP](https://img.shields.io/badge/Motion-GSAP_%26_Lenis-green)
![Node](https://img.shields.io/badge/Node.js-24-green)
![Express](https://img.shields.io/badge/Express-4.21-lightgrey)
![SQLite](https://img.shields.io/badge/SQLite-WAL_Mode-003b57)
![Zod](https://img.shields.io/badge/Validation-Zod-306998)

Verified student accommodation directory and agent-mediated booking platform serving **MITE (Mangalore Institute of Technology & Engineering)** and **Moodbidri**, Karnataka (Badagumijaru, Todaru, Rathnakaravarni Nagara, Masthikate Road, Bus Stand Road, Ponnechari Road, and Hanumanth Nagar).

---

## 🌟 Highlights & Agent Intermediary Features

- **11 Verified MITE & Moodbidri PGs / Hostels:** Real Moodbidri listings sorted closest to MITE first (`0.35 km` to `5.3 km`, `1 min` to `13 mins`), with category badges (`On-Campus Hostel`, `Boys PG`, `Ladies PG`, `Boys Hostel`, `Lodge & PG`, `PG`), living rules & parent-trust chips (`Pure Veg`, `On-Campus`, curfew timing, Wi-Fi speed, power backup), commute tags, Google Maps pins, and direct `tel:` links or `"Contact via CampusNest Agent"` handling.
- **3 Realistic Room Tiers & True Monthly Cost Estimator:** Every property includes **Single**, **Twin Sharing**, and **Triple Sharing** room configurations with live bed counts, 2D CAD floor plans, and an interactive **Monthly Cost & Mess Calculator** (Room Sharing Tier + Mess Plan + AC / Non-AC + Deposit).
- **Side-by-Side PG Comparison Tray & Modal:** Select up to 3 PGs on cards to compare Distance from MITE, Travel Time, Monthly Rent range, Refundable Deposit, Food/Pure-Veg status, Curfew timings, Wi-Fi, Power Backup, and Direct Contact side-by-side.
- **Quick Filter Pills & Search:** Instant pills above the directory (`All (11)`, `Boys`, `Ladies`, `On-Campus`, `Under 4 km from MITE`, `Has Direct Phone`) plus search by PG name, road, or Pure Veg plan.
- **Agent-Mediated Booking Drawer & One-Click WhatsApp Handoff:** Multi-step slide-over drawer generating unique reference codes (`CN-2026-XXXX`), printable boarding passes, and a pre-filled **WhatsApp Agent** handoff link.
- **Serverless Vercel Fallback Dataset:** Includes `client/src/data/fallbackProperties.ts` synchronized with `server/src/db/seed.ts` so Vercel deployments without a persistent SQLite disk always display all 11 Moodbidri properties, 33 room tiers, and community events.
- **Color-Matched Local Photography & Editorial Speeder Preloader:** Self-hosted `client/public/images/` photography graded to the warm alabaster (`#F7F5F0`) / terracotta (`#D95D39`) / sage (`#2E6F5E`) palette with SVG fallbacks, plus a scoped **Uiverse.io speeder preloader** (`anand_4957/moody-ladybug-99`, MIT License).
- **Agent Operations Console (`/admin`):**
  - **Student Leads & Owner Handoff:** Displays each student's contact details directly next to the PG owner's click-to-call phone number (or field-visit indicator) and supports agent pipeline transitions (`New Lead` → `Contacted Owner` → `Tour Scheduled` → `Confirmed` → `Cancelled`).
  - **Owner Directory & Live Bed Inventory:** Complete 11-property owner reference table with live `+` / `-` bed inventory controls persisted in SQLite.
- **Self-Hosted Typography & Custom SVG Art:** Zero external CDN font dependencies—all `Inter`, `Plus Jakarta Sans`, and `Space Grotesk` `.woff2` fonts, property photography, and fallback CAD SVG illustrations ship locally.

---

## 🚀 Quick Start (2-Command Setup)

```bash
git clone https://github.com/Mandar099/CAMPUSNEST.git
cd CAMPUSNEST
npm install
npm run dev
```

- **Frontend:** http://localhost:5173
- **Agent Operations Console:** http://localhost:5173/#admin (Demo Credentials: `admin@campusnest.in` / `campus2026`)
- **Backend API:** http://localhost:3001

---

## 📁 Repository Structure

```text
campus-nest/
├── docs/                       # Pre-build engineering specifications
│   ├── PRD.md                  # Requirements & user stories
│   ├── ARCHITECTURE.md         # System design & database schema
│   ├── DESIGN_SYSTEM.md        # Tokens, typography & motion rules
│   ├── API_SPEC.md             # Endpoints & Zod schemas
│   └── TASKS.md                # Task tracking & verification
├── client/                     # React 19 + TypeScript + Vite + Tailwind CSS
│   ├── public/
│   │   ├── fonts/              # Self-hosted Inter, Plus Jakarta Sans & Space Grotesk WOFF2
│   │   └── images/             # Color-matched local PG & amenity photography
│   └── src/
│       ├── components/         # Preloader, Hero, LocationsGrid, ComparisonModal, AmenitiesBento, RoomCarousel, BookingDrawer, ArchitecturalArt, Navbar, Footer
│       ├── data/               # Synchronized Vercel static fallback directory (fallbackProperties.ts)
│       ├── pages/              # Home and AdminDashboard (Lead Handoff + Owner Directory)
│       ├── lib/                # API client, WhatsApp/Maps helpers, GSAP/Lenis motion config
│       └── types/              # TypeScript domain interfaces
├── server/                     # Node.js + Express + SQLite
│   ├── src/
│   │   ├── db/                 # Connection, relational schema, Moodbidri/MITE seed script
│   │   ├── middleware/         # Zod validation and admin auth
│   │   └── routes/             # Properties, bookings (agent workflow), and community endpoints
├── vercel.json                 # Vercel multi-service configuration
├── package.json                # Monorepo orchestration scripts
└── README.md
```

---

## 📋 API Overview

- `GET /api/properties` — Fetch all 11 Moodbidri/MITE properties ordered by distance from MITE with room suites and live beds
- `GET /api/properties/:slug` — Retrieve single property details
- `PATCH /api/properties/rooms/:id/availability` — Adjust room bed counts (Agent/Admin)
- `POST /api/bookings` — Submit a booking, walkthrough, or Agent Callback request (`New Lead`)
- `GET /api/bookings` — List leads with joined PG owner phone & address details (Agent/Admin)
- `PATCH /api/bookings/:id/status` — Transition lead status (`New Lead` → `Contacted Owner` → `Tour Scheduled` → `Confirmed` → `Cancelled`)
- `GET /api/events` — Retrieve MITE/Moodbidri community meetups schedule
- `POST /api/newsletter` — Subscribe email for bed vacancy alerts
- `GET /api/stats` — Retrieve operational pipeline and bed metrics
