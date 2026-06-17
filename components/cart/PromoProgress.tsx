"use client";

import { Gift } from "lucide-react";
import { formatCents } from "@/lib/format";
import { computePromo, PROMO } from "@/lib/promo/auto-promo";

export function PromoProgress({ subtotal }: { subtotal: number }) {
  const promo = computePromo(subtotal);
  if (promo.expired || !PROMO.active) return null;

  const maxCents = PROMO.tiers[PROMO.tiers.length - 1].minCents;
  const pct = Math.min(100, Math.round((subtotal / maxCents) * 100));

  return (
    <div className="rounded-2xl border border-gold/25 bg-gold/[0.06] p-4">
      <div className="flex items-center gap-2 text-sm">
        <Gift className="h-4 w-4 text-gold" />
        {promo.tier ? (
          <span className="font-medium text-foreground">
            Sconto <span className="text-gold">-{promo.percent}%</span> attivo · {promo.tier.gift}
          </span>
        ) : promo.nextTier ? (
          <span className="text-muted">
            Ti mancano{" "}
            <span className="font-semibold text-gold">{formatCents(promo.toNextCents)}</span> per{" "}
            <span className="text-foreground">-{promo.nextTier.percent}%</span> +{" "}
            {promo.nextTier.gift.toLowerCase()}
          </span>
        ) : null}
      </div>

      <div className="relative mt-3 h-2 overflow-hidden rounded-full bg-surface-2">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-bright transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
        {PROMO.tiers.map((t) => {
          const pos = Math.min(100, (t.minCents / maxCents) * 100);
          const reached = subtotal >= t.minCents;
          return (
            <span
              key={t.minCents}
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
              style={{
                left: `${pos}%`,
                background: reached ? "var(--gold-bright)" : "var(--surface)",
                borderColor: reached ? "var(--gold-bright)" : "var(--line)",
              }}
            />
          );
        })}
      </div>

      <div className="mt-2 flex justify-between text-[0.65rem] uppercase tracking-wider text-muted">
        {PROMO.tiers.map((t) => (
          <span key={t.minCents} className={subtotal >= t.minCents ? "text-gold" : ""}>
            {formatCents(t.minCents)} · {t.giftShort}
          </span>
        ))}
      </div>
    </div>
  );
}
