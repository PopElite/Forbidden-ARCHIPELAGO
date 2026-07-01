import { create } from 'zustand';

export const usePlayerStore = create((set) => ({
  health: 100, mana: 74, gold: 24500,
  cooldowns: { dash: 0, hook: 0, spin: 0 },
  setSnapshot: (snapshot) => set(snapshot),
}));
