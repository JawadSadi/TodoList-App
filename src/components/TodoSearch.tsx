import { useTodoStore } from "../store/todoStore";

export default function TodoSearch() {
  const searchTerm = useTodoStore((state) => state.searchTerm);
  const setSearchTerm = useTodoStore((state) => state.setSearchTerm);

  return (
    <input
      type="text"
      placeholder="🔍 Search tasks..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full mb-4 px-4 py-2 border rounded dark:bg-gray-800 dark:text-white"
    />
  );
}
