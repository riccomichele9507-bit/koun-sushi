"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useUiStore } from "@/store/ui-store";
import { useCartStore, useCartLines, useCartSubtotal } from "@/store/cart-store";
import { formatCents } from "@/lib/format";
import { computePromo } from "@/lib/promo/auto-promo";
import { buildOrderWhatsappLink } from "@/lib/whatsapp-order";
import { AddButton } from "@/components/menu/AddButton";
import { PromoProgress } from "@/components/cart/PromoProgress";

export function CartDrawer() {
  const open = useUiStore((s) => s.cartOpen);
  const close = useUiStore((s) => s.closeCart);
  const lines = useCartLines();
  const subtotal = useCartSubtotal();
  const clear = useCartStore((s) => s.clear);
  const remove = useCartStore((s) => s.remove);
  const promo = computePromo(subtotal);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col border-l border-line bg-background"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-display text-lg text-gold-gradient">Il tuo ordine</h2>
              <button
                onClick={close}
                aria-label="Chiudi"
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full border border-line bg-surface">
                  <ShoppingBag className="h-6 w-6 text-muted" />
                </div>
                <p className="text-muted">Il carrello è vuoto.</p>
                <Link
                  href="/menu"
                  onClick={close}
                  className="rounded-full border border-gold/50 px-5 py-2.5 text-sm uppercase tracking-[0.15em] text-gold transition-colors hover:bg-gold hover:text-background"
                >
                  Esplora il menu
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                  {lines.map((l) => (
                    <div
                      key={l.dish.id}
                      className="flex items-center gap-3 rounded-xl border border-line/60 bg-card/50 p-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">
                          {l.dish.name}
                        </p>
                        <p className="text-xs text-muted">
                          {formatCents(l.dish.price)} · cad.
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-gold">
                        {formatCents(l.lineTotal)}
                      </span>
                      <AddButton dishId={l.dish.id} />
                      <button
                        onClick={() => remove(l.dish.id)}
                        aria-label="Rimuovi piatto"
                        className="text-muted/60 transition-colors hover:text-spicy"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={clear}
                    className="mt-1 text-xs uppercase tracking-[0.15em] text-muted/70 hover:text-spicy"
                  >
                    Svuota carrello
                  </button>
                </div>

                <div className="space-y-4 border-t border-line bg-surface/40 px-5 py-5">
                  <PromoProgress subtotal={subtotal} />

                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-muted">
                      <span>Subtotale</span>
                      <span>{formatCents(subtotal)}</span>
                    </div>
                    {promo.tier && (
                      <div className="flex justify-between text-gold">
                        <span>Sconto -{promo.percent}%</span>
                        <span>-{formatCents(promo.discountCents)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between border-t border-line pt-2 font-display text-lg text-foreground">
                      <span>Totale</span>
                      <span className="text-gold">{formatCents(promo.totalCents)}</span>
                    </div>
                    {promo.tier && (
                      <p className="pt-1 text-right text-xs text-gold/80">
                        + {promo.tier.gift} 🎁
                      </p>
                    )}
                  </div>

                  <a
                    href={buildOrderWhatsappLink(lines)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--wa)] py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-background transition-transform active:scale-[0.98]"
                  >
                    Ordina su WhatsApp
                  </a>
                  <p className="text-center text-[0.65rem] text-muted/70">
                    L&apos;ordine verrà confermato in chat. Prezzi salvo errori; coperto € 2,00 in sede.
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
