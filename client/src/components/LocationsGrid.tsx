import React, { useState, useMemo } from 'react';
import { Property } from '../types';
import { PropertyArt } from './ArchitecturalArt';
import {
  MapPin,
  Bed,
  ArrowUpRight,
  ShieldCheck,
  Phone,
  Clock,
  Search,
  PhoneCall,
  UserCheck,
  RotateCcw
} from 'lucide-react';

interface LocationsGridProps {
  properties: Property[];
  allPropertiesCount: number;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  onResetFilters: () => void;
  onSelectProperty: (property: Property) => void;
  onOpenBooking: (propertyId: number, roomId?: number, mode?: 'booking' | 'callback') => void;
}

function getCategoryBadgeStyle(category: string): string {
  const c = category.toLowerCase();
  if (c.includes('ladies') || c.includes('girls')) {
    return 'bg-terracotta-50 text-terracotta-700 border-terracotta-200';
  }
  if (c.includes('on-campus')) {
    return 'bg-sage-50 text-sage-700 border-sage-600/25';
  }
  if (c.includes('boys')) {
    return 'bg-slate-100 text-obsidian border-slate-300';
  }
  return 'bg-amber-50 text-amber-800 border-amber-300';
}

function formatTelHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, '')}`;
}

export const LocationsGrid: React.FC<LocationsGridProps> = ({
  properties,
  allPropertiesCount,
  selectedCategory,
  onCategoryChange,
  onResetFilters,
  onSelectProperty,
  onOpenBooking
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'distance' | 'rent' | 'beds'>('distance');

  const visibleProperties = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const filtered = properties.filter((p) => {
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.neighborhood.toLowerCase().includes(q)
      );
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'rent') return a.starting_rent_inr - b.starting_rent_inr;
      if (sortBy === 'beds') return b.available_beds - a.available_beds;
      return a.distance_km - b.distance_km;
    });
  }, [properties, searchQuery, sortBy]);

  return (
    <section id="locations" className="py-16 md:py-24 bg-white border-b border-parchment-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-obsidian tracking-tight mb-3">
              MITE &amp; Moodbidri PG &amp; Hostel Directory
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-700 max-w-2xl">
              Every verified on-campus hostel and off-campus paying guest stay from Badagumijaru to Moodbidri town, ordered by distance from MITE gates.
            </p>
          </div>
          <div className="font-mono text-xs text-slate-700 bg-alabaster border border-parchment-200 px-3.5 py-2 rounded-lg tabular-nums self-start md:self-auto">
            Showing <strong className="text-obsidian">{visibleProperties.length}</strong> of {allPropertiesCount} verified stays
          </div>
        </div>

        {/* VERIFIED BY CAMPUSNEST AGENT TRUST STRIP */}
        <div className="rounded-2xl bg-alabaster border border-parchment-200 p-5 sm:p-6 mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-sage text-white flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-obsidian">
                Verified by CampusNest Agent — Zero Brokerage Student Mediation
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-3xl leading-relaxed">
                CampusNest operates as your local student-housing agent in Moodbidri. We physically verify room availability, coordinate directly with PG owners (including properties without public phone listings), negotiate fair deposits, and book guided on-site or virtual walkthroughs.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenBooking(properties[0]?.id ?? 1, undefined, 'callback')}
            className="whitespace-nowrap px-4 py-2.5 rounded-xl bg-obsidian hover:bg-slate-800 text-white font-mono text-xs uppercase font-semibold transition-colors flex items-center justify-center gap-2 self-start lg:self-center"
          >
            <UserCheck className="w-4 h-4 text-terracotta" aria-hidden="true" />
            <span>Request Agent Help</span>
          </button>
        </div>

        {/* Directory Filter & Search Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {[
              { key: 'All', label: 'All Stays' },
              { key: 'Boys', label: 'Boys PG & Hostel' },
              { key: 'Ladies', label: 'Ladies & Girls' },
              { key: 'On-Campus', label: 'On-Campus MITE' },
              { key: 'Lodge', label: 'Lodge & General PG' }
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => onCategoryChange(tab.key)}
                className={`px-3.5 py-2 rounded-lg border transition-colors ${
                  selectedCategory === tab.key
                    ? 'bg-obsidian text-white border-obsidian font-semibold'
                    : 'bg-alabaster border-parchment-200 text-slate-700 hover:border-obsidian hover:text-obsidian'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="search"
                aria-label="Search PGs by name or road"
                placeholder="Search PG, Todaru, Masthikate…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-9 pr-3 py-2 rounded-xl border border-parchment-200 bg-alabaster font-sans text-sm text-obsidian placeholder:text-slate-600"
              />
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="directory-sort" className="font-mono text-xs text-slate-700 uppercase whitespace-nowrap">
                Sort:
              </label>
              <select
                id="directory-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'distance' | 'rent' | 'beds')}
                className="py-2 px-3 rounded-xl border border-parchment-200 bg-alabaster font-mono text-xs text-obsidian cursor-pointer"
              >
                <option value="distance">Nearest to MITE</option>
                <option value="rent">Rent: Low to High</option>
                <option value="beds">Most Beds Left</option>
              </select>
            </div>
          </div>
        </div>

        {/* Empty Filter State */}
        {visibleProperties.length === 0 ? (
          <div className="rounded-2xl border border-parchment-200 bg-alabaster p-10 text-center space-y-4">
            <p className="font-display font-bold text-lg text-obsidian">
              No PGs match your current distance, budget, or search filters.
            </p>
            <p className="text-sm text-slate-700 max-w-md mx-auto">
              Reset filters to browse all 11 verified Moodbidri properties, or request a callback and our field agent will find an open bed.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  onResetFilters();
                }}
                className="px-4 py-2.5 rounded-xl bg-obsidian text-white font-mono text-xs uppercase font-semibold inline-flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Reset All Filters</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenBooking(1, undefined, 'callback')}
                className="px-4 py-2.5 rounded-xl bg-terracotta text-white font-mono text-xs uppercase font-semibold"
              >
                Ask Agent for Help
              </button>
            </div>
          </div>
        ) : (
          /* Real MITE/Moodbidri Directory Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8">
            {visibleProperties.map((prop) => (
              <article
                key={prop.id}
                className="group flex flex-col rounded-2xl bg-alabaster border border-parchment-200 overflow-hidden shadow-architectural hover:shadow-architectural-hover transition-shadow duration-200"
              >
                {/* Architectural Elevation Visual Strip */}
                <div className="relative aspect-[16/8] w-full overflow-hidden border-b border-parchment-200 bg-alabaster">
                  <PropertyArt
                    theme={prop.accent_theme}
                    name={prop.name}
                    distanceKm={prop.distance_km}
                    travelTime={prop.travel_time}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />

                  {/* Distance & Travel Time Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-parchment-200 text-obsidian text-xs font-mono font-semibold shadow-sm tabular-nums">
                    <Clock className="w-3.5 h-3.5 text-terracotta" aria-hidden="true" />
                    <span>{prop.distance_km} km from MITE · {prop.travel_time}</span>
                  </div>

                  {/* Available Beds Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sage-50 border border-sage-600/25 text-sage-700 text-xs font-mono font-semibold shadow-sm tabular-nums">
                    <Bed className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{prop.available_beds} Beds Left</span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                  <div className="space-y-4">
                    {/* Category Badge + Agent Seal */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`px-2.5 py-1 rounded-md border font-mono text-[11px] font-semibold uppercase tracking-wide ${getCategoryBadgeStyle(prop.category)}`}>
                        {prop.category}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-sage-700">
                        <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Verified by CampusNest Agent</span>
                      </span>
                    </div>

                    {/* Title & Rent */}
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-obsidian tracking-tight">
                        {prop.name}
                      </h3>
                      <div className="text-right flex-shrink-0 tabular-nums">
                        <div className="font-mono text-[11px] text-slate-600">From</div>
                        <div className="font-display font-bold text-lg text-obsidian">
                          ₹{prop.starting_rent_inr.toLocaleString('en-IN')}
                          <span className="text-xs font-normal text-slate-600">/mo</span>
                        </div>
                      </div>
                    </div>

                    {/* Full Address */}
                    <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <MapPin className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="break-words">{prop.address}</span>
                    </div>

                    {/* Direct Phone or Agent Contact Box */}
                    <div className="p-3 rounded-xl bg-white border border-parchment-200 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <Phone className={`w-4 h-4 flex-shrink-0 ${prop.phone ? 'text-sage' : 'text-terracotta'}`} aria-hidden="true" />
                        {prop.phone ? (
                          <span className="font-semibold text-obsidian tabular-nums">{prop.phone}</span>
                        ) : (
                          <span className="font-semibold text-terracotta-700">Contact via CampusNest Agent</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => onSelectProperty(prop)}
                        className="font-mono text-[11px] font-semibold text-obsidian hover:text-terracotta inline-flex items-center gap-1 underline underline-offset-4"
                      >
                        <span>Rooms &amp; CAD</span>
                        <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  {/* Card Action Buttons (Agent-Mediated Flow) */}
                  <div className="space-y-2.5 pt-2 border-t border-parchment-200">
                    <button
                      type="button"
                      onClick={() => onOpenBooking(prop.id, prop.room_types[0]?.id, 'booking')}
                      className="w-full py-3 px-4 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-sm active:scale-[0.99] transition-colors"
                    >
                      Book via Agent
                    </button>

                    <div className="flex items-center gap-2.5">
                      {prop.phone ? (
                        <a
                          href={formatTelHref(prop.phone)}
                          className="flex-1 py-2.5 px-3 rounded-xl border border-obsidian bg-white text-obsidian hover:bg-obsidian hover:text-white font-mono text-xs uppercase font-semibold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Call PG</span>
                        </a>
                      ) : null}

                      <button
                        type="button"
                        onClick={() => onOpenBooking(prop.id, prop.room_types[0]?.id, 'callback')}
                        className="flex-1 py-2.5 px-3 rounded-xl border border-parchment-300 bg-white text-obsidian hover:border-obsidian font-mono text-xs uppercase font-semibold transition-colors"
                      >
                        Request Agent Callback
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
