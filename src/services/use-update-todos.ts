import { Todo } from './use-get-todos';

const BASE_URL = 'https://todolist-api-1-5nna.onrender.com/api/todos';

// Cập nhật status của todo
export async function updateTodoStatus(id: string, status: Todo['status']) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) {
    const error = await res.text();
    console.error('API Error:', error);
    throw new Error('Failed to update todo status');
  }

  return await res.json();
}

// Cập nhật title của todo
export async function updateTodoTitle(
  id: string,
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

// Cập nhật priority của todo
export async function updateTodoPriority(
  id: string,
  priority: Todo['priority']
): Promise<Todo> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priority }),
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      console.error('API Error: ', errorMessage);
      throw new Error(`Failed to update priority. Response: ${errorMessage}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error while updating priority:', error);
    throw new Error(
      'Failed to update priority. Please check the server or network.'
    );
  }
}
