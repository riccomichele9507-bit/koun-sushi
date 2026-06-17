import type { CategoryId } from "@/types/dish";

export interface Category {
  id: CategoryId;
  label: string;
  /** Kanji/segno decorativo per le card. */
  kanji: string;
  /** Sottotitolo breve. */
  blurb: string;
  /** Gradiente fallback (card senza foto). */
  from: string;
  to: string;
  /** Foto rappresentativa di categoria (foto generata di un piatto della categoria). */
  image?: string;
}

export const categories: Category[] = [
  { id: "antipasti", label: "Antipasti", kanji: "前", blurb: "Per iniziare", from: "#2a1d12", to: "#0f0b07", image: "/menu/15.png" },
  { id: "insalate", label: "Insalate", kanji: "菜", blurb: "Fresche e leggere", from: "#16241a", to: "#080d0a" },
  { id: "sashimi", label: "Sashimi", kanji: "刺", blurb: "Pesce crudo selezionato", from: "#2a1416", to: "#0d0708", image: "/menu/25.png" },
  { id: "carpacci", label: "Carpacci", kanji: "薄", blurb: "Tagli sottili in salsa", from: "#241a25", to: "#0c080d", image: "/menu/26.png" },
  { id: "tartare", label: "Tartare", kanji: "韃", blurb: "Battute d'autore", from: "#2b2110", to: "#0f0b06", image: "/menu/32.png" },
  { id: "chirashi", label: "Chirashi & Poke", kanji: "丼", blurb: "Bowl di riso e pesce", from: "#1d2412", to: "#0a0d07", image: "/menu/36.png" },
  { id: "nigiri", label: "Nigiri", kanji: "握", blurb: "Riso e topping (2 pz)", from: "#231a13", to: "#0c0806", image: "/menu/39.png" },
  { id: "hosomaki", label: "Hosomaki", kanji: "細", blurb: "Roll sottili (6 pz)", from: "#15211f", to: "#080c0b" },
  { id: "temaki", label: "Temaki", kanji: "手", blurb: "Coni di alga (1 pz)", from: "#22191b", to: "#0b0708", image: "/menu/60.png" },
  { id: "onigiri", label: "Onigiri", kanji: "結", blurb: "Polpette di riso", from: "#1c1c20", to: "#08080a" },
  { id: "sushi-gio", label: "Sushi Giò", kanji: "匙", blurb: "Sul cucchiaio (2 pz)", from: "#241e10", to: "#0c0a06", image: "/menu/73.png" },
  { id: "gunkan", label: "Gunkan", kanji: "軍", blurb: "Barchette di alga (2 pz)", from: "#1a1a1c", to: "#070708", image: "/menu/82.png" },
  { id: "uramaki", label: "Uramaki", kanji: "裏", blurb: "Roll riso esterno", from: "#251910", to: "#0d0806", image: "/menu/88.png" },
  { id: "special-roll", label: "Special Roll", kanji: "特", blurb: "Le firme dello chef", from: "#2c1a0e", to: "#100905", image: "/menu/110.png" },
  { id: "riso-venere", label: "Riso Venere", kanji: "黑", blurb: "Roll di riso nero", from: "#15151a", to: "#060608", image: "/menu/132.png" },
  { id: "piatti-speciali", label: "Piatti Speciali", kanji: "皿", blurb: "Stick, tacos & sfere", from: "#231510", to: "#0c0706", image: "/menu/148.png" },
  { id: "tempura", label: "Tempura", kanji: "天", blurb: "Fritti croccanti", from: "#2a2310", to: "#0f0c06", image: "/menu/152.png" },
  { id: "piastra", label: "Piastra", kanji: "焼", blurb: "Spiedini grigliati (2 pz)", from: "#241712", to: "#0d0807", image: "/menu/158.png" },
  { id: "primi", label: "Primi", kanji: "麺", blurb: "Riso e noodle saltati", from: "#1e2113", to: "#0a0c07", image: "/menu/170.png" },
  { id: "secondi", label: "Secondi & Zuppe", kanji: "椀", blurb: "Wok, curry e zuppe", from: "#251c11", to: "#0d0907", image: "/menu/180.png" },
  { id: "bevande", label: "Bevande", kanji: "飲", blurb: "Soft, birre e calici", from: "#15171a", to: "#070809", image: "/menu/bev-asahi-33.png" },
  { id: "dolci", label: "Dolci", kanji: "甘", blurb: "Mochi e fine pasto", from: "#231722", to: "#0c070b", image: "/menu/dol-mochi.png" },
  { id: "vini", label: "Vini & Bollicine", kanji: "酒", blurb: "Carta dei vini", from: "#231510", to: "#0c0706", image: "/menu/vin-calafuria.png" },
];

export const categoryById: Record<CategoryId, Category> = categories.reduce(
  (acc, c) => {
    acc[c.id] = c;
    return acc;
  },
  {} as Record<CategoryId, Category>,
);

export function categoryLabel(id: CategoryId): string {
  return categoryById[id]?.label ?? id;
}
