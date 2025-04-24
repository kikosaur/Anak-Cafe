import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type Product = Database['public']['Tables']['products']['Row'];

// Sample static products array for fallback or static usage
export const products = [
  {
    id: 1,
    name: 'Espresso',
    category: 'Coffee',
    price: 3.5,
    description: 'Classic espresso shot.',
    image_url: '/images/espresso.jpg',
    created_at: '2025-04-24T00:00:00Z',
  },
  {
    id: 2,
    name: 'Cappuccino',
    category: 'Coffee',
    price: 4.0,
    description: 'Espresso with steamed milk and foam.',
    image_url: '/images/cappuccino.jpg',
    created_at: '2025-04-24T00:00:00Z',
  },
  {
    id: 3,
    name: 'Iced Latte',
    category: 'Cold Drinks',
    price: 4.5,
    description: 'Espresso with cold milk and ice.',
    image_url: '/images/iced-latte.jpg',
    created_at: '2025-04-24T00:00:00Z',
  },
];

// Example fallback implementations for getProductsByCategory and searchProducts
export function getProductsByCategory(category: string) {
  return products.filter(p => p.category === category);
}

export function searchProducts(query: string) {
  return products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
}

// Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    console.error('Error fetching all products:', error);
    return [];
  }

  return data || [];
};

// Create a new product
export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();

  if (error) {
    console.error('Error creating product:', error);
    return null;
  }

  return data;
};

// Update a product
export const updateProduct = async (id: number, updates: Partial<Product>): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    return null;
  }

  return data;
};

// Delete a product
export const deleteProduct = async (id: number): Promise<boolean> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    return false;
  }

  return true;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true);

  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }

  return data || [];
};

export const getProductsByCategoryAsync = async (category: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category);

  if (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }

  return data || [];
};

export const searchProductsAsync = async (query: string): Promise<Product[]> => {
  const lowercaseQuery = query.toLowerCase();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${lowercaseQuery}%,description.ilike.%${lowercaseQuery}%`);

  if (error) {
    console.error('Error searching products:', error);
    return [];
  }

  return data || [];
};