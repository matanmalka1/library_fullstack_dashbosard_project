
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Book } from '../types';
import { useAuth } from './AuthContext';
import { api } from '../services/api';

interface CartContextType {
  items: CartItem[];
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (user) {
      setItems(api.getCart(user.id));
    } else {
      setItems([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      api.saveCart(user.id, items);
    }
  }, [items, user]);

  const addToCart = (book: Book, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.bookId === book.id);
      if (existing) {
        return prev.map(i => i.bookId === book.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { bookId: book.id, quantity, book }];
    });
  };

  const removeFromCart = (bookId: string) => {
    setItems(prev => prev.filter(i => i.bookId !== bookId));
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => prev.map(i => i.bookId === bookId ? { ...i, quantity } : i));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + (item.book.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
