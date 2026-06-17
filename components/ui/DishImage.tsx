"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface DishImageProps {
  src?: string;
  alt: string;
  from: string;
  to: string;
  kanji?: string;
  className?: string;
  /** sizes hint per immagini responsive (non usato con <img> nativo, decorativo). */
  priority?: boolean;
}

/**
 * Immagine piatto con fallback gradiente + kanji se il file non esiste.
 * Usa <img> nativo (non next/image) così una foto mancante non rompe la demo.
 */
export function DishImage({ src, alt, from, to, kanji, className }: DishImageProps) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ background: `linear-gradient(150deg, ${from}, ${to})` }}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <span
            className="select-none font-display text-5xl opacity-25"
            style={{ color: "var(--gold)" }}
            aria-hidden
          >
            {kanji ?? "膳"}
          </span>
        </div>
      )}
    </div>
  );
}
