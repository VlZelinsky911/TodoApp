import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/index.js";
import { ApiError } from "../utils/index.js";

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

	if(!token){
		throw ApiError.unauthorized("Access token is required");
	}

  try {
    const payload = verifyAccessToken(token);
    req.user = { userId: payload.userId, email: payload.email };
    next();
  } catch {
    throw ApiError.unauthorized("Invalid or expired access token");
  }
};
