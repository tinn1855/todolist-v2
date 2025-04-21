const BASE_URL = 'https://6800cae3b72e9cfaf728b9b1.mockapi.io/api/v2/todos';

export async function deleteTodoById(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete todo');
  }
}

export async function deleteAllTodos(ids: string[]): Promise<void> {
  const results = await Promise.allSettled(
    ids.map((id) =>
      fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      })
    )
  );

  const failed = results.filter((res) => res.status === 'rejected');
  if (failed.length > 0) {
    throw new Error(`${failed.length} todos failed to delete all`);
  }
}
