const BASE_URL = 'http://localhost:3000/todos';

export async function deleteTodoById(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete todo');
  }
}

export async function deleteAllTodos(ids: number[]): Promise<void> {
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
