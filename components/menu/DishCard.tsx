import { Snowflake } from "lucide-react";
import type { Dish } from "@/types/dish";
import { categoryById } from "@/data/categories";
import { formatCents } from "@/lib/format";
import { DishImage } from "@/components/ui/DishImage";
import { AllergenBadges } from "@/components/menu/AllergenBadges";
import { AddButton } from "@/components/menu/AddButton";

/** Riga menu: foto a sinistra (o gradiente), info, prezzo + add a destra. */
export function DishCard({ dish }: { dish: Dish }) {
  const cat = categoryById[dish.category];
  return (
    <article className="group flex gap-3.5 rounded-2xl border border-line/70 bg-card/60 p-3 transition-colors hover:border-gold/40">
      <DishImage
        src={dish.image}
        alt={dish.name}
        from={cat.from}
        to={cat.to}
        kanji={cat.kanji}
        className="h-20 w-20 shrink-0 rounded-xl"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="flex items-center gap-1.5 font-sans text-[0.95rem] font-medium leading-tight text-foreground">
            {dish.name}
            {dish.frozen && (
              <Snowflake
                className="h-3 w-3 shrink-0 text-muted/70"
                aria-label="Prodotto abbattuto/surgelato"
              />
            )}
          </h3>
          <span className="shrink-0 font-display text-[0.95rem] text-gold">
            {formatCents(dish.price)}
          </span>
        </div>

        {dish.description && (
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
            {dish.description}
          </p>
        )}
        {dish.note && (
          <p className="mt-1 text-xs italic text-muted/80">{dish.note}</p>
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <AllergenBadges codes={dish.allergens} />
          <AddButton dishId={dish.id} className="shrink-0" />
        </div>
      </div>
    </article>
  );
}
