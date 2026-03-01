import { Router } from "express";
import { authenticate, validate } from "../../middlewares/index.js";
import { getTodos, getTodoById, createTodo, updateTodo, deleteTodo, toggleTodo, bulkDelete, } from "./todo.controller.js";
import { todoQuerySchema, createTodoSchema, updateTodoSchema, bulkDeleteSchema, idParamSchema, } from "./todo.validation.js";
const router = Router();
router.use(authenticate);
router.get("/", validate({ query: todoQuerySchema }), getTodos);
router.get("/:id", validate({ params: idParamSchema }), getTodoById);
router.post("/", validate({ body: createTodoSchema }), createTodo);
router.patch("/:id", validate({ params: idParamSchema, body: updateTodoSchema }), updateTodo);
router.delete("/:id", validate({ params: idParamSchema }), deleteTodo);
router.patch("/:id/toggle", validate({ params: idParamSchema }), toggleTodo);
router.delete("/bulk", validate({ body: bulkDeleteSchema }), bulkDelete);
export default router;
//# sourceMappingURL=todo.routes.js.map