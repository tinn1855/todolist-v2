import { useMemo, useState } from 'react';

export type FilterStatus = 'all' | 'completed' | 'incomplete';

export function FilterByStatus<T extends { status: string }>(data: T[]) {
  const [filter, setFilter] = useState<FilterStatus>('all');
  const filteredData = useMemo(() => {
    if (filter === 'all') return data;
    return data.filter((item) => item.status === filter);
  }, [filter, data]);
  return {
    filter,
    setFilter,
    filteredData,
  };
}
