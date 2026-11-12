/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Mail, Clock, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', phone: '', drawId: 'cars', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', phone: '', drawId: 'cars', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 text-white relative">
      {/* Absolute floating WhatsApp widget is handled in main App view since it spans all views, but we will add direct hot-links here as well */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-amber-500">
            CONNECT WITH US
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
            Get In Touch (Official Contact)
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Feel free to call, message, or drop by our regional assistance office in Pakistan. Our client support runs 24/7.
          </p>
        </div>

        {/* 2-Column responsive split of Office info vs. Direct Booking Request Form */}
        <div className="grid lg:grid-cols-12 gap-12 items-start relative z-10">
          
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="backdrop-blur-md bg-slate-900/40 border border-yellow-500/10 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-white/5 pb-4">
                Noor Saleem Official Headquarters
              </h3>

              {/* Grid Touch points */}
              <div className="space-y-4">
                
                {/* Phone Call */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">OFFICIAL HELPLINE (CALL)</h4>
                    <p className="text-base font-bold text-white mt-0.5">+92 321 9964022</p>
                    <a
                      href="tel:+923219964022"
                      className="inline-flex items-center space-x-1 text-xs text-amber-500 hover:underline mt-1 font-semibold"
                    >
                      <span>Click to Call Helpline</span>
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start space-x-4 border-t border-white/5 pt-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                    <MessageSquare className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">WHATSAPP ENQUIRY</h4>
                    <p className="text-base font-bold text-white mt-0.5">+92 321 9964022</p>
                    <a
                      href="https://wa.me/923219964022"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs text-emerald-500 hover:underline mt-1 font-semibold"
                    >
                      <span>Open Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start space-x-4 border-t border-white/5 pt-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">CENTRAL HEAD OFFICE</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      Office #412, Mega Heights Tower, Jail Road, Lahore, Punjab, Pakistan
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-4 border-t border-white/5 pt-4">
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">WORKING HOURS</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      24/7 Support Desk — Live verification team active from 10:00 AM to 10:00 PM Daily.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Social channels card placeholders */}
            <div className="backdrop-blur-md bg-slate-900/40 border border-white/5 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">Join Official Social Channels</h4>
                <p className="text-xs text-slate-400 mt-0.5">Check live drawings, celebrations and ticket announcements daily.</p>
              </div>

              <div className="flex items-center space-x-2.5">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-bold rounded-xl hover:bg-blue-600 hover:text-white transition cursor-pointer"
                >
                  Facebook Page
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-pink-600/10 border border-pink-500/20 text-pink-400 text-xs font-bold rounded-xl hover:bg-pink-600 hover:text-white transition cursor-pointer"
                >
                  TikTok Channel
                </a>
              </div>
            </div>
          </div>

          {/* Direct Interactive Form Side */}
          <div className="lg:col-span-7">
            <div className="backdrop-blur-md bg-slate-900/40 border border-yellow-500/10 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center space-x-2 mb-6">
                <ShieldCheck className="w-6 h-6 text-yellow-500" />
                <h3 className="text-lg font-bold text-white">Fast Ticket Verification Booking</h3>
              </div>

              {submitted ? (
                <div className="py-12 px-4 text-center space-y-4 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Request successfully recorded!</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      Our operator has reserved your tentative preference. To complete validation immediately, please click the floating WhatsApp button to chat.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">FULL NAME (URDU/ENG)</label>
                      <input
                        type="text"
                        placeholder="e.g. Muhammad Amjad"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-white/5 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-yellow-500/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">PHONE / WHATSAPP NUMBER</label>
                      <input
                        type="tel"
                        placeholder="e.g. 03219964022"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        required
                        className="w-full bg-slate-950 border border-white/5 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-yellow-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">CHOSE TARGET LUCKY DRAW PRIZE</label>
                    <select
                      value={formState.drawId}
                      onChange={(e) => setFormState({ ...formState, drawId: e.target.value })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-yellow-500/50"
                    >
                      <option value="toyota">Toyota Corolla Altis Grande (Ticket: PKR 2,000)</option>
                      <option value="civic">Honda Civic Oriel Turbo (Ticket: PKR 3,500)</option>
                      <option value="cash">PKR 1,000,000 Cash Prize (Ticket: PKR 500)</option>
                      <option value="iphone">iPhone 16 Pro Max 256GB (Ticket: PKR 1,000)</option>
                      <option value="motorcycle">Honda CG125 Self Start (Ticket: PKR 300)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">SPECIAL INSTRUCTIONS / QUERIES</label>
                    <textarea
                      placeholder="Specify your ticket code preference or payment question..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      rows={3}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-yellow-500/50"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:brightness-110 text-slate-950 font-bold rounded-2xl shadow-xl shadow-yellow-500/10 cursor-pointer text-center text-sm uppercase tracking-wider flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4 stroke-[2.5]" />
                    <span>Submit Verification Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
