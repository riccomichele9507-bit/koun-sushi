import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsappFab } from "@/components/layout/WhatsappFab";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { restaurant } from "@/data/restaurant";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${restaurant.name} · ${restaurant.tagline}`,
  description: `Sushi d'autore d'asporto a Molfetta. Ordina su WhatsApp da Koun Sushi: roll speciali, sashimi, poke e piatti caldi. Promo asporto fino a -50%.`,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://koun-sushi.vercel.app"),
  openGraph: {
    title: `${restaurant.name} · ${restaurant.tagline}`,
    description: "Sushi d'autore d'asporto a Molfetta. Ordina su WhatsApp.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${cinzel.variable} ${cormorant.variable} ${jost.variable}`}>
      <body className="bg-grain min-h-dvh antialiased">
        <Header />
        <main className="pb-28">{children}</main>
        <Footer />
        <WhatsappFab />
        <CartDrawer />
      </body>
    </html>
  );
}
