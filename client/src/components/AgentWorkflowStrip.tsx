import React from 'react';
import { Search, Calendar, Lock, ArrowRight } from 'lucide-react';

interface AgentWorkflowStripProps {
  onOpenBooking: () => void;
}

export const AgentWorkflowStrip: React.FC<AgentWorkflowStripProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      icon: Search,
      number: '01',
      title: 'Compare Verified Stays',
      description: 'Filter 11 Moodbidri PGs by distance, budget, and category. Compare up to 3 side-by-side with transparent pricing and house rules.'
    },
    {
      icon: Calendar,
      number: '02',
      title: 'Schedule a Visit or Callback',
      description: 'Book an on-site tour with our local agent, request a 15-minute callback, or join a live WhatsApp video walkthrough from the PG room.'
    },
    {
      icon: Lock,
      number: '03',
      title: 'Lock Your Rate at ₹0 Brokerage',
      description: 'Your CampusNest agent confirms bed availability with the owner, negotiates deposit terms, and issues your official reservation pass.'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-b border-parchment-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-obsidian tracking-tight mb-3">
            How CampusNest Agent Works
          </h2>
          <p className="font-sans text-sm sm:text-base text-slate-700">
            Three steps from browsing to bed confirmation — zero brokerage, zero guesswork, one local Moodbidri coordinator handling everything.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative">
                <div className="p-6 sm:p-8 rounded-2xl bg-alabaster border border-parchment-200 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-obsidian text-white flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs text-slate-500 font-semibold tabular-nums">
                      Step {step.number}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-obsidian mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-slate-700 leading-relaxed flex-1">
                    {step.description}
                  </p>
                </div>
                {/* Arrow connector (hidden on last) */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center text-parchment-300" aria-hidden="true">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <button
            type="button"
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-xl bg-terracotta hover:bg-terracotta-600 text-white font-mono text-xs uppercase tracking-wider font-semibold shadow-sm active:scale-[0.99] transition-colors inline-flex items-center gap-2"
          >
            <span>Start Your Booking</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

      </div>
    </section>
  );
};
