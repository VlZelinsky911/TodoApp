import type { Request, Response, NextFunction } from "express";
import { ApiError, logger } from "../utils/index.js";
import { env } from "../config/index.js";
import mongoose from "mongoose";
import { ZodError } from "zod";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const isDev = env.NODE_ENV === "development";

  if (err instanceof ApiError) {
    logger.warn({ err, statusCode: err.statusCode }, err.message);
  } else {
    logger.error({ err }, err.message);
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      ...(err.validationErrors && { errors: err.validationErrors }),
      ...(isDev && { stack: err.stack }),
    });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.entries(err.errors).map(([field, error]) => ({
      field,
      message: error.message,
    }));

    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors,
      ...(isDev && { stack: err.stack }),
    });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      status: "error",
      message: `Invalid ${err.path}: ${err.value}`,
      ...(isDev && { stack: err.stack }),
    });
  }

  if (err instanceof ZodError) {
    const errors = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors,
      ...(isDev && { stack: err.stack }),
    });
  }

  if ((err as any).code === 11000) {
    const field = Object.keys((err as any).keyPattern || {})[0] || "field";
    return res.status(409).json({
      status: "error",
      message: `Duplicate value for ${field}`,
      ...(isDev && { stack: err.stack }),
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    ...(isDev && { stack: err.stack }),
  });
};
