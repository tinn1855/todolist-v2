import { Todo } from '@/hooks/use-get-todos';

export function validateTodoTitle(
  title: string,
  existingTodos: Todo[]
): string | null {
  const trimmed = title.trim();

  if (!trimmed) return 'Title cannot be empty.';
  if (/<[^>]*>/g.test(trimmed)) {
    return 'Title cannot contain HTML tags.';
  }

  if (!/^[a-zA-Z0-9\s.?'"!@$%&()\\-]+$/.test(trimmed)) {
    return 'Title cannot contain special characters.';
  }

  const isDuplicate = existingTodos.some(
    (todo) => todo.title.toLowerCase() === trimmed.toLowerCase()
  );

  if (isDuplicate) {
    return 'This task already exists.';
  }

  return null;
}
