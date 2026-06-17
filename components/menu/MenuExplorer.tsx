"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { menu } from "@/data/menu";
import { categories } from "@/data/categories";
import type { CategoryId } from "@/types/dish";
import { DishCard } from "@/components/menu/DishCard";
import { DishImage } from "@/components/ui/DishImage";
import { cn } from "@/lib/utils";

export function MenuExplorer() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<CategoryId>(categories[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const isSearching = query.trim().length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return menu.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.description?.toLowerCase().includes(q) ||
        d.code?.includes(q),
    );
  }, [query]);

  const grouped = useMemo(
    () =>
      categories
        .map((cat) => ({ cat, items: menu.filter((d) => d.category === cat.id) }))
        .filter((g) => g.items.length > 0),
    [],
  );

  // Scrollspy: evidenzia la categoria visibile
  useEffect(() => {
    if (isSearching) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id as CategoryId);
      },
      { rootMargin: "-140px 0px -70% 0px", threshold: 0 },
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [isSearching]);

  // Mantieni la pill attiva visibile nella barra
  useEffect(() => {
    pillRefs.current[active]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  const scrollToCat = (id: CategoryId) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      {/* Barra sticky: ricerca + pill categorie */}
      <div className="sticky top-16 z-30 -mx-4 border-b border-line/70 bg-background/85 px-4 pb-3 pt-3 backdrop-blur-xl">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca un piatto, un numero…"
            className="w-full rounded-full border border-line bg-surface py-2.5 pl-10 pr-10 text-sm text-foreground outline-none placeholder:text-muted/60 focus:border-gold/50"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Cancella ricerca"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {!isSearching && (
          <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
            {grouped.map(({ cat }) => (
              <button
                key={cat.id}
                ref={(el) => {
                  pillRefs.current[cat.id] = el;
                }}
                onClick={() => scrollToCat(cat.id)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.1em] transition-colors",
                  active === cat.id
                    ? "border-gold bg-gold text-background"
                    : "border-line bg-surface text-muted hover:text-foreground",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Risultati ricerca */}
      {isSearching ? (
        <div className="py-6">
          <p className="mb-4 text-sm text-muted">
            {filtered.length} risultat{filtered.length === 1 ? "o" : "i"} per “{query}”
          </p>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
              {filtered.map((d) => (
                <DishCard key={d.id} dish={d} />
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-muted">Nessun piatto trovato.</p>
          )}
        </div>
      ) : (
        <div className="space-y-12 py-8">
          {grouped.map(({ cat, items }) => (
            <section
              key={cat.id}
              id={cat.id}
              ref={(el) => {
                sectionRefs.current[cat.id] = el;
              }}
              className="scroll-mt-36"
            >
              <div className="mb-4 flex items-center gap-3.5">
                <DishImage
                  src={cat.image}
                  alt={cat.label}
                  from={cat.from}
                  to={cat.to}
                  kanji={cat.kanji}
                  className="h-16 w-16 shrink-0 rounded-xl border border-line/70"
                />
                <div>
                  <h2 className="font-display text-xl text-foreground">{cat.label}</h2>
                  <p className="text-xs text-muted">{cat.blurb}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
                {items.map((d) => (
                  <DishCard key={d.id} dish={d} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
