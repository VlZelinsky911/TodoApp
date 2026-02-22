import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/index.js";
import { env } from "../config/env.js";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const isDev = env.NODE_ENV === "development";

  if (isDev) {
    console.error(err);
  } else {
    console.error(err.message);
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      ...(isDev && { stack: err.stack }),
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    ...(isDev && { stack: err.stack }),
  });
};
