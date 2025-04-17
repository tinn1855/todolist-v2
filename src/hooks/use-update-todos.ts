// api/todo-api.ts
import { Todo } from '@/hooks/use-get-todos';

const BASE_URL = 'http://localhost:3000/todos';

export async function updateTodoStatus(id: number, status: Todo['status']) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    throw new Error('Failed to update todo status');
  }

  return await res.json();
}
