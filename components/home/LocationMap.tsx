import { MapPin, Clock, Navigation } from "lucide-react";
import { restaurant } from "@/data/restaurant";

export function LocationMap() {
  return (
    <div className="overflow-hidden rounded-3xl border border-line/70 bg-card/50 lg:grid lg:grid-cols-2">
      {/* Info */}
      <div className="flex flex-col justify-center gap-5 p-6 sm:p-8">
        <div>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold/70">
            <MapPin className="h-4 w-4" /> Dove siamo
          </p>
          <p className="mt-3 font-display text-2xl text-foreground">
            {restaurant.address.street}
          </p>
          <p className="text-muted">
            {restaurant.address.city} ({restaurant.address.province})
          </p>
        </div>

        <p className="flex items-start gap-2.5 text-sm text-muted">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <span>
            {restaurant.hours.label}
            <br />
            {restaurant.hours.everyday}
          </span>
        </p>

        <a
          href={restaurant.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 px-5 py-3 text-sm uppercase tracking-[0.15em] text-gold transition-colors hover:bg-gold hover:text-background"
        >
          <Navigation className="h-4 w-4" /> Indicazioni stradali
        </a>
      </div>

      {/* Mappa */}
      <div className="relative min-h-[280px] lg:min-h-[340px]">
        <iframe
          title={`Mappa ${restaurant.name}`}
          src={restaurant.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full grayscale-[0.3] contrast-[1.05]"
          style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) brightness(0.95)" }}
          allowFullScreen
        />
      </div>
    </div>
  );
}
