import { featuredDishes } from "@/data/menu";
import { FeaturedCard } from "@/components/home/FeaturedCard";

export function FeaturedRail() {
  const dishes = featuredDishes.filter((d) => d.category !== "vini" && d.category !== "bevande");
  if (!dishes.length) return null;
  return (
    <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-2">
      {dishes.map((dish) => (
        <FeaturedCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
}
