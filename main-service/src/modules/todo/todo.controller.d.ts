import type { Request, Response, NextFunction } from "express";
export declare const getTodos: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getTodoById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const createTodo: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateTodo: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const deleteTodo: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const toggleTodo: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const bulkDelete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=todo.controller.d.ts.map