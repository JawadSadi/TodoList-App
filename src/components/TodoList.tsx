import { AnimatePresence } from "framer-motion";
import { useTodoStore } from "../store/todoStore";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos, currentCategory, searchTerm } = useTodoStore();

  const filtered = todos.filter(
    (todo) =>
      todo.category === currentCategory &&
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ul className="space-y-2">
      <AnimatePresence>
        {filtered.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </AnimatePresence>
    </ul>
  );
}
