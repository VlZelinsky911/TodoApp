import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/index.js";
import { env } from "../config/index.js";

interface TokenPayload {
  userId: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
      };
    }
  }
}

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw ApiError.unauthorized("Access token is required");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw ApiError.unauthorized("Access token is required");
  }

  try {
    const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as TokenPayload;
    req.user = { userId: payload.userId, email: payload.email };
    next();
  } catch {
    throw ApiError.unauthorized("Invalid or expired access token");
  }
};
