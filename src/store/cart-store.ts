import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IProducto } from "../services/productos";
import { KEY_STORAGE } from "../constants/key-storage";

interface CartItem extends IProducto {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: IProducto) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },

      removeItem: (productId) => set({ items: get().items.filter((i) => i.id !== productId) }),

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) return get().removeItem(productId);
        set({
          items: get().items.map((i) => (i.id === productId ? { ...i, quantity } : i))
        });
      },

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        return get().items.reduce((acc, item) => {
          const precio = item.tiene_descuento && item.precio_promocional ? item.precio_promocional : item.precio_normal;
          return acc + precio * item.quantity;
        }, 0);
      }
    }),
    { name: KEY_STORAGE.CARRITO }
  )
);
