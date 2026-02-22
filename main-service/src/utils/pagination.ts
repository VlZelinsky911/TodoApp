export interface PaginationParams {
	page: number,
	limit: number
}

export interface PaginationResult {
	skip: number,
	limit: number,
	totalPage: number,
	hasMore: boolean
}

export function calculatePagination(
	page: number = 1,
	limit: number = 10,
	total: number
): PaginationResult{
	
	const safePage = Math.max(1, page);
	const safeLimit = Math.max(1, limit);

	const skip = (safePage - 1) * safeLimit;
	const totalPage = Math.ceil(total / safeLimit);
	const hasMore = safePage < totalPage;

	return{
		skip ,
		limit: safeLimit,
		totalPage,
		hasMore
	}
}