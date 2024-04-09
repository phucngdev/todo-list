const routerTodo = require("express").Router();
const todoController = require("../controllers/todoController");
const todoMiddleware = require("../middlewares/checkExist");

routerTodo.get("/", todoController.getTodo);
routerTodo.get("/:id", todoMiddleware.checkId, todoController.getTodoById);
routerTodo.post("/", todoMiddleware.checkTitle, todoController.addTodo);
routerTodo.put("/:id", todoMiddleware.checkId, todoController.updateTodo);
routerTodo.delete("/:id", todoMiddleware.checkId, todoController.deleteTodo);
routerTodo.delete("/", todoController.deleteAllTodo);

module.exports = routerTodo;
