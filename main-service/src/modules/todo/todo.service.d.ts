import { type TodoQueryDTO, type PaginatedResponse, type TodoResponseDTO, type CreateTodoInput, type UpdateTodoInput, type ITodoRepository } from "./index.js";
export declare class TodoService {
    private readonly repository;
    constructor(repository: ITodoRepository);
    getAll(userId: string, queryDTO: TodoQueryDTO): Promise<PaginatedResponse<TodoResponseDTO>>;
    getById(id: string, userId: string): Promise<TodoResponseDTO>;
    create(userId: string, createDTO: CreateTodoInput): Promise<TodoResponseDTO>;
    update(id: string, userId: string, updateDTO: UpdateTodoInput): Promise<TodoResponseDTO>;
    delete(id: string, userId: string): Promise<{
        success: boolean;
    }>;
    toggle(id: string, userId: string): Promise<TodoResponseDTO>;
    bulkDelete(userId: string, ids: string[]): Promise<{
        deletedCount: number;
    }>;
    private buildFilterQuery;
    private buildSortOptions;
}
export declare const todoService: TodoService;
//# sourceMappingURL=todo.service.d.ts.map