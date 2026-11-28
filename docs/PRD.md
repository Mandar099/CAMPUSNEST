# CAMPUSNEST — PRODUCT REQUIREMENTS DOCUMENT (PRD)

## 1. Executive Summary & Product Vision
**CampusNest** is a verified student accommodation directory and zero-brokerage agent-mediated booking platform serving **MITE (Mangalore Institute of Technology & Engineering)** students and guardians across **Badagumijaru, Todaru, and Moodbidri town, Karnataka**.

Unlike generic rental aggregators with stale listings and unverified phone numbers, CampusNest combines exact MITE gate commute distances, live bed inventory, transparent monthly INR mess/AC cost estimators, a 4-photo deep-dive inspection modal, side-by-side stay comparisons, and local agent coordination into an editorial hospitality experience.

---

## 2. Target Personas & User Stories

### Persona 1: Prospective Student (Primary Consumer)
- **Profile:** 18–23-year-old B.E. / M.Tech / MBA student joining MITE Moodbidri.
- **Pain Points:** Unclear distances from Badagumijaru campus, surprise mess/AC charges, unavailable PG phone numbers, and lack of verified photos before travel.
- **User Stories:**
  - *As a student*, I want to filter all 11 Moodbidri PGs and hostels by category (`Boys`, `Ladies`, `On-Campus`, `Pure Veg`, `Under 4 km from MITE`, `Has Direct Phone`), maximum distance, and budget in ₹.
  - *As a student*, I want to inspect a 4-photo gallery (`Exterior`, `Bedroom`, `Study & Wi-Fi`, `Dining & Mess`), nearby MITE landmarks, house rules, and transparent deposit/mess calculations.
  - *As a student*, I want to compare up to 3 stays side-by-side and book an agent-coordinated tour, live video walkthrough, or callback with an instant `CN-2026-XXXX` reservation pass and one-click WhatsApp agent handoff.

### Persona 2: Guardian / Parent (Decision Maker & Trust Anchor)
- **Profile:** Parent funding housing, focused on safety, curfew timing, pure-veg dining, and power/water reliability.
- **User Stories:**
  - *As a guardian*, I want immediate visibility into curfew rules, food plans (`4-Meal Campus Mess Included`, `Pure Veg Home-Style Mess`, etc.), Wi-Fi speeds, and power backup per stay.
  - *As a guardian*, I want direct click-to-call owner phone links where published, and reliable CampusNest agent mediation where owners operate via on-site caretakers (`Contact via CampusNest Agent`).

### Persona 3: Moodbidri Agent & Operations Admin
- **Profile:** Local CampusNest coordinator verifying bed counts, calling owners, scheduling student tours, and locking rates at ₹0 brokerage.
- **User Stories:**
  - *As an agent admin*, I want to manage lead statuses (`New Lead` → `Contacted Owner` → `Tour Scheduled` → `Confirmed` → `Cancelled`), look up PG owner contacts, and adjust live bed counts per room tier.

---

## 3. Implemented Features
1. **Interactive Hero Availability Bar:** Filter by PG category, max distance from MITE (`≤ 1.5 km`, `≤ 4.0 km`, `≤ 4.8 km`, all), and monthly budget (`₹4,800`–`₹12,000`).
2. **3-Step "How CampusNest Agent Works" Visual Strip:** Clear overview of Compare → Schedule Visit/Callback → Lock Rate at ₹0 brokerage.
3. **MITE & Moodbidri 11-PG Directory (`LocationsGrid`):**
   - Sorted closest to MITE (`0.35 km` to `5.3 km`) by default, with sort controls (`Nearest to MITE`, `Rent: Low to High`, `Most Beds Left`).
   - Quick filter pills (`All (11)`, `Boys`, `Ladies`, `On-Campus`, `Under 4 km from MITE`, `Has Direct Phone`, `Pure Veg`) + keyword search.
   - Direct `tel:` owner call links, Google Maps pin links, WhatsApp Agent handoff buttons, and up-to-3 side-by-side `ComparisonModal`.
4. **4-Photo Property Detail Modal (`PropertyDetailModal`):** Gallery tab switcher (`Exterior`, `Bedroom`, `Study & Wi-Fi`, `Dining & Mess`), fee transparency breakdown, nearby MITE landmarks, house rules, and direct booking triggers.
5. **Room Configurations & True Monthly Cost Estimator (`RoomCarousel`):** Live 2D CAD floor-plan toggle, sharing tier + mess plan + AC estimator, and full pricing modal.
6. **4-Step Agent Booking Drawer (`BookingDrawer`):** Est. monthly rent calculator, Zod-validated applicant inputs, tour/callback mode selection, instant `CN-2026-XXXX` pass, 1-page `@media print` pass isolation, and WhatsApp Agent handoff.
7. **Admin Console (`AdminDashboard` at `#admin` / `/admin`):** Lead pipeline management, owner contact directory, and live bed inventory updates.
8. **Offline / Serverless Resilience:** `fallbackProperties.ts` mirrors all 11 PGs and 33 room tiers seamlessly when deployed to serverless hosts like Vercel without persistent disk.
