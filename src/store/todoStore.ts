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
  setCategory: (name: string) => void;
  markAsNotified: (id: string) => void;
  editTodo: (id: string, newText: string, newDeadline?: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categories: string[];
  addCategory: (name: string) => void;
  editCategory: (oldName: string, newName: string) => void;
  deleteCategory: (name: string) => void;
};

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      categories: ["General"],
      currentCategory: "General",
      addCategory: (name) =>
        set((state) => {
          if (!state.categories.includes(name)) {
            return { categories: [...state.categories, name] };
          }
          return state;
        }),

      setCategory: (name) => set({ currentCategory: name }),
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
      searchTerm: "",
      setSearchTerm: (term) => set({ searchTerm: term }),
      editCategory: (oldName, newName) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat === oldName ? newName : cat
          ),
          todos: state.todos.map((todo) =>
            todo.category === oldName ? { ...todo, category: newName } : todo
          ),
          currentCategory:
            state.currentCategory === oldName ? newName : state.currentCategory,
        })),

      deleteCategory: (name) =>
        set((state) => ({
          categories: state.categories.filter((cat) => cat !== name),
          todos: state.todos.filter((todo) => todo.category !== name),
          currentCategory:
            state.currentCategory === name ? "General" : state.currentCategory,
        })),
    }),

    {
      name: "todo-storage", // key برای ذخیره در localStorage
      partialize: (state) => ({
        todos: state.todos,
        categories: state.categories,
        currentCategory: state.currentCategory,
      }), // فقط todos ذخیره شود
    }
  )
);
