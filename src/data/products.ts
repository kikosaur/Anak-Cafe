import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

export type Product = Database['public']['Tables']['products']['Row'];

// --- LIVE CRUD FUNCTIONS FOR SUPABASE ---

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

// Get products by category
export const getProductsByCategory = async (category: string): Promise<Product[]> => {
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

// Search products by name
export const searchProducts = async (query: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('name', `%${query}%`);
  if (error) {
    console.error('Error searching products:', error);
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
export const updateProduct = async (id: string | number, updates: Partial<Product>): Promise<Product | null> => {
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
export const deleteProduct = async (id: string | number): Promise<boolean> => {
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

// Get a single product by ID
export const getProductById = async (id: string | number): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    console.error('Error fetching product by id:', error);
    return null;
  }
  return data;
};

// Get featured products
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