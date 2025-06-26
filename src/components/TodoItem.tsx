import { useState } from "react";

import { useTodoStore } from "../store/todoStore";
import { format } from "date-fns";
import type { Todo } from "../types/todo";

export default function TodoItem({ todo }: { todo: Todo }) {
  const { toggleTodo, deleteTodo, editTodo } = useTodoStore();
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const [newDeadline, setNewDeadline] = useState(todo.deadline || "");

  const isOverdue = todo.deadline && new Date(todo.deadline) < new Date();
  const isToday =
    todo.deadline &&
    new Date(todo.deadline).toDateString() === new Date().toDateString();

  const handleSave = () => {
    if (newText.trim()) {
      editTodo(todo.id, newText, newDeadline);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <li className="border-b py-2 space-y-2">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className="w-full px-2 py-1 border rounded"
        />
        <input
          type="datetime-local"
          value={newDeadline}
          onChange={(e) => setNewDeadline(e.target.value)}
          className="w-full px-2 py-1 border rounded"
        />
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </li>
    );
  }

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
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700"
          >
            ✎
          </button>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-red-500 hover:text-red-700"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="text-sm text-gray-600 mt-1">
        Created: {format(new Date(todo.createdAt), "yyyy-MM-dd HH:mm")}
        {todo.deadline && (
          <span className={`ml-2 ${isOverdue ? "text-red-500" : ""}`}>
            | Deadline: {format(new Date(todo.deadline), "yyyy-MM-dd HH:mm")}
          </span>
        )}
      </div>
    </li>
  );
}
