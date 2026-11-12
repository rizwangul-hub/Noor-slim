/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Image, Eye, Award, Camera, Heart, PlusCircle, X } from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryProps {
  galleryItems: GalleryItem[];
}

export default function Gallery({ galleryItems }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'handovers' | 'celebrations' | 'live' | 'tickets'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Photos' },
    { id: 'handovers', label: '🔑 Car Handovers' },
    { id: 'celebrations', label: '🎉 Winner Celebrations' },
    { id: 'live', label: '📹 Live Draw Events' },
    { id: 'tickets', label: '🎫 Ticket Dist.' }
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="gallery" className="py-24 bg-slate-950 text-white relative">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title elements */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-full mb-4">
            <Camera className="w-4 h-4 text-yellow-400" />
            <span className="text-[10px] uppercase font-bold text-yellow-400 tracking-wider">
              Noor Saleem Memories
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
            Media Handover & Celebration Gallery
          </h2>
          <p className="text-slate-400 mt-2 text-sm">
            Captured moments of our incredible lucky draw winners receiving their cars, motorcycles, and grand prizes on camera.
          </p>

          {/* Sorted category tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 border cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 border-amber-400 shadow-md shadow-yellow-500/10'
                    : 'bg-slate-900 text-slate-400 border-white/5 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Image Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative h-72 rounded-3xl overflow-hidden border border-white/5 bg-slate-900 shadow-lg cursor-pointer"
            >
              <img
                src={item.url}
                alt={item.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Glass overlay on Hover */}
              <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                <div className="flex justify-end">
                  <div className="p-2 bg-yellow-500 text-slate-950 rounded-xl shadow-lg">
                    <Eye className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-500">
                    {item.category === 'handovers' ? 'Car Handover' : item.category === 'celebrations' ? 'Winner Event' : item.category === 'live' ? 'Live Stream Session' : 'Ticketing Operations'}
                  </span>
                  <p className="text-sm font-bold text-white tracking-tight mt-1">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Elegant Lightbox Pop-up Modal frame */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <div className="relative bg-slate-900/90 border border-yellow-500/20 max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-slate-950 text-slate-400 hover:text-white rounded-full border border-white/10 hover:border-white/30 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-[4/3] w-full bg-slate-950">
                <img
                  src={selectedItem.url}
                  alt={selectedItem.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 bg-slate-950 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-extrabold text-amber-500 tracking-wider">
                    Category: {selectedItem.category}
                  </span>
                  <p className="text-base font-bold text-white mt-1 leading-snug">
                    {selectedItem.caption}
                  </p>
                </div>

                <div className="flex items-center space-x-1 py-1.5 px-3 rounded-full bg-yellow-500/15 border border-yellow-500/20 text-yellow-400 text-xs font-bold">
                  <Award className="w-4 h-4" />
                  <span>Verified Moment</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
