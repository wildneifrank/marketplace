const DataAccess = require("../services/data_access.js");
const bcrypt = require("bcrypt");
const Products = require("../model/product.js");

class Restaurant {
  static getRestaurants() {
    const db = new DataAccess("restaurant");
    const restaurants = db.all();
    return restaurants;
  }
  static deleteRestaurant(id) {
    const db = new DataAccess("restaurant");
    const products = Products.getProducts();
    try {
      db.delete(id);
      const data = products.array.filter(
        (product) => product.restaurant_id == id
      );
      data.forEach((product) => {
        Products.deleteProduct(product.id);
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  static updateRestaurant(id, json) {
    const db = new DataAccess("restaurant");
    if (json.password) {
      json.password = cryptography(json.password);
    }
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
  static findRestaurant(email) {
    const data = this.getRestaurants();
    const restaurant = data.filter((item) => item.email === email);
    return restaurant;
  }
}

function cryptography(password) {
  const hash = bcrypt.hashSync(password, 10);
  return hash;
}

module.exports = Restaurant;
