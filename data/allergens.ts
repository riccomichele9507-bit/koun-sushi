import type { AllergenCode } from "@/types/dish";

export interface AllergenInfo {
  code: AllergenCode;
  name: string;
  /** Nome icona lucide-react. */
  icon: string;
}

/** Mappa ufficiale allergeni Koun Sushi (Reg. CEE 1169/2011). */
export const allergens: Record<AllergenCode, AllergenInfo> = {
  1: { code: 1, name: "Cereali con glutine", icon: "Wheat" },
  2: { code: 2, name: "Uova", icon: "Egg" },
  3: { code: 3, name: "Pesce", icon: "Fish" },
  4: { code: 4, name: "Crostacei", icon: "Shrimp" },
  5: { code: 5, name: "Arachidi", icon: "Nut" },
  6: { code: 6, name: "Soia", icon: "Bean" },
  7: { code: 7, name: "Sedano", icon: "Leaf" },
  8: { code: 8, name: "Latte", icon: "Milk" },
  9: { code: 9, name: "Frutta a guscio", icon: "Cherry" },
  10: { code: 10, name: "Senape", icon: "Droplet" },
  11: { code: 11, name: "Sesamo", icon: "Sprout" },
  12: { code: 12, name: "Anidride solforosa e solfiti", icon: "FlaskConical" },
  13: { code: 13, name: "Lupini", icon: "Sprout" },
  14: { code: 14, name: "Molluschi", icon: "Shell" },
};

export const allergenList: AllergenInfo[] = Object.values(allergens);

export function allergenName(code: AllergenCode): string {
  return allergens[code]?.name ?? `Allergene ${code}`;
}
