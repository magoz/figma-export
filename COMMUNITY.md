# Figma Community submission kit

Everything to paste into the publish dialog (desktop app → Plugins → Development →
figma-export → Publish).

## Assets

- Icon (128 × 128): `assets/icon.png`
- Cover (1920 × 960): `assets/cover.png`

## Name

```
figma-export
```

(If review flags the word "figma" in the name, fall back to: `Export DPI`.)

## Tagline

```
PNG export with real DPI metadata — prints at the exact physical size you designed
```

## Description

```
Figma tags every exported PNG as 72 DPI. If you design print artwork at 300 DPI pixel
dimensions — a 55 × 85 mm business card, a poster, a postcard — every print dialog
will size it roughly 4× too large, because the file claims to be 72 DPI.

figma-export fixes this at the source. It exports your selection as PNG and writes
real DPI metadata (the PNG pHYs chunk) directly into the file. Same pixels, correct
physical size. No terminal commands, no external tools, no re-processing.

HOW TO USE
1. Select the frame(s) to export
2. Run figma-export
3. Pick a DPI preset (72 / 150 / 300 / 600) or type a custom value
4. Check the live preview — it shows each frame's printed size in millimetres
5. Export. Print at 100% scale. The size is correct everywhere DPI is respected.

FEATURES
• DPI presets and custom values (1–10000)
• Export scale factor (0.1×–8×)
• Multi-selection export, files named after layers
• Live physical-size preview in mm for every selected frame
• Strips stale EXIF resolution that would override the DPI in some readers
• No network access — your design data never leaves Figma
• Free and open source (MIT): github.com/magoz/figma-export
```

## Category / tags

- Category: **Import & export**
- Tags: `export`, `print`, `dpi`, `png`, `resolution`, `print-ready`

## Support contact

```
https://github.com/magoz/figma-export/issues
```

## Review notes (if asked)

- Network access: none (declared in manifest)
- No data collection, no analytics, no external requests
- Source is public: https://github.com/magoz/figma-export
