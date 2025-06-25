// src/App.tsx

import Sidebar from "./components/SideBar";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
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

export default App;
