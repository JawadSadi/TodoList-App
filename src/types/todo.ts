export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  category: string;
  deadline?: string;
  notified?: boolean;
  deleted: boolean;
  completedAt?: number;
  // ← تاریخ نهایی اختیاری
}

export interface searchTodo {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}
