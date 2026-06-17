"use client";

import { Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore, useDishQuantity } from "@/store/cart-store";
import { cn } from "@/lib/utils";

export function AddButton({ dishId, className }: { dishId: string; className?: string }) {
  const qty = useDishQuantity(dishId);
  const add = useCartStore((s) => s.add);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);

  if (qty === 0) {
    return (
      <button
        onClick={() => add(dishId)}
        aria-label="Aggiungi al carrello"
        className={cn(
          "grid h-9 w-9 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold transition-all hover:bg-gold hover:text-background active:scale-90",
          className,
        )}
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
      </button>
    );
  }

  return (
    <div
      className={cn(
        "flex h-9 items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-1",
        className,
      )}
    >
      <button
        onClick={() => decrement(dishId)}
        aria-label="Rimuovi uno"
        className="grid h-7 w-7 place-items-center rounded-full text-gold transition-colors hover:bg-gold/20 active:scale-90"
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
      </button>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={qty}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="w-5 text-center text-sm font-semibold text-gold"
        >
          {qty}
        </motion.span>
      </AnimatePresence>
      <button
        onClick={() => increment(dishId)}
        aria-label="Aggiungi uno"
        className="grid h-7 w-7 place-items-center rounded-full text-gold transition-colors hover:bg-gold/20 active:scale-90"
      >
        <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
      </button>
    </div>
  );
}
