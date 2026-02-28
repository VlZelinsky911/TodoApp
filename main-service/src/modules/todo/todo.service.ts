import {
  TodoMapper,
  Status,
  type TodoQueryDTO,
  type PaginatedResponse,
  type TodoResponseDTO,
  type CreateTodoInput,
  type UpdateTodoInput,
  type ITodoRepository,
  todoRepository,
  type ITodoFilter,
} from "./index.js";
import { ApiError } from "../../utils/index.js";

export class TodoService {
  constructor(private readonly repository: ITodoRepository) {}

  async getAll(
    userId: string,
    queryDTO: TodoQueryDTO,
  ): Promise<PaginatedResponse<TodoResponseDTO>> {
    const {
      page = 1,
      limit = 20,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = queryDTO;

    const filter = this.buildFilterQuery(queryDTO, userId);

    const skip = (page - 1) * limit;

    const sort = this.buildSortOptions(sortBy, sortOrder);

    const [docs, total] = await Promise.all([
      this.repository.findAll(filter, sort, skip, limit),
      this.repository.count(filter),
    ]);

    return {
      data: TodoMapper.toResponseDTOList(docs),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getById(id: string, userId: string): Promise<TodoResponseDTO> {
    const doc = await this.repository.findById(id);
    if (!doc || doc.userId.toString() !== userId) {
      throw ApiError.notFound("Todo not found");
    }

    return TodoMapper.toResponseDTO(doc);
  }

  async create(
    userId: string,
    createDTO: CreateTodoInput,
  ): Promise<TodoResponseDTO> {
    const doc = await this.repository.create({
      ...createDTO,
      userId,
    });

    return TodoMapper.toResponseDTO(doc);
  }

  async update(
    id: string,
    userId: string,
    updateDTO: UpdateTodoInput,
  ): Promise<TodoResponseDTO> {
    const doc = await this.repository.findOneAndUpdate(
      { _id: id, userId },
      updateDTO,
    );

    if (!doc) {
      throw ApiError.notFound("Todo not found");
    }

    return TodoMapper.toResponseDTO(doc);
  }

  async delete(id: string, userId: string): Promise<{ success: boolean }> {
    const doc = await this.repository.findOneAndDelete({ _id: id, userId });
    if (!doc) {
      throw ApiError.notFound("Todo not found");
    }
    return { success: true };
  }

  async toggle(id: string, userId: string): Promise<TodoResponseDTO> {
    const doc = await this.repository.findOne({ _id: id, userId });
    if (!doc) {
      throw ApiError.notFound("Todo not found");
    }

    doc.completed = !doc.completed;
    await doc.save();
    return TodoMapper.toResponseDTO(doc);
  }

  async bulkDelete(
    userId: string,
    ids: string[],
  ): Promise<{ deletedCount: number }> {
    return this.repository.deleteMany({ userId, _id: { $in: ids } });
  }

  private buildFilterQuery(
    queryDTO: TodoQueryDTO,
    userId: string,
  ): ITodoFilter {
    const filter: ITodoFilter = { userId };

    if (queryDTO.search) {
      filter.title = { $regex: queryDTO.search, $options: "i" };
    }

    if (queryDTO.status && queryDTO.status !== Status.All) {
      filter.completed = queryDTO.status === Status.Completed;
    }

    if (queryDTO.priority) {
      filter.priority = queryDTO.priority;
    }

    return filter;
  }

  private buildSortOptions(
    sortBy: string,
    sortOrder: string,
  ): Record<string, 1 | -1> {
    return {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };
  }
}

export const todoService = new TodoService(todoRepository);
