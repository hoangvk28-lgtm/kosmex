"""Generate responsive WebP assets from assets-src/ into public/images/.

Run: python3 scripts/process_images.py   (requires Pillow)
Writes src/content/images.generated.json with intrinsic sizes so <img>
tags always carry width/height (prevents layout shift).
"""
import json
from pathlib import Path
from PIL import Image

Image.MAX_IMAGE_PIXELS = None
ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets-src"
OUT = ROOT / "public" / "images"
WIDTHS = [640, 1200, 1920, 2560]

manifest = {}
OUT.mkdir(parents=True, exist_ok=True)

for f in sorted((SRC / "photos").glob("*.jpg")):
    im = Image.open(f).convert("RGB")
    w, h = im.size
    variants = []
    for tw in WIDTHS:
        if tw > w and variants:
            break
        tw = min(tw, w)
        th = round(h * tw / w)
        name = f"{f.stem}-{tw}.webp"
        im.resize((tw, th), Image.LANCZOS).save(OUT / name, "WEBP", quality=88, method=6)
        variants.append(tw)
    manifest[f.stem] = {"width": w, "height": h, "variants": variants}

# Film print artwork: the genuine 1250 x 2500 mm KOSMEX pattern.
pat = Image.open(SRC / "brand" / "film-pattern-1250x2500.png").convert("RGB")
for tw in (600, 1200):
    pat.resize((tw, tw * 2), Image.LANCZOS).save(OUT / f"film-pattern-{tw}.webp", "WEBP", quality=82, method=6)
manifest["film-pattern"] = {"width": 1200, "height": 2400, "variants": [600, 1200]}

# Open Graph image (1200x630) cropped from the film artwork.
og = pat.resize((1200, 2400), Image.LANCZOS).crop((0, 880, 1200, 1510))
og.save(ROOT / "public" / "og-kosmex-plywood.jpg", "JPEG", quality=84)

(ROOT / "src" / "content").mkdir(parents=True, exist_ok=True)
(ROOT / "src" / "content" / "images.generated.json").write_text(json.dumps(manifest, indent=2))
print(f"Processed {len(manifest)} images")
