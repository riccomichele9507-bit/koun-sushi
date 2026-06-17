import { allergens } from "@/data/allergens";
import type { AllergenCode } from "@/types/dish";

export function AllergenBadges({ codes }: { codes: AllergenCode[] }) {
  if (!codes.length) return null;
  return (
    <div className="flex flex-wrap gap-1">
      {codes.map((c) => (
        <span
          key={c}
          title={allergens[c]?.name}
          className="grid h-5 min-w-5 place-items-center rounded-full border border-line bg-surface-2 px-1 text-[0.6rem] font-medium text-muted"
        >
          {c}
        </span>
      ))}
    </div>
  );
}
