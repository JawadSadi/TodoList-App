export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  category: string;
  deadline?: string;
  notified?: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  // ← تاریخ نهایی اختیاری
}
