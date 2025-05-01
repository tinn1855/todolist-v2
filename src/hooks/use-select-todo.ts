import { useState } from 'react';

export function useTodoSelection() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectAllTodos = (ids: string[]) => {
    setSelectedIds((prev) => {
      const newIds = ids.filter((id) => !prev.includes(id));
      return [...prev, ...newIds];
    });
  };

  const deselectAllTodos = (ids: string[]) => {
    setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
  };

  const clearSelection = () => {
    setSelectedIds([]);
  };

  return {
    selectedIds,
    setSelectedIds,
    handleToggleSelect,
    selectAllTodos,
    deselectAllTodos,
    clearSelection,
  };
}
