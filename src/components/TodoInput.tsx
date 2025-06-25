// src/components/TodoInput.tsx
import { useState } from "react";
import { useTodoStore } from "../store/todoStore";

export default function TodoInput() {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const { addTodo, currentCategory } = useTodoStore();

  const handleAdd = () => {
    if (!text.trim()) return;
    addTodo(text, currentCategory, deadline);
    setText("");
    setDeadline("");
  };

  return (
    <div className="flex flex-col gap-3 mb-4">
      <input
        type="text"
        value={text}
        placeholder={`Add a task to ${currentCategory}`}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        className="px-3 py-2 border rounded"
      />
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="px-3 py-2 border rounded"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded w-fit"
      >
        Add Task
      </button>
    </div>
  );
}
