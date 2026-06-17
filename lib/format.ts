/** Formatta centesimi in euro italiano: 300 → "€ 3,00". */
export function formatCents(cents: number): string {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

/** Solo numero senza simbolo: 1990 → "19,90". */
export function formatAmount(cents: number): string {
  return (cents / 100).toLocaleString("it-IT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
