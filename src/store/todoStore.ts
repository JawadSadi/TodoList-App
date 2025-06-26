// src/store/todoStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Todo } from "../types/todo";

type TodoState = {
  todos: Todo[];
  currentCategory: string;
  addTodo: (text: string, category: string, deadline?: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setCategory: (cat: string) => void;
  markAsNotified: (id: string) => void;
  editTodo: (id: string, newText: string, newDeadline?: string) => void;
};

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      currentCategory: "Today",
      addTodo: (text, category, deadline) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: crypto.randomUUID(),
              text,
              completed: false,
              createdAt: Date.now(),
              category,
              deadline,
              notified: false,
            },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      setCategory: (cat) => set({ currentCategory: cat }),
      markAsNotified: (id: string) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, notified: true } : todo
          ),
        })),
      editTodo: (id, newText, newDeadline) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  text: newText,
                  deadline: newDeadline,
                  notified: false, // چون deadline تغییر کرده، یادآوری دوباره فعال شود
                }
              : todo
          ),
        })),
    }),

    {
      name: "todo-storage", // key برای ذخیره در localStorage
      partialize: (state) => ({ todos: state.todos }), // فقط todos ذخیره شود
    }
  )
);
