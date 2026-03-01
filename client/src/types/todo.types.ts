export enum Priority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export enum Status {
  All = "all",
  Active = "active",
  Completed = "completed",
}

export enum SortBy {
  CreatedAt = "createdAt",
  UpdatedAt = "updatedAt",
  Title = "title",
  DueDate = "dueDate",
  Priority = "priority",
}

export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoFilters {
  search?: string;
  status?: Status;
  priority?: Priority;
  page?: number;
  limit?: number;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}

export interface CreateTodoDTO {
  title: string;
  description?: string;
  priority?: Priority;
  dueDate?: string;
}

export interface UpdateTodoDTO {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: Priority;
  dueDate?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
