import Link from "next/link";
import { Gift, ArrowRight } from "lucide-react";
import { PROMO } from "@/lib/promo/auto-promo";
import { formatCents } from "@/lib/format";

export function PromoBanner() {
  if (!PROMO.active) return null;
  return (
    <Link href="/promo" className="group block">
      <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/[0.12] via-surface to-background p-6 sm:p-8">
        <div className="bg-grain pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-background/50 px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-gold">
              <Gift className="h-3.5 w-3.5" /> Promo asporto
            </span>
            <h2 className="mt-3 font-display text-2xl text-foreground sm:text-3xl">
              Fino a <span className="text-gold-gradient">−50%</span> + omaggio
            </h2>
            <div className="mt-3 space-y-1 text-sm text-muted">
              {PROMO.tiers.map((t) => (
                <p key={t.minCents} className="flex items-center gap-2">
                  <span className="font-semibold text-gold">{formatCents(t.minCents)}</span>
                  → −{t.percent}% e {t.gift.toLowerCase()}
                </p>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted/70">
              Valida fino al {PROMO.validUntilLabel} · solo asporto
            </p>
          </div>
          <span className="flex items-center gap-2 self-start rounded-full border border-gold/40 px-5 py-3 text-sm uppercase tracking-[0.15em] text-gold transition-all group-hover:gap-3 group-hover:bg-gold group-hover:text-background sm:self-auto">
            Scopri <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
