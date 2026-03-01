import { z } from "zod";
import { Priority, SortBy, SortOrder, Status } from "./index.js";
export declare const priorityEnum: z.ZodEnum<typeof Priority>;
export declare const statusEnum: z.ZodEnum<typeof Status>;
export declare const createTodoSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    completed: z.ZodOptional<z.ZodBoolean>;
    priority: z.ZodOptional<z.ZodEnum<typeof Priority>>;
    dueDate: z.ZodPipe<z.ZodTransform<Date | undefined, unknown>, z.ZodOptional<z.ZodDate>>;
}, z.core.$strip>;
export declare const updateTodoSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    completed: z.ZodOptional<z.ZodBoolean>;
    priority: z.ZodOptional<z.ZodEnum<typeof Priority>>;
    dueDate: z.ZodPipe<z.ZodTransform<Date | undefined, unknown>, z.ZodOptional<z.ZodDate>>;
}, z.core.$strip>;
export declare const todoQuerySchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<typeof Status>>;
    priority: z.ZodOptional<z.ZodEnum<typeof Priority>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    sortBy: z.ZodDefault<z.ZodEnum<typeof SortBy>>;
    sortOrder: z.ZodDefault<z.ZodEnum<typeof SortOrder>>;
}, z.core.$strip>;
export declare const bulkDeleteSchema: z.ZodObject<{
    ids: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export declare const idParamSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
export type TodoQueryInput = z.infer<typeof todoQuerySchema>;
export type BulkDeleteInput = z.infer<typeof bulkDeleteSchema>;
//# sourceMappingURL=todo.validation.d.ts.map