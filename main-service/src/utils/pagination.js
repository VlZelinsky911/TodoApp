export function calculatePagination(page = 1, limit = 10, total) {
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
//# sourceMappingURL=pagination.js.map