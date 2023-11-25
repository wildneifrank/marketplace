const DataAccess = require("../services/data_access.js");
const bcrypt = require("bcrypt");

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
  static updateRestaurant(id, json) {
    const db = new DataAccess("restaurant");
    try {
      db.update(id, json);
    } catch (error) {
      throw new Error(error);
    }
  }
  static createRestaurant(json) {
    const db = new DataAccess("restaurant");
    json["status"] = false;
    json.password = cryptography(json.password);
    try {
      db.create(json);
    } catch (error) {
      throw new Error(error);
    }
  }
}

function cryptography(password) {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
}

module.exports = Restaurant;
