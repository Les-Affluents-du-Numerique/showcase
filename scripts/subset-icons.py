#!/usr/bin/env python3
"""Régénère public/fonts/material-symbols-subset.woff2 à partir de la police
complète, en ne gardant que les icônes utilisées dans src/.

Usage : pip install fonttools brotli uharfbuzz && python3 scripts/subset-icons.py
"""
import os
import pathlib
import re
import sys
import tempfile

import uharfbuzz as hb
from fontTools.subset import Options, Subsetter, load_font, save_font
from fontTools.ttLib import TTFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC_FONT = ROOT / "src/assets/fonts/material-symbols-outlined.woff2"
OUT_FONT = ROOT / "public/fonts/material-symbols-subset.woff2"

# Détection des icônes utilisées dans le code source.
PATTERNS = [
    r'material-symbols-outlined[^>]*>\s*([a-z_0-9]+)\s*<',  # texte du span
    r'data-icon="([a-z_0-9]+)"',                            # attribut data-icon
    r"icon:\s*['\"]([a-z_0-9]+)['\"]",                      # champs icon: '...'
]

icons = set()
for path in ROOT.joinpath("src").rglob("*"):
    if path.suffix in (".astro", ".ts", ".mdx", ".md", ".js"):
        text = path.read_text(errors="ignore")
        for pat in PATTERNS:
            icons.update(re.findall(pat, text))

if not icons:
    sys.exit("Aucune icône détectée — vérifier les patterns.")
print(f"{len(icons)} icônes : {sorted(icons)}")

# Shaping avec harfbuzz pour trouver le glyphe ligature de chaque icône.
tt = TTFont(SRC_FONT)
tt.flavor = None
with tempfile.NamedTemporaryFile(suffix=".ttf", delete=False) as tmp:
    tt.save(tmp.name)
    hbfont = hb.Font(hb.Face(hb.Blob.from_file_path(tmp.name)))
os.unlink(tmp.name)

order = tt.getGlyphOrder()
keep = set()
for name in sorted(icons):
    buf = hb.Buffer()
    buf.add_str(name)
    buf.guess_segment_properties()
    hb.shape(hbfont, buf)
    gids = [i.codepoint for i in buf.glyph_infos]
    if len(gids) != 1 or gids[0] == 0:
        sys.exit(f"Ligature introuvable pour « {name} » — icône inexistante ?")
    keep.add(order[gids[0]])

# Subset : lettres (composition des ligatures) + glyphes cibles, sans fermeture GSUB.
opts = Options()
opts.layout_features = ["rlig", "rclt"]
opts.layout_closure = False
opts.flavor = "woff2"
opts.notdef_outline = True
font = load_font(str(SRC_FONT), opts)
subsetter = Subsetter(opts)
subsetter.populate(text="".join(set("".join(icons))), glyphs=keep)
subsetter.subset(font)
OUT_FONT.parent.mkdir(parents=True, exist_ok=True)
save_font(font, str(OUT_FONT), opts)
print(f"OK → {OUT_FONT} ({OUT_FONT.stat().st_size} octets, {font['maxp'].numGlyphs} glyphes)")
