import type { Request, Response, NextFunction } from "express";
import { ApiError, logger } from "../utils/index.js";
import { env } from "../config/index.js";

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

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    ...(isDev && { stack: err.stack }),
  });
};
