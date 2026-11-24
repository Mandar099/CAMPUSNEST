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

Design-led student accommodation and co-living platform built for collegiate hubs in South India (Moodbidri near MITE, Mangaluru near NITK Surathkal, Manipal near MIT/KMC, and Bengaluru in Electronic City).

---

## 🌟 Highlights & Features

- **Architectural Vector Visuals:** 100% custom SVG architectural drawings and interactive 2D CAD floor plans with zero reliance on third-party image hosts.
- **Interactive Availability Bar:** Filter residences in real time by collegiate campus, room configuration, and monthly budget.
- **All-Inclusive Living Bento:** Filterable grid detailing high-speed Wi-Fi, biometric security, backup power, automated laundry, and chef-curated dining.
- **Room Tier & Floor Plan Carousel:** Toggle between room specifications and CAD architectural floor plans showing layouts and dimensions.
- **Multi-Step Slide-Over Booking Drawer:** Step-by-step reservation workflow generating reference codes (`CN-2026-XXXX`) and printable passes.
- **Operational Admin Console (`/admin`):** Filter bookings, update applicant statuses, and adjust room inventory counters in real time.

---

## 🚀 Quick Start (2-Command Setup)

```bash
git clone https://github.com/Mandar099/CAMPUSNEST.git
cd CAMPUSNEST
npm install
npm run dev
```

- **Frontend:** http://localhost:5173
- **Admin Console:** http://localhost:5173/#admin (Credentials: `admin@campusnest.in` / `campus2026`)
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
│   ├── src/
│   │   ├── components/         # Hero, Bento, Carousel, Drawer, Art, Navbar, Footer
│   │   ├── pages/              # Home and AdminDashboard
│   │   ├── lib/                # API client and GSAP/Lenis motion configuration
│   │   └── types/              # TypeScript domain interfaces
├── server/                     # Node.js + Express + SQLite
│   ├── src/
│   │   ├── db/                 # Connection, relational schema, seed script
│   │   ├── middleware/         # Zod validation and admin auth
│   │   └── routes/             # Properties, bookings, and community endpoints
├── package.json                # Monorepo orchestration scripts
└── README.md
```

---

## 📋 API Overview

- `GET /api/properties` — Fetch all properties with room suites and live bed availability
- `GET /api/properties/:slug` — Retrieve single property details
- `PATCH /api/properties/rooms/:id/availability` — Adjust room bed counts (Admin)
- `POST /api/bookings` — Submit a booking / schedule a tour
- `GET /api/bookings` — List bookings with filters (Admin)
- `PATCH /api/bookings/:id/status` — Update booking status (Admin)
- `GET /api/events` — Retrieve community events schedule
- `POST /api/newsletter` — Subscribe email for admission alerts
- `GET /api/stats` — Retrieve operational statistics

---

## 📖 Architectural Documentation

Full technical specifications are documented in the `/docs` folder:
- [PRD.md](docs/PRD.md)
- [ARCHITECTURE.md](docs/ARCHITECTURE.md)
- [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)
- [API_SPEC.md](docs/API_SPEC.md)
- [TASKS.md](docs/TASKS.md)
