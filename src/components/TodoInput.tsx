// src/components/TodoInput.tsx
import { useState } from "react";
import { useTodoStore } from "../store/todoStore";

export default function TodoInput() {
  const [text, setText] = useState("");
  const { addTodo, currentCategory } = useTodoStore();

  const handleAdd = () => {
    if (text.trim()) {
      addTodo(text, currentCategory);
      setText("");
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={text}
        placeholder={`Add a task to ${currentCategory}`}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        className="flex-1 px-3 py-2 border rounded"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-4 rounded"
      >
        Add
      </button>
    </div>
  );
}
