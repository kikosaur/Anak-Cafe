import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

export type OrderInsert = Database['public']['Tables']['orders']['Insert'];
export type OrderRow = Database['public']['Tables']['orders']['Row'];

// Create a new order
export const createOrder = async (order: OrderInsert): Promise<OrderRow | null> => {
  const { data, error } = await supabase
    .from('orders')
    .insert([order])
    .select()
    .single();
  if (error) {
    console.error('Error creating order:', error);
    return null;
  }
  return data;
};

// Get all orders for a user
export const getOrdersByUser = async (userId: string): Promise<OrderRow[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
  return data || [];
};

// Get all orders (admin)
export const getAllOrders = async (): Promise<OrderRow[]> => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching all orders:', error);
    return [];
  }
  return data || [];
};

// Update order status
export const updateOrderStatus = async (orderId: string, status: string): Promise<OrderRow | null> => {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single();
  if (error) {
    console.error('Error updating order status:', error);
    return null;
  }
  return data;
};

// Fetch all orders for a user, each with its items
export const getOrdersWithItemsByUser = async (userId: string) => {
  // Fetch orders for the user
  const { data: orders, error: ordersError } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (ordersError || !orders) {
    console.error('Error fetching user orders:', ordersError);
    return [];
  }
  // For each order, fetch its items
  const orderIds = orders.map(o => o.id);
  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select('*')
    .in('order_id', orderIds);
  if (itemsError) {
    console.error('Error fetching order items:', itemsError);
    return orders.map(order => ({ ...order, items: [] }));
  }
  // Attach items to their respective orders
  return orders.map(order => ({
    ...order,
    items: items.filter(item => item.order_id === order.id)
  }));
};
