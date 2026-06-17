import Link from "next/link";
import { categories } from "@/data/categories";
import { DishImage } from "@/components/ui/DishImage";

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/menu#${cat.id}`}
          className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-line/70"
        >
          <DishImage
            src={cat.image}
            alt={cat.label}
            from={cat.from}
            to={cat.to}
            kanji={cat.kanji}
            className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <span className="pointer-events-none absolute right-3 top-2 font-display text-3xl text-gold/25">
            {cat.kanji}
          </span>
          <div className="absolute inset-x-0 bottom-0 p-3.5">
            <h3 className="font-display text-base leading-tight text-foreground">
              {cat.label}
            </h3>
            <p className="text-[0.7rem] text-muted">{cat.blurb}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
