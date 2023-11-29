const routes = require("express").Router();
const HomeController = require("../controller/home_controller");
const AuthController = require("../controller/auth_controller");
const RestaurantController = require("../controller/restaurant_controller");
const ProductController = require("../controller/product_controller");
const FeedbackController = require("../controller/feedback_controller");

routes.get("/", HomeController.index);
routes.get("/admin", AuthController.admin);
routes.get("/user", AuthController.user);
routes.get("/pesquisa", RestaurantController.search);
routes.get("/restaurante/:id", RestaurantController.template);

// Admin - Products
routes.get("/admin/products", ProductController.getProducts);
routes.delete("/admin/products/:id", ProductController.deletedProduct);
routes.put("/admin/products/:id", ProductController.updatedProduct);
routes.get("/admin/products/:id", ProductController.getRestaurantProducts);
routes.get("/admin/bestProducts", ProductController.getBestProducts);
routes.post("/admin/products", ProductController.createProduct);

// Admin - Restaurants
routes.get("/admin/restaurants", RestaurantController.getRestaurants);
routes.delete("/admin/restaurants/:id", RestaurantController.deletedRestaurant);
routes.put("/admin/restaurants/:id", RestaurantController.updatedRestaurant);
routes.post("/admin/restaurants", RestaurantController.createRestaurant);
routes.get("/admin/bestRestaurants", RestaurantController.getBestRestaurants);

// Admin - Feedbacks
routes.get("/admin/feedbacks", FeedbackController.getFeedbacks);
routes.delete("/admin/feedbacks/:id", FeedbackController.deletedFeedback);
routes.post("/admin/feedbacks", FeedbackController.createFeedback);
routes.get("/admin/feedbacks/:id", FeedbackController.getRestaurantsFeedbacks);

// Auth
routes.post("/login", AuthController.auth);
routes.get("/login", HomeController.login);
routes.get("/registro", HomeController.register);
routes.post("/sessionValidate", AuthController.sessionValidate);
routes.delete("/logout", AuthController.logout);

// Not found
routes.get("/:string", AuthController.notFound);
module.exports = routes;
