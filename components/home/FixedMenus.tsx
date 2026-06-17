import { restaurant } from "@/data/restaurant";
import { formatCents } from "@/lib/format";

export function FixedMenus() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {restaurant.fixedMenus.map((m, i) => (
        <div
          key={i}
          className="flex flex-col rounded-2xl border border-line/70 bg-card/50 p-5 transition-colors hover:border-gold/40"
        >
          <h3 className="font-display text-lg text-foreground">{m.name}</h3>
          <p className="mt-1 text-xs text-muted">{m.detail}</p>
          <p className="mt-4 font-display text-2xl text-gold">{formatCents(m.price)}</p>
        </div>
      ))}
      <p className="col-span-full text-xs text-muted/70">
        Menù all-you-can-eat esclusi bevande e dolci · coperto {formatCents(restaurant.coperto)}.
      </p>
    </div>
  );
}
