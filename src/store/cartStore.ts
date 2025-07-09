import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartStore } from '@/types';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id);
          
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          }
          
          return {
            items: [...state.items, { id: product.id, quantity, product }]
          };
        });
      },
      
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId)
        }));
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        set((state) => ({
          items: state.items.map(item =>
            item.id === productId
              ? { ...item, quantity }
              : item
          )
        }));
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.price * item.quantity),
          0
        );
      },
      
      getTotal: () => {
        const subtotal = get().getSubtotal();
        const tax = subtotal * 0.08;
        const shipping = subtotal > 100 ? 0 : 9.99;
        return subtotal + tax + shipping;
      },
      navigating: false,
      setNavigating: (navigating:boolean)=> {
        set({navigating:navigating})
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);
