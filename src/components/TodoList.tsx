// src/components/TodoList.tsx
import { useTodoStore } from "../store/todoStore";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos, currentCategory } = useTodoStore();

  const filteredTodos = todos.filter(
    (todo) => todo.category === currentCategory
  );

  return (
    <div>
      {filteredTodos.length === 0 ? (
        <p className="text-gray-500">No tasks in "{currentCategory}".</p>
      ) : (
        <ul className="space-y-1">
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
}
