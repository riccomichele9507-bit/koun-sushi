import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { restaurant } from "@/data/restaurant";
import { DishImage } from "@/components/ui/DishImage";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* sfondo hero */}
      <div className="absolute inset-0 -z-10">
        <DishImage
          src="/menu/hero.png"
          alt="Sushi d'autore Koun"
          from="#1a130c"
          to="#060606"
          kanji="幸運"
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent" />
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-14 pt-16 sm:pt-24">
        <p className="animate-fade-up text-xs uppercase tracking-[0.5em] text-gold/80">
          Molfetta · d&apos;asporto
        </p>
        <h1
          className="animate-fade-up mt-4 font-display text-5xl leading-[0.95] sm:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          <span className="text-gold-gradient">Kōun</span>
          <br />
          <span className="text-foreground">Sushi</span>
        </h1>
        <p
          className="animate-fade-up mt-5 max-w-md font-serif text-xl italic text-muted sm:text-2xl"
          style={{ animationDelay: "160ms" }}
        >
          Roll d&apos;autore, sashimi e cucina fusion. Ordina e ritira — la qualità del
          ristorante, a casa tua.
        </p>

        <div
          className="animate-fade-up mt-8 flex flex-wrap gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <Link
            href="/menu"
            className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-background transition-transform hover:scale-[1.02] active:scale-95"
          >
            Ordina ora
          </Link>
          <Link
            href="/promo"
            className="rounded-full border border-gold/40 px-7 py-3.5 text-sm uppercase tracking-[0.15em] text-gold transition-colors hover:bg-gold/10"
          >
            Promo −50%
          </Link>
        </div>

        <div
          className="animate-fade-up mt-9 flex flex-wrap gap-x-7 gap-y-2 text-sm text-muted"
          style={{ animationDelay: "320ms" }}
        >
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gold" />
            {restaurant.hours.everyday}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gold" />
            {restaurant.address.street}, {restaurant.city}
          </span>
        </div>
      </div>
    </section>
  );
}
