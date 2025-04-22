import { getTodos, Todo } from '@/services/use-get-todos';
import { useEffect, useState } from 'react';

export function useFetchTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, setTodos, fetchTodos };
}
