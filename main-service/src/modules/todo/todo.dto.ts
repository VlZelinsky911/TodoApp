import type { Priority, SortBy, SortOrder, Status } from "./todo.types.js";

export interface CreateTodoDTO {
  title: string;
  description?: string;
  priority?: Priority;
  dueDate?: Date;
}

export interface UpdateTodoDTO {
  title?: string;
  description?: string;
  priority?: Priority;
  dueDate?: Date;
}

export interface TodoQueryDTO {
  search?: string;
  status?: Status;
  priority?: Priority;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  page?: number;
  limit?: number;
}

export interface TodoResponseDTO {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BulkDeleteDTO {
  ids: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
