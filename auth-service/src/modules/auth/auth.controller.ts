import type { Request, Response, NextFunction } from "express";
import { UserService } from "../user/index.js";
import { AuthService } from "./auth.service.js";
import { setRefreshTokenCookie, clearAuthCookies } from "../../utils/cookie.js";
import { ApiError } from "../../utils/index.js";

const userService = new UserService();
const authService = new AuthService(userService);

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const result = await authService.register(email, password);

    setRefreshTokenCookie(res, result.refreshToken);

    res.status(201).json({
      status: "success",
      data: {
        accessToken: result.accessToken,
        user: result.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    setRefreshTokenCookie(res, result.refreshToken);

    res.status(200).json({
      status: "success",
      data: {
        accessToken: result.accessToken,
        user: result.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw ApiError.badRequest("Refresh token is missing");
    }

    const result = await authService.refresh(refreshToken);

    setRefreshTokenCookie(res, result.refreshToken);

    res.status(200).json({
      status: "success",
      data: {
        accessToken: result.accessToken,
        user: result.user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      throw ApiError.badRequest("Refresh token is missing");
    }

    await authService.logout(refreshToken);

    clearAuthCookies(res);

    res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const logoutAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw ApiError.unauthorized("User not authenticated");
    }

    await authService.logoutAll(userId);

    clearAuthCookies(res);

    res.status(200).json({
      status: "success",
      message: "Logged out from all sessions",
    });
  } catch (error) {
    next(error);
  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw ApiError.unauthorized("User not authenticated");
    }

    const user = await userService.findById(userId);
    if (!user) {
      throw ApiError.notFound("User not found");
    }

    res.status(200).json({
      status: "success",
      data: {
        user: {
          id: user._id.toString(),
          email: user.email,
          createdAt: user.createdAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
