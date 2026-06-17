import { restaurant, whatsappLink } from "@/data/restaurant";
import { formatCents } from "@/lib/format";
import { computeOrderTotals, type OrderMode, type PaymentMethod } from "@/lib/order";
import type { CartLine } from "@/store/cart-store";

export interface CheckoutDetails {
  mode: OrderMode;
  payment: PaymentMethod;
  name: string;
  phone: string;
  time: string;
  // consegna
  address?: string;
  addressNotes?: string;
  // extra
  codeInput?: string;
  tipCents?: number;
  notes?: string;
}

/** Link WhatsApp generico (pulsante "scrivici"). */
export function buildOrderWhatsappLink(lines: CartLine[]): string {
  return buildCheckoutWhatsappLink(lines, {
    mode: "pickup",
    payment: "cash",
    name: "",
    phone: "",
    time: "",
  });
}

/** Link WhatsApp con riepilogo ordine completo dalla cassa. */
export function buildCheckoutWhatsappLink(
  lines: CartLine[],
  d: CheckoutDetails,
): string {
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const t = computeOrderTotals({
    subtotal,
    mode: d.mode,
    codeInput: d.codeInput,
    tipCents: d.tipCents,
  });

  const rows = lines.map(
    (l) =>
      `• ${l.quantity}× ${l.dish.name}${l.dish.code ? ` (n.${l.dish.code})` : ""} — ${formatCents(l.lineTotal)}`,
  );

  const L: string[] = [
    `*Nuovo ordine — ${restaurant.name}*`,
    "",
    `*Modalità:* ${d.mode === "delivery" ? "Consegna a domicilio" : "Ritiro in sede"}`,
    `*Pagamento:* ${d.payment === "card" ? "Carta" : "Contanti"}`,
    d.time ? `*Orario:* ${d.time}` : "",
  ];

  if (d.name) L.push(`*Nome:* ${d.name}`);
  if (d.phone) L.push(`*Telefono:* ${d.phone}`);
  if (d.mode === "delivery") {
    if (d.address) L.push(`*Indirizzo:* ${d.address}`);
    if (d.addressNotes) L.push(`*Note indirizzo:* ${d.addressNotes}`);
  }

  L.push("", "*Ordine:*", ...rows, "", `Subtotale: ${formatCents(subtotal)}`);

  if (t.promoCents > 0) {
    L.push(`Promo -${t.promoPercent}%: -${formatCents(t.promoCents)}`);
    if (t.promoGift) L.push(`Omaggio: ${t.promoGift}`);
  }
  if (t.codeCents > 0) L.push(`Codice "${(d.codeInput ?? "").toUpperCase()}": -${formatCents(t.codeCents)}`);
  if (t.deliveryFee > 0) L.push(`Consegna: ${formatCents(t.deliveryFee)}`);
  if (t.tip > 0) L.push(`Mancia al personale: ${formatCents(t.tip)}`);

  L.push(`*Totale: ${formatCents(t.total)}*`);
  if (d.notes) L.push("", `*Note:* ${d.notes}`);

  return whatsappLink(L.filter(Boolean).join("\n"));
}
