import React, { useEffect, useRef } from 'react';
import { Search, MapPin, Sparkles, SlidersHorizontal, CheckCircle2, ArrowDownRight } from 'lucide-react';
import gsap from 'gsap';
import { isReducedMotion } from '../lib/motion';

interface HeroProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedTier: string;
  onTierChange: (tier: string) => void;
  maxBudget: number;
  onBudgetChange: (budget: number) => void;
  onSearch: () => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedCity,
  onCityChange,
  selectedTier,
  onTierChange,
  maxBudget,
  onBudgetChange,
  onSearch,
  onOpenBooking
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isReducedMotion() || !headlineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });

      gsap.from('.filter-bar-anim', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power2.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden architectural-grid">
      {/* Decorative architectural background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-sand-100/70 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tagline Pill */}
        <div className="hero-stagger inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-parchment-200 text-obsidian text-xs font-mono font-medium shadow-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-terracotta" />
          <span>AUTONOMOUS CO-LIVING & ACCOMMODATION // 2026 ADMISSION CYCLE</span>
        </div>

        {/* Kinetic Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-14">
          
          {/* Left Column: Bold Display Typography */}
          <div className="lg:col-span-8">
            <h1 ref={headlineRef} className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-obsidian leading-[1.05] mb-6">
              <span className="hero-stagger block">ARCHITECTURAL</span>
              <span className="hero-stagger block text-transparent bg-clip-text bg-gradient-to-r from-obsidian via-terracotta to-terracotta-600">
                STUDENT LIVING
              </span>
              <span className="hero-stagger block text-slate-700 font-semibold text-3xl sm:text-5xl lg:text-5xl mt-2">
                FOR SOUTH INDIA'S TOP COLLEGIATE HUBS.
              </span>
            </h1>

            <p className="hero-stagger text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
              Design-led residences crafted for academic focus and restorative comfort. 
              Zero hidden fees, 1 Gbps redundant fiber, chef-crafted mess meals, and biometric security—nestled beside 
              <span className="font-medium text-obsidian"> MITE Moodbidri</span>, 
              <span className="font-medium text-obsidian"> NITK Surathkal</span>, 
              <span className="font-medium text-obsidian"> Manipal</span>, and 
              <span className="font-medium text-obsidian"> Electronic City</span>.
            </p>
          </div>

          {/* Right Column: Architectural Highlights Cards */}
          <div className="hero-stagger lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-white border border-parchment-200 shadow-architectural hover:shadow-architectural-hover transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-terracotta font-semibold uppercase tracking-wider">Campus Proximity</span>
                <ArrowDownRight className="w-4 h-4 text-slate-400" />
              </div>
              <div className="font-display text-2xl font-bold text-obsidian mb-1">400m — 850m</div>
              <p className="text-xs text-slate-500">Walk or quick pedal directly to lecture halls with zero traffic anxiety.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-parchment-200 shadow-architectural hover:shadow-architectural-hover transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-sage font-semibold uppercase tracking-wider">All-Inclusive Promise</span>
                <CheckCircle2 className="w-4 h-4 text-sage" />
              </div>
              <div className="font-display text-2xl font-bold text-obsidian mb-1">₹0 Hidden Charges</div>
              <p className="text-xs text-slate-500">Rent covers high-speed Wi-Fi, electricity, 4 meals/day, weekly laundry & housekeeping.</p>
            </div>
          </div>
        </div>

        {/* INTERACTIVE HERO AVAILABILITY BAR */}
        <div className="filter-bar-anim relative max-w-5xl mx-auto rounded-2xl bg-white/95 backdrop-blur-md border border-parchment-200 shadow-xl p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            
            {/* 1. Hub / City Selector */}
            <div className="flex flex-col space-y-1.5 border-b sm:border-b-0 sm:border-r border-parchment-200 pb-3 sm:pb-0 sm:pr-4">
              <label htmlFor="city-select" className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-terracotta" />
                <span>Collegiate Hub</span>
              </label>
              <select
                id="city-select"
                value={selectedCity}
                onChange={(e) => onCityChange(e.target.value)}
                className="w-full bg-transparent font-sans font-semibold text-sm sm:text-base text-obsidian focus:outline-none cursor-pointer"
              >
                <option value="All">All 4 Hubs (Karnataka)</option>
                <option value="Moodbidri">Moodbidri (MITE Campus)</option>
                <option value="Mangaluru">Mangaluru (Surathkal Tech)</option>
                <option value="Manipal">Manipal (MIT / KMC Hub)</option>
                <option value="Bengaluru">Bengaluru (Electronic City)</option>
              </select>
            </div>

            {/* 2. Room Tier Selector */}
            <div className="flex flex-col space-y-1.5 border-b sm:border-b-0 lg:border-r border-parchment-200 pb-3 sm:pb-0 sm:pr-4">
              <label htmlFor="tier-select" className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
                <Sparkles className="w-3.5 h-3.5 text-sage" />
                <span>Room Tier</span>
              </label>
              <select
                id="tier-select"
                value={selectedTier}
                onChange={(e) => onTierChange(e.target.value)}
                className="w-full bg-transparent font-sans font-semibold text-sm sm:text-base text-obsidian focus:outline-none cursor-pointer"
              >
                <option value="All">All Room Configurations</option>
                <option value="Solo">Solo Studio Suite</option>
                <option value="Twin">Twin Focus Pod</option>
                <option value="Balcony">Corner Balcony Loft</option>
                <option value="Suite">Collaborative Suite / Quad</option>
              </select>
            </div>

            {/* 3. Max Budget Slider */}
            <div className="flex flex-col space-y-1.5 border-b sm:border-b-0 pb-3 sm:pb-0 sm:pr-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1.5 text-slate-500 font-semibold uppercase tracking-wider">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-obsidian" />
                  Max Budget
                </span>
                <span className="font-bold text-terracotta">₹{maxBudget.toLocaleString('en-IN')}/mo</span>
              </div>
              <input
                id="budget-slider"
                type="range"
                min="8500"
                max="25000"
                step="500"
                aria-label="Maximum monthly budget in rupees"
                value={maxBudget}
                onChange={(e) => onBudgetChange(Number(e.target.value))}
                className="w-full accent-terracotta cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>₹8,500</span>
                <span>₹25,000</span>
              </div>
            </div>

            {/* 4. Action Button */}
            <div className="flex items-center pt-2 sm:pt-0">
              <button
                onClick={onSearch}
                className="w-full py-3.5 px-6 rounded-xl bg-obsidian hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4 text-terracotta" />
                <span>Filter Rooms</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
