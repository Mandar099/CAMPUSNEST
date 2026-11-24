import React, { useState } from 'react';
import { subscribeNewsletter } from '../lib/api';
import { 
  ChevronDown, 
  Send, 
  Check, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  HelpCircle 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const faqs = [
    {
      q: "What does 'All-Inclusive' rent really cover?",
      a: "Everything is bundled into one transparent monthly INR rate: fully-furnished private or twin studio pod, 4-meal daily chef-crafted mess (breakfast, lunch, evening tea/snacks, dinner), high-speed 1 Gbps redundant fiber Wi-Fi, 100% generator power backup (including ACs), weekly housekeeping, and automated app-driven laundry."
    },
    {
      q: "Can parents and guardians inspect the residence before admissions?",
      a: "Absolutely. We encourage parents to schedule an on-site physical tour or a 360° virtual video walkthrough with our residential manager. We show room furnishings, dining mess hygiene, water filtration plants, and biometric access logs."
    },
    {
      q: "How does the security and curfew policy work?",
      a: "All CampusNest residences operate 24/7 biometric turnstiles, round-the-clock security personnel, and resident wardens. Movement logs are electronically tracked and accessible to registered guardians through SMS alerts upon request."
    },
    {
      q: "What is the security deposit and refund timeline?",
      a: "Security deposits are strictly 100% refundable upon academic year completion. Following a room checkout inspection, deposits are credited directly to your bank account within 7 business days without arbitrary deductions."
    },
    {
      q: "Do you accommodate dietary preferences (Pure Vegetarian vs Non-Veg)?",
      a: "Yes. Our kitchens feature distinct, dedicated vegetarian preparation counters and separate cookware, alongside nutritious coastal and regional South/North Indian meal options."
    }
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setSubscribeStatus('loading');
    try {
      const res = await subscribeNewsletter(newsletterEmail.trim());
      setSubscribeStatus('success');
      setSubscribeMessage(res.message || 'Subscribed successfully!');
      setNewsletterEmail('');
    } catch (err: any) {
      setSubscribeStatus('error');
      setSubscribeMessage(err.message || 'Subscription failed. Please check your email address.');
    }
  };

  return (
    <footer className="bg-obsidian text-alabaster pt-20 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION 1: FAQ ACCORDION */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-terracotta uppercase tracking-widest font-semibold mb-2">
              <HelpCircle className="w-4 h-4" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Transparent Answers for Students & Guardians.
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-semibold text-sm sm:text-base text-white hover:text-terracotta transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 text-slate-400 ${
                      openFaq === idx ? 'rotate-180 text-terracotta' : ''
                    }`}
                  />
                </button>

                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 font-sans leading-relaxed border-t border-slate-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: NEWSLETTER SUBSCRIPTION BAR */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-obsidian border border-slate-800 p-8 sm:p-10 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="font-mono text-xs text-sage uppercase font-semibold block mb-1">
                ADMISSION CYCLE ALERTS // 2026-2027
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
                Stay Ahead of Bed Allocation Deadlines.
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Receive instant priority alerts when scholarship rooms, solo pods, and campus transit slots open in Moodbidri, Mangaluru, Manipal, and Bengaluru.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex rounded-xl overflow-hidden border border-slate-700 bg-slate-800/80 focus-within:border-terracotta transition-colors">
                  <input
                    type="email"
                    required
                    placeholder="Enter your student or guardian email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={subscribeStatus === 'loading'}
                    className="px-5 bg-terracotta hover:bg-terracotta-600 text-white font-mono text-xs uppercase font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    <span>{subscribeStatus === 'loading' ? 'Saving' : 'Join'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                {subscribeStatus === 'success' && (
                  <p className="text-xs text-sage font-mono flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>{subscribeMessage}</span>
                  </p>
                )}
                {subscribeStatus === 'error' && (
                  <p className="text-xs text-red-400 font-mono">
                    {subscribeMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* SECTION 3: CAMPUS DIRECTORY & COLOPHON */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-slate-800 font-mono text-xs">
          
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded bg-terracotta flex items-center justify-center text-white font-bold">
                CN
              </div>
              <span className="font-display font-extrabold text-lg text-white">
                CAMPUS<span className="text-terracotta">NEST</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs font-sans leading-relaxed mb-4">
              Design-led student residences built for focus, security, and collegiate community across South India.
            </p>
            <div className="flex items-center gap-2 text-sage">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Verified Campus Properties</span>
            </div>
          </div>

          {/* Hub Directory 1: Moodbidri & Mangaluru */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-3">Coastal Karnataka Hubs</h4>
            <div className="space-y-3 text-slate-400">
              <div>
                <strong className="text-slate-200 block">CampusNest Parkside</strong>
                <span>400m from MITE West Gate, Moodbidri — 574225</span>
              </div>
              <div>
                <strong className="text-slate-200 block">CampusNest Harbor View</strong>
                <span>850m from NITK Surathkal, Srinivas Corridor, Mangaluru</span>
              </div>
            </div>
          </div>

          {/* Hub Directory 2: Manipal & Bengaluru */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-3">University & Tech Hubs</h4>
            <div className="space-y-3 text-slate-400">
              <div>
                <strong className="text-slate-200 block">CampusNest Scholar's Loft</strong>
                <span>Eshwar Nagar (600m from MIT & KMC), Manipal — 576104</span>
              </div>
              <div>
                <strong className="text-slate-200 block">CampusNest Innovation Hub</strong>
                <span>Electronic City Ph 1 (Near PES / IIIT-B), Bengaluru — 560100</span>
              </div>
            </div>
          </div>

          {/* Direct Support Contact */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-3">Central Admissions Desk</h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-terracotta" />
                <span>+91 8258 290123 / 98451 00226</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-terracotta" />
                <span>admissions@campusnest.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-terracotta" />
                <span>Mon – Sun: 08:00 AM – 09:00 PM IST</span>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 4: COPYRIGHT & METADATA */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-4">
          <div>
            © 2026 CampusNest Living Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>MITE · NITK · MANIPAL · PES · IIIT-B</span>
            <span className="text-terracotta">100% All-Inclusive INR</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
