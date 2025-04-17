const BASE_URL = 'http://localhost:3000/todos';

export async function deleteTodoById(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete todo');
  }
}
