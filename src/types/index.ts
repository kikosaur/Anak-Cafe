export interface Product {
  id: string; // Changed from number to string for Supabase UUID
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  image_url?: string;
  featured: boolean;
  inStock: boolean;
}

export type CupSize = 'small' | 'medium' | 'large';

export interface CartItem {
  product: Product;
  quantity: number;
  size: CupSize;
}

export interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  paymentMethod: 'credit_card' | 'paypal' | 'gcash';
}

export type PaymentMethod = 'credit_card' | 'paypal' | 'gcash';