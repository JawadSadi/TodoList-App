// src/components/CompletedTasks.tsx
import { useTodoStore } from "../store/todoStore";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";
import { isSameDay } from "date-fns";

export default function CompletedTasks() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const todosByUser = useTodoStore((s) => s.todosByUser);
  const todos = todosByUser[currentUser ?? ""] || [];
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // فقط تسک‌هایی که تکمیل شده‌اند و تاریخ تکمیل دارند
  const completedTodos = todos.filter(
    (todo) => todo.completed && todo.completedAt
  );

  // گروه‌بندی تسک‌های تکمیل‌شده بر اساس تاریخ
  const grouped = completedTodos.reduce((acc, todo) => {
    const dateStr = new Date(todo.completedAt!).toDateString();
    acc[dateStr] = acc[dateStr] ? [...acc[dateStr], todo] : [todo];
    return acc;
  }, {} as Record<string, typeof completedTodos>);

  // تسک‌هایی که با تاریخ انتخاب‌شده مطابقت دارند
  const filtered =
    selectedDate &&
    completedTodos.filter((todo) =>
      isSameDay(new Date(todo.completedAt!), selectedDate)
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">✅ Completed Tasks</h2>

      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(grouped).map((dateStr) => (
          <button
            key={dateStr}
            onClick={() => setSelectedDate(new Date(dateStr))}
            className={`px-4 py-2 rounded text-sm transition ${
              selectedDate?.toDateString() === dateStr
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {dateStr}
          </button>
        ))}
      </div>

      {selectedDate && (
        <div className="bg-white dark:bg-gray-800 rounded p-4 shadow">
          <h3 className="text-lg font-semibold mb-3">
            Tasks completed on {selectedDate.toDateString()}
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {filtered && filtered.length > 0 ? (
              filtered.map((todo) => <li key={todo.id}>{todo.text}</li>)
            ) : (
              <p className="text-sm text-gray-500">No tasks found.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
