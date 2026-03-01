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
export declare function calculatePagination(page: number | undefined, limit: number | undefined, total: number): PaginationResult;
//# sourceMappingURL=pagination.d.ts.map