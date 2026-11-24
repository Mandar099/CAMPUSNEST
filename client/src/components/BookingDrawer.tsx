import React, { useState, useEffect } from 'react';
import { Property, BookingFormData, Booking } from '../types';
import { createBooking } from '../lib/api';
import { 
  X, 
  Check, 
  Copy, 
  Calendar, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Sparkles, 
  Printer, 
  ShieldCheck, 
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface BookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  initialPropertyId?: number;
  initialRoomId?: number;
  onBookingSuccess?: (booking: Booking) => void;
}

export const BookingDrawer: React.FC<BookingDrawerProps> = ({
  isOpen,
  onClose,
  properties,
  initialPropertyId,
  initialRoomId,
  onBookingSuccess
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [propertyId, setPropertyId] = useState<number>(initialPropertyId || properties[0]?.id || 1);
  const [roomId, setRoomId] = useState<number>(initialRoomId || properties[0]?.room_types[0]?.id || 1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [applicantRole, setApplicantRole] = useState<'Student' | 'Guardian' | 'Other'>('Student');
  const [tourType, setTourType] = useState<'On-Site' | 'Virtual'>('On-Site');
  const [moveInDate, setMoveInDate] = useState('2026-08-01');
  const [notes, setNotes] = useState('');

  // Submission & Validation State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Synchronize when initial props change
  useEffect(() => {
    if (initialPropertyId) {
      setPropertyId(initialPropertyId);
      const prop = properties.find(p => p.id === initialPropertyId);
      if (initialRoomId) {
        setRoomId(initialRoomId);
      } else if (prop && prop.room_types.length > 0) {
        setRoomId(prop.room_types[0].id);
      }
    }
  }, [initialPropertyId, initialRoomId, properties]);

  // Handle escape key
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

  // Client Validation for Step 2
  const validateStep2 = () => {
    if (fullName.trim().length < 2) {
      setErrorMessage('Full name must be at least 2 characters');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please provide a valid email address');
      return false;
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.trim())) {
      setErrorMessage('Please provide a valid 10-digit Indian mobile number (e.g. 9845123456)');
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
      const payload: BookingFormData = {
        property_id: propertyId,
        room_type_id: roomId,
        full_name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        applicant_role: applicantRole,
        tour_type: tourType,
        preferred_move_in: moveInDate,
        notes: notes.trim()
      };

      const response = await createBooking(payload);
      setConfirmedBooking(response.booking);
      onBookingSuccess?.(response.booking);
      setStep(4);
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission error. Please check your inputs.');
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-obsidian/60 backdrop-blur-sm flex justify-end transition-opacity duration-300">
      
      {/* Slide-over Container */}
      <div className="w-full max-w-xl h-full bg-white shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-parchment-200 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-parchment-200 bg-alabaster flex items-center justify-between sticky top-0 z-10">
          <div>
            <div className="font-mono text-[11px] text-terracotta uppercase tracking-wider font-semibold">
              Step {step} of 4 // Unit Reservation & Tour
            </div>
            <h2 className="font-display font-extrabold text-xl text-obsidian tracking-tight">
              {step === 1 && 'Select Property & Room Suite'}
              {step === 2 && 'Applicant & Guardian Details'}
              {step === 3 && 'Tour Preference & Move-in Target'}
              {step === 4 && 'Official Booking Reservation Pass'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-obsidian hover:bg-parchment-200 transition-colors"
            aria-label="Close booking drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 flex-1 space-y-6">
          
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-mono">
              ⚠️ {errorMessage}
            </div>
          )}

          {/* STEP 1: PROPERTY & ROOM SELECTION */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-600 mb-2">
                  1. Choose Collegiate Hub Residence
                </label>
                <div className="grid grid-cols-1 gap-2.5">
                  {properties.map((prop) => (
                    <div
                      key={prop.id}
                      onClick={() => {
                        setPropertyId(prop.id);
                        if (prop.room_types.length > 0) {
                          setRoomId(prop.room_types[0].id);
                        }
                      }}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        propertyId === prop.id
                          ? 'border-obsidian bg-sand-50 shadow-sm'
                          : 'border-parchment-200 hover:border-slate-400 bg-white'
                      }`}
                    >
                      <div>
                        <div className="font-display font-bold text-sm text-obsidian">{prop.name}</div>
                        <div className="font-mono text-xs text-slate-500">{prop.distance_to_campus}</div>
                      </div>
                      <div className="text-right font-mono text-xs">
                        <span className="text-sage font-semibold">{prop.available_beds} beds left</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedProperty && (
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase text-slate-600 mb-2">
                    2. Select Room Configuration Tier
                  </label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {selectedProperty.room_types.map((room) => (
                      <div
                        key={room.id}
                        onClick={() => setRoomId(room.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          roomId === room.id
                            ? 'border-terracotta bg-terracotta-50/40 shadow-sm'
                            : 'border-parchment-200 hover:border-slate-400 bg-white'
                        }`}
                      >
                        <div>
                          <div className="font-display font-bold text-sm text-obsidian">{room.name}</div>
                          <div className="font-mono text-xs text-slate-500">{room.area_sqft} sq.ft · All-Inclusive</div>
                        </div>
                        <div className="text-right">
                          <div className="font-display font-bold text-sm text-obsidian">
                            ₹{room.monthly_rent_inr.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-500">/mo</span>
                          </div>
                          <span className={`font-mono text-[10px] ${room.status === 'Available' ? 'text-sage' : 'text-amber-600'}`}>
                            {room.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: PERSONAL & CONTACT INFO */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-600 mb-1">
                  Applicant Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Student', 'Guardian', 'Other'] as const).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setApplicantRole(role)}
                      className={`py-2 px-3 rounded-lg font-mono text-xs font-medium border transition-colors ${
                        applicantRole === role
                          ? 'bg-obsidian text-white border-obsidian'
                          : 'bg-white border-parchment-200 text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-600 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aditya Rao"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-parchment-200 bg-white font-sans text-sm text-obsidian focus:outline-none focus:border-obsidian"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-600 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="aditya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-parchment-200 bg-white font-sans text-sm text-obsidian focus:outline-none focus:border-obsidian"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-600 mb-1">
                  Indian Mobile Number (10 Digits) *
                </label>
                <div className="relative flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-parchment-200 bg-alabaster text-xs font-mono text-slate-600">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9845123456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-2.5 rounded-r-xl border border-parchment-200 bg-white font-sans text-sm text-obsidian focus:outline-none focus:border-obsidian"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: TOUR PREFERENCE & TARGET MOVE-IN */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-600 mb-2">
                  Tour Modality Preference
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setTourType('On-Site')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      tourType === 'On-Site'
                        ? 'border-terracotta bg-terracotta-50/30'
                        : 'border-parchment-200 bg-white hover:border-slate-400'
                    }`}
                  >
                    <div className="font-display font-bold text-sm text-obsidian mb-1">On-Site Walkthrough</div>
                    <p className="text-xs text-slate-500">Visit in-person with campus warden and inspect room pod.</p>
                  </div>

                  <div
                    onClick={() => setTourType('Virtual')}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      tourType === 'Virtual'
                        ? 'border-terracotta bg-terracotta-50/30'
                        : 'border-parchment-200 bg-white hover:border-slate-400'
                    }`}
                  >
                    <div className="font-display font-bold text-sm text-obsidian mb-1">360° Virtual Tour</div>
                    <p className="text-xs text-slate-500">Live guided video call with our residential admissions team.</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-600 mb-1">
                  Target Move-In Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="date"
                    value={moveInDate}
                    onChange={(e) => setMoveInDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-parchment-200 bg-white font-mono text-sm text-obsidian focus:outline-none focus:border-obsidian"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-600 mb-1">
                  Additional Notes or College Branch (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. 1st year CSE student at MITE; prefers quiet corner wing on upper floor."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 rounded-xl border border-parchment-200 bg-white font-sans text-sm text-obsidian focus:outline-none focus:border-obsidian"
                />
              </div>

              {/* Order Summary Strip */}
              <div className="p-4 rounded-xl bg-alabaster border border-parchment-200 font-mono text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Residence:</span>
                  <span className="font-semibold text-obsidian">{selectedProperty?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tier:</span>
                  <span className="font-semibold text-obsidian">{selectedRoom?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">All-Inclusive Rate:</span>
                  <span className="font-bold text-terracotta">₹{selectedRoom?.monthly_rent_inr.toLocaleString('en-IN')}/mo</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: OFFICIAL PASS CONFIRMATION */}
          {step === 4 && confirmedBooking && (
            <div className="space-y-6 animate-in fade-in">
              <div className="p-6 rounded-2xl bg-sage-50 border border-sage-500/20 text-center">
                <div className="w-12 h-12 rounded-full bg-sage-500 text-white flex items-center justify-center mx-auto mb-3 shadow">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-obsidian mb-1">
                  Reservation Pass Confirmed
                </h3>
                <p className="text-xs font-mono text-sage-800">
                  Recorded in CampusNest Residence Ledger
                </p>
              </div>

              {/* Physical Architectural Boarding Pass Card */}
              <div id="booking-pass-card" className="rounded-2xl border-2 border-obsidian bg-white p-6 shadow-md relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-parchment-200 pb-4 mb-4">
                  <div>
                    <span className="font-mono text-[10px] text-slate-500 uppercase">OFFICIAL PASS REFERENCE</span>
                    <div className="font-mono font-extrabold text-xl text-terracotta tracking-wider">
                      {confirmedBooking.reference_code}
                    </div>
                  </div>
                  <button
                    onClick={copyReferenceCode}
                    className="p-2 rounded border border-parchment-200 hover:bg-alabaster flex items-center gap-1.5 font-mono text-xs"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-sage" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 font-mono text-xs mb-4">
                  <div>
                    <span className="text-slate-400 block text-[10px]">APPLICANT</span>
                    <span className="font-bold text-obsidian">{confirmedBooking.full_name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">ROLE</span>
                    <span className="font-semibold text-obsidian">{confirmedBooking.applicant_role}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">CAMPUS PROPERTY</span>
                    <span className="font-semibold text-obsidian">{confirmedBooking.property_name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">ROOM SUITE</span>
                    <span className="font-semibold text-obsidian">{confirmedBooking.room_name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">TOUR TYPE</span>
                    <span className="font-semibold text-terracotta">{confirmedBooking.tour_type}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">TARGET MOVE-IN</span>
                    <span className="font-semibold text-obsidian">{confirmedBooking.preferred_move_in}</span>
                  </div>
                </div>

                {/* Stylized Barcode Line */}
                <div className="pt-3 border-t border-dashed border-parchment-200 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>CAMPUSNEST·VERIFIED·2026</span>
                  <span className="tracking-widest">||| | |||| | ||| |||| |</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 px-4 rounded-xl border border-obsidian font-mono text-xs uppercase font-semibold hover:bg-alabaster transition-colors flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Pass</span>
                </button>
                <button
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
                onClick={() => setStep((s) => (s - 1) as any)}
                className="py-2.5 px-4 rounded-xl border border-parchment-200 bg-white font-mono text-xs uppercase font-medium hover:border-slate-400 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : <div />}

            <button
              type="button"
              disabled={isSubmitting}
              onClick={step === 3 ? handleSubmitBooking : handleNext}
              className="py-3 px-6 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white font-mono text-xs uppercase tracking-wider font-semibold shadow active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Generating Pass...</span>
              ) : step === 3 ? (
                <>
                  <span>Confirm & Issue Pass</span>
                  <Check className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
