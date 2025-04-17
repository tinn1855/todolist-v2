export interface Todo {
  id: number;
  title: string;
  status: 'completed' | 'incomplete';
  priority: 'low' | 'medium' | 'high';
}

const BASE_URL = 'http://localhost:3000/todos';

// GET tất cả todos
export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch todos');
  }
  return await res.json();
}
