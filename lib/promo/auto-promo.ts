/**
 * Promo asporto Koun Sushi — valida fino al 13/09/2026.
 * Sconto a soglie sull'INTERO ordine (valutato sul subtotale pieno).
 *   ≥ €100  → -50% + birra in omaggio
 *   ≥ €200  → -50% + bottiglia di vino in omaggio
 */
export interface PromoTier {
  minCents: number;
  percent: number;
  gift: string;
  giftShort: string;
}

export const PROMO = {
  active: true,
  validUntil: "2026-09-13",
  validUntilLabel: "13 settembre 2026",
  takeawayOnly: true,
  tiers: [
    { minCents: 10000, percent: 50, gift: "Birra in omaggio", giftShort: "🍺 Birra omaggio" },
    { minCents: 20000, percent: 50, gift: "Bottiglia di vino in omaggio", giftShort: "🍷 Vino omaggio" },
  ] as PromoTier[],
} as const;

export interface PromoResult {
  /** Sconto applicabile (cent). */
  discountCents: number;
  /** Percentuale sconto attiva (0 se nessuna soglia raggiunta). */
  percent: number;
  /** Tier raggiunto, o null. */
  tier: PromoTier | null;
  /** Prossimo tier non ancora raggiunto, o null se al massimo. */
  nextTier: PromoTier | null;
  /** Cent mancanti al prossimo tier (0 se nessuno). */
  toNextCents: number;
  /** Totale finale dopo sconto (cent). */
  totalCents: number;
  /** Promo scaduta? */
  expired: boolean;
}

function isExpired(now = new Date()): boolean {
  const end = new Date(`${PROMO.validUntil}T23:59:59`);
  return now > end;
}

/** Calcola sconto/omaggio in base al subtotale (cent). */
export function computePromo(subtotalCents: number, now = new Date()): PromoResult {
  const expired = isExpired(now);
  const sorted = [...PROMO.tiers].sort((a, b) => a.minCents - b.minCents);

  let tier: PromoTier | null = null;
  if (PROMO.active && !expired) {
    for (const t of sorted) {
      if (subtotalCents >= t.minCents) tier = t;
    }
  }

  const nextTier = sorted.find((t) => subtotalCents < t.minCents) ?? null;
  const toNextCents = nextTier ? nextTier.minCents - subtotalCents : 0;

  const percent = tier?.percent ?? 0;
  const discountCents = Math.round((subtotalCents * percent) / 100);

  return {
    discountCents,
    percent,
    tier,
    nextTier: expired ? null : nextTier,
    toNextCents,
    totalCents: subtotalCents - discountCents,
    expired,
  };
}
