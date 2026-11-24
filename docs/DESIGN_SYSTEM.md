# CAMPUSNEST — EDITORIAL DESIGN SYSTEM & MOTION SPECIFICATION

## 1. Design Philosophy: Architectural Editorial Modernism
CampusNest's visual language merges contemporary European student-living aesthetics (`units.gr` spatial rhythm, brutalist architectural grid lines, warm tactile surfaces) with functional Indian collegiate practicality. Every element balances calm scholastic focus with kinetic energy.

---

## 2. Color Palette & Semantic Tokens

### 2.1 Core Palette
| Token Name | Hex Code | Tailwind Token | Semantic Usage |
| :--- | :--- | :--- | :--- |
| **Warm Alabaster** | `#F7F5F0` | `bg-sand-50` / `bg-alabaster` | Primary page canvas, warm stone surfaces |
| **Pure Card Surface** | `#FFFFFF` | `bg-white` | Elevated unit cards, modals, interactive drawer |
| **Deep Charcoal Ink** | `#141517` | `text-obsidian` / `bg-obsidian` | High-contrast typography, dark footers, buttons |
| **Muted Slate** | `#5A5E66` | `text-slate-600` | Secondary copy, metadata, distance labels |
| **Terracotta Accent** | `#D95D39` | `bg-terracotta` / `text-terracotta` | Primary call-to-actions, badges, highlight strokes |
| **Sage Status Green** | `#2E6F5E` | `bg-sage` / `text-sage` | Active bed availability, confirmed status badges |
| **Amber Caution** | `#D97706` | `bg-amber-600` | "Filling Fast" urgency indicators |
| **Parchment Border** | `#E5E0D8` | `border-sand-200` | Subtle architectural wireframe borders |

---

## 3. Typography & Hierarchy

### 3.1 Font Families
- **Display Headings:** `'Plus Jakarta Sans'`, sans-serif (Weights: 600, 700, 800)
- **Architectural Mono Details:** `'Space Grotesk'`, monospace/sans-serif (Weights: 500, 600)
- **Body & Interface:** `'Inter'`, sans-serif (Weights: 400, 500, 600)

### 3.2 Scale & Rhythm
- **Display 1 (Hero Headlines):** `clamp(2.75rem, 6vw, 4.5rem)` / Line-height: `1.05` / Tracking: `-0.03em`
- **Heading 2 (Section Titles):** `clamp(1.85rem, 4vw, 2.75rem)` / Line-height: `1.15` / Tracking: `-0.02em`
- **Heading 3 (Property / Unit Cards):** `1.35rem` / Line-height: `1.3` / Tracking: `-0.01em`
- **Body Regular:** `1.0rem` / Line-height: `1.6` / Weight: `400`
- **Microcopy / Metric Badges:** `0.75rem` / Line-height: `1.2` / Tracking: `0.05em` / Uppercase

---

## 4. Architectural Art & SVG Blueprint Guidelines
To ensure 100% uptime with zero external image reliance:
1. **Geometric Precision:** All property visuals are authored as SVG blueprints featuring elevation lines, room dimensions, glass facade reflections, and interior floor plan wireframes.
2. **Warm Gradients:** SVG fills use multi-stop linear gradients transitioning from warm alabaster (`#F7F5F0`) to subtle terracotta tinted tones (`#FDF2EC`) and sage greens (`#F0FDF4`).
3. **Interactive 2D Floor Plans:** Interactive toggle switches between exterior isometric architectural art and detailed 2D CAD-style floor plans displaying bed, study desk, en-suite bathroom, and window placement.

---

## 5. Motion Choreography (GSAP, ScrollTrigger & Lenis)

### 5.1 Lenis Smooth Scroll Configuration
```typescript
import Lenis from 'lenis';

export const initLenis = () => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  return lenis;
};
```

### 5.2 Kinetic Entrance & Scroll Rules
- **Hero Stagger:** Stagger split lines of hero typography using GSAP timeline (`y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power3.out"`).
- **Parallax Accent Badges:** Floating college distance badges gently translate at `0.15x` scroll velocity.
- **Card Hover Elevation:** Clean `transform: translateY(-4px)` with box shadow elevation `0 20px 25px -5px rgba(20, 21, 23, 0.08)`.
- **Reduced Motion Respect:**
  ```typescript
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Disable or simplify GSAP animations
  }
  ```
- **Context Teardown:** Every `gsap.context()` in React components must invoke `ctx.revert()` in the `useEffect` cleanup hook to prevent memory leaks.

---

## 6. Layout Breakpoints & Spacing Grid
- **Container Max-Width:** `max-w-7xl` (`1280px`) with dynamic padding:
  - Mobile (`<640px`): `px-4` (`16px`)
  - Tablet (`640px - 1024px`): `px-8` (`32px`)
  - Desktop (`>1024px`): `px-12` (`48px`)
- **Vertical Section Rhythm:** `py-20` to `py-28` (`80px` to `112px`) for generous spatial breathing room.
