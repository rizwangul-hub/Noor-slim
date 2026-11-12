/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LuckyDraw, Winner, Participant } from '../types';
import { 
  PlusCircle, Trash2, Edit3, Settings, Users, Trophy, Coins, Ticket, Sparkles, 
  HelpCircle, RefreshCw, Check, AlertTriangle, ShieldCheck, PlayCircle, Eye, Power
} from 'lucide-react';

interface AdminPanelProps {
  draws: LuckyDraw[];
  setDraws: React.Dispatch<React.SetStateAction<LuckyDraw[]>>;
  winners: Winner[];
  setWinners: React.Dispatch<React.SetStateAction<Winner[]>>;
}

export default function AdminPanel({ draws, setDraws, winners, setWinners }: AdminPanelProps) {
  // New campaign state
  const [newDraw, setNewDraw] = useState({
    title: '',
    category: 'cars' as 'cars' | 'bikes' | 'phones' | 'cash',
    ticketPrice: 1000,
    totalTickets: 1000,
    soldTickets: 10,
    expiryDays: 5,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
    details: 'Zero mileage, Registered with Excise, Home delivery across Pakistan'
  });

  // Spin ballot game state
  const [selectedBallotDrawId, setSelectedBallotDrawId] = useState<string>('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinTicket, setSpinTicket] = useState('NS-XXXXX');
  const [spinTickCount, setSpinTickCount] = useState(0);
  const [announcedWinner, setAnnouncedWinner] = useState<{
    name: string;
    city: string;
    ticketNum: string;
    prize: string;
  } | null>(null);

  // Custom simulation participants
  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', drawId: 'draw-toyota', drawTitle: 'Toyota Corolla 1.6 Altis', ticketNumber: 'NS-08422', name: 'Zeeshan Malik', phone: '0300 1234567', city: 'Faisalabad', paymentMethod: 'EasyPaisa', status: 'verified', date: '2026-06-21' },
    { id: '2', drawId: 'draw-toyota', drawTitle: 'Toyota Corolla 1.6 Altis', ticketNumber: 'NS-19342', name: 'Hina Pervez', phone: '0321 8765432', city: 'Islamabad', paymentMethod: 'JazzCash', status: 'pending', date: '2026-06-21' },
    { id: '3', drawId: 'draw-cash', drawTitle: 'Grand Cash Prize Rs. 1,000,000', ticketNumber: 'NS-33011', name: 'Javed Iqbal', phone: '0333 4455667', city: 'Rawalpindi', paymentMethod: 'Alfalah Bank', status: 'verified', date: '2026-06-20' },
    { id: '4', drawId: 'draw-iphone', drawTitle: 'iPhone 16 Pro Max - 256GB', ticketNumber: 'NS-41221', name: 'Ayesha Bibi', phone: '0345 9932104', city: 'Karachi', paymentMethod: 'SadaPay', status: 'pending', date: '2026-06-20' },
    { id: '5', drawId: 'draw-motorcycle', drawTitle: 'Honda CG125 Self Start', ticketNumber: 'NS-27382', name: 'Kamran Shah', phone: '0312 9988776', city: 'Multan', paymentMethod: 'EasyPaisa', status: 'verified', date: '2026-06-19' }
  ]);

  // Handle toggling verification status
  const toggleParticipantStatus = (id: string) => {
    setParticipants(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: p.status === 'verified' ? 'pending' : 'verified' };
      }
      return p;
    }));
  };

  // Add Draw Campaign
  const handleAddDrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDraw.title) return;

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + Number(newDraw.expiryDays));

    const created: LuckyDraw = {
      id: `draw-custom-${Date.now()}`,
      title: newDraw.title,
      category: newDraw.category,
      ticketPrice: Number(newDraw.ticketPrice),
      totalTickets: Number(newDraw.totalTickets),
      soldTickets: Number(newDraw.soldTickets),
      expiryDate: futureDate.toISOString(),
      image: newDraw.image,
      details: newDraw.details.split(',').map(d => d.trim()),
      status: 'active'
    };

    setDraws([created, ...draws]);
    alert('🎉 Campaign launched successfully! It is now live on the home page.');
    setNewDraw({
      title: '',
      category: 'cars',
      ticketPrice: 1000,
      totalTickets: 1000,
      soldTickets: 10,
      expiryDays: 5,
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
      details: 'Zero mileage, Registered with Excise, Home delivery across Pakistan'
    });
  };

  // Delete Campaign
  const handleDeleteDraw = (id: string) => {
    if (confirm('Are you sure you want to stop this lucky draw campaign?')) {
      setDraws(prev => prev.filter(d => d.id !== id));
    }
  };

  // Start Live Ballot Wheel Simulation
  const handleLaunchBallot = () => {
    if (!selectedBallotDrawId) return;
    const target = draws.find(d => d.id === selectedBallotDrawId);
    if (!target) return;

    setIsSpinning(true);
    setAnnouncedWinner(null);
    setSpinTickCount(0);
  };

  // Effect to handle ticking simulation on ballot
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSpinning) {
      interval = setInterval(() => {
        // Generate random sequence
        const randCode = 'NS-' + Math.floor(10000 + Math.random() * 90000);
        setSpinTicket(randCode);
        setSpinTickCount(p => p + 1);

        // Spin ticks limit
        if (spinTickCount >= 25) {
          setIsSpinning(false);
          const targetDraw = draws.find(d => d.id === selectedBallotDrawId);
          if (targetDraw) {
            // Find matched simulated participant or create a random lucky draw winner
            const verifiedParticipants = participants.filter(p => p.drawId === selectedBallotDrawId && p.status === 'verified');
            
            let winName = 'Adnan Siddiqui';
            let winCity = 'Gujranwala';
            let winTicket = 'NS-39841';

            if (verifiedParticipants.length > 0) {
              const luckyOne = verifiedParticipants[Math.floor(Math.random() * verifiedParticipants.length)];
              winName = luckyOne.name;
              winCity = luckyOne.city;
              winTicket = luckyOne.ticketNumber;
            } else {
              // fallback random
              const randomNames = ['Imran Malik', 'Shabbir Shah', 'Zainab Ahmed', 'Bilal Bhatti', 'Saira Ghafoor', 'Sajid Sial'];
              const randomCities = ['Sargodha', 'Sialkot', 'Quetta', 'Sukkur', 'Peshawar', 'BahaWALPUR'];
              winName = randomNames[Math.floor(Math.random() * randomNames.length)];
              winCity = randomCities[Math.floor(Math.random() * randomCities.length)];
              winTicket = 'NS-' + Math.floor(12000 + Math.random() * 80000);
            }

            setSpinTicket(winTicket);
            setAnnouncedWinner({
              name: winName,
              city: winCity,
              ticketNum: winTicket,
              prize: targetDraw.title
            });

            // Update campaign and transfer to drawn status
            setDraws(prev => prev.map(d => {
              if (d.id === selectedBallotDrawId) {
                return {
                  ...d,
                  status: 'drawn',
                  winnerName: winName,
                  winnerTicket: winTicket,
                  winnerCity: winCity,
                  winnerImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
                  winnerDate: new Date().toISOString().split('T')[0]
                };
              }
              return d;
            }));

            // Auto push into global winners roster!
            const newWinnerObject: Winner = {
              id: `win-custom-${Date.now()}`,
              name: winName,
              prize: targetDraw.title,
              ticketNumber: winTicket,
              city: winCity,
              image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
              date: new Date().toISOString().split('T')[0]
            };
            setWinners(prev => [newWinnerObject, ...prev]);
          }
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isSpinning, spinTickCount, selectedBallotDrawId, draws]);

  // Aggregate Metrics
  const activeCount = draws.filter(d => d.status === 'active').length;
  const totalTargetSoldVal = draws.reduce((acc, d) => acc + (d.soldTickets * d.ticketPrice), 0);

  return (
    <div className="bg-slate-950 text-white min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Banner notification about Demo state */}
        <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-yellow-500/20 p-5 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-400">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Noor Saleem Interactive Operator Panel (Demo)</h2>
              <p className="text-xs text-slate-400">
                This simulated panel allows clients to manage promotions, verify ticket payment documents, and run automated digital drawing ballot wheels in real-time.
              </p>
            </div>
          </div>
          <div className="text-xs bg-slate-900 border border-white/5 py-1.5 px-3 rounded-xl font-mono text-slate-400">
            Current Session Persistent mode
          </div>
        </div>

        {/* Metric Aggregates */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-5 text-left">
            <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1 font-semibold uppercase">
              <Ticket className="w-4 h-4 text-amber-500" />
              <span>Active Draws</span>
            </div>
            <p className="text-3xl font-extrabold text-white mt-1">{activeCount}</p>
            <p className="text-[10px] text-slate-500 mt-1">Live active campaigns</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-5 text-left">
            <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1 font-semibold uppercase">
              <Users className="w-4 h-4 text-cyan-500" />
              <span>Registrations</span>
            </div>
            <p className="text-3xl font-extrabold text-white mt-1">{participants.length}</p>
            <p className="text-[10px] text-slate-500 mt-1">Simulated ticket holders</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-5 text-left">
            <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1 font-semibold uppercase">
              <Trophy className="w-4 h-4 text-purple-500" />
              <span>Winners Crowned</span>
            </div>
            <p className="text-3xl font-extrabold text-white mt-1">{winners.length}</p>
            <p className="text-[10px] text-slate-500 mt-1">Total database verified winners</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-5 text-left">
            <div className="flex items-center space-x-2 text-xs text-slate-400 mb-1 font-semibold uppercase">
              <Coins className="w-4 h-4 text-emerald-500" />
              <span>Sales Value (PKR)</span>
            </div>
            <p className="text-2xl font-extrabold text-emerald-400 mt-1.5">Rs. {totalTargetSoldVal.toLocaleString()}</p>
            <p className="text-[10px] text-slate-500 mt-1">Calculated revenue demo</p>
          </div>
        </div>

        {/* Split Grid area */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Column Left: Ballot Spin Balloting System & Add draw */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Real-time Balloting machine spin wheel */}
            <div className="bg-slate-900/40 border border-yellow-500/20 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl"></div>
              
              <div className="flex items-center space-x-2 mb-6">
                <Power className="w-5 h-5 text-red-500 animate-pulse" />
                <h3 className="text-lg font-bold text-white">Live Digital Balloting Machine</h3>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-slate-400">
                  Select an active campaign below to trigger an automated digital draw. Ticking random number sequences will simulate searching the participant lists and select a random ticket!
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <select
                    value={selectedBallotDrawId}
                    onChange={(e) => setSelectedBallotDrawId(e.target.value)}
                    disabled={isSpinning}
                    className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
                  >
                    <option value="">-- Choose active campaign draw --</option>
                    {draws.filter(d => d.status === 'active').map(d => (
                      <option key={d.id} value={d.id}>{d.title} (Sold: {d.soldTickets})</option>
                    ))}
                  </select>

                  <button
                    onClick={handleLaunchBallot}
                    disabled={isSpinning || !selectedBallotDrawId}
                    className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer disabled:opacity-40 flex items-center justify-center space-x-2 shrink-0"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Run Simulated Draw Balloting</span>
                  </button>
                </div>

                {/* Ballot Display Board screen */}
                <div className="bg-slate-950 border border-white/5 rounded-2xl py-8 px-4 text-center mt-6 flex flex-col items-center justify-center space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">DIGITAL COUPON SCREEN</span>
                  <div className="font-mono text-4xl sm:text-5xl font-extrabold text-yellow-400 tracking-wider shadow-inner py-3.5 px-6 rounded-2xl bg-slate-900 border border-yellow-500/10 min-w-48">
                    {spinTicket}
                  </div>
                  {isSpinning && <span className="text-xs text-slate-400 animate-pulse">Running secure ballots...</span>}
                </div>

                {announcedWinner && (
                  <div className="border border-emerald-500/20 bg-emerald-500/5 p-5 rounded-2xl space-y-3.5">
                    <div className="flex items-center space-x-2 text-emerald-400">
                      <ShieldCheck className="w-5 h-5" />
                      <h4 className="text-sm font-bold">LUCKY DRAW WINNER DECLARED!</h4>
                    </div>
                    <div className="text-xs text-slate-300 space-y-1.5 font-sans pl-1">
                      <div>Name: <strong className="text-white font-bold">{announcedWinner.name}</strong></div>
                      <div>City: <span className="text-white">{announcedWinner.city}</span></div>
                      <div>Winner Ticket: <span className="font-mono bg-slate-950 py-0.5 px-2 rounded border border-white/5 text-yellow-400">{announcedWinner.ticketNum}</span></div>
                      <div>Prize Allocated: <strong className="text-white">{announcedWinner.prize}</strong></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Campaign Creator form */}
            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <PlusCircle className="w-5 h-5 text-yellow-500" />
                <h3 className="text-lg font-bold text-white">Launch New Lucky Draw Campaign</h3>
              </div>

              <form onSubmit={handleAddDrawSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">PROMOTION CAMPAIGN PRIZE TITLE</label>
                    <input
                      type="text"
                      placeholder="e.g. Brand New Audi A3 Sedan"
                      value={newDraw.title}
                      onChange={(e) => setNewDraw({ ...newDraw, title: e.target.value })}
                      required
                      className="w-full bg-slate-950 border border-white/5 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">CATEGORY</label>
                    <select
                      value={newDraw.category}
                      onChange={(e) => setNewDraw({ ...newDraw, category: e.target.value as any })}
                      className="w-full bg-slate-950 border border-white/5 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none"
                    >
                      <option value="cars">Luxury Cars</option>
                      <option value="bikes">Motorcycles</option>
                      <option value="phones">Smartphones</option>
                      <option value="cash">Cash Prizes</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">TICKET PRICE (PKR)</label>
                    <input
                      type="number"
                      value={newDraw.ticketPrice}
                      onChange={(e) => setNewDraw({ ...newDraw, ticketPrice: Number(e.target.value) })}
                      required
                      className="w-full bg-slate-950 border border-white/5 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">TOTAL AVAIL TICKETS</label>
                    <input
                      type="number"
                      value={newDraw.totalTickets}
                      onChange={(e) => setNewDraw({ ...newDraw, totalTickets: Number(e.target.value) })}
                      required
                      className="w-full bg-slate-950 border border-white/5 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">LUCKY COUNTDOWN DAYS</label>
                    <input
                      type="number"
                      value={newDraw.expiryDays}
                      onChange={(e) => setNewDraw({ ...newDraw, expiryDays: Number(e.target.value) })}
                      required
                      className="w-full bg-slate-950 border border-white/5 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">PREMIUM PRIZE IMAGE URL</label>
                  <input
                    type="url"
                    value={newDraw.image}
                    onChange={(e) => setNewDraw({ ...newDraw, image: e.target.value })}
                    required
                    className="w-full bg-slate-950 border border-white/5 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">CAMPAIGN HIGHLIGHT DETAILS (COMMA SEPARATED)</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Pure white classic finish, registered assistance, Apple 1 Year official warranty"
                    value={newDraw.details}
                    onChange={(e) => setNewDraw({ ...newDraw, details: e.target.value })}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl py-2.5 px-3.5 text-xs text-white focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer"
                >
                  Launch Live Campaign Campaign
                </button>
              </form>
            </div>
          </div>

          {/* Column Right: Active draws listed & Registrations table */}
          <div className="lg:col-span-5 space-y-8 text-left">
            
            {/* Live active campaigns table */}
            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6">
              <h3 className="text-base font-bold text-white mb-4">Active Campaigns List</h3>
              
              <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                {draws.map((d) => (
                  <div key={d.id} className="p-3.5 rounded-2xl bg-slate-950 border border-white/5 flex items-center justify-between gap-2.5">
                    <div className="flex items-center space-x-3 truncate">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-slate-800">
                        <img src={d.image} alt={d.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      </div>
                      <div className="truncate text-xs">
                        <h4 className="font-bold text-white truncate">{d.title}</h4>
                        <p className="text-slate-400 mt-0.5">Tickets Sold: {d.soldTickets} / {d.totalTickets}</p>
                        <span className={`inline-block text-[9px] uppercase font-bold py-0.5 px-1.5 rounded mt-1.5 ${
                          d.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                        }`}>
                          {d.status}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteDraw(d.id)}
                      className="p-2 text-slate-500 hover:text-red-500 hover:bg-white/5 rounded-lg transition"
                      title="Cancel Campaign"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated participants registrations / submissions */}
            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6">
              <h3 className="text-base font-bold text-white mb-1">Ticket Reservists & verification</h3>
              <p className="text-[11px] text-slate-400 mb-4">Click checklist marks to approve cell payments and ledger listings.</p>

              <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                {participants.map((p) => (
                  <div key={p.id} className="p-3.5 rounded-2xl bg-slate-950 border border-white/5 text-xs space-y-2">
                    <div className="flex justify-between items-start gap-1">
                      <div>
                        <h4 className="font-bold text-white">{p.name}</h4>
                        <p className="text-slate-400 text-[10px]">{p.city}, phone: {p.phone}</p>
                      </div>
                      
                      <button
                        onClick={() => toggleParticipantStatus(p.id)}
                        className={`p-1.5 rounded-lg border transition ${
                          p.status === 'verified'
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                        }`}
                        title="Toggle Verification"
                      >
                        {p.status === 'verified' ? <Check className="w-3.5 h-3.5" /> : <RefreshCw className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="border-t border-white/5 pt-2 flex justify-between items-center text-[10px]">
                      <span className="text-amber-500 underline truncate select-all">{p.drawTitle}</span>
                      <span className="font-mono bg-slate-900 px-1.5 py-0.5 rounded text-white font-semibold">TKT: {p.ticketNumber}</span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1">
                      <span>Method: <strong className="text-slate-400">{p.paymentMethod}</strong></span>
                      <span>{p.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
