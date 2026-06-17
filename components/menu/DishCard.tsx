import { Snowflake, Star } from "lucide-react";
import type { Dish } from "@/types/dish";
import { categoryById } from "@/data/categories";
import { formatCents } from "@/lib/format";
import { DishImage } from "@/components/ui/DishImage";
import { AllergenBadges } from "@/components/menu/AllergenBadges";
import { AddButton } from "@/components/menu/AddButton";

/** Card menu foto-first: immagine 4:3 protagonista, testo e prezzo sotto. */
export function DishCard({ dish }: { dish: Dish }) {
  const cat = categoryById[dish.category];
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line/70 bg-card/60 transition-all duration-300 hover:border-gold/40 hover:shadow-gold">
      {/* FOTO — protagonista */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <DishImage
          src={dish.image}
          alt={dish.name}
          from={cat.from}
          to={cat.to}
          kanji={cat.kanji}
          className="absolute inset-0 h-full w-full transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
        />
        {/* sfumatura per leggibilità e profondità */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/5 to-transparent"
        />

        {/* badge angoli */}
        {dish.isFeatured && (
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-gold/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-background backdrop-blur">
            <Star className="h-2.5 w-2.5 fill-background" /> Signature
          </span>
        )}
        {dish.pieces && (
          <span className="absolute left-2 top-2 rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-semibold text-foreground backdrop-blur">
            {dish.pieces} pz
          </span>
        )}
        {dish.frozen && (
          <span
            className="absolute bottom-2 left-2 grid h-6 w-6 place-items-center rounded-full bg-background/70 backdrop-blur"
            title="Prodotto abbattuto/surgelato"
          >
            <Snowflake className="h-3 w-3 text-muted" />
          </span>
        )}

        {/* prezzo in overlay sull'immagine */}
        <span className="absolute bottom-2 right-2 rounded-full bg-background/85 px-2.5 py-1 font-display text-sm font-semibold text-gold backdrop-blur">
          {formatCents(dish.price)}
        </span>
      </div>

      {/* TESTO */}
      <div className="flex flex-1 flex-col gap-1 px-3 pb-3 pt-2.5">
        <h3 className="font-sans text-sm font-medium leading-tight text-foreground line-clamp-1">
          {dish.name}
        </h3>
        {(dish.description || dish.note) && (
          <p className="line-clamp-2 text-[11px] leading-snug text-muted">
            {dish.description ?? dish.note}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <AllergenBadges codes={dish.allergens} />
          <AddButton dishId={dish.id} className="shrink-0" />
        </div>
      </div>
    </article>
  );
}
