import React, { useState } from 'react';
import {
  Wifi,
  ShieldCheck,
  UtensilsCrossed,
  Zap,
  BookOpen,
  Bus,
  PhoneCall
} from 'lucide-react';
import {
  BentoVisualAcademic,
  BentoVisualSecurity,
  BentoVisualSmartLiving,
  BentoVisualWellness
} from './ArchitecturalArt';

type CategoryFilter = 'All' | 'Academic' | 'Security' | 'Smart' | 'Wellness';

interface BentoItem {
  id: string;
  category: 'Academic' | 'Security' | 'Smart' | 'Wellness';
  title: string;
  description: string;
  icon: React.ReactNode;
  stat: string;
  statLabel: string;
  visual?: React.ReactNode;
  colSpan?: string;
}

export const AmenitiesBento: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CategoryFilter>('All');

  const bentoItems: BentoItem[] = [
    {
      id: 'agent-inspection',
      category: 'Security',
      title: 'In-Person Agent Verification & Owner Direct Line',
      description: 'Every hostel and PG in Moodbidri is inspected by a local CampusNest agent. Even when an owner has no public phone number listed, our team schedules tours and confirms real bed openings.',
      icon: <ShieldCheck className="w-5 h-5 text-terracotta" aria-hidden="true" />,
      stat: '100%',
      statLabel: 'Field Checked',
      visual: <BentoVisualSecurity />,
      colSpan: 'md:col-span-6'
    },
    {
      id: 'wifi',
      category: 'Academic',
      title: 'High-Speed Fiber & Study Zones',
      description: 'Verified broadband connectivity and quiet desk zones tailored for MITE engineering coursework, project sprints, and placement preparation.',
      icon: <Wifi className="w-5 h-5 text-sage" aria-hidden="true" />,
      stat: 'Fiber',
      statLabel: 'Study Ready',
      visual: <BentoVisualAcademic />,
      colSpan: 'md:col-span-6'
    },
    {
      id: 'study',
      category: 'Academic',
      title: 'Exam-Friendly Quiet Environments',
      description: 'Compare on-campus Badagumijaru hostels with calm residential PGs in Todaru and Hanumanth Nagar so you match your study rhythm.',
      icon: <BookOpen className="w-5 h-5 text-obsidian" aria-hidden="true" />,
      stat: '0.35 km',
      statLabel: 'Closest Gate',
      colSpan: 'md:col-span-4'
    },
    {
      id: 'laundry-power',
      category: 'Smart',
      title: 'Power Backup & Laundry Infrastructure',
      description: 'Monsoon-ready solar hot water, inverter/DG backup, and dedicated laundry drying spaces verified across partnered Moodbidri properties.',
      icon: <Zap className="w-5 h-5 text-terracotta" aria-hidden="true" />,
      stat: '24/7',
      statLabel: 'Power & Water',
      visual: <BentoVisualSmartLiving />,
      colSpan: 'md:col-span-4'
    },
    {
      id: 'food',
      category: 'Wellness',
      title: 'Coastal & Pure-Vegetarian Mess Plans',
      description: 'Choose between South Indian coastal menus, pure-vegetarian kitchens like Samrudhi Ladies PG, or flexible room-only lodge options.',
      icon: <UtensilsCrossed className="w-5 h-5 text-sage" aria-hidden="true" />,
      stat: 'Pure Veg',
      statLabel: 'Options Listed',
      visual: <BentoVisualWellness />,
      colSpan: 'md:col-span-4'
    },
    {
      id: 'agent-callback',
      category: 'Security',
      title: 'Zero-Brokerage Parent & Student Coordination',
      description: 'Request a 15-minute agent callback to verify security deposits, curfew timings, and guardian visitation policies before traveling to Moodbidri.',
      icon: <PhoneCall className="w-5 h-5 text-terracotta" aria-hidden="true" />,
      stat: '₹0',
      statLabel: 'Student Fee',
      colSpan: 'md:col-span-6'
    },
    {
      id: 'transit',
      category: 'Smart',
      title: 'MITE Bus Route & Bike Commute Mapping',
      description: 'Exact km distances and real travel times mapped along Todaru, Masthikate Road, and Moodbidri Bus Stand so daily commutes stay predictable.',
      icon: <Bus className="w-5 h-5 text-obsidian" aria-hidden="true" />,
      stat: '1–13m',
      statLabel: 'MITE Travel',
      colSpan: 'md:col-span-6'
    }
  ];

  const filteredItems = activeTab === 'All'
    ? bentoItems
    : bentoItems.filter(item => item.category === activeTab);

  return (
    <section id="amenities" className="py-16 md:py-24 bg-alabaster border-b border-parchment-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-obsidian tracking-tight mb-2">
              Why Book Through CampusNest Agents
            </h2>
            <p className="text-sm sm:text-base text-slate-700 max-w-xl">
              Every listing in our Moodbidri directory is audited on the ground for commute accuracy, dining quality, and fair student agreements.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {(['All', 'Security', 'Academic', 'Smart', 'Wellness'] as CategoryFilter[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  activeTab === tab
                    ? 'bg-obsidian text-white border-obsidian font-semibold'
                    : 'bg-white border-parchment-200 text-slate-700 hover:text-obsidian hover:border-obsidian'
                }`}
              >
                {tab === 'All' ? 'All Pillars' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col justify-between rounded-2xl bg-white border border-parchment-200 p-6 sm:p-7 shadow-architectural hover:shadow-architectural-hover transition-shadow duration-200 ${
                item.colSpan || 'md:col-span-4'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-alabaster border border-parchment-200 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="text-right font-mono tabular-nums">
                    <span className="font-bold text-sm text-obsidian">{item.stat}</span>
                    <span className="text-[11px] text-slate-600 block uppercase">{item.statLabel}</span>
                  </div>
                </div>

                <h3 className="font-display font-bold text-xl text-obsidian mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              {item.visual && (
                <div className="mt-4 pt-4 border-t border-parchment-200 overflow-hidden">
                  {item.visual}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
