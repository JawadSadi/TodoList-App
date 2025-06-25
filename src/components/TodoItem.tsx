// src/components/TodoItem.tsx

import { useTodoStore } from "../store/todoStore";
import type { Todo } from "../types/todo";

export default function TodoItem({ todo }: { todo: Todo }) {
  const { toggleTodo, deleteTodo } = useTodoStore();

  return (
    <li className="flex items-center justify-between border-b py-2">
      <span
        className={`flex-1 cursor-pointer ${
          todo.completed ? "line-through text-gray-500" : ""
        }`}
        onClick={() => toggleTodo(todo.id)}
      >
        {todo.text}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-500 hover:text-red-700 ml-4"
      >
        ✕
      </button>
    </li>
  );
}
