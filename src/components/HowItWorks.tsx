/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PhoneCall, HelpCircle, FileCheck2, Award, Tv, MessageSquareDot, HelpCircle as FaqIcon } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '1',
      title: 'Select Lucky Draw',
      description: 'Browse our catalog of current lucky draws and choose your desired prize (Car, Bike, iPhone, Cash).',
      icon: MessageSquareDot,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    },
    {
      step: '2',
      title: 'Contact via WhatsApp',
      description: 'Click "Get Ticket" to automatically prepare your ticket details and reach out directly to our WhatsApp.',
      icon: PhoneCall,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      step: '3',
      title: 'Get Payment Guides',
      description: 'Receive easy instructions to pay the official ticket price via JazzCash, EasyPaisa, Nayapay, or Bank Transfer.',
      icon: HelpCircle,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
    },
    {
      step: '4',
      title: 'Submit Payment Proof',
      description: 'Initiate transaction on your mobile wallet, capture a digital confirmation receipt, and send it back to us.',
      icon: FileCheck2,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
    },
    {
      step: '5',
      title: 'Receive Ticket Number',
      description: 'Our operator verifies proof and issues your premium digital entry ticket containing unique coupon sequences.',
      icon: Award,
      color: 'text-pink-400 bg-pink-500/10 border-pink-500/20'
    },
    {
      step: '6',
      title: 'Live Drawing Broadcast',
      description: 'Wait for our scheduled live stream draws broadcasted on social channels. Watch your code emerge a winner!',
      icon: Tv,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-900/60 relative border-y border-yellow-500/10">
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Container */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-amber-500">
            TRANSPARENT PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-2">
            How It Works — Step-by-Step
          </h2>
          <p className="text-slate-400 mt-3 text-sm">
            Participate with complete peace of mind. Our 100% secure procedural system is designed for fast, authentic draws.
          </p>
        </div>

        {/* 6 Grid items layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="group relative backdrop-blur-md bg-slate-900/40 hover:bg-slate-900/85 border border-white/5 hover:border-yellow-500/20 rounded-2xl p-6 transition-all duration-300 shadow-md flex flex-col justify-between"
              >
                {/* Numeric index bubble top right */}
                <div className="absolute top-4 right-4 text-3xl font-extrabold text-slate-800/60 group-hover:text-yellow-500/20 select-none transition">
                  #{s.step}
                </div>

                <div>
                  <div className={`p-3 rounded-xl border w-fit ${s.color} mb-5`}>
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>

                  <h3 className="text-base font-bold text-white tracking-tight text-left mb-2 group-hover:text-yellow-400 transition-colors">
                    Step {s.step}: {s.title}
                  </h3>
                  <p className="text-xs text-slate-400 text-left leading-relaxed">
                    {s.description}
                  </p>
                </div>

                {/* Bottom line connectors */}
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  <span>Method Verified</span>
                  <span className="text-amber-500">Active</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
