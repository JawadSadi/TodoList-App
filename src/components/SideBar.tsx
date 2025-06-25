import { useTodoStore } from "../store/todoStore";

// Sidebar.tsx
const categories = ["Today", "Upcoming", "Completed"];

export default function Sidebar() {
  const { currentCategory, setCategory } = useTodoStore();
  return (
    <div className="w-60 h-screen bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul>
        {categories.map((cat) => (
          <li
            key={cat}
            onClick={() => setCategory(cat)}
            className={`cursor-pointer mb-2 p-2 rounded ${
              currentCategory === cat ? "bg-blue-500 text-white" : ""
            }`}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
}
