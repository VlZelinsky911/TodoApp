export class ApiError extends Error {
    statusCode;
    isOperational;
    validationErrors;
    constructor(statusCode, message, validationErrors) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.validationErrors = validationErrors;
        Error.captureStackTrace(this, this.constructor);
    }
    static badRequest(message) {
        return new ApiError(400, message);
    }
    static validation(message, errors) {
        return new ApiError(400, message, errors);
    }
    static notFound(message = "Not Found") {
        return new ApiError(404, message);
    }
    static unauthorized(message = "Unauthorized") {
        return new ApiError(401, message);
    }
    static forbidden(message = "Forbidden") {
        return new ApiError(403, message);
    }
    static conflict(message) {
        return new ApiError(409, message);
    }
    static internal(message = "Internal Server Error") {
        return new ApiError(500, message);
    }
}
//# sourceMappingURL=ApiError.js.map