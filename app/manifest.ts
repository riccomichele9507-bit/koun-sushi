import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Koun Sushi",
    short_name: "Koun Sushi",
    description: "Sushi d'autore d'asporto a Molfetta. Ordina su WhatsApp.",
    // L'app si apre sempre sulla home page
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0a0a0c",
    theme_color: "#0a0a0c",
    lang: "it",
    icons: [
      {
        src: "/menu/hero.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
