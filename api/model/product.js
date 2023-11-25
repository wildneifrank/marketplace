const DataAccess = require("../services/data_access.js");

class Product {
  static getProducts() {
    const db = new DataAccess("product");
    const products = db.all();
    return products;
  }

  static deleteProduct(id) {
    const db = new DataAccess("product");
    try {
      db.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
  static updateProduct(id, json) {
    const db = new DataAccess("product");
    try {
      db.update(id, json);
    } catch (error) {
      throw new Error(error);
    }
  }
  static createProduct(json) {
    const db = new DataAccess("product");
    try {
      db.create(json);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Product;
