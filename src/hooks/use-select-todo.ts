import { Todo } from '@/services/use-get-todos';
import { useState } from 'react';

export function useTodoSelection() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (items: Todo[], checked: boolean) => {
    const itemIds = items.map((todo) => todo.id);
    setSelectedIds((prev) =>
      checked
        ? Array.from(new Set([...prev, ...itemIds]))
        : prev.filter((id) => !itemIds.includes(id))
    );
  };

  return {
    selectedIds,
    setSelectedIds,
    handleToggleSelect,
    handleSelectAll,
  };
}
