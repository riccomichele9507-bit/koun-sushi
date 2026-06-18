import { menu } from "@/data/menu";
import { FeaturedCard } from "@/components/home/FeaturedCard";

// Piatti selezionati per la sezione "Le firme dello chef" in home
const HOME_FEATURED_IDS = ["12", "15", "17"]; // Gyoza, Gua Bao Salmone, Takoyaki

export function FeaturedRail() {
  const dishes = HOME_FEATURED_IDS.map((id) => menu.find((d) => d.id === id)).filter(Boolean) as typeof menu;
  if (!dishes.length) return null;
  return (
    <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-2">
      {dishes.map((dish) => (
        <FeaturedCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
}
