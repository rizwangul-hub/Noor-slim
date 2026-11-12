/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Coins, PhoneCall, ChevronRight, Gift, Trophy, Star, Users } from 'lucide-react';
import { AppStats } from '../types';

interface HeroProps {
  stats: AppStats;
}

export default function Hero({ stats }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden bg-slate-950 text-white min-h-[90vh] flex items-center pt-24 pb-16">
      {/* Background Glows and Abstract Shapes */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-700/10 rounded-full blur-[140px] pointer-events-none translate-x-1/2 translate-y-1/2"></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#020617_2px,transparent_2px),linear-gradient(to_bottom,#020617_2px,transparent_2px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main responsive grid layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Copywriting and CTA Calls */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left relative z-10">
            {/* Flashy Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full w-fit">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
                Certified & Trusted Pakistan Ballot 2026
              </span>
            </div>

            {/* Giant Luxury Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none">
              Win Your{' '}
              <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-100 bg-clip-text text-transparent italic">
                Dream Car
              </span>
              , Bike, or Smartphone Today!
            </h1>

            {/* Structured Subheading */}
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
              Join thousands of participants across Pakistan and secure your lucky draw entry ticket via WhatsApp. Transparent balloting, direct home delivery, and verified winner records with <strong className="text-yellow-400 font-semibold text-base">Noor Saleem Official</strong>.
            </p>

            {/* Interactive Counters for Mobile/Tablets as high-trust elements directly in hero */}
            <div className="flex flex-wrap gap-4 pt-2">
              <span className="flex items-center space-x-1.5 text-xs text-slate-400">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>100% Genuine Handovers</span>
              </span>
              <span className="flex items-center space-x-1.5 text-xs text-slate-400">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Govt Tax Stamp Verification</span>
              </span>
              <span className="flex items-center space-x-1.5 text-xs text-slate-400">
                <Users className="w-4 h-4 text-amber-500" />
                <span>50,000+ Active Users</span>
              </span>
            </div>

            {/* CTA Buttons in line with requirements */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="https://wa.me/923219964022?text=Hello%20Noor%20Saleem%20Official,%20I%20want%20to%20participate%20in%20the%20lucky%20draw%20and%20buy%20a%20ticket!"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-600 hover:brightness-110 text-white font-bold rounded-2xl shadow-xl shadow-green-500/20 transform hover:-translate-y-0.5 transition duration-300 text-center"
              >
                <div className="relative w-6 h-6 flex items-center justify-center bg-white/20 rounded-full">
                  <span className="absolute animate-ping h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                  <PhoneCall className="w-3.5 h-3.5 text-white" />
                </div>
                <span>Buy Ticket on WhatsApp</span>
                <ChevronRight className="w-4 h-4 text-green-200 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#draws"
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl border border-yellow-500/20 hover:border-yellow-500/50 transform hover:-translate-y-0.5 transition duration-300 text-center"
              >
                <Gift className="w-5 h-5 text-amber-400" />
                <span>View Current Draws</span>
              </a>
            </div>
          </div>

          {/* Column 2: The Premium Generated Artwork Frame with Glows */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-yellow-500/30 bg-slate-900 group">
              <img
                src="/src/assets/images/noor_saleem_hero_1782104761361.jpg"
                alt="Noor Saleem Official Dream Prizes"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Glassmorphism Badge */}
              <div className="absolute inset-x-4 bottom-4 backdrop-blur-md bg-slate-950/70 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-yellow-400">GRAND MEGA TOYOTA ALTIS</h4>
                  <p className="text-[11px] text-slate-300">Live balloting stream broadcast scheduled this week!</p>
                </div>
                <div className="bg-yellow-500 text-slate-950 text-[10px] uppercase font-bold py-1 px-2.5 rounded-lg">
                  Active Draw
                </div>
              </div>
            </div>

            {/* Ambient gold rings in background */}
            <div className="absolute inset-0 scale-105 opacity-30 border border-yellow-500/10 rounded-3xl -z-10 animate-pulse"></div>
            <div className="absolute -inset-2 opacity-10 border border-yellow-500/5 rounded-3xl -z-10 animate-[spin_30s_linear_infinite]"></div>
          </div>
        </div>

        {/* Dynamic Static Counters Section conforming to guidelines */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 relative z-20">
          {[
            { label: 'Total Participants', value: '50,000+', desc: 'Real unique tickets sold', icon: Users, color: 'from-amber-500/20 to-yellow-500/5 text-amber-400' },
            { label: 'Happy Winners', value: '1,000+', desc: 'Prizes delivered safely', icon: Trophy, color: 'from-cyan-500/20 to-blue-500/5 text-cyan-400' },
            { label: 'Cars Given Away', value: '100+', desc: 'Full custom registration', icon: Gift, color: 'from-purple-500/20 to-pink-500/5 text-purple-400' },
            { label: 'Prizes Distributed', value: 'PKR 100M+', desc: 'Calculated catalog worth', icon: Coins, color: 'from-emerald-500/20 to-green-500/5 text-emerald-400' }
          ].map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={i}
                className="backdrop-blur-md bg-slate-900/60 border border-yellow-500/10 hover:border-yellow-500/30 rounded-2xl p-4 md:p-6 transition-all duration-300 shadow-md flex items-start space-x-3.5"
              >
                <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${stat.color} shrink-0`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mt-0.5">{stat.value}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{stat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
