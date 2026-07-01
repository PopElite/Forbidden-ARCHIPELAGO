export const initialGameState = {
  player: { health: 100, mana: 74, gold: 24500, location: 'green-continent-01' },
  unlockedLevels: ['green-continent-01'],
  inventory: [{ id: 'heal-potion', name: 'Heal Potion', quantity: 3 }],
};

let gameState = structuredClone(initialGameState);

export function getGameState() { return gameState; }
export function patchGameState(patch) { gameState = { ...gameState, ...patch, player: { ...gameState.player, ...(patch.player ?? {}) } }; return gameState; }
export function resetGameState() { gameState = structuredClone(initialGameState); return gameState; }
