const express = require("express");
const taskRouter = express.Router();
const auth = require('./middlewares/auth');
const taskController = require("./controllers/task");


taskRouter.post("/", auth, taskController.addTask);
taskRouter.put("/update/:id", auth, taskController.updateTask);
taskRouter.put("/update/status/:id", auth, taskController.updateTaskStatus);
taskRouter.delete("/delete/:id", auth, taskController.deleteTask);
taskRouter.get("/all", auth, taskController.get);
taskRouter.get("/:id", auth, taskController.getTaskById);


module.exports = taskRouter;