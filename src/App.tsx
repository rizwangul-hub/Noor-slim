/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Phone, MessageSquare, ShieldCheck, Mail, MapPin, Ticket, CreditCard, 
  User, CheckCircle2, ChevronRight, X, Sparkles, Star, Award, Heart, LayoutDashboard, Coins
} from 'lucide-react';

// Import subcomponents
import Header from './components/Header';
import Hero from './components/Hero';
import DrawCard from './components/DrawCard';
import Winners from './components/Winners';
import HowItWorks from './components/HowItWorks';
import Gallery from './components/Gallery';
import FAQs from './components/FAQs';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';

// Seed database
import { 
  INITIAL_LUCKY_DRAWS, INITIAL_WINNERS, TESTIMONIALS, GALLERY_ITEMS, FAQS, GENERAL_STATS 
} from './data';
import { LuckyDraw, Winner } from './types';

export default function App() {
  const [draws, setDraws] = useState<LuckyDraw[]>(INITIAL_LUCKY_DRAWS);
  const [winners, setWinners] = useState<Winner[]>(INITIAL_WINNERS);
  const [currentView, setView] = useState<'guest' | 'admin'>('guest');
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Floating WhatsApp widget support helper
  const [showFloatingChat, setShowFloatingChat] = useState(false);

  // Booking Modal State
  const [bookingDraw, setBookingDraw] = useState<LuckyDraw | null>(null);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    city: 'Lahore',
    phone: '',
    payment: 'EasyPaisa',
    ticketsCount: 1
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Popular Pakistan Cities list
  const pakCities = [
    'Lahore', 'Karachi', 'Rawalpindi', 'Islamabad', 'Peshawar', 
    'Faisalabad', 'Multan', 'Quetta', 'Sialkot', 'Gujranwala', 
    'Bahawalpur', 'Sargodha', 'Abbottabad', 'Sukkhar', 'Gujrat'
  ];

  // Perform filtering on draws
  const filteredDraws = draws.filter((d) => {
    if (!searchQuery) return true;
    return (
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.ticketPrice.toString().includes(searchQuery)
    );
  });

  const handleOpenBooking = (draw: LuckyDraw) => {
    setBookingDraw(draw);
    setBookingSubmitted(false);
    setBookingForm({
      name: '',
      city: 'Lahore',
      phone: '',
      payment: 'EasyPaisa',
      ticketsCount: 1
    });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone || !bookingDraw) return;

    // Simulate database record and open formatted WhatsApp API link
    const supportPhone = "923219964022";
    const computedTotal = bookingDraw.ticketPrice * bookingForm.ticketsCount;
    
    const formattedMsg = `Assalam-o-Alaikum Noor Saleem Official! 👋\n\nI want to participate in the Lucky Draw for:\n🏆 *${bookingDraw.title}*\n\nMy Selection Details:\n👤 Name: *${bookingForm.name}*\n📍 City: *${bookingForm.city}*\n📱 WhatsApp: *${bookingForm.phone}*\n🎫 Selected Tickets Count: *${bookingForm.ticketsCount}*\n💳 Payment Method Chosen: *${bookingForm.payment}*\n\n💰 Pending Amount: *Rs. ${computedTotal.toLocaleString()}*\n\nPlease share the account details for payment validation so I can receive my ticket coupon sequence. Shukriya!`;

    const whatsappUrl = `https://wa.me/${supportPhone}?text=${encodeURIComponent(formattedMsg)}`;

    // Open link
    window.open(whatsappUrl, '_blank');
    setBookingSubmitted(true);
    
    // Simulate updating campaign sold tick counters
    setDraws(prev => prev.map(d => {
      if (d.id === bookingDraw.id) {
        return { ...d, soldTickets: Math.min(d.totalTickets, d.soldTickets + Number(bookingForm.ticketsCount)) };
      }
      return d;
    }));
  };

  return (
    <div className={`min-h-screen text-slate-100 font-sans transition-colors duration-300 ${
      darkMode ? 'bg-slate-950' : 'bg-slate-900'
    }`}>
      
      {/* 1. Navbar header */}
      <Header 
        currentView={currentView} 
        setView={setView} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* 2. Admin vs Client Landing Toggle view */}
      {currentView === 'admin' ? (
        <AdminPanel 
          draws={draws} 
          setDraws={setDraws} 
          winners={winners} 
          setWinners={setWinners} 
        />
      ) : (
        <main className="relative">
          
          {/* Hero Introductions */}
          <Hero stats={GENERAL_STATS} />

          {/* Active Lucky Draws Section */}
          <section id="draws" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center scroll-mt-20">
            <div className="max-w-3xl mx-auto mb-16 text-center">
              <div className="inline-flex items-center space-x-1.5 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-full mb-4">
                <Ticket className="w-4 h-4 text-yellow-400" />
                <span className="text-[10px] uppercase font-bold text-yellow-400 tracking-wider">
                  MEGA DRAWS CURRENTLY LIVE
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Participate in Active Lucky Draws
              </h2>
              <p className="text-slate-400 mt-2.5 text-sm">
                Choose your desired campaign, reserve your lucky ticket numbers on WhatsApp, and follow instructions to confirm payments.
              </p>
            </div>

            {/* Display search filtering notes */}
            {searchQuery && (
              <div className="mb-8 p-3.5 bg-slate-900 border border-amber-500/20 rounded-2xl inline-flex items-center space-x-2 text-xs text-amber-400">
                <span>Showing search results for: <strong>"{searchQuery}"</strong></span>
                <button onClick={() => setSearchQuery('')} className="hover:underline font-extrabold text-white pl-1 select-none">
                  Reset
                </button>
              </div>
            )}

            {/* Lucky Draws Custom Grid list */}
            {filteredDraws.length === 0 ? (
              <div className="py-12 bg-slate-900/40 border border-white/5 rounded-3xl max-w-lg mx-auto">
                <p className="text-slate-400 font-medium">No lucky draws found matching "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-amber-500 text-xs font-bold hover:underline mt-2 cursor-pointer"
                >
                  Clear search query
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                {filteredDraws.map((draw) => (
                  <DrawCard 
                    key={draw.id} 
                    draw={draw} 
                    onBook={handleOpenBooking} 
                  />
                ))}
              </div>
            )}
          </section>

          {/* How It Works Procedure */}
          <HowItWorks />

          {/* Hall of fame winners archive slider */}
          <Winners winnersList={winners} />

          {/* Testimonial customer verified quotes */}
          <section id="testimonials" className="py-24 bg-slate-900/60 relative border-y border-yellow-500/10 text-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto mb-16 text-center">
                <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-amber-500">
                  REAL TRUST
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1.5">
                  What Our Lucky Winners Say
                </h2>
                <p className="text-slate-400 mt-2 text-sm">
                  Transparency and absolute commitment are our core pillars. Read inspiring stories from happy participants across Pakistan.
                </p>
              </div>

              {/* Grid feedback list */}
              <div className="grid md:grid-cols-2 gap-8 text-left">
                {TESTIMONIALS.map((t) => (
                  <div 
                    key={t.id}
                    className="backdrop-blur-md bg-slate-950/60 border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative hover:border-yellow-500/15 transition-all duration-300"
                  >
                    <div>
                      {/* Rating details */}
                      <div className="flex items-center space-x-1 text-yellow-400 mb-4">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-4.5 h-4.5 fill-yellow-400 stroke-none" />
                        ))}
                      </div>

                      <p className="text-slate-300 text-sm italic leading-relaxed mb-6">
                        "{t.body}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/5 pt-5 mt-auto">
                      <div className="flex items-center space-x-3">
                        <div className="w-11 h-11 rounded-full overflow-hidden border border-slate-700 bg-slate-800">
                          <img src={t.image} alt={t.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{t.name}</h4>
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{t.city}, Pakistan</p>
                        </div>
                      </div>

                      <div className="bg-yellow-500/10 text-yellow-400 text-[10px] uppercase font-bold py-1 px-2.5 rounded-full border border-yellow-500/20">
                        Won {t.prizeWon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Media gallery celebrations list */}
          <Gallery galleryItems={GALLERY_ITEMS} />

          {/* F.A.Q list */}
          <FAQs faqItems={FAQS} />

          {/* Contact point verification cards */}
          <Contact />

        </main>
      )}

      {/* 3. Global Elegant Footer with details */}
      <footer className="bg-slate-950 border-t border-yellow-500/10 text-slate-400 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-10">
            {/* Logo description */}
            <div className="space-y-4">
              <a href="#home" className="flex items-center space-x-2 group">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 shadow-md">
                  <Coins className="w-5 h-5 text-slate-950 stroke-[2]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent">
                    NOOR SALEEM
                  </span>
                  <span className="text-[9px] uppercase font-semibold text-amber-500 tracking-[0.25em]">
                    OFFICIAL
                  </span>
                </div>
              </a>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pakistan's premium digital verification platform for promotional draws, offering incredible prizes with complete transparency. Secure your coupons on WhatsApp today!
              </p>
              <div className="flex items-center space-x-1 text-[11px] text-slate-500 font-bold">
                <ShieldCheck className="w-4 h-4 text-yellow-500" />
                <span>Authorized Excise Registered Partner</span>
              </div>
            </div>

            {/* Links Row 1 */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-yellow-500 pl-3">Quick Navigation</h4>
              <ul className="space-y-2.5 text-xs font-semibold">
                <li><a href="#home" className="hover:text-amber-400 transition">Return to Home</a></li>
                <li><a href="#draws" className="hover:text-amber-400 transition">Current Mega Draws</a></li>
                <li><a href="#winners" className="hover:text-amber-400 transition">Lucky Winner Archive</a></li>
                <li><a href="#how-it-works" className="hover:text-amber-400 transition">Procedure Guide</a></li>
              </ul>
            </div>

            {/* Links Row 2 */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-yellow-500 pl-3">Legal & Security</h4>
              <ul className="space-y-2.5 text-xs font-semibold">
                <li><a href="#faqs" className="hover:text-amber-400 transition">Frequently FAQs</a></li>
                <li><a href="#contact" className="hover:text-amber-400 transition">Regional Touchpoints</a></li>
                <li><span className="text-slate-500 cursor-not-allowed">Terms & Conditions</span></li>
                <li><span className="text-slate-500 cursor-not-allowed">Responsible Balloting Policy</span></li>
              </ul>
            </div>

            {/* Support info */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-yellow-500 pl-3">Direct Support</h4>
              <p className="text-xs text-slate-450 leading-relaxed text-slate-400">
                To order customized bulk lucky coupons or inquire about direct delivery status, please contact us over our official hotlines below:
              </p>
              <div className="space-y-2 text-xs font-bold text-slate-300">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-yellow-500" />
                  <span>+92 321 9964022</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                  <span>WhatsApp: +92 321 9964022</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
            <p>© 2026 Noor Saleem Official. All Rights Reserved.</p>
            <p className="mt-2 sm:mt-0 flex items-center space-x-1">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>Developed for Noor Saleem Pakistan</span>
            </p>
          </div>
        </div>
      </footer>

      {/* 4. ACTIVE TICKET BOOKING WHATSAPP MODAL POPUP */}
      {bookingDraw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative bg-slate-900 border border-yellow-500/20 max-w-md w-full rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close trigger button */}
            <button
              onClick={() => setBookingDraw(null)}
              className="absolute top-4 right-4 p-2 bg-slate-950 text-slate-400 hover:text-white rounded-full border border-white/10 hover:border-white/30 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Campaign Prize Header */}
            <div className="flex items-start space-x-4 pr-6 mb-6">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-yellow-500/20">
                <img src={bookingDraw.image} alt={bookingDraw.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">RESERVE NEW TICKET COUPON</span>
                <h3 className="text-base font-extrabold text-white leading-snug">{bookingDraw.title}</h3>
                <p className="text-xs text-yellow-400 font-semibold mt-0.5">Ticket: Rs. {bookingDraw.ticketPrice.toLocaleString()}</p>
              </div>
            </div>

            {bookingSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">WhatsApp Chat Opened</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    We generated a beautifully formatted booking card. If the browser didn't open the chat tab automatically, please click below to verify:
                  </p>
                </div>

                <div className="space-y-2">
                  <a
                    href={`https://wa.me/923219964022?text=${encodeURIComponent(`Assalam-o-Alaikum Noor Saleem Official! 👋 I want to participate in the Lucky Draw for: *${bookingDraw.title}* and book *${bookingForm.ticketsCount}* ticket(s) as ${bookingForm.name} from ${bookingForm.city}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl text-center"
                  >
                    Launch WhatsApp Chat Externally
                  </a>
                  <button
                    onClick={() => setBookingDraw(null)}
                    className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/5"
                  >
                    Done / Close Dialogue
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 text-left">
                
                {/* Name */}
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">PARTICIPANT NAME (ENG/URDU)</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="e.g. Adnan Ahmad"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      required
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                </div>

                {/* Grid inputs */}
                <div className="grid grid-cols-2 gap-4">
                  {/* City */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">CITY LOCATION</label>
                    <select
                      value={bookingForm.city}
                      onChange={(e) => setBookingForm({ ...bookingForm, city: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-yellow-500"
                    >
                      {pakCities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">MOBILE WHATSAPP NO</label>
                    <input
                      type="tel"
                      placeholder="03219964022"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      required
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                </div>

                {/* Tickets Count and Payment */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Number of Tickets */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">TICKET QUANTITY</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={bookingForm.ticketsCount}
                      onChange={(e) => setBookingForm({ ...bookingForm, ticketsCount: Math.max(1, Number(e.target.value)) })}
                      required
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-yellow-500"
                    />
                  </div>

                  {/* Payment Operator */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">PAYMENT GATEWAY</label>
                    <select
                      value={bookingForm.payment}
                      onChange={(e) => setBookingForm({ ...bookingForm, payment: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-yellow-500"
                    >
                      <option value="EasyPaisa">📲 EasyPaisa</option>
                      <option value="JazzCash">📲 JazzCash</option>
                      <option value="Nayapay"> Nayapay / SadaPay</option>
                      <option value="Bank Transfer">🏦 Direct Bank App</option>
                    </select>
                  </div>
                </div>

                {/* Subtotal review display box */}
                <div className="bg-slate-950 p-4 border border-white/5 rounded-2xl flex items-center justify-between mt-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500">TOTAL TICKET VALUE</span>
                    <p className="text-base font-extrabold text-white">
                      {bookingForm.ticketsCount} Coupon(s)
                    </p>
                  </div>
                  <div>
                    <strong className="text-lg font-bold text-yellow-400">
                      Rs. {(bookingDraw.ticketPrice * bookingForm.ticketsCount).toLocaleString()}
                    </strong>
                  </div>
                </div>

                {/* CTA Action direct to whatsapp */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer flex items-center justify-center space-x-2"
                >
                  <MessageSquare className="w-4.5 h-4.5" />
                  <span>Reserve & Send on WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 5. FLOATING DYNAMIC WHATSAPP FIXED CHAT COMPONENT */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {showFloatingChat && (
          <div className="bg-slate-900 border border-yellow-500/20 w-72 rounded-3xl overflow-hidden shadow-2xl p-5 mb-3.5 text-left animate-in fade-in slide-in-from-bottom-5 duration-200">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-bold text-white text-xs uppercase tracking-wider">Noor Saleem Live</span>
              </div>
              <button 
                onClick={() => setShowFloatingChat(false)}
                className="text-slate-400 hover:text-white p-0.5 rounded-full hover:bg-white/5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Assalam-o-Alaikum! Welcome to Noor Saleem Official Lucky Draw. Reserve your tickets below or ask any queries directly. How can we help you win big today?
            </p>

            <a
              href="https://wa.me/923219964022?text=Hello%20Noor%20Saleem%20Official,%20I%20want%20to%20know%20more%20details%20about%20your%20lucky%20draws!"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-center text-xs rounded-xl"
            >
              Start Live WhatsApp Chat
            </a>
          </div>
        )}

        <button
          onClick={() => setShowFloatingChat(!showFloatingChat)}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 via-green-500 to-emerald-600 shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transform transition duration-300 cursor-pointer"
          title="Chat on WhatsApp"
        >
          <span className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-60"></span>
          <MessageSquare className="w-6 h-6 text-white" />
        </button>
      </div>

    </div>
  );
}
