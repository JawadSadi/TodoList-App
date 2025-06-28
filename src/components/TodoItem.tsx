import { motion } from "framer-motion";
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

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col border-b py-3 px-3 rounded-lg shadow-sm ${
        isOverdue ? "bg-red-200" : isToday ? "bg-yellow-200" : "bg-green-200"
      }`}
    >
      {isEditing ? (
        <>
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="px-2 py-1 border rounded w-full mb-2"
          />
          <input
            type="datetime-local"
            value={newDeadline}
            onChange={(e) => setNewDeadline(e.target.value)}
            className="px-2 py-1 border rounded w-full mb-2"
          />
          <div className="flex gap-2">
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
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <span
              onClick={() => toggleTodo(todo.id)}
              className={`cursor-pointer flex-1 ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
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
          <div className="text-xs text-gray-500 mt-1">
            {format(new Date(todo.createdAt), "yyyy-MM-dd HH:mm")}
            {todo.deadline && (
              <span className={`ml-2 ${isOverdue ? "text-red-500" : ""}`}>
                | Deadline:{" "}
                {format(new Date(todo.deadline), "yyyy-MM-dd HH:mm")}
              </span>
            )}
          </div>
        </>
      )}
    </motion.li>
  );
}
