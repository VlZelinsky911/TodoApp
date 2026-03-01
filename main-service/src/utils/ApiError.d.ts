export interface ValidationErrorItem {
    field: string;
    message: string;
}
export declare class ApiError extends Error {
    statusCode: number;
    isOperational: boolean;
    validationErrors?: ValidationErrorItem[] | undefined;
    constructor(statusCode: number, message: string, validationErrors?: ValidationErrorItem[] | undefined);
    static badRequest(message: string): ApiError;
    static validation(message: string, errors: ValidationErrorItem[]): ApiError;
    static notFound(message?: string): ApiError;
    static unauthorized(message?: string): ApiError;
    static forbidden(message?: string): ApiError;
    static conflict(message: string): ApiError;
    static internal(message?: string): ApiError;
}
//# sourceMappingURL=ApiError.d.ts.map