"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Store,
  Bike,
  CreditCard,
  Banknote,
  Tag,
  Check,
  Gift,
  ShoppingBag,
} from "lucide-react";
import { useCartLines, useCartSubtotal } from "@/store/cart-store";
import { restaurant } from "@/data/restaurant";
import { formatCents } from "@/lib/format";
import { cn } from "@/lib/utils";
import {
  computeOrderTotals,
  buildTimeSlots,
  type OrderMode,
  type PaymentMethod,
} from "@/lib/order";
import { applyDiscountCode } from "@/lib/promo/discount-codes";
import { buildCheckoutWhatsappLink } from "@/lib/whatsapp-order";

const TIP_PRESETS = [0, 100, 200, 500];

export function CheckoutForm() {
  const lines = useCartLines();
  const subtotal = useCartSubtotal();

  const [mode, setMode] = useState<OrderMode>("pickup");
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [addressNotes, setAddressNotes] = useState("");
  const [time, setTime] = useState("Prima possibile");
  const [notes, setNotes] = useState("");

  const [codeInput, setCodeInput] = useState("");
  const [appliedCode, setAppliedCode] = useState("");
  const [tip, setTip] = useState(0);
  const [customTip, setCustomTip] = useState("");

  const slots = useMemo(() => buildTimeSlots(), []);

  const totals = useMemo(
    () => computeOrderTotals({ subtotal, mode, codeInput: appliedCode, tipCents: tip }),
    [subtotal, mode, appliedCode, tip],
  );

  const codeFeedback = useMemo(() => {
    if (!appliedCode) return null;
    return applyDiscountCode(appliedCode, subtotal);
  }, [appliedCode, subtotal]);

  const valid =
    lines.length > 0 &&
    name.trim().length > 1 &&
    phone.trim().length >= 6 &&
    (mode === "pickup" || address.trim().length > 4) &&
    !totals.belowDeliveryMin;

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-24 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full border border-line bg-surface">
          <ShoppingBag className="h-6 w-6 text-muted" />
        </div>
        <p className="text-muted">Il carrello è vuoto.</p>
        <Link
          href="/menu"
          className="rounded-full border border-gold/50 px-6 py-3 text-sm uppercase tracking-[0.15em] text-gold hover:bg-gold hover:text-background"
        >
          Vai al menu
        </Link>
      </div>
    );
  }

  const link = buildCheckoutWhatsappLink(lines, {
    mode,
    payment,
    name,
    phone,
    time,
    address,
    addressNotes,
    codeInput: appliedCode,
    tipCents: tip,
    notes,
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      {/* ───────── Form ───────── */}
      <div className="space-y-8">
        {/* Modalità */}
        <Section title="Come vuoi ricevere l'ordine?">
          <div className="grid grid-cols-2 gap-3">
            <ChoiceCard
              active={mode === "pickup"}
              onClick={() => setMode("pickup")}
              icon={<Store className="h-5 w-5" />}
              title="Ritiro in sede"
              subtitle={restaurant.address.street}
            />
            <ChoiceCard
              active={mode === "delivery"}
              onClick={() => setMode("delivery")}
              icon={<Bike className="h-5 w-5" />}
              title="Consegna"
              subtitle={restaurant.delivery.note}
              disabled={!restaurant.delivery.available}
            />
          </div>
          {totals.belowDeliveryMin && (
            <p className="mt-2 text-xs text-spicy">
              Ordine minimo per la consegna: {formatCents(totals.deliveryMinCents)}.
            </p>
          )}
        </Section>

        {/* Contatti */}
        <Section title="I tuoi dati">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Nome e cognome" required>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Mario Rossi"
                className={inputCls}
              />
            </Field>
            <Field label="Telefono" required>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="tel"
                placeholder="333 1234567"
                className={inputCls}
              />
            </Field>
          </div>
        </Section>

        {/* Indirizzo (solo consegna) */}
        {mode === "delivery" && (
          <Section title="Indirizzo di consegna">
            <div className="space-y-3">
              <Field label="Via e numero civico" required>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Via Roma 10, Molfetta"
                  className={inputCls}
                />
              </Field>
              <Field label="Citofono / scala / note">
                <input
                  value={addressNotes}
                  onChange={(e) => setAddressNotes(e.target.value)}
                  placeholder="Citofono Rossi, 2° piano"
                  className={inputCls}
                />
              </Field>
            </div>
          </Section>
        )}

        {/* Orario */}
        <Section title={mode === "delivery" ? "Orario di consegna" : "Orario di ritiro"}>
          <div className="flex flex-wrap gap-2">
            <TimePill active={time === "Prima possibile"} onClick={() => setTime("Prima possibile")}>
              Prima possibile
            </TimePill>
            {slots.map((s) => (
              <TimePill key={s} active={time === s} onClick={() => setTime(s)}>
                {s}
              </TimePill>
            ))}
          </div>
        </Section>

        {/* Codice sconto */}
        <Section title="Codice sconto">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="Es. BENVENUTO10"
                className={cn(inputCls, "pl-10 uppercase")}
              />
            </div>
            <button
              onClick={() => setAppliedCode(codeInput)}
              className="shrink-0 rounded-xl border border-gold/40 px-5 text-sm uppercase tracking-wider text-gold transition-colors hover:bg-gold hover:text-background"
            >
              Applica
            </button>
          </div>
          {codeFeedback && (
            <p
              className={cn(
                "mt-2 flex items-center gap-1.5 text-xs",
                codeFeedback.ok ? "text-gold" : "text-spicy",
              )}
            >
              {codeFeedback.ok && <Check className="h-3.5 w-3.5" />}
              {totals.codeBlockedByPromo
                ? "Codice non cumulabile con la promo -50% già attiva."
                : codeFeedback.message}
            </p>
          )}
        </Section>

        {/* Mancia */}
        <Section title="Mancia per il personale">
          <div className="flex flex-wrap gap-2">
            {TIP_PRESETS.map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setTip(amt);
                  setCustomTip("");
                }}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  tip === amt && !customTip
                    ? "border-gold bg-gold text-background"
                    : "border-line bg-surface text-muted hover:text-foreground",
                )}
              >
                {amt === 0 ? "Nessuna" : formatCents(amt)}
              </button>
            ))}
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                €
              </span>
              <input
                value={customTip}
                onChange={(e) => {
                  const v = e.target.value.replace(",", ".");
                  setCustomTip(e.target.value);
                  const cents = Math.round(parseFloat(v) * 100);
                  setTip(Number.isFinite(cents) && cents > 0 ? cents : 0);
                }}
                inputMode="decimal"
                placeholder="altro"
                className="w-24 rounded-full border border-line bg-surface py-2 pl-7 pr-3 text-sm text-foreground outline-none focus:border-gold/50"
              />
            </div>
          </div>
        </Section>

        {/* Pagamento */}
        <Section title="Metodo di pagamento">
          <div className="grid grid-cols-2 gap-3">
            <ChoiceCard
              active={payment === "card"}
              onClick={() => setPayment("card")}
              icon={<CreditCard className="h-5 w-5" />}
              title="Carta"
              subtitle="Pagamento sicuro online"
            />
            <ChoiceCard
              active={payment === "cash"}
              onClick={() => setPayment("cash")}
              icon={<Banknote className="h-5 w-5" />}
              title="Contanti"
              subtitle={mode === "delivery" ? "Alla consegna" : "Al ritiro"}
            />
          </div>
          {payment === "card" && (
            <p className="mt-2 text-xs text-muted">
              Per la carta riceverai un link di pagamento sicuro in chat WhatsApp.
            </p>
          )}
        </Section>

        {/* Note */}
        <Section title="Note per la cucina (facoltative)">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Allergie, preferenze, senza wasabi…"
            className={cn(inputCls, "resize-none")}
          />
        </Section>
      </div>

      {/* ───────── Riepilogo ───────── */}
      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <div className="rounded-2xl border border-line/70 bg-card/60 p-5">
          <h2 className="font-display text-lg text-gold-gradient">Riepilogo</h2>

          <div className="mt-4 max-h-48 space-y-2 overflow-y-auto pr-1 text-sm">
            {lines.map((l) => (
              <div key={l.dish.id} className="flex justify-between gap-2 text-muted">
                <span className="truncate">
                  {l.quantity}× {l.dish.name}
                </span>
                <span className="shrink-0">{formatCents(l.lineTotal)}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm">
            <Row label="Subtotale" value={formatCents(totals.subtotal)} muted />
            {totals.promoCents > 0 && (
              <Row label={`Promo -${totals.promoPercent}%`} value={`-${formatCents(totals.promoCents)}`} gold />
            )}
            {totals.codeCents > 0 && (
              <Row label="Codice sconto" value={`-${formatCents(totals.codeCents)}`} gold />
            )}
            {mode === "delivery" && (
              <Row
                label="Consegna"
                value={totals.deliveryFee === 0 ? "Gratis" : formatCents(totals.deliveryFee)}
                muted
              />
            )}
            {totals.tip > 0 && <Row label="Mancia" value={formatCents(totals.tip)} muted />}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-line pt-3 font-display text-lg">
            <span>Totale</span>
            <span className="text-gold">{formatCents(totals.total)}</span>
          </div>

          {totals.promoGift && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-gold/80">
              <Gift className="h-3.5 w-3.5" /> {totals.promoGift} incluso
            </p>
          )}

          {valid ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--wa)] py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-background transition-transform active:scale-[0.98]"
            >
              Conferma su WhatsApp
            </a>
          ) : (
            <button
              disabled
              className="mt-5 w-full cursor-not-allowed rounded-full border border-line bg-surface py-3.5 text-sm uppercase tracking-[0.15em] text-muted/60"
            >
              Completa i campi richiesti
            </button>
          )}
          <p className="mt-3 text-center text-[0.65rem] leading-relaxed text-muted/70">
            L&apos;ordine viene confermato in chat. Prezzi salvo errori. Demo senza pagamento reale.
          </p>
        </div>
      </aside>
    </div>
  );
}

/* ───────── primitives ───────── */

const inputCls =
  "w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted/50 focus:border-gold/50";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 font-display text-base text-foreground">{title}</h2>
      {children}
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      {children}
    </label>
  );
}

function ChoiceCard({
  active,
  onClick,
  icon,
  title,
  subtitle,
  disabled,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex flex-col gap-1.5 rounded-2xl border p-4 text-left transition-all disabled:cursor-not-allowed disabled:opacity-40",
        active
          ? "border-gold bg-gold/10 text-foreground"
          : "border-line bg-surface text-muted hover:border-gold/40",
      )}
    >
      <span className={cn(active ? "text-gold" : "text-muted")}>{icon}</span>
      <span className="text-sm font-medium text-foreground">{title}</span>
      <span className="text-xs text-muted">{subtitle}</span>
    </button>
  );
}

function TimePill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-1.5 text-xs transition-colors",
        active
          ? "border-gold bg-gold text-background"
          : "border-line bg-surface text-muted hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function Row({
  label,
  value,
  muted,
  gold,
}: {
  label: string;
  value: string;
  muted?: boolean;
  gold?: boolean;
}) {
  return (
    <div className={cn("flex justify-between", gold ? "text-gold" : muted ? "text-muted" : "")}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
