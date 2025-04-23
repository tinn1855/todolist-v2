import { FilterByPriority } from '@/components/feature/filter-by-priority';
import { useFilterByStatus } from '@/components/feature/filter-by-status';
import { Todo } from '@/services/use-get-todos';

export function useTodoFilters(todos: Todo[]) {
  const {
    filter,
    setFilter,
    filteredData: statusFiltered,
  } = useFilterByStatus(todos);
  const {
    filterPriority,
    setFilterPriority,
    filteredPriorityData: priorityFiltered,
  } = FilterByPriority(todos);

  const combinedFilter = priorityFiltered.filter((todo) =>
    statusFiltered.some((item) => item.id === todo.id)
  );

  return {
    filter,
    setFilter,
    filterPriority,
    setFilterPriority,
    filteredTodos: combinedFilter,
  };
}
