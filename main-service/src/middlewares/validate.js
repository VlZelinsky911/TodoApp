import { ApiError } from "../utils/index.js";
import { z } from "zod";
export const validate = (schemas) => (req, _res, next) => {
    const schemaConfig = schemas instanceof z.ZodType ? { body: schemas } : schemas;
    const allErrors = [];
    if (schemaConfig.body) {
        const result = schemaConfig.body.safeParse(req.body);
        if (!result.success) {
            allErrors.push(...result.error.issues.map((e) => ({
                field: `body.${e.path.join(".")}`,
                message: e.message,
            })));
        }
        else {
            req.body = result.data;
        }
    }
    if (schemaConfig.query) {
        const result = schemaConfig.query.safeParse(req.query);
        if (!result.success) {
            allErrors.push(...result.error.issues.map((e) => ({
                field: `query.${e.path.join(".")}`,
                message: e.message,
            })));
        }
        else {
            req.query = result.data;
        }
    }
    if (schemaConfig.params) {
        const result = schemaConfig.params.safeParse(req.params);
        if (!result.success) {
            allErrors.push(...result.error.issues.map((e) => ({
                field: `params.${e.path.join(".")}`,
                message: e.message,
            })));
        }
        else {
            req.params = result.data;
        }
    }
    if (allErrors.length > 0) {
        throw ApiError.validation("Validation failed", allErrors);
    }
    next();
};
//# sourceMappingURL=validate.js.map