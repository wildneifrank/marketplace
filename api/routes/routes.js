const routes = require("express").Router();
const RestaurantController = require("../controller/restaurant_controller.js");
const ProductController = require("../controller/product_controller.js");

routes.get("/restaurants", RestaurantController.getRestaurants);
routes.get("/products", ProductController.getProducts);

module.exports = routes;
