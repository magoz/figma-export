# figma-export

Figma plugin that exports PNGs with **real DPI metadata**, so your prints come out at the right physical size.

## Why

Figma always tags exported PNGs as 72 DPI. If you design print artwork at 300 DPI pixel dimensions (e.g. a 55 × 85 mm business card = 650 × 1004 px), every print dialog will size it ~4× too large because the file *claims* to be 72 DPI.

This plugin exports your selection and rewrites the PNG's `pHYs` chunk with the DPI you actually designed for. Same pixels, correct physical size — no external tools needed.

It is the in-Figma equivalent of:

```bash
sips -s dpiWidth 300 -s dpiHeight 300 export.png   # macOS
```

## Features

- DPI presets (72 / 150 / 300 / 600) + custom value
- Export scale factor (0.1×–8×)
- Multi-selection: exports every selected node, named after its layer
- Live preview of pixel dimensions **and physical print size in mm** per selected frame
- Zero network access, zero dependencies at runtime

## Install (development plugin)

1. Clone this repo and build:

   ```bash
   git clone https://github.com/magoz/figma-export
   cd figma-export
   pnpm install
   pnpm build
   ```

2. In the Figma **desktop app**: `Plugins → Development → Import plugin from manifest…`
3. Select `manifest.json` from this directory.

A prebuilt `code.js` is committed, so steps 1's build is optional — clone and import is enough.

## Use

1. Select the frame(s) to export
2. `Plugins → Development → figma-export`
3. Pick a DPI (the mm size preview updates live), hit **Export PNG**
4. Print at 100% scale — the size is now correct anywhere DPI is respected

## How it works

A PNG stores physical density in an optional `pHYs` chunk (pixels per metre). The plugin controller (`code.ts`) exports raw PNG bytes via `exportAsync`; the UI (`ui.html`) walks the PNG chunk list, drops any existing `pHYs`, inserts one after `IHDR` with `round(dpi / 0.0254)` pixels/metre and a fresh CRC32, and downloads the result.

## License

MIT © [Magoz](https://github.com/magoz)
