import React, { useState, useEffect } from 'react';
import { Property } from '../types';
import { PropertyArt } from './ArchitecturalArt';
import { buildAgentWhatsAppUrl, buildGoogleMapsUrl } from '../lib/whatsapp';
import {
  X,
  MapPin,
  Clock,
  Bed,
  Phone,
  PhoneCall,
  Wifi,
  Zap,
  UtensilsCrossed,
  ShieldCheck,
  ExternalLink,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Home,
  BookOpen,
  Coffee,
  Landmark,
  Receipt
} from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: (propertyId: number, roomId?: number, mode?: 'booking' | 'callback') => void;
}

const GALLERY_TABS = [
  { key: 'exterior', label: 'Exterior', icon: Home },
  { key: 'bedroom', label: 'Bedroom', icon: Bed },
  { key: 'study', label: 'Study & Wi-Fi', icon: BookOpen },
  { key: 'dining', label: 'Dining & Mess', icon: Coffee }
] as const;

type GalleryTab = typeof GALLERY_TABS[number]['key'];

function formatTelHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, '')}`;
}

function getGalleryForProperty(property: Property): Record<GalleryTab, string> {
  if (property.gallery_images && property.gallery_images.length >= 4) {
    return {
      exterior: property.gallery_images[0] || property.image_url,
      bedroom: property.gallery_images[1] || '/images/gallery-single-room.jpg',
      study: property.gallery_images[2] || '/images/gallery-study-desk.jpg',
      dining: property.gallery_images[3] || '/images/gallery-south-thali.jpg'
    };
  }

  const isOdd = property.id % 2 === 1;
  const isPureVeg = property.food_plan.toLowerCase().includes('veg');

  return {
    exterior: property.image_url || '',
    bedroom: isOdd ? '/images/gallery-single-room.jpg' : '/images/gallery-twin-sharing.jpg',
    study: isOdd ? '/images/gallery-study-desk.jpg' : '/images/amenity-wifi-study.jpg',
    dining: isPureVeg || !isOdd ? '/images/gallery-south-thali.jpg' : '/images/amenity-mess-dining.jpg'
  };
}

function getNearbyLandmarks(property: Property): string[] {
  const n = property.neighborhood.toLowerCase();
  if (n.includes('badagumijaru')) {
    return [
      'MITE Main Academic Block (1-2 min walk)',
      'MITE Central Library & Cafeteria',
      'Badagumijaru Bus Stop & Auto Stand'
    ];
  }
  if (n.includes('todaru')) {
    return [
      'MITE Main Gate via NH-169 (3 min ride)',
      'Todaru Bus Stop & Medical Shop',
      'Local Tiffin & Stationary Stores'
    ];
  }
  return [
    'Moodbidri Private Bus Stand & Auto Hub',
    'KMC Pharmacy & Alva’s Clinic Corridor',
    'Daily MITE College Bus Pickup Point'
  ];
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  isOpen,
  onClose,
  onOpenBooking
}) => {
  const [activeGalleryTab, setActiveGalleryTab] = useState<GalleryTab>('exterior');
  const [imgFailed, setImgFailed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setActiveGalleryTab('exterior');
  }, [property?.id]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !property) return null;

  const galleryMap = getGalleryForProperty(property);
  const currentImage = galleryMap[activeGalleryTab];
  const hasImageFailed = imgFailed[`${property.id}-${activeGalleryTab}`];
  const isPureVeg = property.food_plan.toLowerCase().includes('pure veg');
  const isOnCampus = property.category.toLowerCase().includes('on-campus');
  const landmarks = getNearbyLandmarks(property);
  const lowestDeposit = property.room_types.length
    ? Math.min(...property.room_types.map((r) => r.deposit_inr))
    : 10000;

  const tabIndex = GALLERY_TABS.findIndex((t) => t.key === activeGalleryTab);
  const goNext = () => {
    const next = (tabIndex + 1) % GALLERY_TABS.length;
    setActiveGalleryTab(GALLERY_TABS[next].key);
  };
  const goPrev = () => {
    const prev = (tabIndex - 1 + GALLERY_TABS.length) % GALLERY_TABS.length;
    setActiveGalleryTab(GALLERY_TABS[prev].key);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="property-detail-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-obsidian/65 backdrop-blur-sm flex items-start justify-center pt-6 pb-8 px-4 overscroll-contain"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-parchment-200 overflow-hidden">

        {/* Gallery Strip */}
        <div className="relative aspect-[16/9] w-full bg-alabaster overflow-hidden">
          {currentImage && !hasImageFailed ? (
            <img
              src={currentImage}
              alt={`${property.name} — ${GALLERY_TABS[tabIndex]?.label || activeGalleryTab}`}
              onError={() => setImgFailed((p) => ({ ...p, [`${property.id}-${activeGalleryTab}`]: true }))}
              className="w-full h-full object-cover sepia-[0.04] contrast-[1.02]"
            />
          ) : (
            <PropertyArt
              theme={property.accent_theme}
              name={property.name}
              distanceKm={property.distance_km}
              travelTime={property.travel_time}
              className="w-full h-full"
            />
          )}

          {/* Top Left Photo Counter */}
          <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-obsidian/85 text-white font-mono text-[11px] font-semibold tabular-nums">
            Photo {tabIndex + 1} of 4 · {GALLERY_TABS[tabIndex]?.label}
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close property detail"
            className="absolute top-3 right-3 p-2.5 rounded-lg bg-white/95 backdrop-blur-sm border border-parchment-200 text-obsidian hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Nav Arrows */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-lg bg-white/95 backdrop-blur-sm border border-parchment-200 text-obsidian hover:bg-white shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-lg bg-white/95 backdrop-blur-sm border border-parchment-200 text-obsidian hover:bg-white shadow-sm"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Gallery Tab Selector */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2 py-1.5 rounded-xl bg-white/95 backdrop-blur-sm border border-parchment-200 shadow-sm">
            {GALLERY_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeGalleryTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveGalleryTab(tab.key)}
                  aria-pressed={isActive}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-mono text-[11px] font-semibold transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-obsidian text-white'
                      : 'text-slate-700 hover:text-obsidian'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail Content */}
        <div className="p-6 sm:p-8 space-y-6">

          {/* Title Row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-md border font-mono text-[11px] font-semibold uppercase tracking-wide bg-slate-100 text-obsidian border-slate-300">
                  {property.category}
                </span>
                {isPureVeg && (
                  <span className="px-2.5 py-1 rounded-md bg-emerald-700 text-white font-mono text-[11px] font-semibold">
                    Pure Veg
                  </span>
                )}
                {isOnCampus && (
                  <span className="px-2.5 py-1 rounded-md bg-sage-50 text-sage-700 border border-sage-600/25 font-mono text-[11px] font-semibold">
                    On-Campus
                  </span>
                )}
                <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-sage-700">
                  <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Verified by CampusNest Agent</span>
                </span>
              </div>
              <h2 id="property-detail-title" className="font-display font-extrabold text-2xl sm:text-3xl text-obsidian tracking-tight">
                {property.name}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed max-w-xl">
                {property.description}
              </p>
            </div>
            <div className="text-left sm:text-right flex-shrink-0 tabular-nums">
              <div className="font-mono text-[11px] text-slate-600">Starting Rent</div>
              <div className="font-display font-bold text-2xl text-obsidian">
                ₹{property.starting_rent_inr.toLocaleString('en-IN')}
                <span className="text-sm font-normal text-slate-600">/mo</span>
              </div>
              <div className="font-mono text-[11px] text-sage-700 font-semibold mt-0.5">
                {property.available_beds} beds open
              </div>
            </div>
          </div>

          {/* Location & Distance */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-alabaster border border-parchment-200">
            <div className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
              <MapPin className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>{property.address}</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs tabular-nums flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-parchment-200 text-obsidian font-semibold">
                <Clock className="w-3.5 h-3.5 text-terracotta" aria-hidden="true" />
                <span>{property.distance_km} km · {property.travel_time}</span>
              </span>
              <a
                href={buildGoogleMapsUrl(property.name, property.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-terracotta-700 hover:underline"
              >
                <span>Maps Pin</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Living Rules Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: UtensilsCrossed, label: property.food_plan, color: 'text-sage' },
              { icon: Clock, label: property.curfew_timing, color: 'text-terracotta' },
              { icon: Wifi, label: property.wifi_speed, color: 'text-obsidian' },
              { icon: Zap, label: property.power_backup, color: 'text-terracotta' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-alabaster border border-parchment-200 font-mono text-[11px] text-slate-700"
              >
                <item.icon className={`w-3.5 h-3.5 ${item.color} flex-shrink-0`} aria-hidden="true" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Room Tiers */}
          <div>
            <h3 className="font-display font-bold text-base text-obsidian mb-3">Room Configurations &amp; Live Inventory</h3>
            <div className="space-y-2.5">
              {property.room_types.map((room) => (
                <div
                  key={room.id}
                  className="p-4 rounded-xl bg-alabaster border border-parchment-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-display font-bold text-sm text-obsidian">{room.name}</div>
                    <div className="font-mono text-xs text-slate-600 tabular-nums">
                      {room.area_sqft} sq.ft · Refundable Deposit ₹{room.deposit_inr.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right tabular-nums">
                      <div className="font-display font-bold text-sm text-obsidian">
                        ₹{room.monthly_rent_inr.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-600">/mo</span>
                      </div>
                      <span className={`font-mono text-[11px] font-semibold ${room.status === 'Available' ? 'text-sage-700' : 'text-amber-800'}`}>
                        {room.available_count} left · {room.status}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenBooking(property.id, room.id, 'booking')}
                      className="px-4 py-2 rounded-lg bg-terracotta hover:bg-terracotta-600 text-white font-mono text-[11px] uppercase font-semibold transition-colors whitespace-nowrap"
                    >
                      Book via Agent
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transparent Fee Summary & Nearby Landmarks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-alabaster border border-parchment-200 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-obsidian">
                <Receipt className="w-4 h-4 text-terracotta" aria-hidden="true" />
                <span>Fee Transparency</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 font-sans">
                <li>CampusNest Agent Brokerage: <strong className="text-sage-700">₹0 (Free)</strong></li>
                <li>Security Deposit from: <strong className="text-obsidian tabular-nums">₹{lowestDeposit.toLocaleString('en-IN')}</strong> (Refundable)</li>
                <li>Food Policy: <strong className="text-obsidian">{property.food_plan}</strong></li>
                <li>Backup Utility: <strong className="text-obsidian">{property.power_backup}</strong></li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-alabaster border border-parchment-200 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-obsidian">
                <Landmark className="w-4 h-4 text-sage" aria-hidden="true" />
                <span>Nearby MITE Landmarks</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700 font-sans">
                {landmarks.map((lm, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage flex-shrink-0 mt-1.5" />
                    <span>{lm}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact & Direct Actions */}
          <div className="p-4 rounded-xl bg-obsidian text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 font-mono text-xs">
              <Phone className="w-4 h-4 text-terracotta flex-shrink-0" aria-hidden="true" />
              {property.phone ? (
                <span className="font-semibold tabular-nums">Owner Phone: {property.phone}</span>
              ) : (
                <span className="font-semibold text-parchment-200">Coordinated Exclusively via CampusNest Agent</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {property.phone && (
                <a
                  href={formatTelHref(property.phone)}
                  className="px-4 py-2 rounded-lg border border-white/30 bg-white/10 text-white hover:bg-white hover:text-obsidian font-mono text-[11px] uppercase font-semibold transition-colors flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Call PG</span>
                </a>
              )}
              <a
                href={buildAgentWhatsAppUrl({
                  propertyName: property.name,
                  distanceKm: property.distance_km,
                  monthlyEstimateInr: property.starting_rent_inr
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-[11px] uppercase font-semibold transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>WhatsApp Agent</span>
              </a>
              <button
                type="button"
                onClick={() => onOpenBooking(property.id, property.room_types[0]?.id, 'booking')}
                className="px-4 py-2 rounded-lg bg-terracotta hover:bg-terracotta-600 text-white font-mono text-[11px] uppercase font-semibold transition-colors"
              >
                Schedule Tour
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
