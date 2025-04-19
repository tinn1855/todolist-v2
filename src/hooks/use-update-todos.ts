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

export async function updateTodoTitle(
  id: number,
  updatedTodo: Partial<Todo>
): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTodo),
  });

  if (!res.ok) {
    throw new Error('Failed to update todo');
  }

  return res.json();
}

export async function updateTodoPriority(
  id: number,
  priority: Todo['priority']
): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ priority }),
  });

  if (!res.ok) {
    throw new Error('Failed to update priority todo');
  }

  return res.json();
}
