import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

export type OrderItemInsert = Database['public']['Tables']['order_items']['Insert'];
export type OrderItemRow = Database['public']['Tables']['order_items']['Row'];

// Create multiple order items for a given order
export const createOrderItems = async (items: OrderItemInsert[]): Promise<OrderItemRow[] | null> => {
  const { data, error } = await supabase
    .from('order_items')
    .insert(items)
    .select();
  if (error) {
    console.error('Error creating order items:', error);
    console.log('Payload sent to order_items:', items);
    return null;
  }
  return data;
};
