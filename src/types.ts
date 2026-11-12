/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LuckyDraw {
  id: string;
  title: string;
  category: 'cars' | 'bikes' | 'phones' | 'cash';
  ticketPrice: number; // in PKR
  totalTickets: number;
  soldTickets: number;
  expiryDate: string; // ISO format
  image: string;
  details: string[];
  status: 'active' | 'drawn' | 'upcoming';
  winnerName?: string;
  winnerTicket?: string;
  winnerCity?: string;
  winnerImage?: string;
  winnerDate?: string;
}

export interface Winner {
  id: string;
  name: string;
  prize: string;
  ticketNumber: string;
  city: string;
  image: string;
  date: string;
  amount?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  body: string;
  rating: number;
  image: string;
  city: string;
  prizeWon: string;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  caption: string;
  category: 'handovers' | 'celebrations' | 'live' | 'tickets';
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Participant {
  id: string;
  drawId: string;
  drawTitle: string;
  ticketNumber: string;
  name: string;
  phone: string;
  city: string;
  paymentMethod: string;
  status: 'pending' | 'verified';
  date: string;
}

export interface AppStats {
  participants: number;
  winners: number;
  carsGiven: number;
  prizesValue: number; // in Millions PKR
}
