import type { ITodoDocument } from "./todo.types.js";
import type { CreateTodoInput, UpdateTodoInput } from "./todo.validation.js";
export interface ITodoRepository {
    findAll(filter: Record<string, unknown>, sort: Record<string, 1 | -1>, skip: number, limit: number): Promise<ITodoDocument[]>;
    count(filter: Record<string, unknown>): Promise<number>;
    findById(id: string): Promise<ITodoDocument | null>;
    findOne(filter: Record<string, unknown>): Promise<ITodoDocument | null>;
    create(data: CreateTodoInput & {
        userId: string;
    }): Promise<ITodoDocument>;
    findOneAndUpdate(filter: Record<string, unknown>, update: UpdateTodoInput): Promise<ITodoDocument | null>;
    findOneAndDelete(filter: Record<string, unknown>): Promise<ITodoDocument | null>;
    deleteMany(filter: Record<string, unknown>): Promise<{
        deletedCount: number;
    }>;
}
export declare class TodoRepository implements ITodoRepository {
    findAll(filter: Record<string, unknown>, sort: Record<string, 1 | -1>, skip: number, limit: number): Promise<ITodoDocument[]>;
    count(filter: Record<string, unknown>): Promise<number>;
    findById(id: string): Promise<ITodoDocument | null>;
    findOne(filter: Record<string, unknown>): Promise<ITodoDocument | null>;
    create(data: CreateTodoInput & {
        userId: string;
    }): Promise<ITodoDocument>;
    findOneAndUpdate(filter: Record<string, unknown>, update: UpdateTodoInput): Promise<ITodoDocument | null>;
    findOneAndDelete(filter: Record<string, unknown>): Promise<ITodoDocument | null>;
    deleteMany(filter: Record<string, unknown>): Promise<{
        deletedCount: number;
    }>;
}
export declare const todoRepository: TodoRepository;
//# sourceMappingURL=todo.repository.d.ts.map