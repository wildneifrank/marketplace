const routes = require("express").Router();
const HomeController = require("../controller/home_controller");
const AuthController = require("../controller/auth_controller");
const RestaurantController = require("../controller/restaurant_controller");

routes.get("/", HomeController.index);
routes.get("/login", HomeController.login);
routes.get("/registro", HomeController.register);
routes.get("/admin", AuthController.admin);
routes.get("/user", AuthController.user);
routes.get("/pesquisa", RestaurantController.search);
routes.get("/restaurante", RestaurantController.restaurant);

module.exports = routes;
