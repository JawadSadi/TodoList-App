// store/todoStore.ts
import { create } from "zustand";
import type { Todo } from "../types/todo";

type TodoState = {
  todos: Todo[];
  addTodo: (text: string, category: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  setCategory: (cat: string) => void;
  currentCategory: string;
};

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  currentCategory: "Today",
  addTodo: (text, category) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: crypto.randomUUID(),
          text,
          completed: false,
          createdAt: Date.now(),
          category,
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
}));
