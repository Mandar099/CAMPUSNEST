import React, { useState, useMemo } from 'react';
import { Property } from '../types';
import { PropertyArt } from './ArchitecturalArt';
import { ComparisonModal } from './ComparisonModal';
import { PropertyDetailModal } from './PropertyDetailModal';
import { buildAgentWhatsAppUrl, buildGoogleMapsUrl } from '../lib/whatsapp';
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
  RotateCcw,
  Wifi,
  Zap,
  UtensilsCrossed,
  Scale,
  ExternalLink,
  MessageCircle,
  Images,
  X
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

type QuickPillKey = 'All' | 'Boys' | 'Ladies' | 'On-Campus' | 'Under4km' | 'HasPhone' | 'PureVeg';

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

function getCommuteTag(prop: Property): { label: string; style: string } {
  if (prop.distance_km <= 0.6) {
    return { label: 'Walkable to MITE', style: 'bg-sage text-white border-sage' };
  }
  if (prop.distance_km <= 2.5) {
    return { label: '3-Min Ride', style: 'bg-obsidian text-white border-obsidian' };
  }
  if (prop.distance_km <= 4.0) {
    return { label: '8-Min Commute', style: 'bg-obsidian/90 text-white border-obsidian' };
  }
  return { label: 'Moodbidri Town / Bus Stand', style: 'bg-terracotta text-white border-terracotta' };
}

function formatTelHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, '')}`;
}

const PropertyVisualWithFallback: React.FC<{ prop: Property }> = ({ prop }) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (prop.image_url && !imgFailed) {
    return (
      <img
        src={prop.image_url}
        alt={`${prop.name} residence in ${prop.neighborhood}`}
        onError={() => setImgFailed(true)}
        className="w-full h-full object-cover sepia-[0.06] contrast-[1.02] transition-transform duration-300 group-hover:scale-[1.02]"
      />
    );
  }

  return (
    <PropertyArt
      theme={prop.accent_theme}
      name={prop.name}
      distanceKm={prop.distance_km}
      travelTime={prop.travel_time}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
    />
  );
};

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
  const [extraFilter, setExtraFilter] = useState<'none' | 'Under4km' | 'HasPhone' | 'PureVeg'>('none');
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [detailProperty, setDetailProperty] = useState<Property | null>(null);

  const activePill: QuickPillKey = useMemo(() => {
    if (extraFilter === 'Under4km') return 'Under4km';
    if (extraFilter === 'HasPhone') return 'HasPhone';
    if (extraFilter === 'PureVeg') return 'PureVeg';
    if (selectedCategory === 'Boys' || selectedCategory === 'Ladies' || selectedCategory === 'On-Campus') {
      return selectedCategory;
    }
    return 'All';
  }, [extraFilter, selectedCategory]);

  const handleQuickPillClick = (pill: QuickPillKey) => {
    if (pill === 'Under4km') {
      const next = extraFilter === 'Under4km' ? 'none' : 'Under4km';
      if (next === 'Under4km') onResetFilters();
      setExtraFilter(next);
      return;
    }
    if (pill === 'HasPhone') {
      const next = extraFilter === 'HasPhone' ? 'none' : 'HasPhone';
      if (next === 'HasPhone') onResetFilters();
      setExtraFilter(next);
      return;
    }
    if (pill === 'PureVeg') {
      const next = extraFilter === 'PureVeg' ? 'none' : 'PureVeg';
      if (next === 'PureVeg') onResetFilters();
      setExtraFilter(next);
      return;
    }
    setExtraFilter('none');
    if (pill === 'All') {
      onResetFilters();
      return;
    }
    onCategoryChange(pill);
  };

  const toggleCompare = (propId: number) => {
    setCompareIds((prev) => {
      if (prev.includes(propId)) {
        return prev.filter((id) => id !== propId);
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, propId];
    });
  };

  const visibleProperties = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const filtered = properties.filter((p) => {
      if (extraFilter === 'Under4km' && p.distance_km >= 4.0) return false;
      if (extraFilter === 'HasPhone' && !p.phone) return false;
      if (extraFilter === 'PureVeg' && !p.food_plan.toLowerCase().includes('pure veg')) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.neighborhood.toLowerCase().includes(q) ||
        p.food_plan.toLowerCase().includes(q)
      );
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'rent') return a.starting_rent_inr - b.starting_rent_inr;
      if (sortBy === 'beds') return b.available_beds - a.available_beds;
      return a.distance_km - b.distance_km;
    });
  }, [properties, searchQuery, sortBy, extraFilter]);

  const comparedProperties = useMemo(() => {
    return compareIds
      .map((id) => properties.find((p) => p.id === id))
      .filter((p): p is Property => Boolean(p));
  }, [compareIds, properties]);

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
              Every verified on-campus hostel and off-campus paying guest stay from Badagumijaru to Moodbidri town, sorted closest to MITE gates first.
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
                CampusNest operates as your local student-housing agent in Moodbidri. Compare up to 3 stays side-by-side, inspect Google Maps pins, verify pure-veg or curfew rules, or reach an owner directly.
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
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-10">
          {/* Quick Filter Pills: All (11), Boys, Ladies, On-Campus, Under 4 km from MITE, Has Direct Phone */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs" role="group" aria-label="Quick directory filters">
            {(
              [
                { key: 'All', label: `All (${allPropertiesCount || 11})` },
                { key: 'Boys', label: 'Boys' },
                { key: 'Ladies', label: 'Ladies' },
                { key: 'On-Campus', label: 'On-Campus' },
                { key: 'Under4km', label: 'Under 4 km from MITE' },
                { key: 'HasPhone', label: 'Has Direct Phone' },
                { key: 'PureVeg', label: 'Pure Veg' }
              ] as Array<{ key: QuickPillKey; label: string }>
            ).map((tab) => {
              const isActive = activePill === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleQuickPillClick(tab.key)}
                  className={`px-3.5 py-2 rounded-lg border transition-colors tabular-nums ${
                    isActive
                      ? 'bg-obsidian text-white border-obsidian font-semibold shadow-sm'
                      : 'bg-alabaster border-parchment-200 text-slate-700 hover:border-obsidian hover:text-obsidian'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-600 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="search"
                aria-label="Search PGs by name, road, or veg mess"
                placeholder="Search PG, Todaru, Pure Veg…"
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
              Reset filters to browse all {allPropertiesCount || 11} verified Moodbidri properties, or request a callback and our field agent will find an open bed.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setExtraFilter('none');
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
            {visibleProperties.map((prop) => {
              const commuteTag = getCommuteTag(prop);
              const isPureVeg = prop.food_plan.toLowerCase().includes('pure veg');
              const isOnCampus = prop.category.toLowerCase().includes('on-campus');
              const isCompared = compareIds.includes(prop.id);
              const compareFull = compareIds.length >= 3 && !isCompared;

              return (
                <article
                  key={prop.id}
                  className="group flex flex-col rounded-2xl bg-alabaster border border-parchment-200 overflow-hidden shadow-architectural hover:shadow-architectural-hover transition-shadow duration-200"
                >
                  {/* Color-Matched Real Photograph Strip with SVG Fallback (Click to Open 4-Photo Gallery) */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-parchment-200 bg-alabaster">
                    <button
                      type="button"
                      onClick={() => setDetailProperty(prop)}
                      aria-label={`Inspect 4 photos, fee breakdown, and house rules for ${prop.name}`}
                      className="w-full h-full block text-left focus-visible:outline-none"
                    >
                      <PropertyVisualWithFallback prop={prop} />
                    </button>

                    {/* Top Left: Distance & Travel Time Badge */}
                    <div className="pointer-events-none absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm border border-parchment-200 text-obsidian text-xs font-mono font-semibold shadow-sm tabular-nums">
                      <Clock className="w-3.5 h-3.5 text-terracotta" aria-hidden="true" />
                      <span>{prop.distance_km} km from MITE · {prop.travel_time}</span>
                    </div>

                    {/* Top Right: Available Beds Badge */}
                    <div className="pointer-events-none absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sage-50/95 backdrop-blur-sm border border-sage-600/25 text-sage-700 text-xs font-mono font-semibold shadow-sm tabular-nums">
                      <Bed className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{prop.available_beds} Beds Left</span>
                    </div>

                    {/* Bottom Overlay Row: Flex container guarantees Compare never overlaps pills on mobile/tablet */}
                    <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex flex-wrap items-end justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5 pointer-events-auto">
                        <span className={`px-2.5 py-1 rounded-md border font-mono text-[11px] font-semibold shadow-sm ${commuteTag.style}`}>
                          {commuteTag.label}
                        </span>
                        {isPureVeg && (
                          <span className="px-2.5 py-1 rounded-md bg-emerald-700 text-white border border-emerald-800 font-mono text-[11px] font-semibold shadow-sm">
                            Pure Veg
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => setDetailProperty(prop)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-obsidian/90 hover:bg-obsidian text-white border border-white/20 font-mono text-[11px] font-semibold shadow-sm transition-colors whitespace-nowrap"
                        >
                          <Images className="w-3 h-3" aria-hidden="true" />
                          <span>4 Photos</span>
                        </button>
                      </div>

                      {/* Bottom Right: Compare Toggle Button */}
                      <button
                        type="button"
                        disabled={compareFull}
                        aria-pressed={isCompared}
                        onClick={() => toggleCompare(prop.id)}
                        title={compareFull ? 'Remove one stay from compare bar first (max 3)' : 'Compare this stay side-by-side'}
                        className={`pointer-events-auto px-2.5 py-1.5 rounded-lg border font-mono text-[11px] font-semibold shadow-sm transition-colors flex items-center gap-1.5 whitespace-nowrap ml-auto ${
                          isCompared
                            ? 'bg-terracotta text-white border-terracotta'
                            : compareFull
                              ? 'bg-white/80 text-slate-400 border-parchment-200 cursor-not-allowed'
                              : 'bg-white/95 text-obsidian border-parchment-200 hover:border-obsidian'
                        }`}
                      >
                        <Scale className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{isCompared ? 'Compared' : 'Compare'}</span>
                      </button>
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

                      {/* Full Address + Google Maps Pin Link */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 text-xs sm:text-sm text-slate-700">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span className="break-words">{prop.address}</span>
                        </div>
                        <a
                          href={buildGoogleMapsUrl(prop.name, prop.address)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-terracotta-700 hover:underline whitespace-nowrap self-start"
                        >
                          <span>Maps Pin</span>
                          <ExternalLink className="w-3 h-3" aria-hidden="true" />
                        </a>
                      </div>

                      {/* Living Rules & Parent-Trust Highlights */}
                      <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white border border-parchment-200 text-slate-700">
                          <UtensilsCrossed className="w-3 h-3 text-sage" aria-hidden="true" />
                          <span>{prop.food_plan}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white border border-parchment-200 text-slate-700">
                          <Clock className="w-3 h-3 text-terracotta" aria-hidden="true" />
                          <span>{prop.curfew_timing}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white border border-parchment-200 text-slate-700">
                          <Wifi className="w-3 h-3 text-obsidian" aria-hidden="true" />
                          <span>{prop.wifi_speed}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white border border-parchment-200 text-slate-700">
                          <Zap className="w-3 h-3 text-terracotta" aria-hidden="true" />
                          <span>{prop.power_backup}</span>
                        </span>
                      </div>

                      {/* Direct Phone or Agent Contact Box */}
                      <div className="p-3 rounded-xl bg-white border border-parchment-200 flex flex-wrap items-center justify-between gap-2.5">
                        <div className="flex items-center gap-2 text-xs font-mono">
                          <Phone className={`w-4 h-4 flex-shrink-0 ${prop.phone ? 'text-sage' : 'text-terracotta'}`} aria-hidden="true" />
                          {prop.phone ? (
                            <span className="font-semibold text-obsidian tabular-nums whitespace-nowrap">{prop.phone}</span>
                          ) : (
                            <span className="font-semibold text-terracotta-700">Contact via CampusNest Agent</span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setDetailProperty(prop)}
                            className="font-mono text-[11px] font-semibold text-terracotta-700 hover:text-terracotta inline-flex items-center gap-1 underline underline-offset-4 whitespace-nowrap"
                          >
                            <span>Gallery &amp; Rules</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onSelectProperty(prop)}
                            className="font-mono text-[11px] font-semibold text-obsidian hover:text-terracotta inline-flex items-center gap-1 underline underline-offset-4 whitespace-nowrap"
                          >
                            <span>Rooms &amp; Cost Calc</span>
                            <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                          </button>
                        </div>
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

                      <div className="flex flex-wrap items-center gap-2">
                        {prop.phone ? (
                          <a
                            href={formatTelHref(prop.phone)}
                            className="flex-1 min-w-[110px] py-2.5 px-3 rounded-xl border border-obsidian bg-white text-obsidian hover:bg-obsidian hover:text-white font-mono text-xs uppercase font-semibold transition-colors flex items-center justify-center gap-1.5"
                          >
                            <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>Call PG</span>
                          </a>
                        ) : null}

                        <a
                          href={buildAgentWhatsAppUrl({
                            propertyName: prop.name,
                            distanceKm: prop.distance_km,
                            monthlyEstimateInr: prop.starting_rent_inr
                          })}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 min-w-[130px] py-2.5 px-3 rounded-xl border border-emerald-700 bg-emerald-50 text-emerald-800 hover:bg-emerald-700 hover:text-white font-mono text-xs uppercase font-semibold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>WhatsApp Agent</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => onOpenBooking(prop.id, prop.room_types[0]?.id, 'callback')}
                          className="flex-1 min-w-[140px] py-2.5 px-3 rounded-xl border border-parchment-300 bg-white text-obsidian hover:border-obsidian font-mono text-xs uppercase font-semibold transition-colors"
                        >
                          Request Callback
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>

      {/* Sticky Bottom Comparison Tray */}
      {comparedProperties.length > 0 && (
        <div
          role="region"
          aria-label="PG comparison selection tray"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-4xl rounded-2xl bg-obsidian text-white border border-slate-700 shadow-2xl px-4 py-3 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-terracotta-300 font-semibold mr-1 tabular-nums">
              <Scale className="w-4 h-4" aria-hidden="true" />
              <span>Compare ({comparedProperties.length}/3):</span>
            </span>
            {comparedProperties.map((p) => (
              <span
                key={p.id}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 font-mono text-xs"
              >
                <span className="truncate max-w-[140px]">{p.name}</span>
                <button
                  type="button"
                  onClick={() => toggleCompare(p.id)}
                  aria-label={`Remove ${p.name} from compare`}
                  className="text-slate-300 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              type="button"
              onClick={() => setCompareIds([])}
              className="px-3 py-2 rounded-lg text-xs font-mono text-slate-300 hover:text-white transition-colors"
            >
              Clear
            </button>
            <button
              type="button"
              disabled={comparedProperties.length < 2}
              onClick={() => setIsCompareOpen(true)}
              className={`px-4 py-2 rounded-xl font-mono text-xs uppercase tracking-wider font-semibold transition-colors whitespace-nowrap ${
                comparedProperties.length >= 2
                  ? 'bg-terracotta hover:bg-terracotta-600 text-white'
                  : 'bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              {comparedProperties.length >= 2 ? `Compare ${comparedProperties.length} Stays` : 'Pick 1 More'}
            </button>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      <ComparisonModal
        properties={comparedProperties}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onRemoveProperty={(id) => {
          setCompareIds((prev) => {
            const next = prev.filter((item) => item !== id);
            if (next.length < 2) {
              setIsCompareOpen(false);
            }
            return next;
          });
        }}
        onOpenBooking={onOpenBooking}
      />

      {/* Property Deep-Dive Gallery & Spec Modal */}
      <PropertyDetailModal
        property={detailProperty}
        isOpen={detailProperty !== null}
        onClose={() => setDetailProperty(null)}
        onOpenBooking={(propId, roomId, mode) => {
          setDetailProperty(null);
          onOpenBooking(propId, roomId, mode);
        }}
      />
    </section>
  );
};
