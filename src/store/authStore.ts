import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useTodoStore } from "./todoStore";

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
        const existingUser = get().users.find((u) => u.username === username);
        if (existingUser) return false; // کاربر تکراری است

        const newUser = { username, password };
        const updatedUsers = [...get().users, newUser];

        set({
          users: updatedUsers,
          currentUser: username,
        });

        // همگام‌سازی با todoStore
        useTodoStore.getState().setCurrentUser(username);

        return true;
      },
      login: (username, password) => {
        const found = get().users.find(
          (u) => u.username === username && u.password === password
        );
        if (found) {
          set({ currentUser: username });
          useTodoStore.getState().setCurrentUser(username); // sync with todo store
          return true;
        }
        return false;
      },

      logout: () => {
        set({ currentUser: null });
        useTodoStore.getState().setCurrentUser(null);
      },
    }),
    { name: "auth-storage" }
  )
);
