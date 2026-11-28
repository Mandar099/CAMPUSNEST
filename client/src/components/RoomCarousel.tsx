import React, { useState, useEffect } from 'react';
import { Property, RoomType } from '../types';
import { FloorPlanArt, RoomSpecVisual } from './ArchitecturalArt';
import {
  Eye,
  Info,
  Check,
  X,
  ShieldCheck,
  ArrowRight,
  Flame,
  Clock,
  MapPin,
  Calculator
} from 'lucide-react';

interface RoomCarouselProps {
  properties: Property[];
  selectedPropertyId?: number;
  onSelectPropertyId: (id: number) => void;
  onOpenBooking: (propertyId: number, roomId: number, mode?: 'booking' | 'callback') => void;
}

export const RoomCarousel: React.FC<RoomCarouselProps> = ({
  properties,
  selectedPropertyId,
  onSelectPropertyId,
  onOpenBooking
}) => {
  const currentProperty = properties.find(p => p.id === selectedPropertyId) || properties[0];
  const [viewingFloorPlan, setViewingFloorPlan] = useState<Record<number, boolean>>({});
  const [breakdownRoom, setBreakdownRoom] = useState<RoomType | null>(null);

  // Interactive Monthly Cost & Mess Calculator State
  const [calcRoomIdx, setCalcRoomIdx] = useState<number>(0);
  const [calcMessPlan, setCalcMessPlan] = useState<'included' | 'veg_tiffin' | 'room_only'>('included');
  const [calcCooling, setCalcCooling] = useState<'non_ac' | 'ac'>('non_ac');

  useEffect(() => {
    setCalcRoomIdx(0);
    if (currentProperty?.food_plan?.toLowerCase().includes('room only')) {
      setCalcMessPlan('room_only');
    } else {
      setCalcMessPlan('included');
    }
  }, [currentProperty?.id, currentProperty?.food_plan]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && breakdownRoom) {
        setBreakdownRoom(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [breakdownRoom]);

  const toggleFloorPlan = (roomId: number) => {
    setViewingFloorPlan(prev => ({
      ...prev,
      [roomId]: !prev[roomId]
    }));
  };

  if (!currentProperty) return null;

  const isMessIncludedByDefault =
    !currentProperty.food_plan.toLowerCase().includes('room only') &&
    !currentProperty.food_plan.toLowerCase().includes('optional');
  const calcSelectedRoom = currentProperty.room_types[calcRoomIdx] || currentProperty.room_types[0];
  const messAddonInr =
    calcMessPlan === 'included'
      ? (isMessIncludedByDefault ? 0 : 2600)
      : calcMessPlan === 'veg_tiffin'
        ? 2200
        : isMessIncludedByDefault
          ? -1000
          : 0;
  const acAddonInr = calcCooling === 'ac' ? 1500 : 0;
  const estimatedMonthlyTotal = Math.max(
    4200,
    (calcSelectedRoom?.monthly_rent_inr || currentProperty.starting_rent_inr) + messAddonInr + acAddonInr
  );
  const estimatedDeposit = calcSelectedRoom?.deposit_inr || 12000;

  return (
    <section id="rooms" className="py-16 md:py-24 bg-white border-b border-parchment-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-obsidian tracking-tight mb-2">
              Room Configurations &amp; 2D CAD Floor Plans
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-700 max-w-xl">
              Compare room layouts, monthly INR rents, and live bed counts across all 11 Moodbidri hostels and PGs before scheduling a tour.
            </p>
          </div>

          {/* Direct Property Selector Dropdown for all 11 stays */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="room-property-select" className="font-mono text-[11px] uppercase font-semibold text-slate-600">
              Select PG / Hostel ({properties.length})
            </label>
            <select
              id="room-property-select"
              value={currentProperty.id}
              onChange={(e) => onSelectPropertyId(Number(e.target.value))}
              className="py-2.5 px-4 rounded-xl border border-parchment-300 bg-alabaster font-mono text-xs font-semibold text-obsidian cursor-pointer"
            >
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.distance_km} km · ₹{p.starting_rent_inr.toLocaleString('en-IN')}+)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Scrollable Property Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 font-mono text-xs">
          {properties.map(p => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectPropertyId(p.id)}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-colors flex items-center gap-2 border ${
                p.id === currentProperty.id
                  ? 'bg-obsidian text-white border-obsidian font-semibold shadow-sm'
                  : 'bg-alabaster border-parchment-200 text-slate-700 hover:text-obsidian hover:border-obsidian'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${p.id === currentProperty.id ? 'bg-terracotta' : 'bg-slate-400'}`} aria-hidden="true" />
              <span>{p.name}</span>
            </button>
          ))}
        </div>

        {/* Current Property Summary Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-alabaster border border-parchment-200 mb-8 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-obsidian">{currentProperty.name}</span>
            <span className="px-2 py-0.5 rounded bg-white border border-parchment-200 text-slate-700">{currentProperty.category}</span>
            <span className="inline-flex items-center gap-1 text-terracotta-700 font-semibold tabular-nums">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{currentProperty.distance_km} km from MITE ({currentProperty.travel_time})</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-sage-700 font-semibold tabular-nums">
            <span>{currentProperty.available_beds} Total Beds Remaining</span>
          </div>
        </div>

        {/* Interactive True Monthly Cost & Mess Estimator */}
        <div className="mb-8 rounded-2xl bg-alabaster border border-parchment-300 p-5 sm:p-6 shadow-architectural">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-4 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-parchment-300 font-mono text-[11px] font-bold uppercase text-terracotta-700">
                  <Calculator className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>True Monthly Cost &amp; Mess Estimator</span>
                </span>
                <span className="font-mono text-xs text-slate-600">
                  Policy: <strong className="text-obsidian">{currentProperty.food_plan}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                {/* Sharing Tier */}
                <div className="space-y-1.5">
                  <span className="block text-[11px] uppercase tracking-wider text-slate-600 font-semibold">
                    1. Sharing Tier
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentProperty.room_types.map((r, idx) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setCalcRoomIdx(idx)}
                        className={`px-2.5 py-1.5 rounded-lg border transition-colors ${
                          calcRoomIdx === idx
                            ? 'bg-obsidian text-white border-obsidian font-semibold'
                            : 'bg-white border-parchment-200 text-slate-700 hover:border-obsidian'
                        }`}
                      >
                        {r.name.replace(' Room', '')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mess Plan */}
                <div className="space-y-1.5">
                  <span className="block text-[11px] uppercase tracking-wider text-slate-600 font-semibold">
                    2. Food &amp; Mess Plan
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setCalcMessPlan('included')}
                      className={`px-2.5 py-1.5 rounded-lg border transition-colors ${
                        calcMessPlan === 'included'
                          ? 'bg-sage text-white border-sage font-semibold'
                          : 'bg-white border-parchment-200 text-slate-700 hover:border-obsidian'
                      }`}
                    >
                      {isMessIncludedByDefault ? '3-Time Mess (Incl.)' : '3-Time Mess (+₹2.6k)'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcMessPlan('veg_tiffin')}
                      className={`px-2.5 py-1.5 rounded-lg border transition-colors ${
                        calcMessPlan === 'veg_tiffin'
                          ? 'bg-sage text-white border-sage font-semibold'
                          : 'bg-white border-parchment-200 text-slate-700 hover:border-obsidian'
                      }`}
                    >
                      B&amp;D Tiffin (+₹2.2k)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcMessPlan('room_only')}
                      className={`px-2.5 py-1.5 rounded-lg border transition-colors ${
                        calcMessPlan === 'room_only'
                          ? 'bg-sage text-white border-sage font-semibold'
                          : 'bg-white border-parchment-200 text-slate-700 hover:border-obsidian'
                      }`}
                    >
                      Room Only
                    </button>
                  </div>
                </div>

                {/* Cooling / AC */}
                <div className="space-y-1.5">
                  <span className="block text-[11px] uppercase tracking-wider text-slate-600 font-semibold">
                    3. Cooling Option
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setCalcCooling('non_ac')}
                      className={`px-2.5 py-1.5 rounded-lg border transition-colors ${
                        calcCooling === 'non_ac'
                          ? 'bg-terracotta text-white border-terracotta font-semibold'
                          : 'bg-white border-parchment-200 text-slate-700 hover:border-obsidian'
                      }`}
                    >
                      Non-AC (+₹0)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcCooling('ac')}
                      className={`px-2.5 py-1.5 rounded-lg border transition-colors ${
                        calcCooling === 'ac'
                          ? 'bg-terracotta text-white border-terracotta font-semibold'
                          : 'bg-white border-parchment-200 text-slate-700 hover:border-obsidian'
                      }`}
                    >
                      AC (+₹1,500)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Estimator Readout */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 pt-4 lg:pt-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-parchment-300 min-w-[240px]">
              <div className="lg:text-right tabular-nums">
                <div className="font-mono text-[11px] uppercase tracking-wider text-slate-600">
                  Estimated All-Inclusive / Mo
                </div>
                <div className="font-display font-extrabold text-3xl text-obsidian">
                  ₹{estimatedMonthlyTotal.toLocaleString('en-IN')}
                </div>
                <div className="font-mono text-[11px] text-slate-600">
                  + ₹{estimatedDeposit.toLocaleString('en-IN')} refundable deposit · ₹0 brokerage
                </div>
              </div>

              {calcSelectedRoom && (
                <button
                  type="button"
                  onClick={() => onOpenBooking(currentProperty.id, calcSelectedRoom.id, 'booking')}
                  className="px-4 py-2.5 rounded-xl bg-obsidian hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2 whitespace-nowrap"
                >
                  <span>Lock ₹{estimatedMonthlyTotal.toLocaleString('en-IN')} Plan</span>
                  <ArrowRight className="w-3.5 h-3.5 text-terracotta" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Room Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {currentProperty.room_types.map((room) => {
            const isCAD = Boolean(viewingFloorPlan[room.id]);

            return (
              <div
                key={room.id}
                className="flex flex-col rounded-2xl bg-alabaster border border-parchment-200 overflow-hidden shadow-architectural hover:shadow-architectural-hover transition-shadow duration-200"
              >
                {/* Visual / CAD Blueprint Canvas */}
                <div className="relative aspect-[4/3] w-full bg-white border-b border-parchment-200 flex items-center justify-center p-3">
                  {isCAD ? (
                    <FloorPlanArt variant={room.floorplan_variant} />
                  ) : (
                    <RoomSpecVisual
                      roomName={room.name}
                      areaSqft={room.area_sqft}
                      rentInr={room.monthly_rent_inr}
                    />
                  )}

                  {/* CAD Toggle Button */}
                  <button
                    type="button"
                    onClick={() => toggleFloorPlan(room.id)}
                    aria-pressed={isCAD}
                    className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-parchment-300 text-obsidian text-xs font-mono font-semibold shadow-sm hover:border-obsidian transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-terracotta" aria-hidden="true" />
                    <span>{isCAD ? 'Show Isometric' : '2D CAD Plan'}</span>
                  </button>

                  {/* Status Pill */}
                  <div className="absolute top-3 left-3">
                    {room.status === 'Available' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-sage-50 border border-sage-600/25 text-sage-700 text-xs font-mono font-semibold tabular-nums">
                        <Check className="w-3 h-3" aria-hidden="true" />
                        <span>{room.available_count} Beds Free</span>
                      </span>
                    ) : room.status === 'Filling Fast' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 border border-amber-500/30 text-amber-800 text-xs font-mono font-semibold tabular-nums">
                        <Flame className="w-3 h-3 text-amber-600" aria-hidden="true" />
                        <span>Only {room.available_count} Left</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 border border-slate-300 text-slate-700 text-xs font-mono font-semibold">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        <span>Waitlist Only</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-display font-bold text-xl text-obsidian">
                        {room.name}
                      </h3>
                      <span className="font-mono text-xs text-slate-600 whitespace-nowrap tabular-nums">
                        {room.area_sqft} sq.ft
                      </span>
                    </div>

                    {/* Pricing with Transparency Modal Trigger */}
                    <div className="flex items-baseline justify-between mb-4 pb-4 border-b border-parchment-200">
                      <div className="tabular-nums">
                        <span className="font-display font-extrabold text-2xl text-obsidian">
                          ₹{room.monthly_rent_inr.toLocaleString('en-IN')}
                        </span>
                        <span className="font-mono text-xs text-slate-600"> / month</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setBreakdownRoom(room)}
                        className="flex items-center gap-1 font-mono text-xs text-terracotta-700 font-semibold hover:underline"
                      >
                        <Info className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Fee Breakdown</span>
                      </button>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2 mb-6">
                      {room.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-sage flex-shrink-0" aria-hidden="true" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Primary Action */}
                  <button
                    type="button"
                    onClick={() => onOpenBooking(currentProperty.id, room.id, 'booking')}
                    className="w-full py-3 px-4 rounded-xl bg-obsidian hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-sm active:scale-[0.99] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Book via Agent</span>
                    <ArrowRight className="w-3.5 h-3.5 text-terracotta" aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ALL-INCLUSIVE PRICING BREAKDOWN MODAL */}
      {breakdownRoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="fee-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/60 backdrop-blur-sm overscroll-contain"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white border border-parchment-200 p-6 sm:p-8 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setBreakdownRoom(null)}
              aria-label="Close fee breakdown dialog"
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-600 hover:text-obsidian hover:bg-parchment-100 transition-colors"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="inline-flex items-center gap-2 font-mono text-xs text-sage-700 uppercase font-semibold mb-2">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>Agent-Verified Fee Transparency</span>
            </div>

            <h3 id="fee-modal-title" className="font-display font-bold text-2xl text-obsidian mb-1">
              {breakdownRoom.name}
            </h3>
            <p className="text-xs text-slate-600 mb-6 font-mono">
              {currentProperty.name} · Monthly INR Cost Breakdown
            </p>

            <div className="space-y-3 font-mono text-xs mb-6 tabular-nums">
              <div className="flex justify-between py-2 border-b border-parchment-200">
                <span className="text-slate-700">Room Accommodation &amp; Furniture</span>
                <span className="font-bold text-obsidian">Included</span>
              </div>
              <div className="flex justify-between py-2 border-b border-parchment-200">
                <span className="text-slate-700">Dining Policy ({currentProperty.food_plan})</span>
                <span className="font-bold text-sage-700">{isMessIncludedByDefault ? 'Included' : 'Optional'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-parchment-200">
                <span className="text-slate-700">CampusNest Agent Coordination Fee</span>
                <span className="font-bold text-sage-700">₹0 (Free for Students)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-parchment-200">
                <span className="text-slate-700">Refundable Security Deposit</span>
                <span className="font-bold text-obsidian">₹{breakdownRoom.deposit_inr.toLocaleString('en-IN')} (One-time)</span>
              </div>
              <div className="flex justify-between py-3 pt-4 text-sm font-bold border-t-2 border-obsidian">
                <span className="text-obsidian">Monthly Rent</span>
                <span className="text-terracotta-700 text-lg">₹{breakdownRoom.monthly_rent_inr.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const room = breakdownRoom;
                setBreakdownRoom(null);
                onOpenBooking(room.property_id, room.id, 'booking');
              }}
              className="w-full py-3 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-sm transition-colors"
            >
              Book via CampusNest Agent
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
