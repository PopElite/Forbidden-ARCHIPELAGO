import { create } from 'zustand';

export const useLevelStore = create((set) => ({
  levelId: 'green-continent-01', unlocked: ['green-continent-01'], enemies: [],
  setEnemies: (enemies) => set({ enemies }),
}));
