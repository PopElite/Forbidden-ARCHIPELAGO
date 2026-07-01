# Forbidden Archipelago Asset Pipeline

## Target look

- Pixel art HD authored at 24x24 / 32x32 / 48x48 source cells, presented with integer scaling and modern post-style composition.
- Palette per biome: sky, foliage, mineral glow, enemy accent, ambient shadow.
- Export sprites as packed atlases with JSON metadata before production. The first playable ships with a runtime-authored pixel atlas so the scene has coherent art direction immediately; production packs can replace the same texture keys without gameplay rewrites.

## Pipeline

1. Source art in Aseprite or LibreSprite.
2. Export character/enemy frames into `frontend/src/assets/source`.
3. Pack production atlases into `frontend/public/atlases` with TexturePacker or Free Texture Packer.
4. Load atlases in `PreloadScene` and replace the procedural atlas keys without changing gameplay systems.
5. Validate frame tags: `idle`, `run`, `jump`, `fall`, `dash`, `attack_anticipation`, `attack_active`, `attack_recovery`, `hurt`, `death`.

## Optimization requirements

- Batch by atlas and depth group.
- Use object pools for impact FX, dust, and hit sparks.
- Lazy-load biome-specific atlases at scene transition boundaries.
- Cull enemies, particles, and interactives outside the camera safety margin.
