import { AnimatePresence } from "framer-motion";
import { useTodoStore } from "../store/todoStore";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos, currentCategory } = useTodoStore();

  const filtered = todos.filter((t) => t.category === currentCategory);

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
