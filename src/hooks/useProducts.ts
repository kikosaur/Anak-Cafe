import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/database';
import toast from 'react-hot-toast';

type Product = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductUpdate = Database['public']['Tables']['products']['Update'];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (product: ProductInsert) => {
    // Sanitize fields for Supabase
    const sanitizedProduct: ProductInsert = {
      name: product.name,
      category: product.category,
      price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
      description: product.description === '' ? null : product.description,
      image_url: product.image_url === '' ? null : product.image_url,
      featured: product.featured ?? false,
      in_stock: product.in_stock ?? true,
    };
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([sanitizedProduct])
        .select()
        .single();

      if (error) {
        console.error('Supabase insert error:', error, 'Product:', sanitizedProduct);
        toast.error(`Failed to create product: ${error.message || error}`);
        setError(error.message || 'Unknown error');
        throw error;
      }
      setProducts(prev => [data, ...prev]);
      toast.success('Product created successfully');
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error(`Failed to create product: ${err instanceof Error ? err.message : err}`);
      throw err;
    }
  };

  const updateProduct = async (id: string, updates: ProductUpdate) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setProducts(prev => prev.map(p => p.id === id ? data : p));
      toast.success('Product updated successfully');
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error('Failed to update product');
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Product deleted successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error('Failed to delete product');
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    refreshProducts: fetchProducts
  };
};