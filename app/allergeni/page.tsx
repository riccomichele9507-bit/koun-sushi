import type { Metadata } from "next";
import { allergenList } from "@/data/allergens";

export const metadata: Metadata = {
  title: "Allergeni · Koun Sushi",
  description:
    "Elenco allergeni Koun Sushi secondo Reg. CEE 1169/2011. Informazioni per allergie e intolleranze alimentari.",
};

export default function AllergeniPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-[0.65rem] uppercase tracking-[0.4em] text-gold/70">Informazioni</p>
      <h1 className="mt-2 font-display text-4xl text-foreground sm:text-5xl">Allergeni</h1>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Reg. CEE 1169/2011 · D.L. n. 109 del 27 gennaio 1992 sez. III · D.L. n. 114/2006.
        I nostri piatti possono contenere allergeni. I numeri accanto ad ogni piatto del menu
        corrispondono a questa legenda.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {allergenList.map((a) => (
          <div
            key={a.code}
            className="flex items-center gap-3 rounded-xl border border-line/70 bg-card/50 p-3.5"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/30 bg-gold/10 font-display text-sm text-gold">
              {a.code}
            </span>
            <span className="text-sm text-foreground">{a.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 space-y-4 rounded-2xl border border-line/70 bg-surface/40 p-6 text-xs leading-relaxed text-muted">
        <p>
          Per evitare spiacevoli inconvenienti si prega di informare preventivamente il personale
          in caso di allergie o intolleranze alimentari, o se si segue una dieta vegetariana.
          Tutti i piatti potrebbero presentare tracce di sesamo o soia e contengono glutammato di
          sodio. I vini e le bevande possono contenere solfiti.
        </p>
        <p>
          <span className="text-gold">Prodotti surgelati:</span> alcuni ingredienti, contrassegnati
          con un asterisco (*), potrebbero essere surgelati all&apos;origine o abbattuti in sede con
          abbattitore di temperatura, nel rispetto della normativa sanitaria.
        </p>
      </div>
    </div>
  );
}
