/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, Coins, ShieldCheck, Moon, Sun, Search, LayoutDashboard, Globe } from 'lucide-react';

interface HeaderProps {
  currentView: 'guest' | 'admin';
  setView: (view: 'guest' | 'admin') => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({
  currentView,
  setView,
  darkMode,
  setDarkMode,
  searchQuery,
  setSearchQuery,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '#home' },
    { name: 'Current Draws', href: '#draws' },
    { name: 'Winners', href: '#winners' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQs', href: '#faqs' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-opacity-90 transition-colors duration-300 border-b border-yellow-500/20 bg-slate-950/80 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with gold branding */}
          <div className="flex items-center space-x-2">
            <a href="#home" className="flex items-center space-x-2 group">
              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 shadow-lg shadow-yellow-500/20 group-hover:scale-105 transition-transform duration-300">
                <Coins className="w-6 h-6 text-slate-950 stroke-[2]" />
                <div className="absolute inset-0 rounded-xl border border-white/20 animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-200 bg-clip-text text-transparent">
                  NOOR SALEEM
                </span>
                <span className="text-[10px] uppercase font-semibold text-amber-500 tracking-[0.25em]">
                  OFFICIAL
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-yellow-400 hover:bg-white/5 transition-all duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Search Input Toggle */}
            <div className="relative flex items-center">
              {searchOpen ? (
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search prize, ticket price..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-48 bg-slate-900 border border-amber-500/40 text-white text-xs rounded-l-md py-1.5 px-3 focus:outline-none focus:border-amber-400"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="bg-amber-500 text-slate-950 p-1.5 rounded-r-md hover:bg-amber-400 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-slate-400 hover:text-amber-400 rounded-full hover:bg-white/5 transition"
                  title="Search active draws"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Dark/Light state placeholder toggle (Fully integrated visual placeholder) */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-400 hover:text-amber-400 rounded-full hover:bg-white/5 transition"
              title={darkMode ? 'Switch to Light Mode (Standard theme)' : 'Switch to Dark Mode (Premium theme)'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-300" />}
            </button>

            {/* Interactive Admin Demo Toggle */}
            <button
              onClick={() => setView(currentView === 'guest' ? 'admin' : 'guest')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition duration-300 ${
                currentView === 'admin'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white border border-red-500/40'
                  : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:brightness-110 shadow-md shadow-yellow-500/10'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{currentView === 'admin' ? 'Exit Demo Panel' : 'Demo Admin panel'}</span>
            </button>
          </div>

          {/* Mobile menu toggle, search, theme buttons */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 text-slate-400 hover:text-amber-400 rounded-full hover:bg-white/5 transition"
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-300" />}
            </button>

            <button
              onClick={() => setView(currentView === 'guest' ? 'admin' : 'guest')}
              className={`flex items-center space-x-1 p-2 rounded-lg text-[10px] font-extrabold uppercase transition ${
                currentView === 'admin'
                  ? 'bg-red-600 text-white'
                  : 'bg-amber-400 text-slate-950'
              }`}
            >
              <LayoutDashboard className="w-4.5 h-4.5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-amber-400 rounded-lg hover:bg-white/5 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-yellow-500/10 bg-slate-950/95 transition-all duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {/* Mobile Search */}
            <div className="py-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search active lucky draws..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-amber-500/20 text-white rounded-lg py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-amber-400"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-yellow-400 hover:bg-white/5 transition"
              >
                {item.name}
              </a>
            ))}

            <div className="pt-4 border-t border-white/5">
              <div className="flex items-center space-x-1 w-full justify-center text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>100% Reliable Lucky Draw Platform Pakistan</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
