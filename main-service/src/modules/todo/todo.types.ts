import { Types, Document } from "mongoose";

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
  DueDate = "dueDate",
  Priority = "priority",
}

export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}

export interface ITodoDocument extends Document {
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  dueDate?: Date;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITodoFilter {
  [key: string]: unknown;
  userId: string;
  title?: { $regex: string; $options: string };
  completed?: boolean;
  priority?: string;
}
