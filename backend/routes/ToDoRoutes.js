const { Router } = require("express");
const ToDoController = require("../controller/ToDoController");

class ToDoRouter {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/get", ToDoController.getToDos);
    this.router.post("/save", ToDoController.saveToDo);
    this.router.put("/update/:id", ToDoController.updateToDo);
    this.router.put("/complete/:id", ToDoController.completeToDo);
    this.router.delete("/delete/:id", ToDoController.deleteToDo);
  }

  getRouter() {
    return this.router;
  }
}

module.exports = ToDoRouter;
