import { TodoMapper, Status, todoRepository, } from "./index.js";
import { ApiError } from "../../utils/index.js";
export class TodoService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async getAll(userId, queryDTO) {
        const { page = 1, limit = 20, sortBy = "createdAt", sortOrder = "desc", } = queryDTO;
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
    async getById(id, userId) {
        const doc = await this.repository.findById(id);
        if (!doc || doc.userId.toString() !== userId) {
            throw ApiError.notFound("Todo not found");
        }
        return TodoMapper.toResponseDTO(doc);
    }
    async create(userId, createDTO) {
        const doc = await this.repository.create({
            ...createDTO,
            userId,
        });
        return TodoMapper.toResponseDTO(doc);
    }
    async update(id, userId, updateDTO) {
        const doc = await this.repository.findOneAndUpdate({ _id: id, userId }, updateDTO);
        if (!doc) {
            throw ApiError.notFound("Todo not found");
        }
        return TodoMapper.toResponseDTO(doc);
    }
    async delete(id, userId) {
        const doc = await this.repository.findOneAndDelete({ _id: id, userId });
        if (!doc) {
            throw ApiError.notFound("Todo not found");
        }
        return { success: true };
    }
    async toggle(id, userId) {
        const doc = await this.repository.findOne({ _id: id, userId });
        if (!doc) {
            throw ApiError.notFound("Todo not found");
        }
        doc.completed = !doc.completed;
        await doc.save();
        return TodoMapper.toResponseDTO(doc);
    }
    async bulkDelete(userId, ids) {
        return this.repository.deleteMany({ userId, _id: { $in: ids } });
    }
    buildFilterQuery(queryDTO, userId) {
        const filter = { userId };
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
    buildSortOptions(sortBy, sortOrder) {
        return {
            [sortBy]: sortOrder === "asc" ? 1 : -1,
        };
    }
}
export const todoService = new TodoService(todoRepository);
//# sourceMappingURL=todo.service.js.map