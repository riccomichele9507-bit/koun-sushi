import type { Metadata } from "next";
import Link from "next/link";
import { Gift, Check, Beer, Wine } from "lucide-react";
import { PROMO } from "@/lib/promo/auto-promo";
import { formatCents } from "@/lib/format";

export const metadata: Metadata = {
  title: "Promo Asporto · Koun Sushi",
  description:
    "Promo asporto Koun Sushi: spendi €100 e ottieni −50% + birra omaggio, spendi €200 per −50% + bottiglia di vino. Valida fino al 13 settembre 2026.",
};

const tierIcons = [Beer, Wine];

export default function PromoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.25em] text-gold">
        <Gift className="h-3.5 w-3.5" /> Solo asporto
      </span>
      <h1 className="mt-4 font-display text-4xl text-foreground sm:text-6xl">
        Più ordini, <span className="text-gold-gradient">più risparmi</span>
      </h1>
      <p className="mt-4 max-w-xl text-sm text-muted">
        Lo sconto si applica automaticamente sull&apos;intero ordine al raggiungimento della soglia.
        Valida fino al <span className="text-gold">{PROMO.validUntilLabel}</span>, esclusivamente
        sugli ordini d&apos;asporto.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {PROMO.tiers.map((t, i) => {
          const Icon = tierIcons[i] ?? Gift;
          return (
            <div
              key={t.minCents}
              className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/[0.1] via-card to-background p-7"
            >
              <div className="bg-grain pointer-events-none absolute inset-0 opacity-50" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-[0.65rem] uppercase tracking-[0.3em] text-muted">
                    Spesa minima
                  </span>
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <p className="mt-2 font-display text-4xl text-foreground">
                  {formatCents(t.minCents)}
                </p>
                <p className="mt-4 font-display text-2xl text-gold-gradient">−{t.percent}%</p>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gold" /> Sconto del {t.percent}% sull&apos;ordine
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-gold" /> {t.gift}
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-line/70 bg-surface/40 p-6 text-xs leading-relaxed text-muted">
        Le promo non sono cumulabili tra loro. L&apos;omaggio (birra o bottiglia di vino) viene
        consegnato insieme all&apos;ordine. Si avvisa la gentile clientela di ordinare solo quanto
        verrà effettivamente consumato.
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/menu"
          className="inline-block rounded-full bg-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-background transition-transform hover:scale-[1.02] active:scale-95"
        >
          Componi il tuo ordine
        </Link>
      </div>
    </div>
  );
}
