/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LuckyDraw, Winner, Testimonial, GalleryItem, FaqItem, AppStats } from './types';

// Helper to create dates in the future relative to system date
const getFutureDateString = (daysAhead: number, hoursAhead = 12): string => {
  const date = new Date('2026-06-21T22:05:16-07:00'); // Based on local system time metadata
  date.setDate(date.getDate() + daysAhead);
  date.setHours(date.getHours() + hoursAhead);
  return date.toISOString();
};

export const INITIAL_LUCKY_DRAWS: LuckyDraw[] = [
  {
    id: 'draw-toyota',
    title: 'Brand New Toyota Corolla 1.6 Altis',
    category: 'cars',
    ticketPrice: 2000,
    totalTickets: 2500,
    soldTickets: 1874,
    expiryDate: getFutureDateString(3, 4),
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600',
    details: [
      'Model 2026, Zero Mileage',
      'Automatic Transmission Special Edition',
      'Super White Metallic Finish',
      'Registered with Punjab Excise',
      'Free Delivery anywhere in Pakistan',
      'Includes active brand warranty'
    ],
    status: 'active'
  },
  {
    id: 'draw-civic',
    title: 'Honda Civic Oriel Turbo 1.5',
    category: 'cars',
    ticketPrice: 3500,
    totalTickets: 3000,
    soldTickets: 2450,
    expiryDate: getFutureDateString(5, 8),
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
    details: [
      'Model 2026, Midnight Black Classic',
      'Oriel Turbo Grade Engine',
      'Leather Interior & Panoramic Sunroof',
      'Complete safety systems with Honda SENSING',
      'Immediate delivery & registration assistance'
    ],
    status: 'active'
  },
  {
    id: 'draw-cash',
    title: 'Grand Cash Prize Rs. 1,000,000',
    category: 'cash',
    ticketPrice: 500,
    totalTickets: 5000,
    soldTickets: 4120,
    expiryDate: getFutureDateString(1, 14),
    image: 'https://images.unsplash.com/photo-1561414927-6d86591d0c4f?auto=format&fit=crop&q=80&w=600',
    details: [
      'Pure Cash Prize of PKR 10 Lakhs',
      'Tax-free transfer direct to bank account',
      'Multiple payment gateway support (JazzCash, EasyPaisa, Bank)',
      'Live drawing broadcast on Facebook and YouTube',
      'Consolation prizes for 10 runner-ups (Rs. 10,000 each)'
    ],
    status: 'active'
  },
  {
    id: 'draw-iphone',
    title: 'iPhone 16 Pro Max - 256GB',
    category: 'phones',
    ticketPrice: 1000,
    totalTickets: 1200,
    soldTickets: 980,
    expiryDate: getFutureDateString(2, 6),
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=600',
    details: [
      'Brand New PTA Approved iPhone 16 Pro Max',
      'Desert Titanium Premium Finish',
      'Apple Official Warranty 1 Year',
      'Includes premium charging adapter & accessories bundle'
    ],
    status: 'active'
  },
  {
    id: 'draw-motorcycle',
    title: 'Honda CG125 Self Start (3 Units)',
    category: 'bikes',
    ticketPrice: 300,
    totalTickets: 2000,
    soldTickets: 1410,
    expiryDate: getFutureDateString(4, 18),
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600',
    details: [
      '3 Lucky Winners will receive 1 Honda CG125 Self-Start each',
      'Model 2026 Red Sporty Finish',
      'Pre-registered with tax paid',
      'Home delivery to winner\'s doorstep'
    ],
    status: 'active'
  },
  {
    id: 'draw-upcoming-fortuner',
    title: 'Toyota Fortuner Sigma4 Diesel',
    category: 'cars',
    ticketPrice: 5000,
    totalTickets: 4000,
    soldTickets: 0,
    expiryDate: getFutureDateString(10),
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600',
    details: [
      'Toyota Fortuner Sigma4 2026 Model',
      'Supercharged diesel engine',
      'Full premium leather trim',
      'Launch date to be announced'
    ],
    status: 'upcoming'
  }
];

export const INITIAL_WINNERS: Winner[] = [
  {
    id: 'win-1',
    name: 'Muhammad Usman',
    prize: 'Toyota Corolla 1.6 Altis',
    ticketNumber: 'NS-08432',
    city: 'Lahore',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    date: '2026-06-12'
  },
  {
    id: 'win-2',
    name: 'Amna Khan',
    prize: 'iPhone 16 Pro Max',
    ticketNumber: 'NS-42901',
    city: 'Karachi',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    date: '2026-06-08'
  },
  {
    id: 'win-3',
    name: 'Yasir Ali',
    prize: 'Honda CG125 Motorcycle',
    ticketNumber: 'NS-19385',
    city: 'Rawalpindi',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    date: '2026-06-02'
  },
  {
    id: 'win-4',
    name: 'Bilal Ahmed',
    prize: 'Rs. 1,000,000 Cash Prize',
    ticketNumber: 'NS-33012',
    city: 'Multan',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    date: '2026-05-25',
    amount: 'PKR 1,000,000'
  },
  {
    id: 'win-5',
    name: 'Sana Saeed',
    prize: 'Suzuki Alto VXR',
    ticketNumber: 'NS-27490',
    city: 'Peshawar',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    date: '2026-05-18'
  },
  {
    id: 'win-6',
    name: 'Farooq Shah',
    prize: 'Honda CG125 Motorcycle',
    ticketNumber: 'NS-11802',
    city: 'Faisalabad',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400',
    date: '2026-05-10'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Muhammad Usman',
    body: 'Thanks Noor Saleem Official for this amazing opportunity. I received my brand new white Corolla right at my home in DHA Lahore. The process is completely fair, clear, and transparent.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    city: 'Lahore',
    prizeWon: 'Toyota Corolla'
  },
  {
    id: 'test-2',
    name: 'Amna Khan',
    body: 'I won an iPhone and the process was completely transparent and fast. Within 2 days of drawing, they dispatched and handed over the iPhone in Karachi. Highly recommended and trustworthy platform.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    city: 'Karachi',
    prizeWon: 'iPhone 16 Pro Max'
  },
  {
    id: 'test-3',
    name: 'Yasir Ali',
    body: 'I am extremely glad to participate in Noor Saleem Official. Buying tickets via WhatsApp is super convenient with quick responses. Winning the CG125 changed my daily commute completely!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    city: 'Rawalpindi',
    prizeWon: 'Honda CG125'
  },
  {
    id: 'test-4',
    name: 'Sana Saeed',
    body: 'Highly professional team. The live streaming broadcasted the ballot beautifully, leaving zero doubt about honesty. Cannot wait to participate in the next grand draw!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    city: 'Peshawar',
    prizeWon: 'Suzuki Alto'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=500',
    caption: 'Official ticket distribution and logistics center.',
    category: 'tickets'
  },
  {
    id: 'gal-2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=500',
    caption: 'Stage preparations for the mega live lucky draw event in Lahore.',
    category: 'live'
  },
  {
    id: 'gal-3',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=500',
    caption: 'Winner celebration ceremony featuring local guests and transparent balloting.',
    category: 'celebrations'
  },
  {
    id: 'gal-4',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=500',
    caption: 'First key hand-over of Toyota Corolla at our head office.',
    category: 'handovers'
  },
  {
    id: 'gal-5',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=500',
    caption: 'Exclusive gifts distribution to runner-up participants.',
    category: 'celebrations'
  },
  {
    id: 'gal-6',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=500',
    caption: 'Live balloting desk verifying custom coupon databases.',
    category: 'live'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How can I buy a lucky draw ticket?',
    answer: 'Buying a ticket is simple: \n1. Select your target lucky draw card on our website.\n2. Click the "Get Ticket via WhatsApp" button which generates a custom message.\n3. Send the message on WhatsApp (+92 321 9964022).\n4. Our support officer will send you dynamic payment details (JazzCash, EasyPaisa, or direct bank transfer).\n5. Send a screenshot of your payment receipt.\n6. Receive your unique digital ticket confirmation card with your lucky ticket number.',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: 'How are the winners selected?',
    answer: 'To ensure 100% transparency, winners are selected randomly via an integrated digital lucky balloting wheel or physically on live video stream broadcasts. The selection is completely automated and watched by live state supervisors on security frames. Every coupon has equal physical and numerical probability.',
    category: 'Selection'
  },
  {
    id: 'faq-3',
    question: 'Is the lucky draw live?',
    answer: 'Yes! All mega-draw sessions are broadcast live on our official social media channels, including Facebook Live, YouTube Live, and TikTok. We announce the exact schedule ahead of time on our homepage and via WhatsApp notifications to all participants.',
    category: 'General'
  },
  {
    id: 'faq-4',
    question: 'How will I receive my prize if I win?',
    answer: 'If you win, our executive team will contact you via phone audio call (+92 321 9964022) to verify your credentials. Vehicles (Cars, Bikes) can be collected physically from our central flagship hubs or delivered free of charge (with zero transport fee) to your verified home address in Pakistan. Phones and cash prizes are delivered within 48-72 hours.',
    category: 'Delivery'
  },
  {
    id: 'faq-5',
    question: 'What payment methods do you accept?',
    answer: 'We support all popular Pakistani cellular wallet options and banking applications for instant verification, including JazzCash, EasyPaisa, Nayapay, SadaPay, and major commercial banking apps (HBL, Alfalah, Allied Bank, Meezan Bank). Verification details are shared directly over WhatsApp.',
    category: 'Payment'
  }
];

export const GENERAL_STATS: AppStats = {
  participants: 54120,
  winners: 1240,
  carsGiven: 104,
  prizesValue: 120 // 120 Million PKR+
};
