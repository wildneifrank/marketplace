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
routes.get("/restaurante/:id", RestaurantController.template);

// Admin
routes.get("/admin/products", AuthController.getProducts);
routes.get("/admin/feedbacks", AuthController.getFeedbacks);

module.exports = routes;
