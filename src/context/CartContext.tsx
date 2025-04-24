import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, CupSize } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, size: CupSize) => void;
  removeFromCart: (productId: string, size: CupSize) => void;
  updateQuantity: (productId: string, quantity: number, size: CupSize) => void;
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
    // Ensure product.id is always a string
    const patchedProduct = {
      ...product,
      id: typeof product.id === 'number' ? String(product.id) : product.id,
    };
    // Accept valid UUIDs (36 characters, with hyphens)
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(patchedProduct.id);
    if (!patchedProduct.id || !isUuid) {
      console.warn('Blocked adding product with non-UUID id to cart:', patchedProduct.id);
      return;
    }
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === patchedProduct.id && item.size === size);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.product.id === patchedProduct.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        return [...prevItems, { product: patchedProduct, quantity, size }];
      }
    });
  };

  const removeFromCart = (productId: string, size: CupSize) => {
    setItems(prevItems => prevItems.filter(item => !(item.product.id === productId && item.size === size)));
  };

  const updateQuantity = (productId: string, quantity: number, size: CupSize) => {
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