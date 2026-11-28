import React, { useEffect, useState } from 'react';
import { Property } from '../types';
import { PropertyArt } from './ArchitecturalArt';
import { buildAgentWhatsAppUrl, buildGoogleMapsUrl } from '../lib/whatsapp';
import {
  X,
  MapPin,
  Clock,
  Wifi,
  Zap,
  UtensilsCrossed,
  ShieldCheck,
  PhoneCall,
  MessageCircle,
  ExternalLink,
  Bed
} from 'lucide-react';

interface ComparisonModalProps {
  properties: Property[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveProperty: (id: number) => void;
  onOpenBooking: (propertyId: number, roomId?: number, mode?: 'booking' | 'callback') => void;
}

const CompareThumb: React.FC<{ prop: Property }> = ({ prop }) => {
  const [imgFailed, setImgFailed] = useState(false);

  if (prop.image_url && !imgFailed) {
    return (
      <img
        src={prop.image_url}
        alt={prop.name}
        onError={() => setImgFailed(true)}
        className="w-full h-28 object-cover rounded-xl border border-parchment-200 sepia-[0.06] contrast-[1.02]"
      />
    );
  }

  return (
    <div className="w-full h-28 rounded-xl overflow-hidden border border-parchment-200">
      <PropertyArt
        theme={prop.accent_theme}
        name={prop.name}
        distanceKm={prop.distance_km}
        travelTime={prop.travel_time}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  properties,
  isOpen,
  onClose,
  onRemoveProperty,
  onOpenBooking
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || properties.length === 0) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/70 backdrop-blur-sm overscroll-contain"
    >
      <div className="w-full max-w-5xl max-h-[90vh] flex flex-col rounded-2xl bg-white border border-parchment-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-alabaster border-b border-parchment-200">
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-sage-700 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Side-by-Side MITE Housing Comparison</span>
            </div>
            <h2 id="compare-modal-title" className="font-display font-bold text-xl sm:text-2xl text-obsidian">
              Comparing {properties.length} Moodbidri Stays
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close comparison dialog"
            className="p-2 rounded-lg text-slate-600 hover:text-obsidian hover:bg-parchment-100 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Comparison Table */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="min-w-[680px]">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-parchment-200">
                  <th className="w-44 py-3 pr-4 align-top font-mono text-xs uppercase tracking-wider text-slate-600">
                    Metric
                  </th>
                  {properties.map((prop) => (
                    <th key={prop.id} className="py-3 px-3 align-top">
                      <div className="space-y-2.5">
                        <div className="relative">
                          <CompareThumb prop={prop} />
                          <button
                            type="button"
                            onClick={() => onRemoveProperty(prop.id)}
                            aria-label={`Remove ${prop.name} from comparison`}
                            className="absolute top-2 right-2 p-1 rounded-full bg-white/95 text-obsidian hover:bg-terracotta hover:text-white shadow-sm transition-colors"
                          >
                            <X className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>
                        <div>
                          <span className="inline-block px-2 py-0.5 rounded bg-alabaster border border-parchment-200 font-mono text-[11px] font-semibold text-obsidian mb-1">
                            {prop.category}
                          </span>
                          <div className="font-display font-bold text-base text-obsidian">
                            {prop.name}
                          </div>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-parchment-200 text-xs sm:text-sm font-sans">
                {/* Distance & Travel Time */}
                <tr>
                  <td className="py-3.5 pr-4 font-mono text-xs font-semibold uppercase text-slate-600">
                    MITE Distance &amp; Commute
                  </td>
                  {properties.map((prop) => (
                    <td key={prop.id} className="py-3.5 px-3 font-mono text-xs tabular-nums">
                      <div className="font-bold text-obsidian flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-terracotta flex-shrink-0" aria-hidden="true" />
                        <span>{prop.distance_km} km · {prop.travel_time}</span>
                      </div>
                      <a
                        href={buildGoogleMapsUrl(prop.name, prop.address)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-terracotta-700 hover:underline mt-1 text-[11px] font-semibold"
                      >
                        <MapPin className="w-3 h-3" aria-hidden="true" />
                        <span>Open in Google Maps</span>
                        <ExternalLink className="w-2.5 h-2.5" aria-hidden="true" />
                      </a>
                    </td>
                  ))}
                </tr>

                {/* Monthly Rent Range */}
                <tr>
                  <td className="py-3.5 pr-4 font-mono text-xs font-semibold uppercase text-slate-600">
                    Monthly Rent (Room Tiers)
                  </td>
                  {properties.map((prop) => {
                    const rents = prop.room_types.map((r) => r.monthly_rent_inr);
                    const minR = rents.length ? Math.min(...rents) : prop.starting_rent_inr;
                    const maxR = rents.length ? Math.max(...rents) : prop.starting_rent_inr;
                    return (
                      <td key={prop.id} className="py-3.5 px-3 tabular-nums">
                        <div className="font-display font-bold text-base text-obsidian">
                          ₹{minR.toLocaleString('en-IN')} – ₹{maxR.toLocaleString('en-IN')}
                          <span className="font-mono text-[11px] font-normal text-slate-600">/mo</span>
                        </div>
                        <div className="text-[11px] font-mono text-slate-600 mt-1 space-y-0.5">
                          {prop.room_types.map((r) => (
                            <div key={r.id}>
                              {r.name.replace(' Room', '')}: ₹{r.monthly_rent_inr.toLocaleString('en-IN')}
                            </div>
                          ))}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* Security Deposit */}
                <tr>
                  <td className="py-3.5 pr-4 font-mono text-xs font-semibold uppercase text-slate-600">
                    Refundable Deposit
                  </td>
                  {properties.map((prop) => {
                    const deps = prop.room_types.map((r) => r.deposit_inr);
                    const minD = deps.length ? Math.min(...deps) : 10000;
                    const maxD = deps.length ? Math.max(...deps) : 15000;
                    return (
                      <td key={prop.id} className="py-3.5 px-3 font-mono text-xs font-semibold text-obsidian tabular-nums">
                        ₹{minD.toLocaleString('en-IN')}
                        {maxD > minD ? ` – ₹${maxD.toLocaleString('en-IN')}` : ''}
                      </td>
                    );
                  })}
                </tr>

                {/* Food & Diet Status */}
                <tr>
                  <td className="py-3.5 pr-4 font-mono text-xs font-semibold uppercase text-slate-600">
                    Food / Veg Status
                  </td>
                  {properties.map((prop) => {
                    const isPureVeg = prop.food_plan.toLowerCase().includes('pure veg');
                    return (
                      <td key={prop.id} className="py-3.5 px-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-xs font-semibold border ${
                            isPureVeg
                              ? 'bg-emerald-50 border-emerald-600/30 text-emerald-800'
                              : 'bg-alabaster border-parchment-200 text-obsidian'
                          }`}
                        >
                          <UtensilsCrossed className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                          <span>{prop.food_plan}</span>
                        </span>
                      </td>
                    );
                  })}
                </tr>

                {/* Curfew Timing */}
                <tr>
                  <td className="py-3.5 pr-4 font-mono text-xs font-semibold uppercase text-slate-600">
                    Curfew &amp; Gate Rule
                  </td>
                  {properties.map((prop) => (
                    <td key={prop.id} className="py-3.5 px-3 font-mono text-xs text-slate-700">
                      {prop.curfew_timing}
                    </td>
                  ))}
                </tr>

                {/* Wi-Fi & Power Backup */}
                <tr>
                  <td className="py-3.5 pr-4 font-mono text-xs font-semibold uppercase text-slate-600">
                    Wi-Fi &amp; Power Backup
                  </td>
                  {properties.map((prop) => (
                    <td key={prop.id} className="py-3.5 px-3 space-y-1 font-mono text-xs text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <Wifi className="w-3.5 h-3.5 text-sage flex-shrink-0" aria-hidden="true" />
                        <span>{prop.wifi_speed}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-terracotta flex-shrink-0" aria-hidden="true" />
                        <span>{prop.power_backup}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Live Availability */}
                <tr>
                  <td className="py-3.5 pr-4 font-mono text-xs font-semibold uppercase text-slate-600">
                    Beds Available
                  </td>
                  {properties.map((prop) => (
                    <td key={prop.id} className="py-3.5 px-3 font-mono text-xs font-bold text-sage-700 tabular-nums">
                      <span className="inline-flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{prop.available_beds} / {prop.total_beds} free</span>
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Direct Contact / Book */}
                <tr>
                  <td className="py-4 pr-4 font-mono text-xs font-semibold uppercase text-slate-600">
                    Direct Action
                  </td>
                  {properties.map((prop) => (
                    <td key={prop.id} className="py-4 px-3 space-y-2 align-top">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenBooking(prop.id, prop.room_types[0]?.id, 'booking');
                        }}
                        className="w-full py-2.5 px-3 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white font-mono text-xs uppercase font-semibold transition-colors"
                      >
                        Book via Agent
                      </button>

                      <div className="flex items-center gap-2">
                        {prop.phone ? (
                          <a
                            href={`tel:${prop.phone.replace(/\s+/g, '')}`}
                            className="flex-1 py-2 px-2.5 rounded-lg border border-obsidian bg-white text-obsidian hover:bg-obsidian hover:text-white font-mono text-[11px] font-semibold transition-colors inline-flex items-center justify-center gap-1"
                          >
                            <PhoneCall className="w-3 h-3" aria-hidden="true" />
                            <span>Call</span>
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
                          className="flex-1 py-2 px-2.5 rounded-lg border border-emerald-700 bg-emerald-50 text-emerald-800 hover:bg-emerald-700 hover:text-white font-mono text-[11px] font-semibold transition-colors inline-flex items-center justify-center gap-1"
                        >
                          <MessageCircle className="w-3 h-3" aria-hidden="true" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
