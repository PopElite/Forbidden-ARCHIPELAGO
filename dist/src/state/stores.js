export function createGameStore() {
  let state = { paused: false, player: { health: 100, mana: 74, gold: 24500, cooldowns: { dash: 0, hook: 0, spin: 0 } }, enemies: [], events: ['Dragon-Man challenges you!', 'Zombie approaches!', 'Ready for fight!'] };
  const listeners = new Set();
  return { get: () => state, set: (patch) => { state = { ...state, ...patch }; listeners.forEach((fn) => fn(state)); }, pushEvent: (event) => { state = { ...state, events: [...state.events.slice(-4), event] }; listeners.forEach((fn) => fn(state)); }, subscribe: (fn) => { listeners.add(fn); return () => listeners.delete(fn); }, emit: () => listeners.forEach((fn) => fn(state)) };
}
