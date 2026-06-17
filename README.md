# Koun Sushi — Web App d'Asporto (Demo)

Demo mobile-first per **Koun Sushi** (Molfetta, BA). Menu completo, carrello e ordine via
**WhatsApp**, con promo asporto a soglie (−50% + omaggio). Tema dark + oro.

> Demo **frontend-only**: niente backend/login/Stripe. Stripe e backend si aggiungono dopo
> conferma del cliente.

## Sviluppo
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build di produzione
```

## Stack
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Zustand · framer-motion · lucide-react.

## Struttura
- `data/` — `restaurant.ts`, `menu.ts` (~190 piatti dal menu PDF), `categories.ts`, `allergens.ts`
- `lib/promo/auto-promo.ts` — logica sconto a soglie (€100 → −50% + birra; €200 → −50% + vino)
- `store/cart-store.ts` — carrello Zustand con persistenza localStorage
- `components/` — `layout/ home/ menu/ cart/ ui/`
- `app/` — `page` (home), `menu/`, `promo/`, `allergeni/`

## Foto piatti (kie.ai / Nano Banana)
Set curato generato con la skill `nano-banana-images`:
```bash
python scripts/generate_images.py --list      # elenca il set
python scripts/generate_images.py             # genera (1K, salta esistenti)
python scripts/generate_images.py --only 32,110,hero
```
La chiave `KIEAI_API_KEY` va in `.env` (gitignored). I piatti senza foto mostrano un
elegante fallback gradiente + kanji: la demo gira anche con poche immagini.

## Deploy
Push su GitHub → import su **Vercel** (preset Next.js, nessuna env var richiesta per la demo).

## Note
- Prezzi in **centesimi** (es. `300` = € 3,00), formattati via `lib/format.ts`.
- WhatsApp ordini: **+39 327 622 1704**.
- Promo valida fino al **13/09/2026**, solo asporto.
