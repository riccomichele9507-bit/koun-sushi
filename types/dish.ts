/** Codici allergeni UE (Reg. CEE 1169/2011) usati dal menu Koun. */
export type AllergenCode =
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export type CategoryId =
  | "antipasti"
  | "insalate"
  | "sashimi"
  | "carpacci"
  | "tartare"
  | "chirashi"
  | "nigiri"
  | "hosomaki"
  | "temaki"
  | "onigiri"
  | "sushi-gio"
  | "gunkan"
  | "uramaki"
  | "special-roll"
  | "riso-venere"
  | "piatti-speciali"
  | "tempura"
  | "piastra"
  | "primi"
  | "secondi"
  | "bevande"
  | "dolci"
  | "vini";

export interface Dish {
  /** Numero di menu (string per stabilità chiave). */
  id: string;
  /** Numero stampato sul menu, se presente. */
  code?: string;
  name: string;
  description?: string;
  /** Prezzo in centesimi (es. 300 = € 3,00). */
  price: number;
  category: CategoryId;
  /** Path foto in /public/menu, opzionale (fallback gradiente). */
  image?: string;
  allergens: AllergenCode[];
  /** Prodotto surgelato/abbattuto (asterisco sul menu). */
  frozen?: boolean;
  pieces?: number;
  isFeatured?: boolean;
  /** Override gradiente card senza foto. */
  bgFrom?: string;
  bgTo?: string;
  /** Nota tecnica (es. dettaglio cantina per i vini). */
  note?: string;
}
