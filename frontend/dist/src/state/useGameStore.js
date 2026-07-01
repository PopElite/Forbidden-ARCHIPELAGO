import { create } from 'zustand';

export const useGameStore = create((set) => ({
  paused: false, route: 'world', events: ['Dragon-Man challenges you!', 'Zombie approaches!', 'Ready for fight!'],
  setPaused: (paused) => set({ paused }),
  pushEvent: (event) => set((state) => ({ events: [...state.events.slice(-4), event] })),
}));
