export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationResult {
  skip: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

export function calculatePagination(
  page: number = 1,
  limit: number = 10,
  total: number,
): PaginationResult {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);

  const skip = (safePage - 1) * safeLimit;
  const totalPages = Math.ceil(total / safeLimit);
  const hasMore = safePage < totalPages;

  return {
    skip,
    limit: safeLimit,
    totalPages,
    hasMore,
  };
}
