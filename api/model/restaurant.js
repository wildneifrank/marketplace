const DataAccess = require("../services/data_access.js");

class Restaurant {
  static getRestaurants() {
    const db = new DataAccess("restaurant");
    const restaurants = db.all();
    return restaurants;
  }
  static deleteRestaurant(id) {
    const db = new DataAccess("restaurant");
    try {
      db.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Restaurant;
