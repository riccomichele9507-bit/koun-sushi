import type { Dish } from "@/types/dish";
import { categoryById } from "@/data/categories";
import { formatCents } from "@/lib/format";
import { DishImage } from "@/components/ui/DishImage";
import { AddButton } from "@/components/menu/AddButton";

/** Card verticale per il carosello "Le firme dello chef". */
export function FeaturedCard({ dish }: { dish: Dish }) {
  const cat = categoryById[dish.category];
  return (
    <article className="w-[230px] shrink-0 overflow-hidden rounded-2xl border border-line/70 bg-card/60">
      <div className="relative">
        <DishImage
          src={dish.image}
          alt={dish.name}
          from={cat.from}
          to={cat.to}
          kanji={cat.kanji}
          className="aspect-[4/3] w-full"
        />
        <span className="absolute left-3 top-3 rounded-full border border-gold/30 bg-background/70 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-gold backdrop-blur">
          {cat.label}
        </span>
      </div>
      <div className="p-3.5">
        <h3 className="font-sans text-[0.95rem] font-medium leading-tight text-foreground">
          {dish.name}
        </h3>
        {dish.description && (
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
            {dish.description}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="font-display text-lg text-gold">{formatCents(dish.price)}</span>
          <AddButton dishId={dish.id} />
        </div>
      </div>
    </article>
  );
}
