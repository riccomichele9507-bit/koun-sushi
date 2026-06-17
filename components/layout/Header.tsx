"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCartCount } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/promo", label: "Promo" },
  { href: "/allergeni", label: "Allergeni" },
];

export function Header() {
  const pathname = usePathname();
  const count = useCartCount();
  const openCart = useUiStore((s) => s.openCart);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold tracking-wide text-gold-gradient">
            Kōun
          </span>
          <span className="text-[0.6rem] uppercase tracking-[0.45em] text-muted">
            Sushi
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm uppercase tracking-[0.18em] transition-colors",
                  active ? "text-gold" : "text-muted hover:text-foreground",
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-gold" />
                )}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={openCart}
          aria-label="Apri carrello"
          className="relative grid h-10 w-10 place-items-center rounded-full border border-line bg-surface/80 text-gold transition-colors hover:border-gold/60"
        >
          <ShoppingBag className="h-[1.15rem] w-[1.15rem]" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[0.65rem] font-semibold text-background">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
