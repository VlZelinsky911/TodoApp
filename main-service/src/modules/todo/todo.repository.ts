import { Todo } from "./todo.model.js";
import type { ITodoDocument } from "./todo.types.js";
import type { CreateTodoInput, UpdateTodoInput } from "./todo.validation.js";

function removeUndefined<T extends Record<string, unknown>>(
  obj: T,
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as Partial<T>;
}

export interface ITodoRepository {
  findAll(
    filter: Record<string, unknown>,
    sort: Record<string, 1 | -1>,
    skip: number,
    limit: number,
  ): Promise<ITodoDocument[]>;
  count(filter: Record<string, unknown>): Promise<number>;
  findById(id: string): Promise<ITodoDocument | null>;
  findOne(filter: Record<string, unknown>): Promise<ITodoDocument | null>;
  create(data: CreateTodoInput & { userId: string }): Promise<ITodoDocument>;
  findOneAndUpdate(
    filter: Record<string, unknown>,
    update: UpdateTodoInput,
  ): Promise<ITodoDocument | null>;
  findOneAndDelete(
    filter: Record<string, unknown>,
  ): Promise<ITodoDocument | null>;
  deleteMany(
    filter: Record<string, unknown>,
  ): Promise<{ deletedCount: number }>;
}

export class TodoRepository implements ITodoRepository {
  async findAll(
    filter: Record<string, unknown>,
    sort: Record<string, 1 | -1>,
    skip: number,
    limit: number,
  ): Promise<ITodoDocument[]> {
    return Todo.find(filter).sort(sort).skip(skip).limit(limit);
  }

  async count(filter: Record<string, unknown>): Promise<number> {
    return Todo.countDocuments(filter);
  }

  async findById(id: string): Promise<ITodoDocument | null> {
    return Todo.findById(id);
  }

  async findOne(
    filter: Record<string, unknown>,
  ): Promise<ITodoDocument | null> {
    return Todo.findOne(filter);
  }

  async create(
    data: CreateTodoInput & { userId: string },
  ): Promise<ITodoDocument> {
    return Todo.create(
      removeUndefined(data) as Parameters<typeof Todo.create>[0],
    );
  }

  async findOneAndUpdate(
    filter: Record<string, unknown>,
    update: UpdateTodoInput,
  ): Promise<ITodoDocument | null> {
    return Todo.findOneAndUpdate(
      filter,
      { $set: removeUndefined(update) },
      { new: true },
    );
  }

  async findOneAndDelete(
    filter: Record<string, unknown>,
  ): Promise<ITodoDocument | null> {
    return Todo.findOneAndDelete(filter);
  }

  async deleteMany(
    filter: Record<string, unknown>,
  ): Promise<{ deletedCount: number }> {
    const result = await Todo.deleteMany(filter);
    return { deletedCount: result.deletedCount ?? 0 };
  }
}

export const todoRepository = new TodoRepository();
