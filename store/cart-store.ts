"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useMemo } from "react";
import { getDish } from "@/data/menu";
import type { Dish } from "@/types/dish";

export interface CartItem {
  dishId: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  hydrated: boolean;
  add: (dishId: string) => void;
  increment: (dishId: string) => void;
  decrement: (dishId: string) => void;
  remove: (dishId: string) => void;
  clear: () => void;
  setHydrated: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      hydrated: false,
      add: (dishId) =>
        set((s) => {
          const existing = s.items.find((i) => i.dishId === dishId);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.dishId === dishId ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }
          return { items: [...s.items, { dishId, quantity: 1 }] };
        }),
      increment: (dishId) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.dishId === dishId ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        })),
      decrement: (dishId) =>
        set((s) => ({
          items: s.items
            .map((i) =>
              i.dishId === dishId ? { ...i, quantity: i.quantity - 1 } : i,
            )
            .filter((i) => i.quantity > 0),
        })),
      remove: (dishId) =>
        set((s) => ({ items: s.items.filter((i) => i.dishId !== dishId) })),
      clear: () => set({ items: [] }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "koun-cart",
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    },
  ),
);

export interface CartLine {
  dish: Dish;
  quantity: number;
  lineTotal: number;
}

/** Righe carrello arricchite col piatto. */
export function useCartLines(): CartLine[] {
  const items = useCartStore((s) => s.items);
  return useMemo(
    () =>
      items
        .map((i) => {
          const dish = getDish(i.dishId);
          if (!dish) return null;
          return { dish, quantity: i.quantity, lineTotal: dish.price * i.quantity };
        })
        .filter((x): x is CartLine => x !== null),
    [items],
  );
}

export function useCartCount(): number {
  const items = useCartStore((s) => s.items);
  return useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
}

export function useCartSubtotal(): number {
  const lines = useCartLines();
  return useMemo(() => lines.reduce((sum, l) => sum + l.lineTotal, 0), [lines]);
}

export function useDishQuantity(dishId: string): number {
  return useCartStore((s) => s.items.find((i) => i.dishId === dishId)?.quantity ?? 0);
}
