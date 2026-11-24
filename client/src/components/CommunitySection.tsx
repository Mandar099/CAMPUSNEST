import React from 'react';
import { CommunityEvent } from '../types';
import { Users, Calendar, Sparkles, MapPin, Ticket } from 'lucide-react';

interface CommunitySectionProps {
  events: CommunityEvent[];
  onOpenBooking: () => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({ events, onOpenBooking }) => {
  return (
    <section id="community" className="py-20 md:py-28 bg-alabaster">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-terracotta uppercase tracking-widest font-semibold mb-3">
            <Users className="w-4 h-4" />
            <span>COMMUNITY RHYTHM & EVENTS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-obsidian tracking-tight mb-4">
            A Supportive Circle of Builders, Scholars & Creators.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            CampusNest is more than an accommodation address. It is a shared ecosystem of ambitious students across engineering, medicine, and design who collaborate, build side-projects, and unwind together.
          </p>
        </div>

        {/* Asymmetrical Grid: Left Culture Narrative / Right Live Events Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: 3 Architectural Culture Pillars */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-parchment-200 shadow-architectural">
              <span className="font-mono text-xs text-terracotta font-bold uppercase tracking-wider block mb-2">01 // Academic Quiet Hours</span>
              <h3 className="font-display font-bold text-lg text-obsidian mb-2">Sound-Dampened Study Discipline</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dedicated silent library wings and strictly enforced nocturnal quiet corridors ensure you never miss study milestones or sleep cycles before critical exams.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-parchment-200 shadow-architectural">
              <span className="font-mono text-xs text-sage font-bold uppercase tracking-wider block mb-2">02 // Peer Co-Working & Hardware Dens</span>
              <h3 className="font-display font-bold text-lg text-obsidian mb-2">Collaborative Innovation Lounges</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Whether you are training ML models, preparing for college hackathons, or debating case studies, our central glass atriums are built for group synergy.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-parchment-200 shadow-architectural">
              <span className="font-mono text-xs text-obsidian font-bold uppercase tracking-wider block mb-2">03 // Wholesome Regional Dining</span>
              <h3 className="font-display font-bold text-lg text-obsidian mb-2">Community Dinners & Cultural Feasts</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sunday special coastal banquets and festive dinners foster deep friendships across senior and junior collegiate batches.
              </p>
            </div>
          </div>

          {/* Right Column: Live Campus Events Feed */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white border border-parchment-200 p-6 sm:p-8 shadow-architectural">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-parchment-200">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-terracotta" />
                  <span className="font-display font-bold text-xl text-obsidian">Upcoming Campus Events</span>
                </div>
                <span className="font-mono text-xs text-sage font-semibold uppercase">Live Schedule</span>
              </div>

              <div className="space-y-4">
                {events.map((evt) => (
                  <div
                    key={evt.id}
                    className="group p-5 rounded-xl bg-alabaster border border-parchment-200 hover:border-obsidian transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
                          evt.category === 'Hackathon Night'
                            ? 'bg-purple-100 text-purple-800'
                            : evt.category === 'Wellness'
                            ? 'bg-sage-100 text-sage-700'
                            : evt.category === 'Community Dinner'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {evt.category}
                        </span>
                        <span className="font-mono text-xs text-slate-500">{evt.event_date}</span>
                      </div>

                      <h4 className="font-display font-bold text-base text-obsidian group-hover:text-terracotta transition-colors">
                        {evt.title}
                      </h4>

                      <div className="flex items-center gap-1.5 font-mono text-xs text-slate-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{evt.property_name}</span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-parchment-200">
                      <div className="flex items-center gap-1 text-xs font-mono font-semibold text-terracotta">
                        <Ticket className="w-3.5 h-3.5" />
                        <span>{evt.spots_remaining} Spots Left</span>
                      </div>
                      <button
                        onClick={onOpenBooking}
                        className="px-3 py-1.5 rounded-lg bg-obsidian text-white font-mono text-[11px] uppercase hover:bg-slate-800 transition-colors"
                      >
                        Join Event
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Community Banner */}
              <div className="mt-8 p-4 rounded-xl bg-sand-100 border border-parchment-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-terracotta flex-shrink-0" />
                  <p className="text-xs text-slate-700 font-medium">
                    Are you organizing a collegiate hackathon or study workshop? We sponsor student teams with free co-working space.
                  </p>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="whitespace-nowrap font-mono text-xs text-terracotta font-semibold hover:underline"
                >
                  Partner With Us →
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
