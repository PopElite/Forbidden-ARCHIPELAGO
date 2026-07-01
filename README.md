# Forbidden Archipelago

Premium 2D browser game architecture: a modern Game Boy/GBA-inspired action adventure rendered through Phaser 3, with React reserved for the console shell UI and a minimal Node backend for development APIs.

## Architecture

- `frontend/src/engine` contains Phaser scenes and gameplay systems: boot/preload/world scenes, cinematic camera, input, combat, enemy AI, level construction, atmosphere, and generated atlas bootstrapping.
- `frontend/src/ui` contains React-only shell UI: HUD and menus layered above the canvas.
- `frontend/src/data` contains biome/level data that is transformed into living Phaser levels.
- `backend/src` contains the Node HTTP API for health and game state endpoints.
- `docs/ASSET_PIPELINE.md` and `docs/VISUAL_QUALITY_CHECKLIST.md` define the production art pipeline and visual bar.

## Commands

```bash
npm run dev
npm run dev:backend
npm run build
npm run lint
```

## Gameplay features

- Phaser 3 renderer and Arcade Physics at a fixed 60 FPS target.
- Cinematic camera smoothing, dead zone, dynamic zoom, contextual shake, and fade-ready zone transitions.
- Living Green Continent level with parallax, atmospheric depth, dust, local lights, interactive crystals/waterfalls/lanterns, enemies, and premium console shell.
- Player controller with jump, dash, combo attack, cancel window, iframes, squash/stretch, mana spend, and gold rewards.
- Combat director with active hit windows, hitstop, hitflash, knockback, stun, localized impact FX, and camera feedback.
- Enemy brains with idle, chase, combat, and stun states ready for pattern variation/pathfinding expansion.
