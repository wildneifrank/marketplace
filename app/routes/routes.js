const routes = require("express").Router();
const HomeController = require("../controller/home_controller");
const AuthController = require("../controller/auth_controller");
const RestaurantController = require("../controller/restaurant_controller");
const ProductController = require("../controller/product_controller");
const FeedbackController = require("../controller/feedback_controller");

routes.get("/", HomeController.index);
routes.get("/login", HomeController.login);
routes.get("/registro", HomeController.register);
routes.get("/admin", AuthController.admin);
routes.get("/user", AuthController.user);
routes.get("/pesquisa", RestaurantController.search);
routes.get("/restaurante/:id", RestaurantController.template);

// Admin - Products
routes.get("/admin/products", ProductController.getProducts);
routes.delete("/admin/products/:id", ProductController.deletedProduct);
routes.put("/admin/products/:id", ProductController.updatedProduct);
// Admin - Restaurants
routes.get("/admin/restaurants", RestaurantController.getRestaurants);
routes.delete("/admin/restaurants/:id", RestaurantController.deletedRestaurant);
routes.put("/admin/restaurants/:id", RestaurantController.updatedRestaurant);

// Admin - Feedbacks
routes.get("/admin/feedbacks", FeedbackController.getFeedbacks);
routes.delete("/admin/feedbacks/:id", FeedbackController.deletedFeedback);

module.exports = routes;
