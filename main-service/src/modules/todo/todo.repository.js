import { Todo } from "./todo.model.js";
function removeUndefined(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
}
export class TodoRepository {
    async findAll(filter, sort, skip, limit) {
        return Todo.find(filter).sort(sort).skip(skip).limit(limit);
    }
    async count(filter) {
        return Todo.countDocuments(filter);
    }
    async findById(id) {
        return Todo.findById(id);
    }
    async findOne(filter) {
        return Todo.findOne(filter);
    }
    async create(data) {
        return Todo.create(removeUndefined(data));
    }
    async findOneAndUpdate(filter, update) {
        return Todo.findOneAndUpdate(filter, { $set: removeUndefined(update) }, { new: true });
    }
    async findOneAndDelete(filter) {
        return Todo.findOneAndDelete(filter);
    }
    async deleteMany(filter) {
        const result = await Todo.deleteMany(filter);
        return { deletedCount: result.deletedCount ?? 0 };
    }
}
export const todoRepository = new TodoRepository();
//# sourceMappingURL=todo.repository.js.map