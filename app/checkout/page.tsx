import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Cassa · Koun Sushi",
  description: "Completa il tuo ordine d'asporto o in consegna da Koun Sushi.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Link
        href="/menu"
        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-gold"
      >
        <ChevronLeft className="h-4 w-4" /> Continua a ordinare
      </Link>

      <div className="mb-8 mt-4">
        <p className="text-[0.65rem] uppercase tracking-[0.4em] text-gold/70">Cassa</p>
        <h1 className="mt-2 font-display text-4xl text-foreground sm:text-5xl">
          Completa l&apos;ordine
        </h1>
      </div>

      <CheckoutForm />
    </div>
  );
}
