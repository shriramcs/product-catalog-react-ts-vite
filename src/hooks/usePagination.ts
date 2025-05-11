import { useMemo } from 'react';

interface UsePaginationResult<T> {
  paginatedData: T[];
  totalPages: number;
}

const usePagination = <T>(
  data: T[],
  currentPage: number,
  itemsPerPage: number
): UsePaginationResult<T> => {
  return useMemo(() => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    return { paginatedData, totalPages };
  }, [data, currentPage, itemsPerPage]);
};

export default usePagination;