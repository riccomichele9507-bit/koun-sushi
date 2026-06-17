import { restaurant } from "@/data/restaurant";
import { computePromo } from "@/lib/promo/auto-promo";
import { applyDiscountCode } from "@/lib/promo/discount-codes";

export type OrderMode = "pickup" | "delivery";
export type PaymentMethod = "card" | "cash";

export interface OrderTotals {
  subtotal: number;
  /** Sconto promo automatica a soglie. */
  promoCents: number;
  promoPercent: number;
  promoGift: string | null;
  /** Sconto da codice (0 se non applicabile o se promo tier attiva). */
  codeCents: number;
  codeBlockedByPromo: boolean;
  deliveryFee: number;
  tip: number;
  total: number;
  /** Ordine sotto il minimo consegna? */
  belowDeliveryMin: boolean;
  deliveryMinCents: number;
}

export function computeOrderTotals(opts: {
  subtotal: number;
  mode: OrderMode;
  codeInput?: string;
  tipCents?: number;
}): OrderTotals {
  const { subtotal, mode } = opts;
  const tip = Math.max(0, opts.tipCents ?? 0);

  const promo = computePromo(subtotal);
  const promoCents = promo.discountCents;

  // Codice non cumulabile con la promo automatica a soglie
  const codeRes = applyDiscountCode(opts.codeInput ?? "", subtotal);
  const codeBlockedByPromo = !!promo.tier && codeRes.ok;
  const codeCents = promo.tier ? 0 : codeRes.discountCents;

  const deliveryFee =
    mode === "delivery"
      ? restaurant.delivery.freeAboveCents > 0 &&
        subtotal >= restaurant.delivery.freeAboveCents
        ? 0
        : restaurant.delivery.feeCents
      : 0;

  const deliveryMinCents = restaurant.delivery.minOrderCents;
  const belowDeliveryMin = mode === "delivery" && subtotal < deliveryMinCents;

  const total = Math.max(0, subtotal - promoCents - codeCents) + deliveryFee + tip;

  return {
    subtotal,
    promoCents,
    promoPercent: promo.percent,
    promoGift: promo.tier?.gift ?? null,
    codeCents,
    codeBlockedByPromo,
    deliveryFee,
    tip,
    total,
    belowDeliveryMin,
    deliveryMinCents,
  };
}

/**
 * Genera le fasce orarie disponibili in base agli orari di apertura
 * (12:30–15:00 e 19:30–24:00), a passi di 15 minuti.
 * `now` solo per filtrare gli slot già passati nella sessione corrente.
 */
export function buildTimeSlots(now = new Date()): string[] {
  const ranges: Array<[number, number, number, number]> = [
    [12, 30, 15, 0],
    [19, 30, 24, 0],
  ];
  const slots: string[] = [];
  const nowMin = now.getHours() * 60 + now.getMinutes();

  for (const [sh, sm, eh, em] of ranges) {
    let t = sh * 60 + sm;
    const end = eh * 60 + em;
    while (t <= end) {
      if (t > nowMin + 20) {
        const h = Math.floor(t / 60) % 24;
        const m = t % 60;
        slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      }
      t += 15;
    }
  }
  return slots;
}
