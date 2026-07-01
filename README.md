# Forbidden Archipelago

Production-ready frontend/backend boilerplate for a 2D floating-island action RPG prototype.

## Project layout

- `frontend/` contains the browser game, UI components, canvas engine, assets, and static build output.
- `backend/` contains the Node.js API for health checks and persisted game-state endpoints.
- `scripts/` contains root-level build, dev-server, and lint helpers.

## Features

- Fixed-timestep game loop with canvas rendering.
- Keyboard plus PS3/PS4/PS5-compatible gamepad input abstraction.
- Gravity, coyote-time jumping, dash movement, AABB collision, one-way and slippery platforms.
- Entity system for player and enemies.
- Combat hitbox/hurtbox evaluation, cooldowns, health, gold rewards, and event log.
- Lightweight observable stores for HUD/world state synchronization.
- Responsive HUD, pause menu, world map, and overlay structure.
- Backend API endpoints for `/api/health`, `/api/state`, and `/api/state/reset`.

## Commands

```bash
npm install
npm run dev:frontend
npm run dev:backend
npm run build
npm run lint
```

## Controls

- Move: `A/D` or arrow keys
- Jump: `Space` / `W` / PlayStation Cross
- Attack: `J` / PlayStation Square or R1 compatibility binding
- Dash: `K` / `Shift` / PlayStation Circle or L1 compatibility binding
- Pause: `Esc` / Options
