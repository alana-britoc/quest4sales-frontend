import { useState, useEffect } from "react";
import type { Page } from "@/dtos/PaginationDTOs";

interface UsePaginationOptions<T> {
  fetchFn: (page: number, size: number, sort?: string) => Promise<Page<T>>;
  initialPage?: number;
  initialSize?: number;
  sort?: string;
}

export function usePagination<T>({
  fetchFn,
  initialPage = 0,
  initialSize = 20,
  sort,
}: UsePaginationOptions<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(initialPage);
  const [pageSize] = useState(initialSize);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchFn(page, pageSize, sort);
        setData(response.content);
        setTotalPages(response.totalPages);
        setTotalElements(response.totalElements);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page, pageSize, sort, fetchFn]);

  const nextPage = () => {
    if (page < totalPages - 1) {
      setPage((p) => p + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage((p) => p - 1);
    }
  };

  const goToPage = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const refresh = () => {
    setPage(initialPage);
  };

  return {
    data,
    loading,
    error,
    page,
    pageSize,
    totalPages,
    totalElements,
    hasNextPage: page < totalPages - 1,
    hasPrevPage: page > 0,
    nextPage,
    prevPage,
    goToPage,
    refresh,
  };
}
