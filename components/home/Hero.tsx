import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { restaurant } from "@/data/restaurant";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* bagliore oro dietro al furgoncino */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(65%_45%_at_50%_28%,rgba(212,175,106,0.12),transparent_70%)]"
      />

      <div className="mx-auto max-w-5xl px-4 pb-12 pt-9 sm:pt-12">
        <p className="animate-fade-up text-center text-xs uppercase tracking-[0.5em] text-gold/80">
          Molfetta · d&apos;asporto
        </p>

        {/* Hero illustrato — il furgoncino è protagonista */}
        <div
          className="animate-fade-up relative mx-auto mt-5 max-w-3xl"
          style={{ animationDelay: "80ms" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/menu/hero.png"
            alt="Furgoncino Koun Sushi in stile giapponese"
            className="w-full select-none"
            draggable={false}
          />
          {/* sfuma i bordi nel fondo pagina */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"
          />
        </div>

        <p
          className="animate-fade-up mx-auto mt-2 max-w-md text-center font-serif text-xl italic text-muted sm:text-2xl"
          style={{ animationDelay: "160ms" }}
        >
          Roll d&apos;autore, sashimi e cucina fusion. Ordina e ritira — la qualità del
          ristorante, a casa tua.
        </p>

        <div
          className="animate-fade-up mt-7 flex flex-wrap justify-center gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <div className="animate-shake">
            <Link
              href="/menu"
              className="block rounded-full bg-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-background transition-transform hover:scale-[1.03] active:scale-95"
            >
              Ordina ora
            </Link>
          </div>
          <Link
            href="/promo"
            className="rounded-full border border-gold/40 px-7 py-3.5 text-sm uppercase tracking-[0.15em] text-gold transition-colors hover:bg-gold/10"
          >
            Promo −50%
          </Link>
        </div>

        <div className="animate-fade-up mt-8 flex flex-wrap justify-center gap-x-7 gap-y-2 text-sm text-muted" style={{ animationDelay: "320ms" }}>
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
