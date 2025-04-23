import { deleteAllTodos } from '@/services/use-delete-todo';
import { Todo } from '@/services/use-get-todos';

export function DeleteMultiTodos(
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>
) {
  const deleteSelected = async (selectedIds: string[]) => {
    try {
      await deleteAllTodos(selectedIds);
      setTodos(todos.filter((todo) => !selectedIds.includes(todo.id)));
      setSelectedIds([]);
    } catch (error) {
      console.error('Failed to delete selected todos:', error);
    }
  };

  return { deleteSelected };
}
