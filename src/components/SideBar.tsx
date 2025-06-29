import { useState } from "react";
import { useTodoStore } from "../store/todoStore";
import { useAuthStore } from "../store/authStore";
import TodoSearch from "./TodoSearch";

export default function Sidebar() {
  const {
    currentCategory,
    setCategory,
    addCategory,
    editCategory,
    deleteCategory,
  } = useTodoStore();
  const currentUser = useAuthStore((s) => s.currentUser);
  const categoriesByUser = useTodoStore((s) => s.categoriesByUser);
  const categories = categoriesByUser[currentUser ?? ""] || ["General"];

  const [newCategory, setNewCategory] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const logout = useAuthStore((s) => s.logout);
  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (trimmed && !categories.includes(trimmed)) {
      addCategory(trimmed);
      setNewCategory("");
      setCategory(trimmed);
    }
  };

  const handleSaveEdit = () => {
    const trimmed = editText.trim();
    if (trimmed && editing) {
      editCategory(editing, trimmed);
      setEditing(null);
      setEditText("");
    }
  };
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 p-4 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
      <h2 className="text-xl font-bold mb-4">📁 Categories</h2>

      <ul className="space-y-2 mb-6">
        <TodoSearch />
        {categories.map((cat) => (
          <li
            onClick={() => (window.location.href = "/")}
            key={cat}
            className={`group flex items-center justify-between px-3 py-2 rounded ${
              cat === currentCategory
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {editing === cat ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
                className="flex-1 bg-transparent text-sm px-1"
              />
            ) : (
              <span
                onClick={() => setCategory(cat)}
                className="flex-1 cursor-pointer"
              >
                {cat}
              </span>
            )}

            {cat !== "General" && (
              <div className="flex gap-2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {editing === cat ? (
                  <button onClick={handleSaveEdit}>✔</button>
                ) : (
                  <button
                    onClick={() => {
                      setEditing(cat);
                      setEditText(cat);
                    }}
                  >
                    ✏️
                  </button>
                )}
                <button onClick={() => deleteCategory(cat)}>🗑</button>
              </div>
            )}
          </li>
        ))}
        <li></li>
      </ul>

      <div className="space-y-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
        />
        <button
          onClick={handleAddCategory}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
        >
          + Add Category
        </button>
      </div>
      <div className="mt-4 w-full bg-green-500 hover:bg-green-600 cursor-pointer text-white px-3 py-2 rounded">
        <button
          onClick={() => (window.location.href = "/completed")}
          className=" cursor-pointer"
        >
          Completed Tasks
        </button>
      </div>
      <div className="mt-10 w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white px-3 py-2 rounded">
        <button onClick={handleLogout} className="text-center  cursor-pointer">
          Logout
        </button>
      </div>
    </aside>
  );
}
