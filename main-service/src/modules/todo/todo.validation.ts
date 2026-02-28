import { z } from "zod";
import { Priority, SortOrder, Status } from "./index.js";

export const priorityEnum = z.enum(Priority);
export const statusEnum = z.enum(Status);

export const createTodoSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(2000).optional(),
  completed: z.boolean().optional(),
  priority: priorityEnum.optional(),
  dueDate: z.preprocess(
    (val) => (val ? new Date(val as string) : undefined),
    z.date().optional(),
  ),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(1).max(2000).optional(),
  completed: z.boolean().optional(),
  priority: priorityEnum.optional(),
  dueDate: z.preprocess(
    (val) => (val ? new Date(val as string) : undefined),
    z.date().optional(),
  ),
});

export const todoQuerySchema = z.object({
  search: z.string().max(200).optional(),
  status: statusEnum.optional(),
  priority: priorityEnum.optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  sortBy: z
    .enum(["createdAt", "updatedAt", "title", "dueDate", "priority"])
    .default("createdAt"),
  sortOrder: z.enum(SortOrder).default(SortOrder.Desc),
});

export const bulkDeleteSchema = z.object({
  ids: z.array(z.string().min(1)),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;

export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;

export type TodoQueryInput = z.infer<typeof todoQuerySchema>;

export type BulkDeleteInput = z.infer<typeof bulkDeleteSchema>;
