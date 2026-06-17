import Link from "next/link";
import { MapPin, Clock, Phone } from "lucide-react";
import { restaurant } from "@/data/restaurant";

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-surface/50">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl text-gold-gradient">Kōun</span>
            <span className="text-[0.55rem] uppercase tracking-[0.45em] text-muted">
              Sushi
            </span>
          </div>
          <p className="mt-3 font-serif text-lg italic text-muted">
            {restaurant.tagline}
          </p>
        </div>

        <div className="space-y-3 text-sm text-muted">
          <p className="flex items-start gap-2.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            {restaurant.address.full}
          </p>
          <p className="flex items-start gap-2.5">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span>
              {restaurant.hours.label}
              <br />
              {restaurant.hours.everyday}
            </span>
          </p>
          <p className="flex items-start gap-2.5">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <a href={`tel:${restaurant.phoneRaw}`} className="hover:text-foreground">
              {restaurant.phone}
            </a>
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-gold/70">Menu</p>
          <Link href="/menu" className="block text-muted hover:text-foreground">
            Menu completo
          </Link>
          <Link href="/promo" className="block text-muted hover:text-foreground">
            Promo asporto
          </Link>
          <Link href="/allergeni" className="block text-muted hover:text-foreground">
            Allergeni
          </Link>
          <a
            href={restaurant.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-muted hover:text-foreground"
          >
            Indicazioni
          </a>
        </div>
      </div>
      <div className="border-t border-line/50 py-5 text-center text-xs text-muted/70">
        © {new Date().getFullYear()} {restaurant.name} · Molfetta · Demo web app
      </div>
    </footer>
  );
}
