import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  
  // Getters
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, quantity = 1, size?: string, color?: string) => {
        set((state: CartState) => {
          const existingItem = state.items.find(
            (item: CartItem) => 
              item.product.id === product.id && 
              item.size === size && 
              item.color === color
          );

          if (existingItem) {
            return {
              items: state.items.map((item: CartItem) =>
                item.product.id === product.id && 
                item.size === size && 
                item.color === color
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity, size, color }],
          };
        });
      },

      removeItem: (productId: string) => {
        set((state: CartState) => ({
          items: state.items.filter((item: CartItem) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state: CartState) => ({
          items: state.items.map((item: CartItem) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state: CartState) => ({ isOpen: !state.isOpen })),

      setCartOpen: (open: boolean) => set({ isOpen: open }),

      getTotalItems: () => {
        return get().items.reduce((total: number, item: CartItem) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total: number, item: CartItem) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'printed-blinds-cart',
      partialize: (state: CartState) => ({ items: state.items }),
    }
  )
);
