const DataAccess = require("../services/data_access.js");

class Product {
  static getRestaurants() {
    const db = new DataAccess("product");
    const products = db.all();
    return products;
  }
}

module.exports = Product;
