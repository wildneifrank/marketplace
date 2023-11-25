const routes = require("express").Router();
const RestaurantController = require("../controller/restaurant_controller.js");
const ProductController = require("../controller/product_controller.js");
const FeedbackController = require("../controller/feedback_controller.js");
const SigninAccess = require("../services/signin_access.js");
const checkToken = require("../controller/check_token.js");
const createProduct = require("../services/create_product.js");
const editProduct = require("../services/edit_product.js");
const deleteProduct = require("../services/delete_product.js");

routes.post("/signin", SigninAccess);
routes.post("/add", checkToken, createProduct);
routes.post("/edit", checkToken, editProduct);
routes.delete("/delete", checkToken, deleteProduct);

// Feedbacks
routes.get("/feedbacks", FeedbackController.getFeedbacks);
routes.delete("/feedbacks/:id", FeedbackController.deleteFeedback);
routes.post("/feedbacks", FeedbackController.createFeedback);

// Produtos
routes.get("/products", ProductController.getProducts);
routes.delete("/products/:id", ProductController.deleteProduct);
routes.put("/products/:id", ProductController.updateProduct);
routes.post("/products", ProductController.createProduct);

// Restaurante
routes.get("/restaurants", RestaurantController.getRestaurants);
routes.delete("/restaurants/:id", RestaurantController.deleteRestaurant);
routes.put("/restaurants/:id", RestaurantController.updateRestaurant);
routes.post("/restaurants", RestaurantController.createRestaurant);

module.exports = routes;
