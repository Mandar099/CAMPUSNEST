import React, { useState } from 'react';
import { Menu, X, ArrowRight, BedDouble, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  totalAvailableBeds?: number;
  totalProperties?: number;
  onOpenBooking: (propertyId?: number, roomId?: number) => void;
  currentView: 'home' | 'admin';
  onNavigate: (view: 'home' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalAvailableBeds = 0,
  totalProperties = 11,
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
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-alabaster/90 border-b border-parchment-200">
      {/* Skip to main content accessibility link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-obsidian focus:text-white focus:font-mono focus:text-xs"
      >
        Skip to main content
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Identity (Semantic button) */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left group rounded-lg focus-visible:ring-2 focus-visible:ring-terracotta"
        >
          <div className="w-10 h-10 rounded-lg bg-obsidian flex items-center justify-center border border-slate-700 shadow-sm transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
              <path d="M4 17V8L12 3L20 8V17L12 21L4 17Z" stroke="#D95D39" strokeWidth="2" strokeLinejoin="round" />
              <line x1="12" y1="3" x2="12" y2="21" stroke="#E5E0D8" strokeWidth="1.2" strokeDasharray="2 2" />
              <circle cx="12" cy="12" r="2.5" fill="#2E6F5E" />
            </svg>
          </div>
          <div>
            <div className="font-display font-extrabold text-xl tracking-tight text-obsidian leading-none" translate="no">
              CAMPUS<span className="text-terracotta">NEST</span>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-slate-700 mt-1">
              MITE & Moodbidri Agent
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-6 font-mono text-xs font-medium uppercase tracking-wider text-slate-700">
          <button
            type="button"
            onClick={() => handleNavClick('#locations')}
            className="hover:text-terracotta transition-colors py-1.5 whitespace-nowrap"
          >
            PG Directory ({totalProperties})
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('#amenities')}
            className="hover:text-terracotta transition-colors py-1.5 whitespace-nowrap"
          >
            Agent Promise
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('#rooms')}
            className="hover:text-terracotta transition-colors py-1.5 whitespace-nowrap"
          >
            Room Tiers
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('#community')}
            className="hover:text-terracotta transition-colors py-1.5 whitespace-nowrap"
          >
            Campus Life
          </button>
        </nav>

        {/* Live Availability Counter & CTAs */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <div className="hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-50 border border-sage-600/25 text-sage-700 text-xs font-mono font-semibold shadow-sm tabular-nums whitespace-nowrap">
            <BedDouble className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{totalAvailableBeds} Verified Beds</span>
          </div>

          <button
            type="button"
            onClick={() => onNavigate(currentView === 'home' ? 'admin' : 'home')}
            className={`font-mono text-xs px-3 py-2 rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              currentView === 'admin'
                ? 'bg-obsidian text-white border-obsidian'
                : 'text-slate-700 hover:text-obsidian border-parchment-300 hover:border-obsidian bg-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-terracotta" aria-hidden="true" />
            <span>{currentView === 'home' ? 'Agent Console' : 'Public Directory'}</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-terracotta text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-sm hover:bg-terracotta-600 active:scale-95 transition-colors whitespace-nowrap"
          >
            <span>Book via Agent</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
        </div>

        {/* Mobile / Tablet Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="px-3.5 py-2.5 rounded-lg bg-terracotta text-white font-mono text-xs uppercase font-semibold min-h-[44px]"
          >
            Book via Agent
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg text-obsidian hover:bg-parchment-200 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-parchment-200 bg-alabaster px-4 pt-4 pb-6 space-y-4 shadow-lg">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sage-50 border border-sage-600/20 text-sage-700 text-xs font-mono font-semibold tabular-nums">
            <BedDouble className="w-4 h-4" aria-hidden="true" />
            <span>{totalAvailableBeds} Verified Beds Across {totalProperties} Moodbidri PGs</span>
          </div>

          <nav aria-label="Mobile navigation" className="flex flex-col space-y-2 font-mono text-sm uppercase text-obsidian">
            <button type="button" onClick={() => handleNavClick('#locations')} className="text-left py-2.5 hover:text-terracotta">
              PG Directory ({totalProperties})
            </button>
            <button type="button" onClick={() => handleNavClick('#amenities')} className="text-left py-2.5 hover:text-terracotta">
              Agent Promise
            </button>
            <button type="button" onClick={() => handleNavClick('#rooms')} className="text-left py-2.5 hover:text-terracotta">
              Room Tiers
            </button>
            <button type="button" onClick={() => handleNavClick('#community')} className="text-left py-2.5 hover:text-terracotta">
              Campus Events
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate(currentView === 'home' ? 'admin' : 'home');
              }}
              className="text-left py-2.5 text-terracotta font-semibold"
            >
              {currentView === 'home' ? 'Agent Console (/admin)' : 'Back to Public Directory'}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
