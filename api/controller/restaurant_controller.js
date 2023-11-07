const Restaurant = require("../model/restaurant");

class RestaurantController {
  async getRestaurants(req, res) {
    const data = Restaurant.getRestaurants();
    res.setHeader("Content-Type", "application/json");
    return res.status(200).send(JSON.stringify(data));
  }
}

module.exports = new RestaurantController();
