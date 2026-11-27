import React from 'react';
import { CommunityEvent } from '../types';
import { Calendar, Sparkles, MapPin, Ticket } from 'lucide-react';

interface CommunitySectionProps {
  events: CommunityEvent[];
  onOpenBooking: (propertyId?: number, roomId?: number, mode?: 'booking' | 'callback') => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ events, onOpenBooking }) => {
  return (
    <section id="community" className="py-16 md:py-24 bg-alabaster">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-obsidian tracking-tight mb-3">
            MITE Student Rhythm &amp; Moodbidri Orientation
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Transitioning to Badagumijaru or Moodbidri town is smoother with peers. Join agent-hosted hostel walkthroughs, bus-route orientations, and student mixers across our partner PGs.
          </p>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* Left Column: 3 Core Principles */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-2xl bg-white border border-parchment-200 shadow-architectural">
              <h3 className="font-display font-bold text-lg text-obsidian mb-2">Guided Group PG Walkthroughs</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                New MITE joiners and parents can tour Todaru, Masthikate, and Bus Stand Road PGs together in one coordinated half-day circuit arranged by a CampusNest agent.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-parchment-200 shadow-architectural">
              <h3 className="font-display font-bold text-lg text-obsidian mb-2">Direct Owner Mediation</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                For PGs without public telephone numbers—such as Masthikatte Boy&apos;s Hostel, Samrudhi Ladies PG, and Veena PG—our agents coordinate directly with caretakers on your behalf.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-parchment-200 shadow-architectural">
              <h3 className="font-display font-bold text-lg text-obsidian mb-2">Roommate &amp; Branch Matching</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Specify your MITE branch and dietary preference (such as pure vegetarian) in your booking pass so we match compatible twin or triple sharing rooms.
              </p>
            </div>
          </div>

          {/* Right Column: Live Campus Events Feed */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white border border-parchment-200 p-6 sm:p-8 shadow-architectural">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-parchment-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-terracotta" aria-hidden="true" />
                  <h3 className="font-display font-bold text-xl text-obsidian">Upcoming Moodbidri Meetups</h3>
                </div>
                <span className="font-mono text-xs text-sage-700 font-semibold uppercase">Live Schedule</span>
              </div>

              <div className="space-y-4">
                {events.map((evt) => (
                  <div
                    key={evt.id}
                    className="group p-5 rounded-xl bg-alabaster border border-parchment-200 hover:border-obsidian transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold uppercase ${
                          evt.category === 'Hackathon Night'
                            ? 'bg-slate-200 text-obsidian'
                            : evt.category === 'Wellness'
                            ? 'bg-sage-100 text-sage-700'
                            : evt.category === 'Community Dinner'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-terracotta-100 text-terracotta-700'
                        }`}>
                          {evt.category}
                        </span>
                        <span className="font-mono text-xs text-slate-600">{evt.event_date}</span>
                      </div>

                      <h4 className="font-display font-bold text-base text-obsidian">
                        {evt.title}
                      </h4>

                      <div className="flex items-center gap-1.5 font-mono text-xs text-slate-600 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
                        <span>{evt.property_name}</span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-parchment-200">
                      <div className="flex items-center gap-1 text-xs font-mono font-semibold text-terracotta-700 tabular-nums">
                        <Ticket className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{evt.spots_remaining} Spots Left</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onOpenBooking(undefined, undefined, 'callback')}
                        className="px-3.5 py-2 rounded-lg bg-obsidian text-white font-mono text-xs uppercase font-semibold hover:bg-slate-800 transition-colors"
                      >
                        RSVP via Agent
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-alabaster border border-parchment-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-terracotta flex-shrink-0" aria-hidden="true" />
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    Need help comparing MITE on-campus hostels vs. Todaru or Moodbidri town PGs?
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenBooking(undefined, undefined, 'callback')}
                  className="whitespace-nowrap font-mono text-xs text-terracotta-700 font-semibold hover:underline"
                >
                  Request Agent Callback →
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
