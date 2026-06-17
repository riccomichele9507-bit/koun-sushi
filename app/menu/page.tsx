import type { Metadata } from "next";
import { MenuExplorer } from "@/components/menu/MenuExplorer";

export const metadata: Metadata = {
  title: "Menu · Koun Sushi",
  description:
    "Il menu completo di Koun Sushi a Molfetta: antipasti, sashimi, nigiri, uramaki, special roll, poke, piatti caldi e dolci. Ordina d'asporto su WhatsApp.",
};

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <div className="pt-10">
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-gold/70">Alla carta</p>
        <h1 className="mt-2 font-display text-4xl text-foreground sm:text-5xl">Il Menu</h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Tocca <span className="text-gold">+</span> per aggiungere. A € 100 scatta lo sconto
          −50% con birra omaggio, a € 200 una bottiglia di vino.
        </p>
      </div>
      <MenuExplorer />
    </div>
  );
}
