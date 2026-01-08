
import { Product, Review, Order, UserProfile } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Horizon Weekender',
    price: 295,
    category: 'Travel',
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1473187983305-f615310e7daa?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'The ultimate travel companion for your short escapes. Crafted from premium full-grain leather with water-resistant lining.',
    material: 'Full-grain Leather',
    colors: ['Charcoal', 'Tan', 'Navy'],
    dimensions: '20" x 12" x 10"',
    rating: 4.8,
    reviewsCount: 124,
    isTrending: true
  },
  {
    id: '2',
    name: 'Academic Pro Backpack',
    price: 89,
    category: 'School',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1577733966973-d680bfee2e99?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Designed for the modern student. Features a 16" laptop sleeve and ergonomic shoulder straps for all-day comfort.',
    material: 'Durable Polyester',
    colors: ['Black', 'Grey', 'Forest Green'],
    dimensions: '18" x 12" x 6"',
    rating: 4.5,
    reviewsCount: 340,
    isNew: true
  },
  {
    id: '3',
    name: 'Seraphina Tote',
    price: 450,
    category: 'Handbags',
    image: 'https://images.unsplash.com/photo-1584917033904-491a84b2efbd?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1584917033904-491a84b2efbd?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Elegant and spacious. The Seraphina Tote is your perfect daily work horse with a touch of luxury.',
    material: 'Saffiano Leather',
    colors: ['Cream', 'Black', 'Wine'],
    dimensions: '14" x 11" x 5"',
    rating: 4.9,
    reviewsCount: 88,
    isTrending: true
  },
  {
    id: '4',
    name: 'Midnight Gala Clutch',
    price: 180,
    category: 'Fancy',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fd15dcb4?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fd15dcb4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'A statement piece for your most glamorous evenings. Adorned with subtle gold accents.',
    material: 'Velvet & Silk',
    colors: ['Emerald', 'Ruby', 'Obsidian'],
    dimensions: '8" x 5" x 2"',
    rating: 4.7,
    reviewsCount: 45,
    isNew: true
  },
  {
    id: '5',
    name: 'Atlas Rolling Suitcase',
    price: 350,
    category: 'Travel',
    image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Durable hardshell exterior with 360-degree silent spinner wheels.',
    material: 'Polycarbonate',
    colors: ['Silver', 'Rose Gold', 'Matte Black'],
    dimensions: '22" x 14" x 9"',
    rating: 4.6,
    reviewsCount: 210
  },
  {
    id: '6',
    name: 'Luxe Crossbody',
    price: 220,
    category: 'Handbags',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Minimalist crossbody bag for hands-free convenience without sacrificing style.',
    material: 'Calf Leather',
    colors: ['Oatmeal', 'Camel', 'Black'],
    dimensions: '9" x 6" x 3"',
    rating: 4.8,
    reviewsCount: 156
  },
  {
    id: '7',
    name: 'Nomad Duffle',
    price: 240,
    category: 'Travel',
    image: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1553913861-c0fddf2619ee?auto=format&fit=crop&q=80&w=800'],
    description: 'Heavy-duty waxed canvas duffle with leather trim. Built for the rugged explorer.',
    material: 'Waxed Canvas',
    colors: ['Olive', 'Earth', 'Black'],
    dimensions: '22" x 11" x 11"',
    rating: 4.7,
    reviewsCount: 92
  },
  {
    id: '8',
    name: 'Scholar Satchel',
    price: 150,
    category: 'School',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'],
    description: 'Classic heritage satchel for the academic traditionalist. Handmade in our Paris atelier.',
    material: 'Genuine Leather',
    colors: ['Brandy', 'Chocolate'],
    dimensions: '15" x 11" x 4"',
    rating: 4.9,
    reviewsCount: 64,
    isTrending: true
  },
  {
    id: '9',
    name: 'Campus Tech Case',
    price: 65,
    category: 'School',
    image: 'https://images.unsplash.com/photo-1546938574-196b0eb754a0?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1546938574-196b0eb754a0?auto=format&fit=crop&q=80&w=800'],
    description: 'A minimalist sleeve for your digital essentials. Water-resistant and shock-absorbent.',
    material: 'Neoprene & Nylon',
    colors: ['Stealth Black', 'Navy'],
    dimensions: '14" x 10" x 1"',
    rating: 4.4,
    reviewsCount: 120,
    isNew: true
  },
  {
    id: '10',
    name: 'Artisan Bucket Bag',
    price: 320,
    category: 'Handbags',
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=800'],
    description: 'A structural masterpiece. The Artisan Bucket Bag offers a unique silhouette with maximum utility.',
    material: 'Pebbled Leather',
    colors: ['Ochre', 'Black'],
    dimensions: '12" x 10" x 6"',
    rating: 4.7,
    reviewsCount: 42
  },
  {
    id: '11',
    name: 'Versailles Evening Bag',
    price: 550,
    category: 'Fancy',
    image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=800'],
    description: 'Heirloom quality. Hand-beaded with Austrian crystals for a shimmer that commands attention.',
    material: 'Satin & Crystals',
    colors: ['Pearl White', 'Gold'],
    dimensions: '7" x 5" x 2"',
    rating: 5.0,
    reviewsCount: 18,
    isTrending: true
  },
  {
    id: '12',
    name: 'Opera Crystal Clutch',
    price: 420,
    category: 'Fancy',
    image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=800'],
    description: 'Minimalist geometry meets luxury shine. The perfect accessory for the opera or gala.',
    material: 'Patent Leather',
    colors: ['Deep Red', 'Black'],
    dimensions: '9" x 4" x 2"',
    rating: 4.8,
    reviewsCount: 31
  },
  {
    id: '13',
    name: 'Expedition Trunk',
    price: 480,
    category: 'Travel',
    image: 'https://images.unsplash.com/photo-1581553670339-491a84b2efbd?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1581553670339-491a84b2efbd?auto=format&fit=crop&q=80&w=800'],
    description: 'A vintage-inspired trunk for the heavy traveller. Hand-stitched corner reinforcements and gold hardware.',
    material: 'Hardwood & Leather',
    colors: ['Cognac', 'Hunter Green'],
    dimensions: '28" x 18" x 10"',
    rating: 4.9,
    reviewsCount: 22,
    isNew: true
  },
  {
    id: '14',
    name: 'Thesis Satchel',
    price: 195,
    category: 'School',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800'],
    description: 'The definitive messenger for the intellectual explorer. Fits a 15" device and your entire library.',
    material: 'English Bridle Leather',
    colors: ['Oxblood', 'Ebony'],
    dimensions: '16" x 12" x 4"',
    rating: 4.8,
    reviewsCount: 41
  },
  {
    id: '15',
    name: 'Gala Pouchette',
    price: 210,
    category: 'Handbags',
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800'],
    description: 'Small but mighty. The Gala Pouchette transitions from day-time errands to evening dinners with ease.',
    material: 'Soft Nappa Leather',
    colors: ['Lilac', 'Cream', 'Black'],
    dimensions: '8" x 6" x 2"',
    rating: 4.6,
    reviewsCount: 56,
    isTrending: true
  },
  {
    id: '16',
    name: 'Celestial Clutch',
    price: 380,
    category: 'Fancy',
    image: 'https://images.unsplash.com/photo-1473187983305-f615310e7daa?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1473187983305-f615310e7daa?auto=format&fit=crop&q=80&w=800'],
    description: 'Designed to capture the starlight. A sculptural evening bag with a hidden magnetic closure.',
    material: 'Metallic Calfskin',
    colors: ['Silver', 'Gunmetal'],
    dimensions: '10" x 5" x 2"',
    rating: 4.9,
    reviewsCount: 14,
    isNew: true
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    user: 'Sarah Jenkins',
    rating: 5,
    comment: 'Absolutely stunning quality. The leather feels so premium!',
    date: 'Oct 12, 2023',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: 'r2',
    user: 'Michael Ross',
    rating: 4,
    comment: 'Great bag, fits everything I need for a weekend trip.',
    date: 'Nov 05, 2023',
    avatar: 'https://i.pravatar.cc/150?u=michael'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-2025-X81',
    date: 'Feb 15, 2025',
    total: 295,
    status: 'Delivered',
    items: [
      {
        name: 'Horizon Weekender',
        image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=400',
        quantity: 1
      }
    ]
  },
  {
    id: 'ORD-2025-Y92',
    date: 'Mar 01, 2025',
    total: 180,
    status: 'Processing',
    items: [
      {
        name: 'Midnight Gala Clutch',
        image: 'https://images.unsplash.com/photo-1566150905458-1bf1fd15dcb4?auto=format&fit=crop&q=80&w=400',
        quantity: 1
      }
    ]
  }
];

export const MOCK_USER: UserProfile = {
  name: 'Julian Vane',
  email: 'julian.vane@lumiere.paris',
  memberSince: 'October 2024',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
};
