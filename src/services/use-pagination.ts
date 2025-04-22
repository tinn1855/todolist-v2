// hooks/use-pagination.ts
import { useMemo } from 'react';

export function UsePagination<T>(
  data: T[],
  itemsPerPage: number,
  currentPage: number
) {
  const totalPages = useMemo(
    () => Math.ceil(data.length / itemsPerPage),
    [data.length, itemsPerPage]
  );

  const paginationData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  return {
    totalPages,
    paginationData,
  };
}
