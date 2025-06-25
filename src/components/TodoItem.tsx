// src/components/TodoItem.tsx

import { useTodoStore } from "../store/todoStore";
import { format } from "date-fns";
import type { Todo } from "../types/todo";

export default function TodoItem({ todo }: { todo: Todo }) {
  const { toggleTodo, deleteTodo } = useTodoStore();

  const isOverdue = todo.deadline && new Date(todo.deadline) < new Date();
  const isToday =
    todo.deadline &&
    new Date(todo.deadline).toDateString() === new Date().toDateString();

  return (
    <li
      className={`flex flex-col border-b py-2 ${
        isOverdue ? "bg-red-100" : isToday ? "bg-yellow-100" : ""
      }`}
    >
      <div className="flex justify-between items-center">
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
      </div>
      <div className="text-sm text-gray-600 mt-1">
        {todo.createdAt && (
          <span>
            Created: {format(new Date(todo.createdAt), "yyyy-MM-dd")}{" "}
          </span>
        )}
        {todo.deadline && (
          <span className="ml-2">
            Deadline:{" "}
            <span className={isOverdue ? "text-red-500" : ""}>
              {todo.deadline}
            </span>
          </span>
        )}
      </div>
    </li>
  );
}
