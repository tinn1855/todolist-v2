import { useMemo, useState } from 'react';

export type FilterPriority = 'all' | 'high' | 'medium' | 'low';

export function FilterByPriority<T extends { priority: string }>(data: T[]) {
  const [filterPriority, setFilterPriority] = useState<FilterPriority>('all');
  const filteredPriorityData = useMemo(() => {
    if (filterPriority === 'all') return data;
    return data.filter((item) => item.priority === filterPriority);
  }, [filterPriority, data]);
  return {
    filterPriority,
    setFilterPriority,
    filteredPriorityData,
  };
}
