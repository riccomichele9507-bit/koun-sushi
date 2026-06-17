"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UtensilsCrossed, ShoppingBag, Sparkles } from "lucide-react";
import { useCartCount } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

/** Barra di navigazione fissa in basso (mobile). Nascosta da md in su. */
export function BottomNav() {
  const pathname = usePathname();
  const count = useCartCount();
  const openCart = useUiStore((s) => s.openCart);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line/70 bg-background/90 backdrop-blur-xl md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3 items-center px-3 pb-[env(safe-area-inset-bottom)] pt-2">
        {/* Menu */}
        <Link
          href="/menu"
          className={cn(
            "flex flex-col items-center gap-1 py-2 text-[0.65rem] uppercase tracking-[0.12em] transition-colors",
            pathname === "/menu" ? "text-gold" : "text-muted",
          )}
        >
          <UtensilsCrossed className="h-5 w-5" />
          Menu
        </Link>

        {/* Ordina — sempre in shake */}
        <Link href="/checkout" className="flex justify-center">
          <span className="animate-shake flex flex-col items-center gap-1 rounded-2xl bg-gold px-5 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-background shadow-gold">
            <Sparkles className="h-5 w-5" />
            Ordina
          </span>
        </Link>

        {/* Carrello */}
        <button
          onClick={openCart}
          className="relative flex flex-col items-center gap-1 py-2 text-[0.65rem] uppercase tracking-[0.12em] text-muted transition-colors"
        >
          <span className="relative">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-2.5 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[0.6rem] font-semibold text-background">
                {count}
              </span>
            )}
          </span>
          Carrello
        </button>
      </div>
    </nav>
  );
}
