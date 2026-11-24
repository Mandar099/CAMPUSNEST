import React, { useState } from 'react';
import { ShieldCheck, Menu, X, ArrowRight, BedDouble } from 'lucide-react';

interface NavbarProps {
  totalAvailableBeds?: number;
  onOpenBooking: (propertyId?: number, roomId?: number) => void;
  currentView: 'home' | 'admin';
  onNavigate: (view: 'home' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalAvailableBeds = 58,
  onOpenBooking,
  currentView,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-alabaster/85 border-b border-parchment-200 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Identity */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-obsidian flex items-center justify-center border border-slate-700 shadow-sm transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path d="M4 17V8L12 3L20 8V17L12 21L4 17Z" stroke="#D95D39" strokeWidth="2" strokeLinejoin="round" />
              <line x1="12" y1="3" x2="12" y2="21" stroke="#E5E0D8" strokeWidth="1.2" strokeDasharray="2 2" />
              <circle cx="12" cy="12" r="2.5" fill="#2E6F5E" />
            </svg>
          </div>
          <div>
            <div className="font-display font-extrabold text-xl tracking-tight text-obsidian leading-none">
              CAMPUS<span className="text-terracotta">NEST</span>
            </div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-slate-600 mt-1">
              Co-Living & Housing
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs font-medium uppercase tracking-wider text-slate-700">
          <button 
            onClick={() => handleNavClick('#locations')} 
            className="hover:text-terracotta transition-colors py-1"
          >
            Hubs & Residences
          </button>
          <button 
            onClick={() => handleNavClick('#amenities')} 
            className="hover:text-terracotta transition-colors py-1"
          >
            All-Inclusive Living
          </button>
          <button 
            onClick={() => handleNavClick('#rooms')} 
            className="hover:text-terracotta transition-colors py-1"
          >
            Room Suites
          </button>
          <button 
            onClick={() => handleNavClick('#community')} 
            className="hover:text-terracotta transition-colors py-1"
          >
            Community
          </button>
        </nav>

        {/* Live Availability Counter & CTAs */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Live Bed Count Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-50 border border-sage-500/20 text-sage-700 text-xs font-mono font-medium shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sage-600"></span>
            </span>
            <BedDouble className="w-3.5 h-3.5" />
            <span>{totalAvailableBeds} Live Beds Available</span>
          </div>

          {/* Admin Switcher */}
          <button
            onClick={() => onNavigate(currentView === 'home' ? 'admin' : 'home')}
            className={`font-mono text-xs px-3 py-1.5 rounded border transition-colors ${
              currentView === 'admin'
                ? 'bg-obsidian text-white border-obsidian'
                : 'text-slate-600 hover:text-obsidian border-parchment-200 hover:border-slate-400 bg-white'
            }`}
          >
            {currentView === 'home' ? 'Admin Portal' : 'Public Site'}
          </button>

          {/* Book Unit CTA */}
          <button
            onClick={() => onOpenBooking()}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-terracotta text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-sm hover:bg-terracotta-600 active:scale-95 transition-all"
          >
            <span>Book Your Unit</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => onOpenBooking()}
            className="px-3 py-2 rounded bg-terracotta text-white font-mono text-[11px] uppercase font-semibold"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-obsidian hover:bg-parchment-200 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-parchment-200 bg-alabaster px-4 pt-4 pb-6 space-y-4 shadow-lg animate-in fade-in slide-in-from-top-2">
          {/* Mobile Bed Counter */}
          <div className="flex items-center gap-2 px-3 py-2 rounded bg-sage-50 border border-sage-500/20 text-sage-700 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sage-600"></span>
            </span>
            <span>{totalAvailableBeds} Live Beds Available</span>
          </div>

          <nav className="flex flex-col space-y-3 font-mono text-sm uppercase text-slate-800">
            <button onClick={() => handleNavClick('#locations')} className="text-left py-1 hover:text-terracotta">
              Hubs & Residences
            </button>
            <button onClick={() => handleNavClick('#amenities')} className="text-left py-1 hover:text-terracotta">
              All-Inclusive Living
            </button>
            <button onClick={() => handleNavClick('#rooms')} className="text-left py-1 hover:text-terracotta">
              Room Suites
            </button>
            <button onClick={() => handleNavClick('#community')} className="text-left py-1 hover:text-terracotta">
              Campus Events
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate(currentView === 'home' ? 'admin' : 'home');
              }} 
              className="text-left py-1 text-terracotta font-semibold"
            >
              {currentView === 'home' ? '→ Switch to Admin Console' : '← Back to Public Site'}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
