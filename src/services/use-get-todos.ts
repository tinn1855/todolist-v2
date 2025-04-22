export interface Todo {
  id: string;
  title: string;
  status: 'completed' | 'incomplete';
  priority: 'low' | 'medium' | 'high';
}

const BASE_URL = 'https://6800cae3b72e9cfaf728b9b1.mockapi.io/api/v2/todos';

// GET tất cả todos
export async function getTodos(): Promise<Todo[]> {
  try {
    const res = await fetch(BASE_URL);

    if (!res.ok) {
      const error = await res.text();
      console.error('API Error:', error);
      throw new Error('Failed to fetch todos');
    }
    const data = await res.json();
    if (!Array.isArray(data)) {
      throw new Error('Unexpected API response format');
    }
    return data;
  } catch (error) {
    console.log('fetch todos error:', error);
    throw error;
  }
}
