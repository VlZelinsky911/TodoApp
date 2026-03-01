import type { Request, Response, NextFunction } from "express";
import {
  todoService,
  type TodoQueryDTO,
  type CreateTodoInput,
  type UpdateTodoInput,
} from "./index.js";
import { ApiError } from "../../utils/index.js";

export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      throw ApiError.unauthorized("User not authenticated");
    }

    const queryDTO = req.query as unknown as TodoQueryDTO;

    const result = await todoService.getAll(userId, queryDTO);

    res.status(200).json({
      status: "success",
      ...result, // { data, total, page, limit, totalPages }
    });
  } catch (err) {
    next(err);
  }
};

export const getTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      throw ApiError.unauthorized("User not authenticated");
    }

    const id = req.params.id as string;

    const result = await todoService.getById(id, userId);

    res.json({
      status: "success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      throw ApiError.unauthorized("User not authenticated");
    }

    const createDTO = req.body as CreateTodoInput;
    const result = await todoService.create(userId, createDTO);

    res.status(201).json({
      status: "success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      throw ApiError.unauthorized("User not authenticated");
    }

    const id = req.params.id as string;
    const updateDTO = req.body as UpdateTodoInput;
    const result = await todoService.update(id, userId, updateDTO);

    res.json({
      status: "success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      throw ApiError.unauthorized("User not authenticated");
    }

    const id = req.params.id as string;
    await todoService.delete(id, userId);

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

export const toggleTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      throw ApiError.unauthorized("User not authenticated");
    }

    const id = req.params.id as string;
    const result = await todoService.toggle(id, userId);

    res.json({
      status: "success",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const bulkDelete = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      throw ApiError.unauthorized("User not authenticated");
    }

    const ids = req.body.ids as string[];
    const result = await todoService.bulkDelete(userId, ids);

    res.json({
      status: "success",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    next(err);
  }
};
