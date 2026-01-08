
export type CategoryType = 'Travel' | 'School' | 'Handbags' | 'Fancy';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: CategoryType;
  image: string;
  images: string[];
  description: string;
  material: string;
  colors: string[];
  dimensions: string;
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isTrending?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Returned';
  items: {
    name: string;
    image: string;
    quantity: number;
  }[];
}

export interface UserProfile {
  name: string;
  email: string;
  memberSince: string;
  avatar: string;
}
