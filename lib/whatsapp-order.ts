import { restaurant, whatsappLink } from "@/data/restaurant";
import { formatCents } from "@/lib/format";
import { computePromo } from "@/lib/promo/auto-promo";
import type { CartLine } from "@/store/cart-store";

/** Costruisce il link WhatsApp con il riepilogo ordine precompilato. */
export function buildOrderWhatsappLink(lines: CartLine[]): string {
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const promo = computePromo(subtotal);

  const rows = lines.map(
    (l) =>
      `• ${l.quantity}× ${l.dish.name}${l.dish.code ? ` (n.${l.dish.code})` : ""} — ${formatCents(l.lineTotal)}`,
  );

  const parts: string[] = [
    `*Nuovo ordine d'asporto — ${restaurant.name}*`,
    "",
    ...rows,
    "",
    `Subtotale: ${formatCents(subtotal)}`,
  ];

  if (promo.tier) {
    parts.push(`Promo -${promo.percent}%: -${formatCents(promo.discountCents)}`);
    parts.push(`Omaggio: ${promo.tier.gift}`);
    parts.push(`*Totale: ${formatCents(promo.totalCents)}*`);
  } else {
    parts.push(`*Totale: ${formatCents(subtotal)}*`);
  }

  parts.push("");
  parts.push("Nome: ");
  parts.push("Orario di ritiro: ");
  parts.push("");
  parts.push("(coperto e bevande da confermare in cassa)");

  return whatsappLink(parts.join("\n"));
}
