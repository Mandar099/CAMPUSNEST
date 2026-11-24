import React from 'react';
import { Property } from '../types';
import { PropertyArt } from './ArchitecturalArt';
import { MapPin, Bed, ArrowUpRight, Check, Compass } from 'lucide-react';

interface LocationsGridProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onOpenBooking: (propertyId?: number) => void;
}

export const LocationsGrid: React.FC<LocationsGridProps> = ({
  properties,
  onSelectProperty,
  onOpenBooking
}) => {
  return (
    <section id="locations" className="py-20 md:py-28 bg-white border-y border-parchment-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-terracotta uppercase tracking-widest font-semibold mb-3">
              <Compass className="w-4 h-4" />
              <span>COLLEGIATE HUBS & RESIDENCES</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-obsidian tracking-tight">
              Curated Living Near Key Campuses.
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-slate-600 max-w-md mt-4 md:mt-0">
            Engineered within 10 minutes of academic lecture halls. Each residence pairs architectural calm with high-speed collegiate infrastructure.
          </p>
        </div>

        {/* 4 Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {properties.map((prop) => (
            <div
              key={prop.id}
              className="group flex flex-col rounded-2xl bg-alabaster border border-parchment-200 overflow-hidden shadow-architectural hover:shadow-architectural-hover transition-all duration-300"
            >
              {/* Architectural Art Canvas (Elevation) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-parchment-200 bg-sand-100">
                <PropertyArt theme={prop.accent_theme} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                
                {/* Distance Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm border border-parchment-200 text-obsidian text-xs font-mono font-semibold shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-terracotta" />
                  <span>{prop.distance_to_campus}</span>
                </div>

                {/* Available Beds Badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sage-50/95 backdrop-blur-sm border border-sage-500/20 text-sage-700 text-xs font-mono font-semibold shadow-sm">
                  <Bed className="w-3.5 h-3.5" />
                  <span>{prop.available_beds} Beds Left</span>
                </div>

                {/* Bottom Bar: Neighborhood Tag */}
                <div className="absolute bottom-3 left-4 text-[11px] font-mono text-slate-700 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded">
                  {prop.neighborhood}
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-display font-bold text-2xl text-obsidian tracking-tight group-hover:text-terracotta transition-colors">
                      {prop.name}
                    </h3>
                    <div className="text-right">
                      <div className="font-mono text-xs text-slate-500">Starting from</div>
                      <div className="font-display font-bold text-lg text-obsidian">
                        ₹{prop.starting_rent_inr.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-500">/mo</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-2 mb-6">
                    {prop.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-6">
                    {prop.highlights.slice(0, 3).map((hl, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                        <Check className="w-3.5 h-3.5 text-sage flex-shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Amenity Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {prop.amenities.slice(0, 4).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-white border border-parchment-200 text-[11px] font-mono text-slate-600"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-parchment-200">
                  <button
                    onClick={() => onSelectProperty(prop)}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-obsidian text-obsidian hover:bg-obsidian hover:text-white font-mono text-xs uppercase font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>View Units & CAD</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onOpenBooking(prop.id)}
                    className="py-2.5 px-5 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white font-mono text-xs uppercase font-semibold transition-all active:scale-95"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
