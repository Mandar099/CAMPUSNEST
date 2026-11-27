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

- **11 Verified MITE & Moodbidri PGs / Hostels:** Real Moodbidri listings ordered by exact distance (`0.35 km` to `5.3 km`) and travel time (`1 min` to `13 mins`) from MITE campus, with category badges (`On-Campus Hostel`, `Boys PG`, `Ladies PG`, `Boys Hostel`, `Lodge & PG`, `PG`), full addresses, and direct `tel:` links or `"Contact via CampusNest Agent"` handling.
- **Agent-Mediated Booking Flow:** Prominent **"Verified by CampusNest Agent"** trust guarantee, primary **"Book via Agent"** drawer pre-filled with the selected PG, direct **"Call PG"** links when available, and **"Request Agent Callback"** workflows.
- **Interactive Availability & Directory Filtering:** Filter by PG/Hostel category, maximum distance from MITE (`km`), maximum monthly budget (`₹`), or search by PG name and road, plus sort by distance, rent, or bed count.
- **Room Tiers & 2D CAD Floor Plans:** Toggle between isometric room specs and 2D CAD architectural floor plans with transparent fee breakdowns.
- **Multi-Step Slide-Over Booking Drawer:** Guided workflow generating unique reference codes (`CN-2026-XXXX`) and printable boarding passes.
- **Agent Operations Console (`/admin`):**
  - **Student Leads & Owner Handoff:** Displays each student's contact details directly next to the PG owner's click-to-call phone number (or field-visit indicator) and supports agent pipeline transitions (`New Lead` → `Contacted Owner` → `Tour Scheduled` → `Confirmed` → `Cancelled`).
  - **Owner Directory & Live Bed Inventory:** Complete 11-property owner reference table with live `+` / `-` bed inventory controls persisted in SQLite.
- **Self-Hosted Typography & Custom SVG Art:** Zero external image or CDN font dependencies—all architectural elevations, MITE corridor maps, and WOFF2 fonts ship locally.

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
│   ├── public/fonts/           # Self-hosted Inter, Plus Jakarta Sans & Space Grotesk WOFF2
│   └── src/
│       ├── components/         # Hero, LocationsGrid, AmenitiesBento, RoomCarousel, BookingDrawer, ArchitecturalArt, Navbar, Footer
│       ├── pages/              # Home and AdminDashboard (Lead Handoff + Owner Directory)
│       ├── lib/                # API client and GSAP/Lenis motion configuration
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
