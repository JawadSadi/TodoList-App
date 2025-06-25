export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  category: string;
  deadline?: string; // ← تاریخ نهایی اختیاری
}
