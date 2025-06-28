import { AnimatePresence } from "framer-motion";
import { useTodoStore } from "../store/todoStore";
import TodoItem from "./TodoItem";
import { useAuthStore } from "../store/authStore";

export default function TodoList() {
  const { currentCategory, searchTerm } = useTodoStore();
  const currentUser = useAuthStore((s) => s.currentUser);
  const todosByUser = useTodoStore((s) => s.todosByUser);
  const todos = todosByUser[currentUser ?? ""] || [];

  const visibleTodos = todos.filter(
    (todo) =>
      !todo.completed &&
      !todo.deleted &&
      todo.category === currentCategory &&
      todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ul className="space-y-2">
      <AnimatePresence>
        {visibleTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </AnimatePresence>
    </ul>
  );
}
