// src/store/todoStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Todo } from "../types/todo";

type TodosByUser = Record<string, Todo[]>;
type CategoriesByUser = Record<string, string[]>;

type TodoState = {
  currentUser: string | null;
  todosByUser: TodosByUser;
  categoriesByUser: CategoriesByUser;
  currentCategory: string;
  searchTerm: string;

  setCurrentUser: (username: string | null) => void;
  getTodos: () => Todo[];
  getCategories: () => string[];

  addTodo: (text: string, category: string, deadline?: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  markAsNotified: (id: string) => void;
  editTodo: (id: string, newText: string, newDeadline?: string) => void;

  setCategory: (name: string) => void;
  setSearchTerm: (term: string) => void;

  addCategory: (name: string) => void;
  editCategory: (oldName: string, newName: string) => void;
  deleteCategory: (name: string) => void;
};

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      todosByUser: {},
      categoriesByUser: {},
      currentCategory: "General",
      searchTerm: "",

      setCurrentUser: (username) => set({ currentUser: username }),

      getTodos: () => {
        const user = get().currentUser;
        return user ? get().todosByUser[user] || [] : [];
      },

      getCategories: () => {
        const user = get().currentUser;
        return user ? get().categoriesByUser[user] || ["General"] : ["General"];
      },

      setSearchTerm: (term) => set({ searchTerm: term }),

      setCategory: (name) => set({ currentCategory: name }),

      addTodo: (text, category, deadline) => {
        const user = get().currentUser;
        if (!user) return;
        const todos = get().todosByUser[user] || [];

        const newTodo: Todo = {
          id: crypto.randomUUID(),
          text,
          category,
          deadline,
          completed: false,
          createdAt: Date.now(),
          notified: false,
        };

        set((state) => ({
          todosByUser: {
            ...state.todosByUser,
            [user]: [...todos, newTodo],
          },
        }));
      },

      toggleTodo: (id) => {
        const user = get().currentUser;
        if (!user) return;
        const todos = get().todosByUser[user] || [];
        set((state) => ({
          todosByUser: {
            ...state.todosByUser,
            [user]: todos.map((t) =>
              t.id === id ? { ...t, completed: !t.completed } : t
            ),
          },
        }));
      },

      deleteTodo: (id) => {
        const user = get().currentUser;
        if (!user) return;
        const todos = get().todosByUser[user] || [];
        set((state) => ({
          todosByUser: {
            ...state.todosByUser,
            [user]: todos.filter((t) => t.id !== id),
          },
        }));
      },

      markAsNotified: (id) => {
        const user = get().currentUser;
        if (!user) return;
        const todos = get().todosByUser[user] || [];
        set((state) => ({
          todosByUser: {
            ...state.todosByUser,
            [user]: todos.map((t) =>
              t.id === id ? { ...t, notified: true } : t
            ),
          },
        }));
      },

      editTodo: (id, newText, newDeadline) => {
        const user = get().currentUser;
        if (!user) return;
        const todos = get().todosByUser[user] || [];
        set((state) => ({
          todosByUser: {
            ...state.todosByUser,
            [user]: todos.map((t) =>
              t.id === id
                ? {
                    ...t,
                    text: newText,
                    deadline: newDeadline,
                    notified: false,
                  }
                : t
            ),
          },
        }));
      },

      addCategory: (name) => {
        const user = get().currentUser;
        if (!user) return;
        const cats = get().categoriesByUser[user] || ["General"];
        if (!cats.includes(name)) {
          set((state) => ({
            categoriesByUser: {
              ...state.categoriesByUser,
              [user]: [...cats, name],
            },
          }));
        }
      },

      editCategory: (oldName, newName) => {
        const user = get().currentUser;
        if (!user) return;

        const categories = get().categoriesByUser[user] || ["General"];
        const todos = get().todosByUser[user] || [];

        set((state) => ({
          categoriesByUser: {
            ...state.categoriesByUser,
            [user]: categories.map((c) => (c === oldName ? newName : c)),
          },
          todosByUser: {
            ...state.todosByUser,
            [user]: todos.map((t) =>
              t.category === oldName ? { ...t, category: newName } : t
            ),
          },
          currentCategory:
            state.currentCategory === oldName ? newName : state.currentCategory,
        }));
      },

      deleteCategory: (name) => {
        const user = get().currentUser;
        if (!user) return;

        const categories = get().categoriesByUser[user] || [];
        const todos = get().todosByUser[user] || [];

        set((state) => ({
          categoriesByUser: {
            ...state.categoriesByUser,
            [user]: categories.filter((c) => c !== name),
          },
          todosByUser: {
            ...state.todosByUser,
            [user]: todos.filter((t) => t.category !== name),
          },
          currentCategory:
            state.currentCategory === name ? "General" : state.currentCategory,
        }));
      },
    }),
    {
      name: "todo-storage",
    }
  )
);
