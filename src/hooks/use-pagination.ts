import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function usePagination<T>(data: T[], itemsPerPage = 5) {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const [currentPage, setCurrentPage] = useState<number>(pageParam);

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginationData = data.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('page');
      setSearchParams(newParams);
    }
  }, [data]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const newParams = new URLSearchParams(searchParams.toString());
    if (page <= 1) newParams.delete('page');
    else newParams.set('page', String(page));
    setSearchParams(newParams);
  };

  return {
    currentPage,
    totalPages,
    paginationData,
    handlePageChange,
    setCurrentPage,
    searchParams,
    setSearchParams,
  };
}
