/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquareCode } from 'lucide-react';
import { FaqItem } from '../types';

interface FAQsProps {
  faqItems: FaqItem[];
}

export default function FAQs({ faqItems }: FAQsProps) {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [query, setQuery] = useState('');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = faqItems.filter((item) => {
    return (
      item.question.toLowerCase().includes(query.toLowerCase()) ||
      item.answer.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <section id="faqs" className="py-24 bg-slate-900/60 relative border-t border-yellow-500/10">
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title container */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-[0.25em] text-amber-500">
            GOT QUESTIONS?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-450 mt-2 text-sm text-slate-400">
            Have queries about booking, live draws, and prize claims? Search or browse through our guides below.
          </p>

          {/* Quick FAQ Search Bar */}
          <div className="relative mt-8 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search FAQs (e.g. payment, delivery, ticket)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-950 border border-yellow-500/15 text-white rounded-2xl py-3.5 pl-5 pr-12 text-sm focus:outline-none focus:border-yellow-500/50"
            />
            <Search className="absolute right-4 top-4 w-5 h-5 text-slate-500" />
          </div>
        </div>

        {/* Accordions layout */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-6 bg-slate-900/40 border border-white/5 rounded-2xl">
            <p className="text-sm text-slate-400">No matching search query found.</p>
            <button
              onClick={() => setQuery('')}
              className="text-xs text-amber-500 hover:underline mt-1 font-bold"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          <div className="space-y-4 relative z-10">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`backdrop-blur-md transition-all duration-300 rounded-3xl border overflow-hidden ${
                    isOpen
                      ? 'bg-slate-950/80 border-yellow-500/30 shadow-lg shadow-yellow-500/5'
                      : 'bg-slate-900/30 border-white/5 hover:border-yellow-500/15'
                  }`}
                >
                  {/* Trigger row */}
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-6 flex justify-between items-center transition cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3.5 pr-4">
                      <div className="p-2 bg-yellow-500/10 rounded-xl group-hover:bg-yellow-500/25 transition shrink-0">
                        <HelpCircle className="w-4 h-4 text-amber-500" />
                      </div>
                      <span className="font-bold text-white group-hover:text-yellow-400 text-sm tracking-tight transition">
                        {faq.question}
                      </span>
                    </div>

                    <div className="p-1.5 rounded-lg bg-slate-900 border border-white/5 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4 text-yellow-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </div>
                  </button>

                  {/* Expandable answer panel */}
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 border-t border-white/5 bg-slate-950/40">
                      <p className="text-xs text-slate-300 text-left leading-relaxed whitespace-pre-line pl-10">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
