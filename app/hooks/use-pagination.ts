import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router";

// ----------------------------------------------------------------------

export type UsePaginationConfig = {
  page?: number;
  rowsPerPage?: number;
  count?: number;
};

export type UsePaginationReturn = {
  page: number;
  rowsPerPage: number;
  count: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onFirstPage: () => void;
  onLastPage: () => void;
  setCount: (newCount: number) => void;
  reset: () => void;
  getPageNumbers: (delta?: number) => number[];
};

// ----------------------------------------------------------------------

/**
 * Hook for managing pagination state and logic
 * @param config - Configuration object for pagination
 * @returns Object containing pagination state and methods
 */
export function usePagination(
  config: UsePaginationConfig = {},
): UsePaginationReturn {
  const {
    page: initialPage = 1,
    rowsPerPage: initialRowsPerPage = 10,
    count: initialCount = 0,
  } = config;

  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [count, setCount] = useState(initialCount);

  // Computed values
  const totalPages = useMemo(() => {
    return Math.ceil(count / rowsPerPage) || 1;
  }, [count, rowsPerPage]);

  const startIndex = useMemo(() => {
    return (page - 1) * rowsPerPage;
  }, [page, rowsPerPage]);

  const endIndex = useMemo(() => {
    return Math.min(startIndex + rowsPerPage - 1, count - 1);
  }, [startIndex, rowsPerPage, count]);

  const hasNextPage = useMemo(() => {
    return page < totalPages;
  }, [page, totalPages]);

  const hasPreviousPage = useMemo(() => {
    return page > 1;
  }, [page]);

  const isFirstPage = useMemo(() => {
    return page === 1;
  }, [page]);

  const isLastPage = useMemo(() => {
    return page === totalPages;
  }, [page, totalPages]);

  // Page change handlers
  const onPageChange = useCallback(
    (newPage: number) => {
      const clampedPage = Math.max(1, Math.min(newPage, totalPages));
      setPage(clampedPage);
    },
    [totalPages],
  );

  const onRowsPerPageChange = useCallback((newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    // Reset to first page when changing rows per page
    setPage(1);
  }, []);

  const onNextPage = useCallback(() => {
    if (hasNextPage) {
      setPage((prev) => prev + 1);
    }
  }, [hasNextPage]);

  const onPreviousPage = useCallback(() => {
    if (hasPreviousPage) {
      setPage((prev) => prev - 1);
    }
  }, [hasPreviousPage]);

  const onFirstPage = useCallback(() => {
    setPage(1);
  }, []);

  const onLastPage = useCallback(() => {
    setPage(totalPages);
  }, [totalPages]);

  const reset = useCallback(() => {
    setPage(initialPage);
    setRowsPerPage(initialRowsPerPage);
    setCount(initialCount);
  }, [initialPage, initialRowsPerPage, initialCount]);

  // Generate page numbers for pagination UI
  const getPageNumbers = useCallback(
    (delta: number = 2): number[] => {
      const pages: number[] = [];
      const start = Math.max(1, page - delta);
      const end = Math.min(totalPages, page + delta);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    },
    [page, totalPages],
  );

  return {
    page,
    rowsPerPage,
    count,
    totalPages,
    startIndex,
    endIndex,
    hasNextPage,
    hasPreviousPage,
    isFirstPage,
    isLastPage,
    onPageChange,
    onRowsPerPageChange,
    onNextPage,
    onPreviousPage,
    onFirstPage,
    onLastPage,
    setCount,
    reset,
    getPageNumbers,
  };
}

// ----------------------------------------------------------------------

/**
 * Hook for server-side pagination with URL sync
 * @param config - Configuration object for pagination
 * @returns Object containing pagination state and methods
 */
export function useServerPagination(config: UsePaginationConfig = {}) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get initial values from URL or config
  const initialPage =
    parseInt(searchParams.get("page") || "1", 10) || config.page || 1;
  const initialRowsPerPage =
    parseInt(searchParams.get("limit") || "10", 10) || config.rowsPerPage || 10;

  const pagination = usePagination({
    ...config,
    page: initialPage,
    rowsPerPage: initialRowsPerPage,
  });

  // Sync pagination state with URL
  const syncWithUrl = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams);

    // Set page parameter
    if (pagination.page > 1) {
      newSearchParams.set("page", pagination.page.toString());
    } else {
      newSearchParams.delete("page");
    }

    // Set limit parameter
    if (pagination.rowsPerPage !== 10) {
      newSearchParams.set("limit", pagination.rowsPerPage.toString());
    } else {
      newSearchParams.delete("limit");
    }

    setSearchParams(newSearchParams, { replace: true });
  }, [pagination.page, pagination.rowsPerPage, searchParams, setSearchParams]);

  // Auto-sync when page or rowsPerPage changes
  useEffect(() => {
    syncWithUrl();
  }, [pagination.page, pagination.rowsPerPage]);

  // Override pagination handlers to sync with URL
  const onPageChange = useCallback(
    (newPage: number) => {
      pagination.onPageChange(newPage);
    },
    [pagination],
  );

  const onRowsPerPageChange = useCallback(
    (newRowsPerPage: number) => {
      pagination.onRowsPerPageChange(newRowsPerPage);
    },
    [pagination],
  );

  const onNextPage = useCallback(() => {
    pagination.onNextPage();
  }, [pagination]);

  const onPreviousPage = useCallback(() => {
    pagination.onPreviousPage();
  }, [pagination]);

  const onFirstPage = useCallback(() => {
    pagination.onFirstPage();
  }, [pagination]);

  const onLastPage = useCallback(() => {
    pagination.onLastPage();
  }, [pagination]);

  const reset = useCallback(() => {
    pagination.reset();
    // Clear URL params when resetting
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("page");
    newSearchParams.delete("limit");
    setSearchParams(newSearchParams, { replace: true });
  }, [pagination, searchParams, setSearchParams]);

  return {
    ...pagination,
    onPageChange,
    onRowsPerPageChange,
    onNextPage,
    onPreviousPage,
    onFirstPage,
    onLastPage,
    reset,
    syncWithUrl,
  };
}
