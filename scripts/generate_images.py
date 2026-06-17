#!/usr/bin/env python3
"""
Genera il set curato di foto piatto per Koun Sushi via kie.ai / Nano Banana 2.

Richiama lo script della skill `nano-banana-images`:
    ~/.claude/skills/nano-banana-images/scripts/generate_image.py

Stile: food photography premium, fondo scuro elegante (brand nero+oro Koun),
4:3, risoluzione 1K (costo minimo). Salta i file gia' presenti (> 10 KB).

Uso:
    python scripts/generate_images.py            # genera tutto il set
    python scripts/generate_images.py --only 32,110,hero
    python scripts/generate_images.py --list     # elenca i job senza generare
"""

import argparse
import subprocess
import sys
from pathlib import Path

GEN_SCRIPT = Path.home() / ".claude" / "skills" / "nano-banana-images" / "scripts" / "generate_image.py"
OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "menu"

STYLE = (
    "Premium Japanese fine-dining food photography, plated on dark slate or matte black "
    "ceramic, moody low-key lighting with a warm golden rim light, shallow depth of field, "
    "45-degree angle, elegant minimal composition, subtle steam, fresh and glossy. "
    "Luxury restaurant editorial look, black background."
)
NEGATIVE = (
    "Negative prompt: no text, no watermark, no logo, no caption, no price tag, no UI, "
    "no plastic, no fake food, no oversaturation, no cartoon, no anime, no hands, "
    "no cutlery clutter, no bright white background."
)

# (filename, soggetto)
JOBS = [
    ("hero.png", "a stunning assortment of premium sushi rolls and nigiri on a long black slate board, salmon, tuna, avocado, tobiko, gold accents"),
    ("7.png", "a bowl of steamed edamame soybean pods sprinkled with sea salt"),
    ("12.png", "four pan-fried Japanese gyoza dumplings with dipping sauce"),
    ("15.png", "a gua bao bun filled with grilled salmon, lettuce, sesame and teriyaki"),
    ("17.png", "two takoyaki octopus balls drizzled with teriyaki and mayo, bonito flakes"),
    ("22.png", "five slices of fresh salmon sashimi on crushed ice with shiso leaf"),
    ("25.png", "mixed sashimi platter, salmon tuna white fish and prawn on ice"),
    ("26.png", "salmon carpaccio thin slices with sesame, ponzu and microgreens on a long plate"),
    ("32.png", "salmon tartare with avocado and crispy onion, ponzu, sesame, fine dining plating"),
    ("36.png", "a poke bowl with rice, prawns, salmon, avocado, wakame and teriyaki"),
    ("37.png", "a poke bowl with salmon, avocado, mango, prawns and pistachio crumble"),
    ("39.png", "two salmon nigiri sushi pieces, glossy fresh salmon over rice"),
    ("60.png", "a temaki hand roll cone with salmon and avocado, nori seaweed"),
    ("67.png", "a black rice temaki cone with tempura prawn, avocado and philadelphia, soy wrap"),
    ("73.png", "two sushi spoon canapes with salmon and philadelphia cream"),
    ("82.png", "two gunkan sushi topped with orange flying fish roe tobiko"),
    ("88.png", "uramaki rolls with salmon and avocado, sesame coated rice outside"),
    ("94.png", "rainbow roll uramaki topped with assorted fish slices, colorful"),
    ("110.png", "dragon roll uramaki with tempura prawn, avocado and tobiko, teriyaki glaze"),
    ("116.png", "lemon roll with seared salmon, philadelphia and lemon sauce, elegant"),
    ("132.png", "black venere rice roll topped with salmon, philadelphia and avocado inside"),
    ("148.png", "a crispy taco shell filled with salmon tartare, avocado, spicy sauce and tobiko"),
    ("152.png", "ebi tempura, golden crispy fried prawns with dipping sauce"),
    ("158.png", "two grilled yakitori chicken skewers with glaze"),
    ("170.png", "yaki soba stir-fried buckwheat noodles with prawns, surimi and vegetables"),
    ("180.png", "stir-fried chicken with thai basil, peppers and onion in a bowl"),
    ("dol-mochi.png", "two matcha green tea mochi ice cream dessert pieces dusted with powder"),
    ("bev-peroni-66.png", "a tall bottle of italian lager beer with condensation, dark moody backdrop"),
    ("bev-asahi-33.png", "a cold bottle of japanese asahi style lager beer, dark elegant backdrop"),
    ("vin-calafuria.png", "an elegant bottle of pale rose wine with two glasses, dark luxury backdrop"),
    ("vin-argivo.png", "an elegant bottle of red primitivo wine with a glass, dark luxury backdrop"),
]


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", help="CSV di filename senza estensione (es. 32,110,hero)")
    parser.add_argument("--list", action="store_true", help="elenca i job e termina")
    parser.add_argument("--resolution", default="1K", choices=["1K", "2K", "4K"])
    args = parser.parse_args()

    jobs = JOBS
    if args.only:
        keys = {k.strip() for k in args.only.split(",")}
        jobs = [j for j in JOBS if Path(j[0]).stem in keys]

    if args.list:
        for f, subj in jobs:
            print(f"{f:24} {subj}")
        print(f"\nTotale: {len(jobs)} immagini")
        return 0

    if not GEN_SCRIPT.exists():
        print(f"[ERRORE] Script skill non trovato: {GEN_SCRIPT}")
        print("Installa/abilita la skill nano-banana-images.")
        return 1

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    total = len(jobs)
    for i, (filename, subject) in enumerate(jobs, 1):
        out = OUT_DIR / filename
        if out.exists() and out.stat().st_size > 10_000:
            print(f"[{i}/{total}] {filename} gia' presente — skip")
            continue
        prompt = f"{STYLE} Subject: {subject}. {NEGATIVE}"
        print(f"[{i}/{total}] genero {filename} …")
        res = subprocess.run(
            [
                sys.executable, str(GEN_SCRIPT),
                "--prompt", prompt,
                "--output", str(out),
                "--aspect", "4:3",
                "--resolution", args.resolution,
            ],
        )
        if res.returncode != 0:
            print(f"   ! errore su {filename} (exit {res.returncode})")

    print("\nFatto.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
