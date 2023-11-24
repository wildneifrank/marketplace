const routes = require("express").Router();
const RestaurantController = require("../controller/restaurant_controller.js");
const ProductController = require("../controller/product_controller.js");
const FeedbackController = require("../controller/feedback_controller.js");

routes.get("/restaurants", RestaurantController.getRestaurants);

// Feedbacks
routes.get("/feedbacks", FeedbackController.getFeedbacks);
routes.delete("/feedbacks/:id", FeedbackController.deleteProduct);

// Produtos
routes.get("/products", ProductController.getProducts);
routes.delete("/products/:id", ProductController.deleteProduct);
module.exports = routes;
