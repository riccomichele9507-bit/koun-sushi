import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  kicker?: string;
  title: string;
  href?: string;
  hrefLabel?: string;
}

export function SectionHeading({ kicker, title, href, hrefLabel }: Props) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {kicker && (
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-gold/70">{kicker}</p>
        )}
        <h2 className="mt-1.5 font-display text-2xl text-foreground sm:text-3xl">{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className="group flex shrink-0 items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-muted transition-colors hover:text-gold"
        >
          {hrefLabel ?? "Tutti"}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
