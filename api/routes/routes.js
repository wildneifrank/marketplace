const routes = require("express").Router();
const RestaurantController = require("../controller/restaurant_controller.js");
const ProductController = require("../controller/product_controller.js");
const FeedbackController = require("../controller/feedback_controller.js");
const SigninAccess = require("../services/signin_acess.js");


routes.get("/restaurants", RestaurantController.getRestaurants);
routes.get("/products", ProductController.getProducts);
routes.get("/feedbacks", FeedbackController.getFeedbacks);
routes.post("/signin", SigninAccess);

module.exports = routes;
