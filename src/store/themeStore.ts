// src/store/themeStore.ts
import { create } from "zustand";

interface ThemeState {
  darkMode: boolean;
  toggleTheme: () => void;
  setTheme: (dark: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  darkMode: false,
  toggleTheme: () =>
    set((state) => {
      const newMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));
      return { darkMode: newMode };
    }),
  setTheme: (dark) => set({ darkMode: dark }),
}));
