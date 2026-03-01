export class TodoMapper {
    static toResponseDTO(doc) {
        return {
            id: doc._id.toString(),
            title: doc.title,
            description: doc.description,
            completed: doc.completed,
            priority: doc.priority,
            dueDate: doc.dueDate ? doc.dueDate.toISOString() : undefined,
            createdAt: doc.createdAt.toISOString(),
            updatedAt: doc.updatedAt.toISOString(),
        };
    }
    static toResponseDTOList(docs) {
        return docs.map((doc) => this.toResponseDTO(doc));
    }
}
//# sourceMappingURL=todo.mapper.js.map