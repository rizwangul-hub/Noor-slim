/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, Ticket, Clock, CheckCircle2, ShoppingCart, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';
import { LuckyDraw } from '../types';

interface DrawCardProps {
  key?: any;
  draw: LuckyDraw;
  onBook: (draw: LuckyDraw) => void;
}

export default function DrawCard({ draw, onBook }: DrawCardProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(draw.expiryDate) - +new Date();
      let timeLeftData = { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };

      if (difference > 0) {
        timeLeftData = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          expired: false
        };
      }
      setTimeLeft(timeLeftData);
    };

    // Calculate once initially, then tick every second
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [draw.expiryDate]);

  const percentSold = Math.min(100, Math.round((draw.soldTickets / draw.totalTickets) * 100));
  const isUpcoming = draw.status === 'upcoming';

  return (
    <div className="relative group flex flex-col h-full rounded-3xl overflow-hidden backdrop-blur-md bg-slate-900/40 border border-yellow-500/10 hover:border-yellow-500/30 transition-all duration-300 shadow-xl">
      {/* Visual background ambient glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl group-hover:bg-yellow-500/10 transition-all duration-300"></div>

      {/* Ribbon Banner */}
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-1.5 px-3 py-1.5 rounded-full backdrop-blur-md bg-slate-950/80 border border-yellow-500/30">
        <Sparkles className="w-3 h-3 text-yellow-400" />
        <span className="text-[10px] uppercase font-bold text-yellow-400 tracking-wider">
          {draw.category === 'cars' ? '🚗 Premium Car' : draw.category === 'bikes' ? '🏍️ Heavy Bike' : draw.category === 'phones' ? '📱 Flagship Phone' : '💰 Mega Cash'}
        </span>
      </div>

      {/* Prize Image Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
        <img
          src={draw.image}
          alt={draw.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Ticket Price Flag style overlay */}
        <div className="absolute right-4 bottom-4 backdrop-blur-md bg-slate-950/90 border border-yellow-500/30 px-3.5 py-2 rounded-2xl flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">TICKET PRICE</span>
          <span className="text-lg font-bold text-yellow-400">Rs. {draw.ticketPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* Card Content & Meta details */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Title and Badge */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="text-xl font-bold text-white tracking-tight leading-snug group-hover:text-yellow-400 transition-colors">
              {draw.title}
            </h3>
          </div>

          {/* Draw highlights */}
          <ul className="space-y-2 mb-5">
            {draw.details.slice(0, 3).map((detail, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {/* Progress Section */}
          <div className="mb-5">
            <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5">
              <span className="flex items-center space-x-1">
                <Ticket className="w-3.5 h-3.5 text-yellow-500" />
                <span>Sold: {draw.soldTickets.toLocaleString()} / {draw.totalTickets.toLocaleString()}</span>
              </span>
              <span className="font-bold text-amber-400">{percentSold}% Complete</span>
            </div>
            
            {/* Elegant bar progression */}
            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-white/5 p-0.5">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-yellow-500 shadow-glow"
                style={{ width: `${percentSold}%` }}
              ></div>
            </div>
          </div>

          {/* Countdown timer ticking */}
          {!isUpcoming && (
            <div className="mb-6 bg-slate-950/80 border border-white/5 rounded-2xl p-3 flex flex-col items-center">
              <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 uppercase tracking-widest font-semibold mb-2">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Lucky draw countdown:</span>
              </div>
              
              {timeLeft.expired ? (
                <span className="text-xs font-bold text-red-500 flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Drawing now / Closed</span>
                </span>
              ) : (
                <div className="flex space-x-3 text-center">
                  <div>
                    <div className="text-sm font-bold text-white bg-slate-900 border border-white/5 w-9 py-1 rounded-lg">
                      {String(timeLeft.days).padStart(2, '0')}
                    </div>
                    <span className="text-[9px] text-slate-500 uppercase font-semibold">Days</span>
                  </div>
                  <div className="text-slate-600 font-bold text-sm pt-1">:</div>
                  <div>
                    <div className="text-sm font-bold text-yellow-400 bg-slate-900 border border-white/5 w-9 py-1 rounded-lg animate-pulse">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <span className="text-[9px] text-slate-500 uppercase font-semibold">Hrs</span>
                  </div>
                  <div className="text-slate-600 font-bold text-sm pt-1">:</div>
                  <div>
                    <div className="text-sm font-bold text-white bg-slate-900 border border-white/5 w-9 py-1 rounded-lg">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <span className="text-[9px] text-slate-500 uppercase font-semibold">Min</span>
                  </div>
                  <div className="text-slate-600 font-bold text-sm pt-1">:</div>
                  <div>
                    <div className="text-sm font-bold text-yellow-500/80 bg-slate-900 border border-white/5 w-9 py-1 rounded-lg">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <span className="text-[9px] text-slate-500 uppercase font-semibold">Sec</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CTA Action button triggering ticket modal */}
          {isUpcoming ? (
            <button
              disabled
              className="w-full py-3.5 px-4 bg-slate-900 text-slate-500 text-xs uppercase tracking-wider font-extrabold rounded-2xl border border-white/5 cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>Upcoming Promotion</span>
            </button>
          ) : (
            <button
              onClick={() => onBook(draw)}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:brightness-110 text-slate-950 text-xs uppercase tracking-wider font-extrabold rounded-2xl shadow-xl shadow-yellow-500/10 hover:shadow-yellow-500/20 active:scale-[0.98] transform transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
              <span>Get Ticket via WhatsApp</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
