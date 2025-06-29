import { motion } from "framer-motion";
import { useState } from "react";
import { useTodoStore } from "../store/todoStore";
import { format } from "date-fns";
import type { Todo } from "../types/todo";
import ConfirmDialog from "./ConfirmDialog";
import { FaPen, FaTrash } from "react-icons/fa";

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

  const [dialog, setDialog] = useState<null | {
    action: "delete" | "complete";
    todoId: string;
  }>(null);

  // حالت محلی چک‌باکس برای کنترل بصری
  const [checked, setChecked] = useState(todo.completed);

  // وقتی کاربر روی چک‌باکس کلیک می‌کند، ابتدا دیالوگ تایید باز شود
  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault(); // جلوگیری از تغییر مستقیم چک‌باکس
    if (!checked) {
      // فقط وقتی می‌خواهیم تسک را تکمیل کنیم، تایید بگیریم
      setDialog({ action: "complete", todoId: todo.id });
    } else {
      // اگر می‌خواهیم تیک را برداریم (برگرداندن به حالت انجام نشده) بدون تایید مستقیم انجام می‌شود
      toggleTodo(todo.id);
      setChecked(false);
    }
  };

  // بعد از تایید دیالوگ
  const handleConfirm = () => {
    if (!dialog) return;

    if (dialog.action === "delete") {
      deleteTodo(dialog.todoId);
    } else if (dialog.action === "complete") {
      toggleTodo(dialog.todoId);
      setChecked(true);
    }
    setDialog(null);
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
            <label className="flex items-center gap-2 flex-1 cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                onChange={onCheckboxChange}
                className="w-5 h-5 cursor-pointer"
              />
              <span
                className={`${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.text}
              </span>
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-700"
                title="Edit task"
              >
                <FaPen color="grey" cursor={"pointer"} size={18} />
              </button>
              <button
                onClick={() => setDialog({ action: "delete", todoId: todo.id })}
                className="text-red-600 hover:underline text-sm"
                title="Delete task"
              >
                <FaTrash size={18} cursor={"pointer"} />
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
          <ConfirmDialog
            isOpen={dialog !== null}
            title={
              dialog?.action === "delete" ? "Delete Task" : "Complete Task"
            }
            message={
              dialog?.action === "delete"
                ? "Are you sure you want to delete this task?"
                : "Are you sure you completed this task?"
            }
            onConfirm={handleConfirm}
            onCancel={() => setDialog(null)}
          />
        </>
      )}
    </motion.li>
  );
}
