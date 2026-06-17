/**
 * Codici sconto demo Koun Sushi.
 * NB: non cumulabili con la promo automatica a soglie (-50%).
 * Se la promo tier è attiva, il codice viene ignorato (vedi lib/order.ts).
 */
export interface DiscountCode {
  code: string;
  label: string;
  /** Sconto percentuale (0-100) OPPURE fisso in centesimi. */
  percent?: number;
  fixedCents?: number;
  /** Spesa minima per applicarlo (cent). */
  minCents?: number;
}

export const DISCOUNT_CODES: DiscountCode[] = [
  { code: "BENVENUTO10", label: "-10% primo ordine", percent: 10 },
  { code: "KOUN5", label: "-5€ sopra i 20€", fixedCents: 500, minCents: 2000 },
  { code: "SUSHI15", label: "-15% sopra i 40€", percent: 15, minCents: 4000 },
];

export interface CodeResult {
  ok: boolean;
  code?: DiscountCode;
  discountCents: number;
  message: string;
}

/** Valida un codice contro il subtotale (cent). */
export function applyDiscountCode(input: string, subtotalCents: number): CodeResult {
  const norm = input.trim().toUpperCase();
  if (!norm) return { ok: false, discountCents: 0, message: "" };

  const found = DISCOUNT_CODES.find((c) => c.code === norm);
  if (!found) {
    return { ok: false, discountCents: 0, message: "Codice non valido" };
  }
  if (found.minCents && subtotalCents < found.minCents) {
    return {
      ok: false,
      code: found,
      discountCents: 0,
      message: `Valido da ${(found.minCents / 100).toFixed(0)}€ di spesa`,
    };
  }
  const discountCents = found.percent
    ? Math.round((subtotalCents * found.percent) / 100)
    : (found.fixedCents ?? 0);

  return {
    ok: true,
    code: found,
    discountCents,
    message: `Applicato: ${found.label}`,
  };
}
