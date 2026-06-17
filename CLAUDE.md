# Koun Sushi — Web App d'Asporto (Demo)

App mobile-first per **Koun Sushi** (Molfetta, BA). Demo d'asporto con menu completo,
carrello e ordine via **WhatsApp**. Stessa impronta di `special-sushi-poke` ma snellita:
**frontend-only**, niente backend/login/Stripe in questa fase.

## Stack
- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind v4** — config inline in `app/globals.css` (NO `tailwind.config`)
- **Zustand 5** — carrello con persistenza `localStorage` (`store/cart-store.ts`)
- **framer-motion** — micro-animazioni; **lucide-react** — icone
- Foto piatti generate con **kie.ai / Nano Banana 2** (skill `nano-banana-images`)

## Comandi
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # DEVE passare prima di ogni commit/push
```

## Regole operative (non negoziabili)
1. **Prezzi sempre in centesimi** (es. € 3,00 → `300`). Formattazione solo via `lib/format.ts`.
2. **Tema dark + oro**: usare SOLO i token CSS di `app/globals.css` (niente hex hardcoded nei componenti).
3. **Mobile-first**: target iPhone verticale; il desktop è un miglioramento, non il contrario.
4. **WhatsApp reale**: `+39 327 622 1704` → `https://wa.me/393276221704`. Unica via d'ordine in demo.
5. **Build verde**: `npm run build` deve compilare prima di consegnare/pushare.
6. **Niente segreti nel repo**: `KIEAI_API_KEY` solo in `.env` (gitignored). Mai `NEXT_PUBLIC_` per chiavi.
7. **Foto mancanti = fallback gradiente**: i componenti immagine NON devono rompersi se il file non esiste
   (usare `<DishImage>` con `onError`). La demo deve girare anche con poche foto.
8. **Fonte di verità del menu**: il PDF ufficiale → `data/menu.ts`. Non inventare piatti/prezzi.

## Dati ristorante (`data/restaurant.ts`)
- Nome: **Koun Sushi** — Molfetta (BA), Via Bettino Craxi
- Orari: **Lun–Dom 12:30–15:00 · 19:30–00:00** (aperto tutti i giorni)
- WhatsApp/Tel: **+39 327 622 1704**
- Coperto: € 2,00 · Menù fissi: Pranzo €19,90 (lun–ven) / €26,90 (we e festivi), Cena €26,90, Bimbi €12,00

## Promo (`lib/promo/auto-promo.ts`) — SOLO ASPORTO, valida fino al **13/09/2026**
Sconto a soglie sull'**intero ordine**:
- Spesa ≥ **€100** → **−50%** + **birra in omaggio**
- Spesa ≥ **€200** → **−50%** + **bottiglia di vino in omaggio**

La soglia si valuta sul **subtotale pieno** (prima dello sconto). Il carrello mostra una barra
di avanzamento verso la soglia successiva. Il messaggio WhatsApp include riepilogo, sconto e omaggio.

## Struttura
```
app/            layout, page (home), menu/, allergeni/, promo/, globals.css
components/     layout/ home/ menu/ cart/ ui/
data/           restaurant.ts categories.ts menu.ts allergens.ts
lib/            format.ts  promo/auto-promo.ts  utils.ts
store/          cart-store.ts
types/          dish.ts
scripts/        generate_images.py   (batch foto curate)
public/menu/    foto generate (.png)
```

## Modello dati (`types/dish.ts`)
`Dish`: `id, code?, name, description?, price(cent), category, image?, allergens[], frozen?, pieces?, isFeatured?, note?`.
Allergeni come codici numerici UE 1–14 (mappa in `data/allergens.ts`). `frozen` = asterisco (surgelato/abbattuto).

## Foto AI (set curato ~30-40)
`scripts/generate_images.py` invoca lo script della skill
`~/.claude/skills/nano-banana-images/scripts/generate_image.py` (subprocess, `--aspect 4:3 --resolution 1K`,
negative prompt anti-watermark, salta i file già presenti). Output in `public/menu/{id}.png`.
Solo i piatti con `isFeatured` + le hero di categoria (`cat-*.png`). Bevande escluse (tranne 2 birre + 2 vini).
**Confermare l'elenco con l'utente prima del batch** (controllo costi kie.ai).

## Fase futura (dopo conferma cliente)
- Integrazione **Stripe** (pagamento carta) + eventuale backend ordini/stato.
- Deploy: push su GitHub → deploy su **Vercel**.
```
