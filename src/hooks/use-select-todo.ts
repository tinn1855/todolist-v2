import { useState } from 'react';

export function useTodoSelection() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return {
    selectedIds,
    setSelectedIds,
    handleToggleSelect,
  };
}
