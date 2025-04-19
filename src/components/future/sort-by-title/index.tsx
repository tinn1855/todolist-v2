import { useState, useEffect } from 'react';

type SortOrder = 'asc' | 'desc' | 'none';

export function SortByTitle<T extends { title: string }>(initialData: T[]) {
  const [sortedData, setSortedData] = useState<T[]>(initialData);
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');

  useEffect(() => {
    setSortedData(initialData);
  }, [initialData]);

  const sortByTitle = () => {
    let newSortOrder: SortOrder = 'none';
    const newSortedData = [...initialData];

    if (sortOrder === 'none' || sortOrder === 'desc') {
      newSortOrder = 'asc';
      newSortedData.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'asc') {
      newSortOrder = 'desc';
      newSortedData.sort((a, b) => b.title.localeCompare(a.title));
    }

    setSortOrder(newSortOrder);
    setSortedData(newSortedData);
  };

  return {
    sortedData,
    sortByTitle,
  };
}
