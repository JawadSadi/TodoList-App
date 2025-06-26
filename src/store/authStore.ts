import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  currentUser: string | null;
  users: { username: string; password: string }[];
  login: (username: string, password: string) => boolean;
  signup: (username: string, password: string) => boolean;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: [],

      signup: (username, password) => {
        const exists = get().users.find((u) => u.username === username);
        if (exists) return false;

        set((state) => ({
          users: [...state.users, { username, password }],
          currentUser: username,
        }));
        return true;
      },

      login: (username, password) => {
        const found = get().users.find(
          (u) => u.username === username && u.password === password
        );
        if (found) {
          set({ currentUser: username });
          return true;
        }
        return false;
      },

      logout: () => set({ currentUser: null }),
    }),
    { name: "auth-storage" }
  )
);
