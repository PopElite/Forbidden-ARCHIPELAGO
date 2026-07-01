# Forbidden Archipelago

Production-ready framework-free canvas boilerplate for a 2D floating-island action RPG prototype.

## Features

- Fixed-timestep game loop with canvas rendering.
- Keyboard plus PS3/PS4/PS5-compatible gamepad input abstraction.
- Gravity, coyote-time jumping, dash movement, AABB collision, one-way and slippery platforms.
- Entity system for player and enemies.
- Combat hitbox/hurtbox evaluation, cooldowns, health, gold rewards, and event log.
- Lightweight observable stores for HUD/world state synchronization.
- Responsive HUD, pause menu, world map, and overlay structure.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Controls

- Move: `A/D` or arrow keys
- Jump: `Space` / `W` / PlayStation Cross
- Attack: `J` / PlayStation Square or R1 compatibility binding
- Dash: `K` / `Shift` / PlayStation Circle or L1 compatibility binding
- Pause: `Esc` / Options
