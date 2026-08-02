import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, FruitType } from '../types';
import { shopProducts, RETAIL_QTY_SOFT_CAP } from '../data/shopProducts';

const CART_STORAGE_KEY = 'sultanberry_cart_v1';

interface CartContextType {
  items: CartItem[];
  addToCart: (fruitType: FruitType, quantity?: number) => void;
  removeFromCart: (fruitType: FruitType) => void;
  setQuantity: (fruitType: FruitType, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const readInitialCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        item && typeof item.fruitType === 'string' && typeof item.quantity === 'number'
    );
  } catch {
    return [];
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(readInitialCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (fruitType: FruitType, quantity = 1) => {
    const product = shopProducts.find((p) => p.fruitType === fruitType);
    if (!product || !product.available) return;

    setItems((prev) => {
      const existing = prev.find((item) => item.fruitType === fruitType);
      if (existing) {
        const next = Math.min(existing.quantity + quantity, RETAIL_QTY_SOFT_CAP);
        return prev.map((item) =>
          item.fruitType === fruitType ? { ...item, quantity: next } : item
        );
      }
      return [...prev, { fruitType, quantity: Math.min(quantity, RETAIL_QTY_SOFT_CAP) }];
    });
  };

  const removeFromCart = (fruitType: FruitType) => {
    setItems((prev) => prev.filter((item) => item.fruitType !== fruitType));
  };

  const setQuantity = (fruitType: FruitType, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(fruitType);
      return;
    }
    const clamped = Math.min(quantity, RETAIL_QTY_SOFT_CAP);
    setItems((prev) =>
      prev.map((item) => (item.fruitType === fruitType ? { ...item, quantity: clamped } : item))
    );
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, setQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
