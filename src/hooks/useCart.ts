import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Database } from '@/lib/types';

type App = Database['public']['Tables']['apps']['Row'];

interface CartItem {
  app: App;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (app: App) => void;
  removeItem: (appId: string) => void;
  updateQuantity: (appId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (app: App) => {
        const items = get().items;
        const existingItem = items.find(item => item.app.id === app.id);
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.app.id === app.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { app, quantity: 1 }],
          });
        }
      },
      
      removeItem: (appId: string) => {
        set({
          items: get().items.filter(item => item.app.id !== appId),
        });
      },
      
      updateQuantity: (appId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(appId);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.app.id === appId ? { ...item, quantity } : item
          ),
        });
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.app.price * item.quantity),
          0
        );
      },
      
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);