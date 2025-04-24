import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, CupSize } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, size: CupSize) => void;
  removeFromCart: (productId: number, size: CupSize) => void;
  updateQuantity: (productId: number, quantity: number, size: CupSize) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number, size: CupSize) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id && item.size === size);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prevItems, { product, quantity, size }];
      }
    });
  };

  const removeFromCart = (productId: number, size: CupSize) => {
    setItems(prevItems => prevItems.filter(item => !(item.product.id === productId && item.size === size)));
  };

  const updateQuantity = (productId: number, quantity: number, size: CupSize) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId && item.size === size
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getCartTotal = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      getCartTotal,
      getCartItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};