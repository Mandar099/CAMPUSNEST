import React, { useState } from 'react';
import { Property, RoomType } from '../types';
import { FloorPlanArt } from './ArchitecturalArt';
import { 
  Sparkles, 
  Maximize2, 
  Bed, 
  Eye, 
  Info, 
  Check, 
  X, 
  ShieldCheck, 
  ArrowRight,
  Flame,
  Clock
} from 'lucide-react';

interface RoomCarouselProps {
  properties: Property[];
  selectedPropertyId?: number;
  onSelectPropertyId: (id: number) => void;
  onOpenBooking: (propertyId: number, roomId: number) => void;
}

export const RoomCarousel: React.FC<RoomCarouselProps> = ({
  properties,
  selectedPropertyId,
  onSelectPropertyId,
  onOpenBooking
}) => {
  const currentProperty = properties.find(p => p.id === selectedPropertyId) || properties[0];
  
  // Track CAD blueprint view mode per room id
  const [viewingFloorPlan, setViewingFloorPlan] = useState<Record<number, boolean>>({});
  
  // Track pricing breakdown modal
  const [breakdownRoom, setBreakdownRoom] = useState<RoomType | null>(null);

  const toggleFloorPlan = (roomId: number) => {
    setViewingFloorPlan(prev => ({
      ...prev,
      [roomId]: !prev[roomId]
    }));
  };

  if (!currentProperty) return null;

  return (
    <section id="rooms" className="py-20 md:py-28 bg-white border-b border-parchment-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-terracotta uppercase tracking-widest font-semibold mb-3">
              <Sparkles className="w-4 h-4" />
              <span>ROOM SUITES & ARCHITECTURAL CAD TIERS</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-obsidian tracking-tight">
              Furnished Units Designed for High Focus.
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-slate-600 max-w-md mt-4 md:mt-0">
            Interactive blueprints, transparent all-inclusive INR pricing, and live inventory directly linked to our residence ledger.
          </p>
        </div>

        {/* Campus Property Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none font-mono text-xs">
          {properties.map(p => (
            <button
              key={p.id}
              onClick={() => onSelectPropertyId(p.id)}
              className={`px-5 py-3 rounded-xl whitespace-nowrap transition-all flex items-center gap-2.5 ${
                p.id === currentProperty.id
                  ? 'bg-obsidian text-white font-semibold shadow-md'
                  : 'bg-alabaster border border-parchment-200 text-slate-700 hover:text-obsidian hover:border-slate-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${p.id === currentProperty.id ? 'bg-terracotta' : 'bg-slate-400'}`} />
              <span>{p.name} ({p.city})</span>
            </button>
          ))}
        </div>

        {/* Current Hub Proximity Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-alabaster border border-parchment-200 mb-8 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-obsidian">{currentProperty.name}</span>
            <span className="text-slate-400">|</span>
            <span className="text-terracotta">{currentProperty.distance_to_campus}</span>
          </div>
          <div className="flex items-center gap-2 text-sage font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sage-600"></span>
            </span>
            <span>{currentProperty.available_beds} Total Beds Remaining</span>
          </div>
        </div>

        {/* Room Units Grid / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentProperty.room_types.map((room) => {
            const isCAD = viewingFloorPlan[room.id] || false;
            
            return (
              <div
                key={room.id}
                className="flex flex-col rounded-2xl bg-alabaster border border-parchment-200 overflow-hidden shadow-architectural hover:shadow-architectural-hover transition-all duration-300"
              >
                {/* Visual / CAD Blueprint Canvas */}
                <div className="relative aspect-[4/3] w-full bg-white border-b border-parchment-200 flex items-center justify-center p-3">
                  <FloorPlanArt variant={isCAD ? room.floorplan_variant : room.floorplan_variant} />

                  {/* CAD Toggle Badge */}
                  <button
                    onClick={() => toggleFloorPlan(room.id)}
                    className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm border border-parchment-200 text-obsidian text-xs font-mono font-medium shadow-sm hover:border-obsidian transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-terracotta" />
                    <span>{isCAD ? '2D CAD Active' : 'Toggle CAD'}</span>
                  </button>

                  {/* Status Pill */}
                  <div className="absolute top-3 left-3">
                    {room.status === 'Available' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-sage-50 border border-sage-500/20 text-sage text-xs font-mono font-semibold">
                        <Check className="w-3 h-3" />
                        <span>{room.available_count} Units Free</span>
                      </span>
                    ) : room.status === 'Filling Fast' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-50 border border-amber-500/30 text-amber-700 text-xs font-mono font-semibold">
                        <Flame className="w-3 h-3 text-amber-600" />
                        <span>Only {room.available_count} Left</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 border border-slate-300 text-slate-700 text-xs font-mono font-semibold">
                        <Clock className="w-3 h-3" />
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
                      <span className="font-mono text-xs text-slate-500 whitespace-nowrap">
                        {room.area_sqft} sq.ft
                      </span>
                    </div>

                    {/* Pricing with Transparency Link */}
                    <div className="flex items-baseline justify-between mb-4 pb-4 border-b border-parchment-200">
                      <div>
                        <span className="font-display font-extrabold text-2xl text-obsidian">
                          ₹{room.monthly_rent_inr.toLocaleString('en-IN')}
                        </span>
                        <span className="font-mono text-xs text-slate-500"> / month</span>
                      </div>
                      <button
                        onClick={() => setBreakdownRoom(room)}
                        className="flex items-center gap-1 font-mono text-[11px] text-terracotta hover:underline"
                      >
                        <Info className="w-3 h-3" />
                        <span>Fee Breakdown</span>
                      </button>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2 mb-6">
                      {room.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-sage flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action */}
                  <button
                    onClick={() => onOpenBooking(currentProperty.id, room.id)}
                    className="w-full py-3 px-4 rounded-xl bg-obsidian hover:bg-slate-800 text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Reserve This Unit</span>
                    <ArrowRight className="w-3.5 h-3.5 text-terracotta" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ALL-INCLUSIVE PRICING BREAKDOWN MODAL */}
      {breakdownRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-parchment-200 p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setBreakdownRoom(null)}
              className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-obsidian hover:bg-parchment-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 font-mono text-xs text-sage uppercase font-semibold mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero Hidden Charges Policy</span>
            </div>
            
            <h3 className="font-display font-bold text-2xl text-obsidian mb-1">
              {breakdownRoom.name}
            </h3>
            <p className="text-xs text-slate-500 mb-6 font-mono">
              Monthly All-Inclusive INR Cost Breakdown
            </p>

            <div className="space-y-3 font-mono text-xs mb-6">
              <div className="flex justify-between py-2 border-b border-parchment-200">
                <span className="text-slate-600">Furnished Suite & Ortho Bedding</span>
                <span className="font-bold text-obsidian">Included</span>
              </div>
              <div className="flex justify-between py-2 border-b border-parchment-200">
                <span className="text-slate-600">4-Meal Regional Chef Mess</span>
                <span className="font-bold text-sage">Included (₹0 Extra)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-parchment-200">
                <span className="text-slate-600">1 Gbps Redundant Wi-Fi & LAN</span>
                <span className="font-bold text-sage">Included (₹0 Extra)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-parchment-200">
                <span className="text-slate-600">100% Solar & DG Backup (including AC)</span>
                <span className="font-bold text-sage">Included (₹0 Extra)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-parchment-200">
                <span className="text-slate-600">Weekly Housekeeping & Linen Laundry</span>
                <span className="font-bold text-sage">Included (₹0 Extra)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-parchment-200">
                <span className="text-slate-600">Security Deposit (100% Refundable)</span>
                <span className="font-bold text-obsidian">₹{breakdownRoom.deposit_inr.toLocaleString('en-IN')} (One-time)</span>
              </div>
              <div className="flex justify-between py-3 pt-4 text-sm font-bold border-t-2 border-obsidian">
                <span className="text-obsidian">Net Monthly All-Inclusive</span>
                <span className="text-terracotta text-lg">₹{breakdownRoom.monthly_rent_inr.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => {
                const room = breakdownRoom;
                setBreakdownRoom(null);
                onOpenBooking(room.property_id, room.id);
              }}
              className="w-full py-3 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white font-mono text-xs uppercase tracking-wider font-semibold shadow transition-all"
            >
              Continue to Unit Reservation
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
