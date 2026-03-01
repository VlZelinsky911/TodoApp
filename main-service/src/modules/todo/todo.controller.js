import { todoService, } from "./index.js";
import { ApiError } from "../../utils/index.js";
export const getTodos = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            throw ApiError.unauthorized("User not authenticated");
        }
        const queryDTO = req.query;
        const result = await todoService.getAll(userId, queryDTO);
        res.status(200).json({
            status: "success",
            ...result, // { data, total, page, limit, totalPages }
        });
    }
    catch (err) {
        next(err);
    }
};
export const getTodoById = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            throw ApiError.unauthorized("User not authenticated");
        }
        const id = req.params.id;
        const result = await todoService.getById(id, userId);
        res.json({
            status: "success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
export const createTodo = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            throw ApiError.unauthorized("User not authenticated");
        }
        const createDTO = req.body;
        const result = await todoService.create(userId, createDTO);
        res.status(201).json({
            status: "success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
export const updateTodo = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            throw ApiError.unauthorized("User not authenticated");
        }
        const id = req.params.id;
        const updateDTO = req.body;
        const result = await todoService.update(id, userId, updateDTO);
        res.json({
            status: "success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
export const deleteTodo = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            throw ApiError.unauthorized("User not authenticated");
        }
        const id = req.params.id;
        await todoService.delete(id, userId);
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
};
export const toggleTodo = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            throw ApiError.unauthorized("User not authenticated");
        }
        const id = req.params.id;
        const result = await todoService.toggle(id, userId);
        res.json({
            status: "success",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
export const bulkDelete = async (req, res, next) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            throw ApiError.unauthorized("User not authenticated");
        }
        const ids = req.body.ids;
        const result = await todoService.bulkDelete(userId, ids);
        res.json({
            status: "success",
            deletedCount: result.deletedCount,
        });
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=todo.controller.js.map