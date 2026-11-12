/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Trophy, Calendar, MapPin, Ticket, Award, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Winner } from '../types';

interface WinnersProps {
  winnersList: Winner[];
}

export default function Winners({ winnersList }: WinnersProps) {
  const [filter, setFilter] = useState<'all' | 'cars' | 'bikes' | 'phones' | 'cash'>('all');
  const [activeIndex, setActiveIndex] = useState(0);

  // Filter winners list based on prize category
  const filteredWinners = winnersList.filter((winner) => {
    if (filter === 'all') return true;
    if (filter === 'cars') return winner.prize.toLowerCase().includes('corolla') || winner.prize.toLowerCase().includes('alto') || winner.prize.toLowerCase().includes('car');
    if (filter === 'bikes') return winner.prize.toLowerCase().includes('motorcycle') || winner.prize.toLowerCase().includes('cg125') || winner.prize.toLowerCase().includes('bike');
    if (filter === 'phones') return winner.prize.toLowerCase().includes('iphone') || winner.prize.toLowerCase().includes('phone');
    if (filter === 'cash') return winner.prize.toLowerCase().includes('cash') || winner.prize.toLowerCase().includes('prize');
    return true;
  });

  const nextSlide = () => {
    if (filteredWinners.length > 0) {
      setActiveIndex((prev) => (prev + 1) % filteredWinners.length);
    }
  };

  const prevSlide = () => {
    if (filteredWinners.length > 0) {
      setActiveIndex((prev) => (prev - 1 + filteredWinners.length) % filteredWinners.length);
    }
  };

  return (
    <section id="winners" className="py-24 bg-slate-950 text-white relative">
      <div className="absolute inset-0 bg-radial-gradient from-yellow-500/5 via-transparent to-transparent opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header container */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-full mb-4">
            <Trophy className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-[10px] uppercase font-bold text-yellow-400 tracking-wider">
              Noor Saleem Hall of Fame
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            Our Happy Lucky Draw Winners
          </h2>
          <p className="text-slate-400 mt-3 text-sm leading-relaxed">
            Real people, real prizes. We publish verified winning ticket numbers and live handover dates immediately after every balloting event.
          </p>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Winners' },
              { id: 'cars', label: '🚗 Luxury Cars' },
              { id: 'bikes', label: '🏍️ Honda Bikes' },
              { id: 'phones', label: '📱 iPhones' },
              { id: 'cash', label: '💰 Cash Prizes' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setFilter(tab.id as any);
                  setActiveIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 border cursor-pointer ${
                  filter === tab.id
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 border-amber-400 shadow-md shadow-yellow-500/10'
                    : 'bg-slate-900 text-slate-400 border-white/5 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Carousel / Grid Split layout */}
        {filteredWinners.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/40 border border-white/5 rounded-3xl">
            <p className="text-slate-400 font-medium">No archived winners found for this category yet.</p>
            <p className="text-xs text-slate-500 mt-1">Be the first to join and emerge as a winner!</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Featured Active Winner Frame Left */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full bg-slate-900/50 backdrop-blur-md border border-yellow-500/15 rounded-3xl p-6 sm:p-8 relative">
              <div className="absolute top-4 right-4 bg-yellow-500/10 text-yellow-400 text-[10px] uppercase font-bold py-1 px-2.5 rounded-full border border-yellow-500/20 flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>Featured Winner</span>
              </div>

              {/* Slider Controller buttons */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <div className="bg-yellow-500 text-slate-950 p-2 rounded-xl">
                    <Award className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wide">Live Draw Verify</h4>
                    <p className="text-[10px] text-slate-400">Archived Ballot Index</p>
                  </div>
                </div>

                <div className="flex space-x-1.5">
                  <button
                    onClick={prevSlide}
                    className="p-2 bg-slate-950 border border-white/5 hover:border-yellow-500/30 text-white rounded-lg transition hover:bg-slate-800 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-2 bg-slate-950 border border-white/5 hover:border-yellow-500/30 text-white rounded-lg transition hover:bg-slate-800 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card Meta Elements */}
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-bold tracking-widest text-amber-500 uppercase h-fit block">
                    MEGA LUCKY DRAW WINNER
                  </span>
                  <h3 className="text-3xl font-extrabold text-white tracking-tight mt-1">
                    {filteredWinners[activeIndex].name}
                  </h3>
                </div>

                <div className="p-4 bg-slate-950/80 rounded-2xl border border-white/5 space-y-3.5 text-sm text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Prize Won:</span>
                    <strong className="text-yellow-400 font-bold">{filteredWinners[activeIndex].prize}</strong>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-2">
                    <span className="text-xs text-slate-400">Ticket Number:</span>
                    <span className="font-mono text-xs text-white bg-slate-900 border border-white/10 px-2.5 py-0.5 rounded-md font-semibold">
                      {filteredWinners[activeIndex].ticketNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-2">
                    <span className="text-xs text-slate-400">City:</span>
                    <span className="flex items-center space-x-1 font-semibold text-white">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      <span>{filteredWinners[activeIndex].city}, Pakistan</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-2">
                    <span className="text-xs text-slate-400">Draw Date:</span>
                    <span className="flex items-center space-x-1 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>{filteredWinners[activeIndex].date}</span>
                    </span>
                  </div>
                </div>

                {filteredWinners[activeIndex].amount && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-xs flex items-center justify-between">
                    <span>Direct Bank payout success:</span>
                    <strong className="font-bold">{filteredWinners[activeIndex].amount}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Slider Images / Grid Right */}
            <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
              {filteredWinners.map((w, idx) => (
                <div
                  key={w.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`group/item relative overflow-hidden rounded-2xl border transition-all duration-300 p-4 shrink-0 cursor-pointer ${
                    activeIndex === idx
                      ? 'border-yellow-500 bg-gradient-to-b from-slate-900 to-slate-950 ring-2 ring-yellow-400/20'
                      : 'border-white/5 hover:border-yellow-500/20 bg-slate-900/30'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Winner Circular Avatar */}
                    <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-slate-800 group-hover/item:border-yellow-500/50 transition">
                      <img
                        src={w.image}
                        alt={w.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-bold text-white truncate truncate">{w.name}</h4>
                      <div className="flex items-center space-x-1 text-xs text-slate-400 mt-0.5">
                        <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                        <span className="truncate">{w.city}</span>
                      </div>
                      <div className="text-xs text-amber-500 truncate font-semibold mt-1">
                        {w.prize}
                      </div>
                    </div>
                  </div>

                  {/* Winner Bottom meta banner */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-semibold uppercase">
                    <span className="flex items-center space-x-1">
                      <Ticket className="w-3 h-3 text-slate-500" />
                      <span>{w.ticketNumber}</span>
                    </span>
                    <span>{w.date}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
