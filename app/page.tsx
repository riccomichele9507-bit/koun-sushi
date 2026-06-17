import { Hero } from "@/components/home/Hero";
import { PromoBanner } from "@/components/home/PromoBanner";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedRail } from "@/components/home/FeaturedRail";
import { FixedMenus } from "@/components/home/FixedMenus";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="mx-auto max-w-5xl space-y-16 px-4 py-14">
        <PromoBanner />

        <section>
          <SectionHeading
            kicker="Selezione"
            title="Le firme dello chef"
            href="/menu"
            hrefLabel="Vedi menu"
          />
          <FeaturedRail />
        </section>

        <section>
          <SectionHeading kicker="Esplora" title="Le categorie" href="/menu" />
          <CategoryGrid />
        </section>

        <section>
          <SectionHeading kicker="All you can eat" title="Menù fissi" />
          <FixedMenus />
        </section>
      </div>
    </>
  );
}
