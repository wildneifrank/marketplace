const Product = require("../model/product");

class ProductController {
  async getProducts(req, res) {
    const data = Product.getProducts();
    res.setHeader("Content-Type", "application/json");
    return res.status(200).send(JSON.stringify(data));
  }
  async deleteProduct(req, res) {
    const id = req.params.id;
    res.setHeader("Content-Type", "application/json");
    try {
      Product.deleteProduct(id);
      res.status(200).send({ message: "Produto deletado com sucesso!" });
    } catch (error) {
      res.status(401).send({ message: "Erro ao deletar produto!" });
    }
  }
}

module.exports = new ProductController();
