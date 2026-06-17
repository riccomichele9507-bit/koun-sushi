const WHATSAPP_NUMBER = "393276221704";

export const restaurant = {
  name: "Koun Sushi",
  tagline: "Sushi d'autore · Asporto a Molfetta",
  city: "Molfetta",
  address: {
    street: "Via Bettino Craxi",
    city: "Molfetta",
    province: "BA",
    country: "IT",
    full: "Via Bettino Craxi, Molfetta (BA)",
  },
  phone: "+39 327 622 1704",
  phoneRaw: "+393276221704",
  whatsapp: WHATSAPP_NUMBER,
  whatsappDisplay: "327 622 1704",
  whatsappBase: `https://wa.me/${WHATSAPP_NUMBER}`,
  email: "info@kounsushi.it",
  /** Aperto tutti i giorni con doppio turno. */
  hours: {
    everyday: "12:30 – 15:00 · 19:30 – 00:00",
    label: "Lunedì – Domenica",
    note: "Aperto tutti i giorni",
  },
  coperto: 200, // centesimi
  fixedMenus: [
    { name: "Menù Pranzo", detail: "Lunedì – Venerdì", price: 1990 },
    { name: "Menù Pranzo", detail: "Sabato, Domenica e Festivi", price: 2690 },
    { name: "Menù Cena", detail: "Tutti i giorni", price: 2690 },
    { name: "Menù Bimbi", detail: "Sotto i 120 cm", price: 1200 },
  ],
  cuisine: ["Sushi", "Giapponese", "Fusion", "Asiatico"],
  priceRange: "€€",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Koun+Sushi+Via+Bettino+Craxi+Molfetta",
} as const;

/** Link WhatsApp con messaggio precompilato. */
export function whatsappLink(message: string): string {
  return `${restaurant.whatsappBase}?text=${encodeURIComponent(message)}`;
}
