const routes = require("express").Router();
const RestaurantController = require("../controller/restaurant_controller.js");
const ProductController = require("../controller/product_controller.js");
const FeedbackController = require("../controller/feedback_controller.js");
const SigninAccess = require("../services/signin_access.js");
const checkToken = require("../controller/check_token.js");
const createProduct = require("../services/create_product.js");
const editProduct = require("../services/edit_product.js");
const deleteProduct = require("../services/delete_product.js");

routes.get("/restaurants", RestaurantController.getRestaurants);
<<<<<<< HEAD
=======
routes.get("/products", ProductController.getProducts);
routes.get("/feedbacks", FeedbackController.getFeedbacks);
routes.post("/signin", SigninAccess);
routes.post("/add", checkToken, createProduct);
routes.post("/edit", checkToken, editProduct);
routes.delete("/delete", checkToken, deleteProduct);
>>>>>>> 4e1093390d1e18e903e3a39c000d14101f085705

// Feedbacks
routes.get("/feedbacks", FeedbackController.getFeedbacks);
routes.delete("/feedbacks/:id", FeedbackController.deleteProduct);

// Produtos
routes.get("/products", ProductController.getProducts);
routes.delete("/products/:id", ProductController.deleteProduct);
module.exports = routes;
