const routes = require("express").Router();
const RestaurantController = require("../controller/restaurant_controller.js");

routes.get("/restaurants", RestaurantController.getRestaurants);

module.exports = routes;
