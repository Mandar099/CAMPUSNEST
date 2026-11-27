import React, { useState } from 'react';
import { subscribeNewsletter } from '../lib/api';
import {
  ChevronDown,
  Send,
  Check,
  MapPin,
  Phone,
  Mail,
  ShieldCheck
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const faqs = [
    {
      q: 'How does CampusNest act as my Moodbidri PG & Hostel Agent?',
      a: 'CampusNest coordinates directly between MITE students/parents and Moodbidri PG owners. We inspect properties in person, verify real room availability, negotiate fair deposits, and schedule safe on-site or virtual walkthroughs at ₹0 brokerage fee to students.'
    },
    {
      q: 'Why do some PGs say "Contact via CampusNest Agent" instead of a phone number?',
      a: 'Listings like Masthikatte Boy’s Hostel, Samrudhi ladies pg (pure veg), and Veena PG (Paying Guest) do not publish direct public telephone lines or rely on on-site caretakers. Clicking "Book via Agent" or "Request Agent Callback" dispatches our Moodbidri agent to verify beds on-site and call you back.'
    },
    {
      q: 'How accurate are the distances and travel times from MITE?',
      a: 'Every distance (from 0.35 km for MITE On-Campus Hostels in Badagumijaru to 1.4 km in Todaru and 3.7–5.3 km in Moodbidri town) is measured directly along the MITE road corridor.'
    },
    {
      q: 'Can parents schedule an on-site circuit of multiple PGs in one day?',
      a: 'Yes. Submit a booking request with your preferred arrival date and list the PGs you want to compare in the notes field—our local coordinator will organize a single guided visit loop.'
    },
    {
      q: 'Are pure vegetarian ladies PG options available?',
      a: 'Yes, including Samrudhi ladies pg (pure veg) on Ponnechari Road and Shama ladies PG near Ballal Hotel, alongside MITE Girl’s Hostel inside campus.'
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

        {/* FAQ ACCORDION */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="text-center mb-10">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Questions About MITE &amp; Moodbidri Stays
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/70 overflow-hidden"
              >
                <button
                  type="button"
                  aria-expanded={openFaq === idx}
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-semibold text-sm sm:text-base text-white hover:text-terracotta transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 text-parchment-200 ${
                      openFaq === idx ? 'rotate-180 text-terracotta' : ''
                    }`}
                  />
                </button>

                {openFaq === idx && (
                  <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-parchment-200 font-sans leading-relaxed border-t border-slate-800">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* NEWSLETTER SUBSCRIPTION BAR */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8 sm:p-10 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
                Get Bed Vacancy Alerts Around MITE.
              </h3>
              <p className="text-xs sm:text-sm text-parchment-200">
                Receive priority alerts from our Moodbidri field agents whenever single rooms or twin sharing seats open up for the 2026 academic intake.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleSubscribe} className="space-y-2">
                <label htmlFor="newsletter-email" className="sr-only">Email address for bed alerts</label>
                <div className="flex rounded-xl overflow-hidden border border-slate-700 bg-slate-800 focus-within:border-terracotta transition-colors">
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Enter student or guardian email…"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-transparent text-xs sm:text-sm text-white placeholder:text-slate-300"
                  />
                  <button
                    type="submit"
                    disabled={subscribeStatus === 'loading'}
                    className="px-5 bg-terracotta hover:bg-terracotta-600 text-white font-mono text-xs uppercase font-semibold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                  >
                    <span>{subscribeStatus === 'loading' ? 'Saving…' : 'Join'}</span>
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>

                {subscribeStatus === 'success' && (
                  <p role="status" aria-live="polite" className="text-xs text-sage-100 font-mono flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{subscribeMessage}</span>
                  </p>
                )}
                {subscribeStatus === 'error' && (
                  <p role="alert" aria-live="polite" className="text-xs text-red-300 font-mono">
                    {subscribeMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* MOODBIDRI DIRECTORY & COLOPHON */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-slate-800 font-mono text-xs">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded bg-terracotta flex items-center justify-center text-white font-bold">
                CN
              </div>
              <span className="font-display font-extrabold text-lg text-white" translate="no">
                CAMPUS<span className="text-terracotta">NEST</span>
              </span>
            </div>
            <p className="text-parchment-200 text-xs font-sans leading-relaxed mb-4">
              Verified student-housing intermediary serving MITE students and parents across Badagumijaru, Todaru, and Moodbidri town.
            </p>
            <div className="flex items-center gap-2 text-sage-100">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>11 Verified Moodbidri Properties</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-3">Badagumijaru &amp; Todaru</h4>
            <div className="space-y-2.5 text-parchment-200">
              <div>
                <strong className="text-white block">MITE Boy&apos;s &amp; Girl&apos;s Hostels</strong>
                <span>0.35 km · Badagumijaru Campus</span>
              </div>
              <div>
                <strong className="text-white block">DAYA PG (FOR BOYS)</strong>
                <span>1.4 km · Todaru, Karnataka 574225</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-3">Moodbidri Town Zones</h4>
            <div className="space-y-2.5 text-parchment-200">
              <div>
                <strong className="text-white block">Masthikate &amp; Rathnakaravarni Nagara</strong>
                <span>Shama, New Royal, Masthikatte (3.7–3.9 km)</span>
              </div>
              <div>
                <strong className="text-white block">Bus Stand, Ponnechari &amp; Hanumanth Nagar</strong>
                <span>R.B Lodge, Shalimar, Shri Brahmi, Samrudhi, Veena</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-3">Moodbidri Agent Desk</h4>
            <div className="space-y-2 text-parchment-200">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-terracotta" aria-hidden="true" />
                <a href="tel:08258262695" className="hover:text-white underline-offset-4 hover:underline tabular-nums">
                  082582 62695 (MITE Campus Line)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-terracotta" aria-hidden="true" />
                <span>agents@campusnest.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-terracotta" aria-hidden="true" />
                <span>Moodbidri, Karnataka 574225 / 574227</span>
              </div>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-parchment-200 gap-4">
          <div>
            © 2026 CampusNest Student Housing Intermediary.
          </div>
          <div className="flex items-center gap-6">
            <span>MITE · BADAGUMIJARU · TODARU · MOODBIDRI</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
