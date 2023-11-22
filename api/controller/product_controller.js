const Product = require("../model/product");

class ProductController {
  async getProducts(req, res) {
    const data = Product.getProducts();
    res.setHeader("Content-Type", "application/json");
    return res.status(200).send(JSON.stringify(data));
  }
}

module.exports = new ProductController();
