const taskRoutes = require("express").Router()
const TaskController = require("../controllers/taskcontroller.js")
const { userAuthentication, userAuthorization } = require("../middlewares/auth.js")

taskRoutes.get("/tasks",userAuthentication,TaskController.showAll)

taskRoutes.post("/tasks",userAuthentication,TaskController.addTask)

taskRoutes.get("/tasks/:id",userAuthentication, userAuthorization, TaskController.showById)

taskRoutes.put("/tasks/:id", userAuthentication, userAuthorization, TaskController.updateTask)

taskRoutes.delete("/tasks/:id", userAuthentication, userAuthorization, TaskController.deleteTask)

module.exports = taskRoutes
