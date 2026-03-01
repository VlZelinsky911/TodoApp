import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/index.js";
import { z } from "zod";

interface ValidateSchemas {
  body?: z.ZodType;
  query?: z.ZodType;
  params?: z.ZodType;
}

export const validate =
  (schemas: ValidateSchemas | z.ZodType) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const schemaConfig: ValidateSchemas =
      schemas instanceof z.ZodType ? { body: schemas } : schemas;

    const allErrors: { field: string; message: string }[] = [];

    if (schemaConfig.body) {
      const result = schemaConfig.body.safeParse(req.body);
      if (!result.success) {
        allErrors.push(
          ...result.error.issues.map((e) => ({
            field: `body.${e.path.join(".")}`,
            message: e.message,
          })),
        );
      } else {
        req.body = result.data;
      }
    }

    if (schemaConfig.query) {
      const result = schemaConfig.query.safeParse(req.query);
      if (!result.success) {
        allErrors.push(
          ...result.error.issues.map((e) => ({
            field: `query.${e.path.join(".")}`,
            message: e.message,
          })),
        );
      } else {
        req.query = result.data as typeof req.query;
      }
    }

    if (schemaConfig.params) {
      const result = schemaConfig.params.safeParse(req.params);
      if (!result.success) {
        allErrors.push(
          ...result.error.issues.map((e) => ({
            field: `params.${e.path.join(".")}`,
            message: e.message,
          })),
        );
      } else {
        req.params = result.data as typeof req.params;
      }
    }

    if (allErrors.length > 0) {
      throw ApiError.validation("Validation failed", allErrors);
    }

    next();
  };
