import React, { useState } from 'react';
import { 
  Wifi, 
  ShieldCheck, 
  Sparkles, 
  UtensilsCrossed, 
  Zap, 
  BookOpen, 
  Bus, 
  HeartPulse, 
  Layers
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
  subtitle: string;
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
      id: 'wifi',
      category: 'Academic',
      title: '1 Gbps Redundant Mesh Wi-Fi',
      subtitle: 'Low Latency Fibre Backbone',
      description: 'Dual ISP feeds with seamless failover and dedicated CAT6 LAN ports at every workstation for research, coding, and submission sprints.',
      icon: <Wifi className="w-5 h-5 text-sage" />,
      stat: '0.2 ms',
      statLabel: 'Gateway Jitter',
      visual: <BentoVisualAcademic />,
      colSpan: 'md:col-span-8'
    },
    {
      id: 'security',
      category: 'Security',
      title: '24/7 Biometric Turnstiles & Wardens',
      subtitle: 'Zero Unauthorized Access',
      description: 'Facial recognition checkpoints, perimeter CCTV surveillance, and resident wardens ensure maximum guardian peace of mind.',
      icon: <ShieldCheck className="w-5 h-5 text-terracotta" />,
      stat: '100%',
      statLabel: 'Logged Entry',
      visual: <BentoVisualSecurity />,
      colSpan: 'md:col-span-4'
    },
    {
      id: 'study',
      category: 'Academic',
      title: 'Acoustic Sound-Dampened Study Booths',
      subtitle: 'Zero Distraction Architecture',
      description: 'Engineered with sound-absorbing felt panels and calibrated 4000K circadian LED lighting for intense exam prep and focused deep work.',
      icon: <BookOpen className="w-5 h-5 text-obsidian" />,
      stat: '28 dB',
      statLabel: 'Ambient Noise Floor',
      colSpan: 'md:col-span-4'
    },
    {
      id: 'laundry-power',
      category: 'Smart',
      title: 'App-Activated Laundry & 100% DG Backup',
      subtitle: 'Frictionless Daily Routine',
      description: 'Self-service washers & dryers bookable via phone with automatic SMS notifications. Heavy-duty diesel generators power full load including ACs.',
      icon: <Zap className="w-5 h-5 text-terracotta" />,
      stat: '0 sec',
      statLabel: 'Power Switchover',
      visual: <BentoVisualSmartLiving />,
      colSpan: 'md:col-span-4'
    },
    {
      id: 'food',
      category: 'Wellness',
      title: 'Chef-Crafted 4-Meal Mess & Nutrition',
      subtitle: 'Regional Homestyle Cooking',
      description: 'Rotating multi-cuisine menu (South Indian, North Indian, coastal delicacies) curated with organic grains, daily fresh salads, and evening milk/fruits.',
      icon: <UtensilsCrossed className="w-5 h-5 text-sage" />,
      stat: '4 Meals',
      statLabel: 'Curated Daily',
      visual: <BentoVisualWellness />,
      colSpan: 'md:col-span-4'
    },
    {
      id: 'wellness-health',
      category: 'Wellness',
      title: 'Doctor-On-Call & Mental Health Support',
      subtitle: 'Empathetic Student Care',
      description: 'Direct tie-ups with premier teaching hospitals (KMC, Father Muller, Yenepoya) with 24/7 emergency vehicle dispatch on campus.',
      icon: <HeartPulse className="w-5 h-5 text-terracotta" />,
      stat: '15 min',
      statLabel: 'Medical Dispatch',
      colSpan: 'md:col-span-6'
    },
    {
      id: 'transit',
      category: 'Smart',
      title: 'Scheduled Campus Transit Shuttles',
      subtitle: 'Zero-Commute Stress',
      description: 'Morning and evening electric shuttles running directly between residence gates and MITE, NITK, MIT, and Electronic City tech campuses.',
      icon: <Bus className="w-5 h-5 text-obsidian" />,
      stat: 'Every 20m',
      statLabel: 'Peak Frequency',
      colSpan: 'md:col-span-6'
    }
  ];

  const filteredItems = activeTab === 'All' 
    ? bentoItems 
    : bentoItems.filter(item => item.category === activeTab);

  return (
    <section id="amenities" className="py-20 md:py-28 bg-alabaster">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-sage uppercase tracking-widest font-semibold mb-3">
              <Layers className="w-4 h-4" />
              <span>ALL-INCLUSIVE CO-LIVING INFRASTRUCTURE</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-obsidian tracking-tight">
              Built for High Performance & Peace of Mind.
            </h2>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 font-mono text-xs">
            {(['All', 'Academic', 'Security', 'Smart', 'Wellness'] as CategoryFilter[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-obsidian text-white shadow-sm font-semibold'
                    : 'bg-white border border-parchment-200 text-slate-600 hover:text-obsidian hover:border-slate-400'
                }`}
              >
                {tab === 'All' ? 'All Amenities' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col justify-between rounded-2xl bg-white border border-parchment-200 p-6 sm:p-8 shadow-architectural hover:shadow-architectural-hover transition-all duration-300 ${
                item.colSpan || 'md:col-span-4'
              }`}
            >
              <div>
                {/* Header row: Icon + Stat badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-alabaster border border-parchment-200 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="text-right font-mono">
                    <span className="font-bold text-sm text-obsidian">{item.stat}</span>
                    <span className="text-[10px] text-slate-500 block uppercase">{item.statLabel}</span>
                  </div>
                </div>

                <div className="font-mono text-[11px] text-terracotta uppercase tracking-wider font-semibold mb-1">
                  {item.subtitle}
                </div>
                <h3 className="font-display font-bold text-xl text-obsidian mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Optional Custom SVG Graphic */}
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
