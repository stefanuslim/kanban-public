const routes = require("express").Router()
const UserController = require("../controllers/usercontroller.js")
const taskRoutes = require("./taskroutes.js")

routes.post("/login",UserController.login)

routes.post("/register",UserController.register)

routes.use(taskRoutes)


module.exports = routes
