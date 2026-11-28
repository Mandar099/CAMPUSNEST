import React, { useEffect, useRef, useState } from 'react';
import { Search, MapPin, ShieldCheck, SlidersHorizontal, Navigation } from 'lucide-react';
import gsap from 'gsap';
import { isReducedMotion } from '../lib/motion';
import { MiteCorridorMap } from './ArchitecturalArt';

interface HeroProps {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  maxDistanceKm: number;
  onDistanceChange: (km: number) => void;
  maxBudget: number;
  onBudgetChange: (budget: number) => void;
  matchingCount: number;
  onSearch: () => void;
  onOpenBooking: (propertyId?: number, roomId?: number, mode?: 'booking' | 'callback') => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedCategory,
  onCategoryChange,
  maxDistanceKm,
  onDistanceChange,
  maxBudget,
  onBudgetChange,
  matchingCount,
  onSearch,
  onOpenBooking
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [heroImgError, setHeroImgError] = useState(false);

  useEffect(() => {
    if (isReducedMotion() || !headlineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative pt-10 pb-16 md:pt-14 md:pb-24 architectural-grid border-b border-parchment-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Split Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-12">

          {/* Left Column: High-Contrast Display Typography */}
          <div className="lg:col-span-7">
            <h1 ref={headlineRef} className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-obsidian leading-[1.06] mb-5 text-balance">
              <span className="hero-stagger block">Verified Student Stays</span>
              <span className="hero-stagger block text-terracotta">Around MITE, Moodbidri.</span>
            </h1>

            <p className="hero-stagger text-base sm:text-lg text-slate-700 max-w-2xl leading-relaxed mb-7">
              CampusNest is your dedicated student-housing intermediary across <strong className="text-obsidian font-semibold">Badagumijaru, Todaru, and Moodbidri</strong>. Compare 11 verified hostels and PGs by exact distance from MITE, check live room options, or let our field agent negotiate and schedule your visit.
            </p>

            <div className="hero-stagger flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenBooking(undefined, undefined, 'booking')}
                className="px-6 py-3.5 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-sm active:scale-95 transition-colors"
              >
                Book via CampusNest Agent
              </button>
              <button
                type="button"
                onClick={() => onOpenBooking(undefined, undefined, 'callback')}
                className="px-5 py-3.5 rounded-xl bg-white border border-obsidian text-obsidian hover:bg-obsidian hover:text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
              >
                Request Agent Callback
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Campus Photography + MITE Commute Corridor */}
          <div className="hero-stagger lg:col-span-5 space-y-4">
            <div className="p-4 rounded-2xl bg-white border border-parchment-200 shadow-architectural space-y-4">
              {!heroImgError ? (
                <div className="relative rounded-xl overflow-hidden border border-parchment-200 bg-alabaster aspect-[16/9]">
                  <img
                    src="/images/mite-boys-hostel.jpg"
                    alt="Sunlit coastal residence near MITE Badagumijaru campus"
                    onError={() => setHeroImgError(true)}
                    className="w-full h-full object-cover sepia-[0.06] contrast-[1.02]"
                  />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-obsidian/85 backdrop-blur-sm text-white font-mono text-[11px]">
                    <span>Badagumijaru · MITE Campus Belt</span>
                    <span className="text-terracotta-300 font-semibold tabular-nums">11 Verified Stays</span>
                  </div>
                </div>
              ) : null}
              <MiteCorridorMap />
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-parchment-200">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-slate-600">MITE Radius</div>
                  <div className="font-display font-bold text-xl text-obsidian tabular-nums">0.35 – 5.3 km</div>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-slate-600">Agent Verification</div>
                  <div className="font-display font-bold text-xl text-sage flex items-center gap-1.5">
                    <ShieldCheck className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                    <span>11 Properties</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* INTERACTIVE HERO AVAILABILITY FILTER BAR */}
        <div className="hero-stagger max-w-6xl mx-auto rounded-2xl bg-white border border-parchment-200 shadow-architectural p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-center">

            {/* 1. Category Filter */}
            <div className="flex flex-col space-y-1.5 border-b sm:border-b-0 sm:border-r border-parchment-200 pb-3 sm:pb-0 sm:pr-4">
              <label htmlFor="hero-category-select" className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-terracotta" aria-hidden="true" />
                <span>PG / Hostel Type</span>
              </label>
              <select
                id="hero-category-select"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full bg-white font-sans font-semibold text-sm sm:text-base text-obsidian rounded-md py-1 cursor-pointer"
              >
                <option value="All">All Categories (11)</option>
                <option value="Boys">Boys PG & Hostel</option>
                <option value="Ladies">Ladies / Girls PG & Hostel</option>
                <option value="On-Campus">On-Campus MITE Hostels</option>
                <option value="Lodge">Lodge & General PG</option>
              </select>
            </div>

            {/* 2. Distance from MITE Filter */}
            <div className="flex flex-col space-y-1.5 border-b sm:border-b-0 lg:border-r border-parchment-200 pb-3 sm:pb-0 sm:pr-4">
              <label htmlFor="hero-distance-select" className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-600">
                <Navigation className="w-3.5 h-3.5 text-sage" aria-hidden="true" />
                <span>Distance from MITE</span>
              </label>
              <select
                id="hero-distance-select"
                value={maxDistanceKm}
                onChange={(e) => onDistanceChange(Number(e.target.value))}
                className="w-full bg-white font-sans font-semibold text-sm sm:text-base text-obsidian rounded-md py-1 cursor-pointer"
              >
                <option value={10}>All Distances (up to 5.3 km)</option>
                <option value={1.5}>Walk / Short Ride (≤ 1.5 km)</option>
                <option value={4.0}>Within 8 mins (≤ 4.0 km)</option>
                <option value={4.8}>Within 11 mins (≤ 4.8 km)</option>
              </select>
            </div>

            {/* 3. Max Monthly Budget Slider */}
            <div className="flex flex-col space-y-1.5 border-b sm:border-b-0 pb-3 sm:pb-0 sm:pr-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <label htmlFor="budget-slider" className="flex items-center gap-1.5 text-slate-600 font-semibold uppercase tracking-wider">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-obsidian" aria-hidden="true" />
                  <span>Max Budget</span>
                </label>
                <span className="font-bold text-terracotta tabular-nums">₹{maxBudget.toLocaleString('en-IN')}/mo</span>
              </div>
              <input
                id="budget-slider"
                type="range"
                min="4800"
                max="12000"
                step="400"
                value={maxBudget}
                onChange={(e) => onBudgetChange(Number(e.target.value))}
                className="w-full accent-terracotta cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-600 tabular-nums">
                <span>₹4,800</span>
                <span>₹12,000</span>
              </div>
            </div>

            {/* 4. Action Button */}
            <div className="flex items-center pt-1 sm:pt-0">
              <button
                type="button"
                onClick={onSearch}
                className="w-full py-3.5 px-5 rounded-xl bg-obsidian hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-sm active:scale-95 transition-colors flex items-center justify-center gap-2 tabular-nums"
              >
                <Search className="w-4 h-4 text-terracotta" aria-hidden="true" />
                <span>View {matchingCount} Matching Stays</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
