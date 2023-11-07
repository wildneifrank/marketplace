const DataAccess = require("../services/data_access.js");

class Restaurant {
  static getRestaurants() {
    const db = new DataAccess("restaurant");
    const restaurants = db.all();
    return restaurants;
  }
}

module.exports = Restaurant;
