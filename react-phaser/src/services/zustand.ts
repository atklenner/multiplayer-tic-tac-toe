import { create } from "zustand";

interface ReactStore {
  login: boolean;
  pickGame: boolean;
  gameOver: boolean;
  toggleLogin: () => void;
  togglePickGame: () => void;
  toggleGameOver: () => void;
}

const reactStore = create<ReactStore>()((set) => ({
  login: true,
  pickGame: false,
  gameOver: false,
  toggleLogin: () => set((state) => ({ login: !state.login })),
  togglePickGame: () => set((state) => ({ pickGame: !state.pickGame })),
  toggleGameOver: () => set((state) => ({ gameOver: !state.gameOver })),
}));

export default reactStore;
