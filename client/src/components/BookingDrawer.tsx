import React, { useState, useEffect, useRef } from 'react';
import { Property, BookingFormData, Booking, TourType } from '../types';
import { createBooking } from '../lib/api';
import { buildAgentWhatsAppUrl } from '../lib/whatsapp';
import {
  X,
  Check,
  Copy,
  Calendar,
  User,
  Mail,
  Printer,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Phone,
  MessageCircle,
  UtensilsCrossed
} from 'lucide-react';

interface BookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  initialPropertyId?: number;
  initialRoomId?: number;
  initialMode?: 'booking' | 'callback';
  onBookingSuccess?: (booking: Booking) => void;
}

export const BookingDrawer: React.FC<BookingDrawerProps> = ({
  isOpen,
  onClose,
  properties,
  initialPropertyId,
  initialRoomId,
  initialMode = 'booking',
  onBookingSuccess
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [propertyId, setPropertyId] = useState<number>(initialPropertyId || properties[0]?.id || 1);
  const [roomId, setRoomId] = useState<number>(initialRoomId || properties[0]?.room_types[0]?.id || 1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [applicantRole, setApplicantRole] = useState<'Student' | 'Guardian' | 'Other'>('Student');
  const [tourType, setTourType] = useState<TourType>(initialMode === 'callback' ? 'Agent Callback' : 'On-Site');
  const [moveInDate, setMoveInDate] = useState('2026-08-01');
  const [notes, setNotes] = useState('');
  const [messPreference, setMessPreference] = useState<'included' | 'tiffin' | 'room_only'>('included');
  const [acPreference, setAcPreference] = useState<'non_ac' | 'ac'>('non_ac');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const prevIsOpenRef = useRef(false);

  // Sync drawer defaults ONLY when transitioning from closed to open
  useEffect(() => {
    const justOpened = isOpen && !prevIsOpenRef.current;
    prevIsOpenRef.current = isOpen;

    if (!justOpened) return;

    setStep(1);
    setErrorMessage(null);
    setConfirmedBooking(null);
    setTourType(initialMode === 'callback' ? 'Agent Callback' : 'On-Site');

    if (initialPropertyId) {
      setPropertyId(initialPropertyId);
      const prop = properties.find(p => p.id === initialPropertyId);
      if (initialRoomId) {
        setRoomId(initialRoomId);
      } else if (prop && prop.room_types.length > 0) {
        setRoomId(prop.room_types[0].id);
      }
    } else if (properties.length > 0) {
      setPropertyId(properties[0].id);
      if (properties[0].room_types.length > 0) {
        setRoomId(properties[0].room_types[0].id);
      }
    }
  }, [isOpen, initialPropertyId, initialRoomId, initialMode, properties]);

  // Escape key dismissal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const selectedProperty = properties.find(p => p.id === propertyId) || properties[0];
  const selectedRoom = selectedProperty?.room_types.find(r => r.id === roomId) || selectedProperty?.room_types[0];
  const isMessIncludedByProp =
    selectedProperty &&
    !selectedProperty.food_plan.toLowerCase().includes('room only') &&
    !selectedProperty.food_plan.toLowerCase().includes('optional');
  const messDelta =
    messPreference === 'included'
      ? (isMessIncludedByProp ? 0 : 2600)
      : messPreference === 'tiffin'
        ? 2200
        : isMessIncludedByProp
          ? -1000
          : 0;
  const acDelta = acPreference === 'ac' ? 1500 : 0;
  const estimatedMonthlyTotal = Math.max(
    4200,
    (selectedRoom?.monthly_rent_inr || selectedProperty?.starting_rent_inr || 5000) + messDelta + acDelta
  );

  const validateStep2 = () => {
    if (fullName.trim().length < 2) {
      setErrorMessage('Full name must be at least 2 characters.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Enter a valid email address (e.g. name@mite.ac.in).');
      return false;
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.trim())) {
      setErrorMessage('Enter a valid 10-digit Indian mobile number starting with 6–9.');
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const handleNext = () => {
    setErrorMessage(null);
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
      }
    }
  };

  const handleSubmitBooking = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const messLabel =
        messPreference === 'included' ? '3-Time Mess' : messPreference === 'tiffin' ? 'B&D Tiffin' : 'Room Only';
      const acLabel = acPreference === 'ac' ? 'AC Requested' : 'Non-AC';
      const planPrefix = `[Est. ₹${estimatedMonthlyTotal.toLocaleString('en-IN')}/mo · ${messLabel} · ${acLabel}]`;
      const combinedNotes = notes.trim() ? `${planPrefix} ${notes.trim()}` : planPrefix;

      const payload: BookingFormData = {
        property_id: propertyId,
        room_type_id: roomId,
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        applicant_role: applicantRole,
        tour_type: tourType,
        preferred_move_in: moveInDate,
        notes: combinedNotes
      };

      const response = await createBooking(payload);
      setConfirmedBooking(response.booking);
      onBookingSuccess?.(response.booking);
      setStep(4);
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission failed. Please verify your inputs and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyReferenceCode = () => {
    if (confirmedBooking?.reference_code) {
      navigator.clipboard.writeText(confirmedBooking.reference_code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden bg-obsidian/60 backdrop-blur-sm flex justify-end overscroll-contain"
    >
      <div className="w-full max-w-xl h-full bg-white shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-parchment-200 overscroll-contain">

        {/* Header */}
        <div className="p-6 border-b border-parchment-200 bg-alabaster flex items-center justify-between sticky top-0 z-10">
          <div>
            <div className="font-mono text-xs text-terracotta-700 uppercase tracking-wider font-semibold">
              Step {step} of 4 · {initialMode === 'callback' ? 'Agent Callback Request' : 'Book via CampusNest Agent'}
            </div>
            <h2 id="booking-drawer-title" className="font-display font-extrabold text-xl text-obsidian tracking-tight">
              {step === 1 && 'Select Moodbidri PG & Room'}
              {step === 2 && 'Student / Guardian Contact'}
              {step === 3 && 'Tour & Agent Coordination'}
              {step === 4 && 'Official Agent Reservation Pass'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-600 hover:text-obsidian hover:bg-parchment-200 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close booking drawer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 flex-1 space-y-6">

          {/* Agent Mediation Banner */}
          {step < 4 && (
            <div className="p-3.5 rounded-xl bg-sage-50 border border-sage-600/20 flex items-start gap-3 text-xs text-sage-700">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <strong>Verified by CampusNest Agent:</strong> Our Moodbidri coordinator verifies live bed availability with the PG owner and negotiates terms with zero brokerage fees.
              </span>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div role="alert" aria-live="polite" className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-mono flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STEP 1: PROPERTY & ROOM SELECTION */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="drawer-property-select" className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-2">
                  1. Choose Verified MITE / Moodbidri PG ({properties.length})
                </label>
                <select
                  id="drawer-property-select"
                  value={propertyId}
                  onChange={(e) => {
                    const nextId = Number(e.target.value);
                    setPropertyId(nextId);
                    const prop = properties.find(p => p.id === nextId);
                    if (prop && prop.room_types.length > 0) {
                      setRoomId(prop.room_types[0].id);
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-parchment-300 bg-white font-sans font-semibold text-sm text-obsidian mb-3 cursor-pointer"
                >
                  {properties.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.category} ({p.distance_km} km · {p.travel_time})
                    </option>
                  ))}
                </select>

                {/* Selected Property Preview Box */}
                {selectedProperty && (
                  <div className="p-4 rounded-xl bg-alabaster border border-parchment-200 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display font-bold text-sm text-obsidian">{selectedProperty.name}</span>
                      <span className="font-mono font-semibold text-sage-700 tabular-nums">{selectedProperty.available_beds} beds left</span>
                    </div>
                    <div className="font-mono text-slate-700">{selectedProperty.address}</div>
                    <div className="flex items-center gap-1.5 font-mono text-slate-700 pt-1">
                      <Phone className="w-3.5 h-3.5 text-terracotta" aria-hidden="true" />
                      <span>
                        {selectedProperty.phone
                          ? `Owner Phone: ${selectedProperty.phone} (Agent coordinated)`
                          : 'Owner Contact: Coordinated exclusively via CampusNest Agent'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {selectedProperty && (
                <div>
                  <span className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-2">
                    2. Select Room Configuration Tier
                  </span>
                  <div className="grid grid-cols-1 gap-2.5">
                    {selectedProperty.room_types.map((room) => (
                      <button
                        key={room.id}
                        type="button"
                        onClick={() => setRoomId(room.id)}
                        aria-pressed={roomId === room.id}
                        className={`w-full text-left p-3.5 rounded-xl border transition-colors flex items-center justify-between ${
                          roomId === room.id
                            ? 'border-terracotta bg-terracotta-50/40 shadow-sm'
                            : 'border-parchment-200 hover:border-obsidian bg-white'
                        }`}
                      >
                        <div>
                          <div className="font-display font-bold text-sm text-obsidian">{room.name}</div>
                          <div className="font-mono text-xs text-slate-600 tabular-nums">{room.area_sqft} sq.ft · Deposit ₹{room.deposit_inr.toLocaleString('en-IN')}</div>
                        </div>
                        <div className="text-right tabular-nums">
                          <div className="font-display font-bold text-sm text-obsidian">
                            ₹{room.monthly_rent_inr.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-600">/mo</span>
                          </div>
                          <span className={`font-mono text-[11px] font-semibold ${room.status === 'Available' ? 'text-sage-700' : 'text-amber-800'}`}>
                            {room.available_count} left · {room.status}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedProperty && (
                <div className="p-4 rounded-xl bg-alabaster border border-parchment-200 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 font-semibold uppercase text-slate-700">
                      <UtensilsCrossed className="w-3.5 h-3.5 text-sage" aria-hidden="true" />
                      <span>3. Food &amp; AC Cost Estimator</span>
                    </span>
                    <span className="font-bold text-terracotta-700 tabular-nums">
                      Est. ₹{estimatedMonthlyTotal.toLocaleString('en-IN')}/mo
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {(
                      [
                        { id: 'included', label: isMessIncludedByProp ? 'Mess Included' : 'Full Mess (+₹2.6k)' },
                        { id: 'tiffin', label: '2-Time Tiffin (+₹2.2k)' },
                        { id: 'room_only', label: 'Room Only' }
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setMessPreference(opt.id)}
                        className={`px-2.5 py-1.5 rounded-lg border transition-colors ${
                          messPreference === opt.id
                            ? 'bg-obsidian text-white border-obsidian font-semibold'
                            : 'bg-white border-parchment-200 text-slate-700 hover:border-obsidian'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setAcPreference((prev) => (prev === 'non_ac' ? 'ac' : 'non_ac'))}
                      className={`px-2.5 py-1.5 rounded-lg border transition-colors ${
                        acPreference === 'ac'
                          ? 'bg-terracotta text-white border-terracotta font-semibold'
                          : 'bg-white border-parchment-200 text-slate-700 hover:border-obsidian'
                      }`}
                    >
                      {acPreference === 'ac' ? 'AC (+₹1,500)' : 'Non-AC (+₹0)'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: PERSONAL & CONTACT INFO */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <span className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1.5">
                  Applicant Role
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(['Student', 'Guardian', 'Other'] as const).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setApplicantRole(role)}
                      aria-pressed={applicantRole === role}
                      className={`py-2.5 px-3 rounded-lg font-mono text-xs font-medium border transition-colors ${
                        applicantRole === role
                          ? 'bg-obsidian text-white border-obsidian'
                          : 'bg-white border-parchment-200 text-slate-700 hover:border-obsidian'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="booking-full-name" className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-600 absolute left-3.5 top-3.5" aria-hidden="true" />
                  <input
                    id="booking-full-name"
                    name="full_name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="e.g. Karthik Acharya…"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-parchment-300 bg-white font-sans text-sm text-obsidian placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="booking-email" className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-600 absolute left-3.5 top-3.5" aria-hidden="true" />
                  <input
                    id="booking-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    spellCheck={false}
                    required
                    placeholder="student@mite.ac.in…"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-parchment-300 bg-white font-sans text-sm text-obsidian placeholder:text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="booking-phone" className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1">
                  Indian Mobile Number (10 Digits) *
                </label>
                <div className="relative flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-parchment-300 bg-alabaster text-xs font-mono text-slate-700 font-semibold">
                    +91
                  </span>
                  <input
                    id="booking-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    required
                    maxLength={10}
                    placeholder="9845123456…"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-2.5 rounded-r-xl border border-parchment-300 bg-white font-sans text-sm text-obsidian placeholder:text-slate-500 tabular-nums"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: TOUR PREFERENCE & TARGET MOVE-IN */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <span className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-2">
                  How should our CampusNest Agent assist?
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    {
                      value: 'On-Site' as TourType,
                      title: 'On-Site Visit',
                      desc: 'Agent meets you at the PG for an in-person tour.'
                    },
                    {
                      value: 'Agent Callback' as TourType,
                      title: 'Agent Callback',
                      desc: 'Agent verifies beds with owner & calls you in 15 min.'
                    },
                    {
                      value: 'Virtual' as TourType,
                      title: 'Video Walkthrough',
                      desc: 'Live WhatsApp / video call from the PG room.'
                    }
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setTourType(option.value)}
                      aria-pressed={tourType === option.value}
                      className={`p-3.5 rounded-xl border text-left transition-colors ${
                        tourType === option.value
                          ? 'border-terracotta bg-terracotta-50/40'
                          : 'border-parchment-200 bg-white hover:border-obsidian'
                      }`}
                    >
                      <div className="font-display font-bold text-sm text-obsidian mb-1">{option.title}</div>
                      <p className="text-xs text-slate-600 leading-snug">{option.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="booking-move-in" className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1">
                  Target Move-In Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-600 absolute left-3.5 top-3.5" aria-hidden="true" />
                  <input
                    id="booking-move-in"
                    name="preferred_move_in"
                    type="date"
                    value={moveInDate}
                    onChange={(e) => setMoveInDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-parchment-300 bg-white font-mono text-sm text-obsidian"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="booking-notes" className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1">
                  MITE Branch, Dietary Preference, or Questions (Optional)
                </label>
                <textarea
                  id="booking-notes"
                  name="notes"
                  rows={3}
                  placeholder="e.g. Joining MITE CSE 1st year; prefer pure veg meals and ground floor…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-parchment-300 bg-white font-sans text-sm text-obsidian placeholder:text-slate-500"
                />
              </div>

              {/* Order Summary Strip */}
              <div className="p-4 rounded-xl bg-alabaster border border-parchment-200 font-mono text-xs space-y-1.5 tabular-nums">
                <div className="flex justify-between gap-2">
                  <span className="text-slate-600">PG / Hostel:</span>
                  <span className="font-semibold text-obsidian text-right">{selectedProperty?.name}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-slate-600">Distance from MITE:</span>
                  <span className="font-semibold text-obsidian">{selectedProperty?.distance_km} km ({selectedProperty?.travel_time})</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-slate-600">Selected Tier:</span>
                  <span className="font-semibold text-obsidian text-right">{selectedRoom?.name}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-slate-600">Dining &amp; Cooling Plan:</span>
                  <span className="font-semibold text-obsidian text-right">
                    {messPreference === 'included' ? '3-Time Mess' : messPreference === 'tiffin' ? '2-Time Tiffin' : 'Room Only'} · {acPreference === 'ac' ? 'AC' : 'Non-AC'}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-slate-600">Estimated Monthly Rent:</span>
                  <span className="font-bold text-terracotta-700">₹{estimatedMonthlyTotal.toLocaleString('en-IN')}/mo</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: OFFICIAL PASS CONFIRMATION */}
          {step === 4 && confirmedBooking && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-sage-50 border border-sage-600/20 text-center">
                <div className="w-11 h-11 rounded-full bg-sage text-white flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Check className="w-6 h-6 stroke-[3]" aria-hidden="true" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-obsidian mb-1">
                  Lead Assigned to Moodbidri Agent
                </h3>
                <p className="text-xs font-mono text-sage-700">
                  Status: {confirmedBooking.status} · Owner Handoff Queued
                </p>
              </div>

              {/* Physical Architectural Boarding Pass Card */}
              <div id="booking-pass-card" className="rounded-2xl border-2 border-obsidian bg-white p-6 shadow-md relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-parchment-200 pb-4 mb-4">
                  <div>
                    <span className="font-mono text-[10px] text-slate-600 uppercase">OFFICIAL AGENT REFERENCE</span>
                    <div className="font-mono font-extrabold text-xl text-terracotta-700 tracking-wider tabular-nums" translate="no">
                      {confirmedBooking.reference_code}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={copyReferenceCode}
                    className="p-2.5 rounded-lg border border-parchment-300 hover:bg-alabaster flex items-center gap-1.5 font-mono text-xs text-obsidian"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-sage" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
                    <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 font-mono text-xs mb-4">
                  <div>
                    <span className="text-slate-600 block text-[10px]">APPLICANT</span>
                    <span className="font-bold text-obsidian">{confirmedBooking.full_name}</span>
                  </div>
                  <div>
                    <span className="text-slate-600 block text-[10px]">REQUEST MODE</span>
                    <span className="font-semibold text-terracotta-700">{confirmedBooking.tour_type}</span>
                  </div>
                  <div>
                    <span className="text-slate-600 block text-[10px]">PROPERTY</span>
                    <span className="font-semibold text-obsidian">{confirmedBooking.property_name}</span>
                  </div>
                  <div>
                    <span className="text-slate-600 block text-[10px]">ROOM SUITE</span>
                    <span className="font-semibold text-obsidian">{confirmedBooking.room_name}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-600 block text-[10px]">PROPERTY ADDRESS</span>
                    <span className="font-medium text-obsidian">{confirmedBooking.property_address || selectedProperty?.address}</span>
                  </div>
                  <div>
                    <span className="text-slate-600 block text-[10px]">OWNER CONTACT</span>
                    <span className="font-semibold text-obsidian tabular-nums">
                      {confirmedBooking.property_phone || 'Via CampusNest Agent'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-600 block text-[10px]">TARGET MOVE-IN</span>
                    <span className="font-semibold text-obsidian tabular-nums">{confirmedBooking.preferred_move_in}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-dashed border-parchment-300 flex items-center justify-between text-[10px] font-mono text-slate-600">
                  <span>CAMPUSNEST · MOODBIDRI AGENT</span>
                  <span className="tracking-widest" aria-hidden="true">||| | |||| | ||| |||| |</span>
                </div>
              </div>

              {/* One-Click WhatsApp Agent Handoff */}
              <a
                href={buildAgentWhatsAppUrl({
                  propertyName: confirmedBooking.property_name,
                  distanceKm: selectedProperty?.distance_km,
                  roomName: confirmedBooking.room_name,
                  studentName: confirmedBooking.full_name,
                  moveInDate: confirmedBooking.preferred_move_in,
                  referenceCode: confirmedBooking.reference_code,
                  monthlyEstimateInr: estimatedMonthlyTotal
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>WhatsApp Agent Now (Send {confirmedBooking.reference_code})</span>
              </a>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 py-3 px-4 rounded-xl border border-obsidian font-mono text-xs uppercase font-semibold text-obsidian hover:bg-alabaster transition-colors flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" aria-hidden="true" />
                  <span>Print Pass</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-obsidian text-white font-mono text-xs uppercase font-semibold hover:bg-slate-800 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        {step < 4 && (
          <div className="p-6 border-t border-parchment-200 bg-alabaster flex items-center justify-between sticky bottom-0">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                className="py-2.5 px-4 rounded-xl border border-parchment-300 bg-white font-mono text-xs uppercase font-semibold text-obsidian hover:border-obsidian flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Back</span>
              </button>
            ) : <div />}

            <button
              type="button"
              disabled={isSubmitting}
              onClick={step === 3 ? handleSubmitBooking : handleNext}
              className="py-3 px-6 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-sm active:scale-95 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting to Agent…</span>
              ) : step === 3 ? (
                <>
                  <span>Submit Request &amp; Get Pass</span>
                  <Check className="w-4 h-4" aria-hidden="true" />
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
