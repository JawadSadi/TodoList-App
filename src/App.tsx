// src/App.tsx

import { useEffect } from "react";
import Sidebar from "./components/SideBar";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { useTodoStore } from "./store/todoStore";

export default function App() {
  const todos = useTodoStore((state) => state.todos);
  const markAsNotified = useTodoStore((state) => state.markAsNotified);

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      todos.forEach((todo) => {
        const deadlineTime = todo.deadline
          ? new Date(todo.deadline).getTime()
          : 0;
        const nowTime = now.getTime();

        const isDueNow =
          todo.deadline &&
          !todo.completed &&
          !todo.notified && // 🔹 فقط اگه قبلاً نوتیف نشده
          deadlineTime - nowTime <= 5 * 60 * 1000 &&
          deadlineTime >= nowTime;

        if (isDueNow) {
          showNotification(todo.text);
          markAsNotified(todo.id);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [todos]);

  const showNotification = (text: string) => {
    if (Notification.permission === "granted") {
      new Notification("⏰ Task Reminder", {
        body: `Don't forget: ${text}`,
        icon: "/icon.png", // اگر آیکون دلخواه داری
      });
    }
  };
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-white overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
        <TodoInput />
        <TodoList />
      </main>
    </div>
  );
}
